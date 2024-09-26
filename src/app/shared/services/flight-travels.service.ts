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
  flightById: any = {};
  copyFlights: AirItineraries[] = [];
  filterByRefund: null | boolean = null;
  filterByStops: number = -1;
  filterByAirlines: string = 'all';

  private LOCAL_STORAGE_KEY = 'flightData';

  // Check if data exists in localStorage
  retrieveFlights() {
    const storedData = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.flights = parsedData.airItineraries;
      this.copyFlights = parsedData.airItineraries;
      this.airlines = parsedData.airlines;
      return;
    }

    // Fetch from API if no data in localStorage
    this.http.get<{ airItineraries: AirItineraries[], airlines: string[] }>('../../../assets/response.json')
      .pipe(
        catchError(error => {
          console.error('Error fetching flight data:', error);
          return of({ airItineraries: [], airlines: [] });
        })
      )
      .subscribe((data: { airItineraries: AirItineraries[], airlines: string[] }) => {

        this.flights = data.airItineraries;
        this.copyFlights = data.airItineraries;
        this.airlines = data.airlines;

        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(data));
      });
  }

  filterRefund(refund: boolean) {
    this.filterByRefund = refund;
    this.filterAll();
  }

  filterStops(stops: number) {
    this.filterByStops = stops;
    this.filterAll();
  }

  filterAirlines(airline: string) {
    this.filterByAirlines = airline;
    this.filterAll();
  }

  filterAll() {
    this.flights = this.copyFlights.filter(flight => {
      if (this.filterByRefund !== null && flight.isRefundable !== this.filterByRefund) {
        return false;
      }
      if (this.filterByStops !== -1 && flight.allJourney.flights[0].flightDTO.length !== this.filterByStops) {
        return false;
      }
      if (this.filterByAirlines !== 'all' && flight.allJourney.flights[0].flightAirline.airlineName !== this.filterByAirlines) {
        return false;
      }
      return true;
    });
  }

  findFlightById(id: number) {
    const flight = this.copyFlights.find((flight) => flight.sequenceNum === id);
    if (flight) {
      localStorage.setItem('selectedFlight', JSON.stringify(flight));
    }

    return flight;
  }

  getSelectedFlight() {
    const storedFlight = localStorage.getItem('selectedFlight');
    return storedFlight ? JSON.parse(storedFlight) : null;
  }
}
