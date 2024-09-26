import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AirItineraries } from 'src/app/models/models';
import { FlightTravelsService } from 'src/app/shared/services/flight-travels.service';
import { LanguageService } from './../../shared/services/language.service';

/**
 * Component for displaying the selected flight details.
 */
@Component({
  selector: 'app-selected-flight',
  templateUrl: './selected-flight.component.html',
  styleUrls: ['./selected-flight.component.css'],
})
export class SelectedFlightComponent implements OnInit {
  id: number; // Flight ID
  flightById: AirItineraries | undefined; // Selected flight details
  flightDetails: any = {}; // Flight details object
  isArabic: boolean = false; // Language flag
  isModalOpen = false; // Modal state

  /**
   * Constructor for SelectedFlightComponent.
   * @param service - Service to manage flight data.
   * @param route - Activated route for getting route parameters.
   * @param router - Router for navigation.
   * @param LanguageService - Service for managing language settings.
   */
  constructor(
    private service: FlightTravelsService,
    private route: ActivatedRoute,
    private router: Router,
    private LanguageService: LanguageService
  ) { }

  /**
   * Lifecycle hook that is called after component initialization.
   */
  ngOnInit(): void {
    // Subscribe to language changes
    this.LanguageService.currentLang$.subscribe(lang => {
      this.isArabic = lang === 'ar';
    });

    // Get the flight ID from the route parameters
    this.route.params.subscribe((param: { [x: string]: string | number }) => {
      this.id = +param['id'];
      this.flightById = this.service.findFlightById(this.id);

      // Populate flight details based on the retrieved flight data
      if (this.flightById) {
        this.populateFlightDetails();
      } else {
        this.flightById = this.service.getSelectedFlight();
        if (this.flightById) {
          this.populateFlightDetails();
        } else {
          console.error('No flight data found in localStorage.');
        }
      }
    });
  }

  /**
   * Calculates the total price in EGP based on flight data.
   * @param flightData - Flight data object.
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
   * @param dateString - The date string to format.
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
      hour12: false,
    };
    return date.toLocaleString('en-US', options);
  }

  /**
   * Calculates the duration between departure and arrival dates.
   * @param departureDate - The departure date.
   * @param arrivalDate - The arrival date.
   * @returns Duration string in hours and minutes.
   */
  calculateDuration(departureDate: string, arrivalDate: string): string {
    const departure = new Date(departureDate);
    const arrival = new Date(arrivalDate);
    const durationInMinutes = Math.round(
      (arrival.getTime() - departure.getTime()) / 60000
    );

    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    return `${hours}h ${minutes}m`;
  }

  /**
   * Populates flight details based on the selected flight.
   */
  populateFlightDetails() {
    if (!this.flightById) return;

    const isDirect: string =
      this.flightById.allJourney.flights[0].flightDTO.length > 1
        ? 'Transit'
        : 'Direct';
    const isRefundable: string = this.flightById.isRefundable
      ? 'Refundable'
      : 'Not Refundable';

    this.flightDetails = {
      airName: this.flightById.allJourney.flights[0].flightAirline?.airlineName,
      airlineLogo: this.flightById.allJourney.flights[0].flightAirline?.airlineLogo,
      departureDate: this.formatDate(this.flightById.deptDate),
      arrivalDate: this.formatDate(this.flightById.arrivalDate),
      duration: this.calculateDuration(this.flightById.deptDate, this.flightById.arrivalDate),
      departureCountryName: this.flightById.allJourney.flights[0].flightDTO[0].departureTerminalAirport?.countryName,
      arrivalCountryName: this.flightById.allJourney.flights[0].flightDTO[0].arrivalTerminalAirport?.countryName,
      refund: isRefundable,
      direction: isDirect,
      totalPrice: this.calculateTotalPriceInEGP(this.flightById).toFixed(0) + ' EGP',
      id: this.flightById.sequenceNum,
      totalDuration: this.flightById.totalDuration,
      cabinClass: this.flightById.cabinClass,
      baggageInfo: this.flightById.baggageInformation[0]?.baggage,
      flightNumber: this.flightById.allJourney.flights[0].flightDTO[0].flightInfo?.flightNumber,
      departureTerminal: this.flightById.allJourney.flights[0].flightDTO[0].departureTerminalAirport?.airportName,
    };
  }

  /**
   * Opens the booking confirmation modal.
   */
  openModal(): void {
    this.isModalOpen = true;
  }

  /**
   * Closes the booking confirmation modal.
   */
  closeModal(): void {
    this.isModalOpen = false;
  }

  /**
   * Confirms the booking and navigates to the result page.
   */
  confirmBooking(): void {
    this.closeModal();
    this.router.navigate(['result']);
  }
}
