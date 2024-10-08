import { Component, OnInit } from '@angular/core';
import { FlightTravelsService } from 'src/app/shared/services/flight-travels.service';
import { LanguageService } from './../../../shared/services/language.service';

/**
 * Component for filtering flight results based on user preferences.
 */
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  isArabic: boolean | undefined = false; // Language flag
  search: any = '';
  searchArray: any = [];

  /**
   * Constructor for FilterComponent.
   * @param flightTravelsService - Service for managing flight data.
   * @param LanguageService - Service for managing language settings.
   */
  constructor(
    public flightTravelsService: FlightTravelsService,
    public LanguageService: LanguageService
  ) { }

  ngOnInit(): void {
    // Subscribe to language changes
    this.LanguageService.currentLang$.subscribe(lang => {
      this.isArabic = lang === 'ar';
    });
  }

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

  /**
   * Filters the airline list based on the user's search input.
   */
  handleAirlineChange(e: any) {
    const value = e.target.value;
    this.searchArray = this.getAirlines().filter((airline: string) =>
      airline.toLowerCase().includes(value.toLowerCase())
    );
    console.log(this.searchArray);
  }

  /**
   * Arabic character code regex.
   */
  arabicRegex = /[\u0600-\u06FF\u0750-\u077F]/;

  /**
   * Prevent arabic characters by checking on the character code.
   */
  preventArabic(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.keyCode || event.which);
    if (this.arabicRegex.test(inputChar)) {
      event.preventDefault();
    }
  }

  //     this.LanguageService.currentLang$.subscribe((lang: string) => {
  //   this.isArabic = lang === 'ar';
  // });
}
