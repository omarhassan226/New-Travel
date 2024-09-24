import { Component, Input, OnInit } from '@angular/core';
import { AirItineraries } from 'src/app/models/models';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css']
})
export class FlightCardComponent implements OnInit {
  @Input() flight:AirItineraries

  cardData:any = {
    title: 'Air Line',
    subtitle: 'dept time',
    info1: 'arrival time',
    info2: 'from city',
    info3: 'to city',
    info4: 'refund ability',
    info5: 'isDirect',
    info6: 'total price'
  };

  calculateTotalPriceInEGP(flightData: any): number {
    const egpToKwd = 159.63;
    const egpToSar = 12.98;
    const egpToUsd = 60;

    let totalEGP = 0;

    flightData.passengerFareBreakDownDTOs.forEach((passenger : any) => {
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
  ngOnInit(): void {

    const isDirect:string = this.flight.allJourney.flights[0].flightDTO.length > 1 ? "Transit" : "Direct";

    this.cardData = {
      title: this.flight.allJourney.flights[0].flightAirline.airlineName,
      subtitle: this.flight.allJourney.flights[0].flightDTO[0].departureDate,
      info1: this.flight.allJourney.flights[0].flightDTO[0].arrivalDate,
      info2: this.flight.allJourney.flights[0].flightDTO[0].departureTerminalAirport.countryName,
      info3: this.flight.allJourney.flights[0].flightDTO[0].arrivalTerminalAirport.countryName,
      info4: this.flight.isRefundable,
      info5: isDirect,
      info6: this.calculateTotalPriceInEGP(this.flight).toFixed(0) + " EGP"
    };
  }
}
