import { Component, OnInit } from '@angular/core';
import { FlightTravelsService } from 'src/app/shared/services/flight-travels.service';

@Component({
  selector: 'app-flight-result',
  templateUrl: './flight-result.component.html',
  styleUrls: ['./flight-result.component.css']
})
export class FlightResultComponent implements OnInit{

  constructor( private flightTravels:FlightTravelsService){}

  ngOnInit(): void {
      this.flightTravels.retrieveFlights();
  }

  getFlights() {
    return this.flightTravels.flights;
  }
}
