import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FlightResultComponent } from './components/flight-result/flight-result.component';
import { SelectedFlightComponent } from './bonus/selected-flight/selected-flight.component';
import { FilterComponent } from './components/flight-result/filter/filter.component';
import { FlightCardComponent } from './components/flight-result/flight-card/flight-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FlightResultComponent,
    SelectedFlightComponent,
    FilterComponent,
    FlightCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
