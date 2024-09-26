import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AirItineraries } from 'src/app/models/models';
import { FlightTravelsService } from 'src/app/shared/services/flight-travels.service';
import { LanguageService } from './../../shared/services/language.service';

@Component({
  selector: 'app-selected-flight',
  templateUrl: './selected-flight.component.html',
  styleUrls: ['./selected-flight.component.css'],
})
export class SelectedFlightComponent {
  id: number;
  flightById: AirItineraries | undefined = undefined;
  flightDetails: any = {};
  isArabic: boolean = false

  constructor(
    private service: FlightTravelsService,
    private route: ActivatedRoute,
    private router: Router,
    private LanguageService: LanguageService
  ) { }

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

  ngOnInit(): void {

    this.LanguageService.currentLang$.subscribe(lang => {
      this.isArabic = lang === 'ar';
    });

    this.route.params.subscribe((param: { [x: string]: string | number }) => {
      this.id = +param['id'];
      this.flightById = this.service.findFlightById(this.id);

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
      airlineLogo:
        this.flightById.allJourney.flights[0].flightAirline?.airlineLogo,
      departureDate: this.formatDate(this.flightById.deptDate),
      arrivalDate: this.formatDate(this.flightById.arrivalDate),
      duration: this.calculateDuration(
        this.flightById.deptDate,
        this.flightById.arrivalDate
      ),
      departureCountryName:
        this.flightById.allJourney.flights[0].flightDTO[0]
          .departureTerminalAirport?.countryName,
      arrivalCountryName:
        this.flightById.allJourney.flights[0].flightDTO[0]
          .arrivalTerminalAirport?.countryName,
      refund: isRefundable,
      direction: isDirect,
      totalPrice:
        this.calculateTotalPriceInEGP(this.flightById).toFixed(0) + ' EGP',
      id: this.flightById.sequenceNum,
      totalDuration: this.flightById.totalDuration,
      cabinClass: this.flightById.cabinClass,
      baggageInfo: this.flightById.baggageInformation[0]?.baggage,
      flightNumber:
        this.flightById.allJourney.flights[0].flightDTO[0].flightInfo
          ?.flightNumber,
      departureTerminal:
        this.flightById.allJourney.flights[0].flightDTO[0]
          .departureTerminalAirport?.airportName,
    };
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  confirmBooking(): void {
    this.closeModal();
    this.router.navigate(['result']);
  }

  isModalOpen = false;
}
