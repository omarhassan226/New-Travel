import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AirItineraries } from 'src/app/models/models';
import { FlightTravelsService } from 'src/app/shared/services/flight-travels.service';

/**
 * Component for displaying flight card information.
 */
@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css']
})
export class FlightCardComponent implements OnInit {
  @Input() flight: AirItineraries; // Input flight data

  cardData: any = {}; // Data to be displayed on the card

  /**
   * Constructor for FlightCardComponent.
   * @param flightService - Service for managing flight data.
   * @param router - Router for navigation.
   */
  constructor(private flightService: FlightTravelsService, private router: Router) { }

  /**
   * Calculates the total price of the flight in EGP.
   * @param flightData - Data for the flight.
   * @returns Total price in EGP.
   */
  calculateTotalPriceInEGP(flightData: any): number {
    const egpToKwd = 159.63;
    const egpToSar = 12.98;
    const egpToUsd = 60;
    let totalEGP = 0;

    flightData.passengerFareBreakDownDTOs.forEach((passenger: any) => {
      passenger.flightFaresDTOs.forEach((fare: any) => {
        if (fare.currencyCode === 'EGP') {
          totalEGP += fare.fareAmount;
        } else if (fare.currencyCode === 'KWD') {
          totalEGP += fare.fareAmount * egpToKwd;
        } else if (fare.currencyCode === 'SAR') {
          totalEGP += fare.fareAmount * egpToSar;
        } else if (fare.currencyCode === 'USD') {
          totalEGP += fare.fareAmount * egpToUsd;
        }
      });
    });

    return totalEGP;
  }

  /**
   * Formats a date string into a readable format.
   * @param dateString - Date string to format.
   * @returns Formatted date string.
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    return date.toLocaleString('en-US', options);
  }

  /**
   * Calculates the duration between departure and arrival times.
   * @param departureDate - Departure date.
   * @param arrivalDate - Arrival date.
   * @returns Duration in hours and minutes.
   */
  calculateDuration(departureDate: string, arrivalDate: string): string {
    const departure = new Date(departureDate);
    const arrival = new Date(arrivalDate);
    const durationInMinutes = Math.round((arrival.getTime() - departure.getTime()) / 60000);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  /**
   * Lifecycle hook that is called after component initialization.
   */
  ngOnInit(): void {
    const isDirect: number = this.flight.allJourney.flights[0].flightDTO.length;
    const isRefundable: boolean = this.flight.isRefundable;

    const departureDate = this.flight.allJourney.flights[0].flightDTO[0].departureDate;
    const arrivalDate = this.flight.allJourney.flights[0].flightDTO[0].arrivalDate;

    this.cardData = {
      airName: this.flight.allJourney.flights[0].flightAirline.airlineName,
      departureDate: this.formatDate(departureDate),
      arrivalDate: this.formatDate(arrivalDate),
      duration: this.calculateDuration(departureDate, arrivalDate),
      departureCountryName: this.flight.allJourney.flights[0].flightDTO[0].departureTerminalAirport.countryName,
      arrivalCountryName: this.flight.allJourney.flights[0].flightDTO[0].arrivalTerminalAirport.countryName,
      refund: isRefundable,
      direction: isDirect,
      totalPrice: this.calculateTotalPriceInEGP(this.flight).toFixed(0) + " EGP",
      id: this.flight.sequenceNum
    };
  }

  /**
   * Navigates to the selected flight details page.
   */
  handleSelectedFlight() {
    this.flightService.findFlightById(this.flight.sequenceNum);
    this.router.navigate(['flight', this.cardData.id]);
  }

  /**
* Property and functions to manage flight confirmation model.
*/
  isModalOpen = this.flightService.isModalOpen

  openModal = this.flightService.openModal

  closeModal = this.flightService.closeModal

  confirmBooking = this.flightService.confirmBooking
}
