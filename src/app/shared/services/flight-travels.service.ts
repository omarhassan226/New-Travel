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
  airlines: string[] = [];

  retrieveFlights() {
    this.http.get<{ airItineraries: AirItineraries[], airlines: string[] }>('../../../assets/response.json')
      .pipe(
        catchError(error => {
          console.error('Error fetching flight data:', error);
          return of({ airItineraries: [], airlines: [] });  // Return empty data in case of error
        })
      )
      .subscribe((data: { airItineraries: AirItineraries[], airlines: string[] }) => {
        console.log(data);

        this.flights = data.airItineraries;
        this.airlines = data.airlines;
      });
  }


}
