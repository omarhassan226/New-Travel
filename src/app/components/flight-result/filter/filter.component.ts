import { Component, OnInit } from '@angular/core';
import { FlightTravelsService } from 'src/app/shared/services/flight-travels.service';
import { LanguageService } from './../../../shared/services/language.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  isArabic: boolean = false
  // currentLang: string = 'en';
  LanguageService: any;

  constructor(public flightTravelsService: FlightTravelsService, LanguageService: LanguageService) { }
  ngOnInit(): void {
    this.LanguageService.currentLang$.subscribe((lang: string) => {
      this.isArabic = lang === 'ar';
    });
  }

  handleRefundChange(e: any) {
    const value = e.value
    this.flightTravelsService.filterRefund(value)
  }

  handleStopsChange(e: any) {
    const value = e.value
    this.flightTravelsService.filterStops(value)
  }

  handleAirlines(e: any) {
    const value = e.value
    this.flightTravelsService.filterAirlines(value)
  }

  getAirlines() {
    return this.flightTravelsService.airlines
  }
}
