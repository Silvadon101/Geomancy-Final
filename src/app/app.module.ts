import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { BreakComponent } from './break/break.component';
import { LineExpoComponent } from './line-expo/line-expo.component';
import { FormsModule } from '@angular/forms';
import { AutoplayDirective } from './autoplay.directive';
import { ErrataDirective } from './errata.directive';
import { CircleExpoComponent } from './circle-expo/circle-expo.component';
import { PolyExpoComponent } from './poly-expo/poly-expo.component';
import { LineExpo2Component } from './line-expo2/line-expo2.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    BreakComponent,
    LineExpoComponent,
    AutoplayDirective,
    ErrataDirective,
    CircleExpoComponent,
    PolyExpoComponent,
    LineExpo2Component
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
