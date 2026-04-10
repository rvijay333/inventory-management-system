// Minimal test component to isolate issues
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div style="background: #ff0000; color: white; padding: 50px; text-align: center; font-size: 32px;">
      <h1>🔴 TEST: IF YOU SEE THIS IN RED, THE APP IS WORKING!</h1>
      <p>If you don't see this, there's a bootstrapping issue.</p>
      <button (click)="test()">Click Me</button>
      <p>Clicked: {{ clickCount }} times</p>
    </div>
  `,
  styles: []
})
export class AppSimpleComponent {
  clickCount = 0;
  
  test() {
    this.clickCount++;
    console.log('Button clicked!');
  }
}
