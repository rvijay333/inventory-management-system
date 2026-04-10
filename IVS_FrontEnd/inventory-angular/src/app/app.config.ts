// app.config.ts
// This file configures the Angular application. => tells what features/services willbe available throughout the app
// provideHttpClient() makes Angular's HTTP service available
// throughout the app so our inventory service can call the C# API.

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';  // provides HttpClient for making API calls to the backend
                                                           
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient()
  ]
};
