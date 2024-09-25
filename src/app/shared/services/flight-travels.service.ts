import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AirItineraries } from '../../models/models';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightTravelsService {

  constructor(private http: HttpClient) { }

  flights: AirItineraries[] = [];
  airlines: any = [];
  copyFlights: AirItineraries[] = []
  filterByRefund: null | boolean = null
  filterByStops: number = -1
  filterByAirlines: string = 'all'

  retrieveFlights() {
    this.http.get<{ airItineraries: AirItineraries[], airlines: string[] }>('../../../assets/response.json')
      .pipe(
        catchError(error => {
          console.error('Error fetching flight data:', error);
          return of({ airItineraries: [], airlines: [] });
        })
      )
      .subscribe((data: { airItineraries: AirItineraries[], airlines: string[] }) => {
        console.log(data);

        this.flights = data.airItineraries;
        this.copyFlights = data.airItineraries;
        this.airlines = data.airlines;
      });
  }

  //   // Filter by airline
  //   if (airlines.length > 0) {
  //     filteredFlights = filteredFlights.filter(flight =>
  //       airlines.includes(flight.allJourney.flights[0].flightDTO[0].flightAirline.airlineName)
  //     );
  //   }

  filterRefund(refund:boolean) {
    this.filterByRefund = refund
    this.filterAll()
  }

  filterStops(stops:number) {
    this.filterByStops = stops
    this.filterAll()
  }

  filterAirlines(airline:string) {
    this.filterByAirlines = airline
    this.filterAll()
  }

  filterAll() {
    this.flights = this.copyFlights.filter(flight =>{
      if(this.filterByRefund !== null && flight.isRefundable !== this.filterByRefund){
        return false
      }
      if(this.filterByStops !== -1 && flight.allJourney.flights[0].flightDTO.length !== this.filterByStops){
        return false
      }
      if(this.filterByAirlines !== 'all' && flight.allJourney.flights[0].flightAirline.airlineName !== this.filterByAirlines){
        return false
      }
      return true
    });
    console.log(this.flights.length);
  }

  findFlightById(id:number){
    const flight = this.copyFlights.find((flight)=>{
      return flight.sequenceNum === id
    })
    console.log(flight);
  }

}
