/**
 * Author: Sanjeev Kumar
 * Bootstraps Angular application
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .then(() => console.log("Angular Application Bootstrapped Successfully"))
  .catch((err) => console.error(err));
  