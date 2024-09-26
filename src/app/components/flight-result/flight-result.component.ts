import { Component, HostListener, OnInit } from '@angular/core';
import { FlightTravelsService } from 'src/app/shared/services/flight-travels.service';

/**
 * Component for displaying flight results.
 */
@Component({
  selector: 'app-flight-result',
  templateUrl: './flight-result.component.html',
  styleUrls: ['./flight-result.component.css']
})
export class FlightResultComponent implements OnInit {
  showFiller = false;
  drawerWidth = 250;
  isSmallScreen = false;

  /**
   * Constructor for FlightResultComponent.
   * @param flightTravels - Service for managing flight data.
   */
  constructor(private flightTravels: FlightTravelsService) {
    this.updateScreenSize(window.innerWidth);
  }

  /**
   * Lifecycle hook that is called after component initialization.
   */
  ngOnInit(): void {
    this.flightTravels.retrieveFlights();
  }

  /**
   * Retrieves flights from the service.
   * @returns Array of flights.
   */
  getFlights() {
    return this.flightTravels.flights;
  }

  /**
   * Listens to window resize events to update screen size.
   * @param event - The resize event.
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateScreenSize(event.target.innerWidth);
  }

  /**
   * Updates the screen size flag based on the window width.
   * @param width - Current window width.
   */
  updateScreenSize(width: number) {
    this.isSmallScreen = width < 768;
  }
}
