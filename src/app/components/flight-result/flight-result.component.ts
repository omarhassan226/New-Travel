import { Component, HostListener, OnInit } from '@angular/core';
import { FlightTravelsService } from 'src/app/shared/services/flight-travels.service';

@Component({
  selector: 'app-flight-result',
  templateUrl: './flight-result.component.html',
  styleUrls: ['./flight-result.component.css']
})
export class FlightResultComponent implements OnInit{
  showFiller = false;
  drawerWidth = 250;
  isSmallScreen = false;

  constructor( private flightTravels:FlightTravelsService){
    this.updateScreenSize(window.innerWidth);
  }

  ngOnInit(): void {
      this.flightTravels.retrieveFlights();
  }

  getFlights() {
    return this.flightTravels.flights;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.updateScreenSize(event.target.innerWidth);
  }

  updateScreenSize(width: number) {
    this.isSmallScreen = width < 768;
  }

}
