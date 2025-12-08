/**
 * Author: Sanjeev Kumar
 * Last Updated: 08-Dec-2025
 *
 * Description:
 * Root application component.
 * Subscribes to StartupService.ready$ to safely access
 * user info, roles, and menu after initialization.
 */

import { Component, OnInit } from "@angular/core";
import { StartupService } from "./startup/startup.service";
import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(public startup: StartupService) {}

  ngOnInit(): void {
    // Subscribe to ready$ to get user & menu once StartupService is done
    this.startup.ready$.subscribe((data) => {
      if (!data) return; // still initializing

      console.log("StartupService completed");
      console.log("Logged in user:", data.user);
      console.log("Has ADMIN role:", data.user?.roles.includes('ADMIN'));
      console.log("Has REPORT_VIEWER role:", data.user?.roles.includes('REPORT_VIEWER'));
      console.log("Menu:", data.menu);

      // Optional dev-only crypto test
      if (!environment.production) {
        this.devCryptoTest();
      }
    });
  }

  /** Dev-only encryption/decryption test */
  private async devCryptoTest() {
    const payload = { message: 'Hello dAndK!' };
    const serverKey = 'dummyServerKey';
    const clientKey = 'dummyServerKey';

    const encrypted = await this.startup['crypto'].encrypt(payload);
    const decrypted = await this.startup['crypto'].decrypt(encrypted);

    console.log('Encrypted:', encrypted);
    console.log('Decrypted:', decrypted);
  }
}
