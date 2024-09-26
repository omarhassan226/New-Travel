import { Component, OnInit } from '@angular/core';
import { FlightTravelsService } from 'src/app/shared/services/flight-travels.service';
import { LanguageService } from './../../../shared/services/language.service';

/**
 * Component for filtering flight results based on user preferences.
 */
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  isArabic: boolean = false; // Language flag
  LanguageService: any;

  /**
   * Constructor for FilterComponent.
   * @param flightTravelsService - Service for managing flight data.
   * @param LanguageService - Service for managing language settings.
   */
  constructor(public flightTravelsService: FlightTravelsService, LanguageService: LanguageService) { }

  /**
   * Handles the change event for refund filter.
   * @param e - Event object containing the new refund filter value.
   */
  handleRefundChange(e: any) {
    const value = e.value;
    this.flightTravelsService.filterRefund(value);
  }

  /**
   * Handles the change event for stops filter.
   * @param e - Event object containing the new stops filter value.
   */
  handleStopsChange(e: any) {
    const value = e.value;
    this.flightTravelsService.filterStops(value);
  }

  /**
   * Handles the change event for airline filter.
   * @param e - Event object containing the new airline filter value.
   */
  handleAirlines(e: any) {
    const value = e.value;
    this.flightTravelsService.filterAirlines(value);
  }

  /**
   * Retrieves the list of available airlines.
   * @returns Array of airlines.
   */
  getAirlines() {
    return this.flightTravelsService.airlines;
  }
}
