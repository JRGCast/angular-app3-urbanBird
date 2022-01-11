import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Component({
  selector: 'urbanBird-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  public shit: any
  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('https://api.npms.io/v2/search?q=scope:angular').subscribe(data => {
      this.shit = data.total;
    })
  }

}
