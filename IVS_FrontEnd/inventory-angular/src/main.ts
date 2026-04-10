// This is the ENTRY POINT of the Angular app.
// It bootstraps (starts) the AppComponent and provides HttpClient
// so our service can make API calls to the C# backend.

import 'zone.js';         // detects any chnages in the app/webpage like : clicks and updates , etc.
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => {
    console.error('Bootstrap failed:', err);
    // Display error on page so user knows something is wrong
    const errorHtml = `
      <div style="background: #333; color: #fff; padding: 30px; font-family: monospace; white-space: pre-wrap;">
        <h2 style="color: #ff6b6b; margin-top: 0;">⚠️ Application Bootstrap Error</h2>
        <p><strong>Error:</strong> ${err.message}</p>
        <pre style="color: #aaa; font-size: 12px; overflow: auto; max-height: 300px;">${err.stack || 'No stack trace'}</pre>
        <p style="margin-top: 20px; font-size: 12px; color: #999;">Check browser console (F12) for more details.</p>
      </div>
    `;
    document.body.innerHTML = errorHtml;   // the inner HTML to show , when error encontered during bootstrap/starting of app
    document.body.style.margin = '0';
    document.body.style.background = '#1a1a1a';
  });

