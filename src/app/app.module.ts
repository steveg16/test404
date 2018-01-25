import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http } from '@angular/http';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Http
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
