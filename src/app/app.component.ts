import { Component, OnInit } from '@angular/core';

import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  data: any;
  err: string;
  constructor(private dataService: DataService) { }

  public getData(url: string) {
    this.dataService.getData(url)
      .subscribe(
        (data) => {
          if (data.ok) {
            this.data = data;
          } else {
            this.err = `${data.statusText} (${data.status})`;
          }
        },
        err => this.err = err
      );
  }

  ngOnInit() {
    this.getData('http://someurl');
  }

}
