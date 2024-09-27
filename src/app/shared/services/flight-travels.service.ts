import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AirItineraries } from '../../models/models';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FlightTravelsService {
  constructor(private http: HttpClient, private router: Router) { }

  flights: AirItineraries[] = [];
  airlines: any = [];
  flightById: any = {};
  copyFlights: AirItineraries[] = [];
  filterByRefund: null | boolean = null;
  filterByStops: number = -1;
  filterByAirlines: string = 'all';
  isModalOpen = false;

  private LOCAL_STORAGE_KEY = 'flightData';

  /**
   * Retrieves flights from local storage or fetches from API if not available.
   */
  retrieveFlights() {
    const storedData = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.flights = parsedData.airItineraries;
      this.copyFlights = parsedData.airItineraries;
      this.airlines = parsedData.airlines;
      return;
    }

    this.http
      .get<{ airItineraries: AirItineraries[]; airlines: string[] }>(
        '../../../assets/response.json'
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching flight data:', error);
          return of({ airItineraries: [], airlines: [] });
        })
      )
      .subscribe(
        (data: { airItineraries: AirItineraries[]; airlines: string[] }) => {
          this.flights = data.airItineraries;
          this.copyFlights = data.airItineraries;
          this.airlines = data.airlines;
          localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(data));
        }
      );
  }

  /**
   * Filters flights based on refund status.
   * @param refund - The refund status to filter by.
   */
  filterRefund(refund: boolean) {
    this.filterByRefund = refund;
    this.filterAll();
  }

  /**
   * Filters flights based on the number of stops.
   * @param stops - The number of stops to filter by.
   */
  filterStops(stops: number) {
    this.filterByStops = stops;
    this.filterAll();
  }

  /**
   * Filters flights based on the selected airline.
   * @param airline - The airline name to filter by.
   */
  filterAirlines(airline: string) {
    this.filterByAirlines = airline;
    this.filterAll();
  }

  /**
   * Applies all current filters to the flights.
   */
  filterAll() {
    this.flights = this.copyFlights.filter((flight) => {
      if (flight.allJourney.flights[0].flightAirline.airlineName === 'EgyptAir ') {
        console.log(flight.allJourney.flights[0].flightAirline.airlineName);
      }
      if (
        this.filterByRefund !== null &&
        flight.isRefundable !== this.filterByRefund
      ) {
        return false;
      }
      if (
        this.filterByStops !== -1 &&
        flight.allJourney.flights[0].flightDTO.length !== this.filterByStops
      ) {
        return false;
      }
      if (
        this.filterByAirlines !== 'all' &&
        flight.allJourney.flights[0].flightAirline.airlineName !==
        this.filterByAirlines
      ) {
        return false;
      }
      return true;
    });
  }

  /**
   * Finds a flight by its ID.
   * @param id - The ID of the flight to find.
   * @returns The flight object if found, otherwise undefined.
   */
  findFlightById(id: number) {
    const flight = this.copyFlights.find((flight) => flight.sequenceNum === id);
    if (flight) {
      localStorage.setItem('selectedFlight', JSON.stringify(flight));
    }

    return flight;
  }

  /**
   * Retrieves the currently selected flight from local storage.
   * @returns The selected flight object or null if not found.
   */
  getSelectedFlight() {
    const storedFlight = localStorage.getItem('selectedFlight');
    return storedFlight ? JSON.parse(storedFlight) : null;
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
