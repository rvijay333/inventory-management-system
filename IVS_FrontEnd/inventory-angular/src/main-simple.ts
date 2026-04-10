// main-simple.ts - for testing bootstrap issues
import { bootstrapApplication } from '@angular/platform-browser';
import { AppSimpleComponent } from './app/app-simple';

bootstrapApplication(AppSimpleComponent)
  .catch(err => {
    console.error('Bootstrap failed:' , err);
    const html = `
      <div style="background: #ff0000; color: white; padding: 50px; text-align: center; font-size: 24px;">
        <h1>🚨 BOOTSTRAP ERROR</h1>
        <p>${err.message}</p>
      </div>
    `;
    document.body.innerHTML = html;
  });
