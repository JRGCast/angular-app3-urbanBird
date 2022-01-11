import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'urbanBird-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-app3-urbanBird';

  params() {
    HttpParams.toString()
  }
}
