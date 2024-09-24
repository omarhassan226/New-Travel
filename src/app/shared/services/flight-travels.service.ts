import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AirItineraries} from '../../models/models'

@Injectable({
  providedIn: 'root'
})
export class FlightTravelsService {

  constructor(private http:HttpClient) { }

  flights: AirItineraries[] = [];
  airlines: string[] = [];

  retrieveFlights () {
    this.http.get<{
      airItineraries: AirItineraries[],
      airlines: string[]
    }>('../../../assets/response.json').subscribe((data:{
      airItineraries: AirItineraries[],
      airlines: string[]
    })=>{
      console.log(data);

      this.flights = data.airItineraries;
      this.airlines = data.airlines
    })
  }
}
