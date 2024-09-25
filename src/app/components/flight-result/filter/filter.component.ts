import { Component } from '@angular/core';
import { FlightTravelsService } from 'src/app/shared/services/flight-travels.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  constructor(public flightTravelsService: FlightTravelsService) { }

  handleRefundChange(e: any) {
    const value = e.value
    this.flightTravelsService.filterRefund(value)
  }

  handleStopsChange(e: any) {
    const value = e.value
    this.flightTravelsService.filterStops(value)
    console.log(value);
  }

  handleAirlines(e: any) {
    const value = e.value
    this.flightTravelsService.filterAirlines(value)
    console.log(value);
  }

  getAirlines(){
    return this.flightTravelsService.airlines
  }
}
