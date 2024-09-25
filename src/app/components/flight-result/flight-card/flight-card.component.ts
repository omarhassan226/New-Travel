import { Component, Input, OnInit } from '@angular/core';
import { AirItineraries } from 'src/app/models/models';
import { FlightTravelsService } from 'src/app/shared/services/flight-travels.service';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css']
})
export class FlightCardComponent implements OnInit {

  constructor(private flightService: FlightTravelsService){}
  @Input() flight: AirItineraries;

  cardData: any = {};

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
      hour12: false
    };
    return date.toLocaleString('en-US', options);
  }

  calculateDuration(departureDate: string, arrivalDate: string): string {
    const departure = new Date(departureDate);
    const arrival = new Date(arrivalDate);
    const durationInMinutes = Math.round((arrival.getTime() - departure.getTime()) / 60000);

    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    return `${hours}h ${minutes}m`;
  }

  ngOnInit(): void {
    const isDirect: string = this.flight.allJourney.flights[0].flightDTO.length > 1 ? "Transit" : "Direct";
    const isRefundable: string = this.flight.isRefundable ? "Refundable" : "Not Refundable";

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
      totalPrice: this.calculateTotalPriceInEGP(this.flight).toFixed(0) + " EGP"
    };
  }

  handleSelectedFlight () {
    this.flightService.findFlightById(this.flight.sequenceNum)
  }
}
