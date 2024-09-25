import { Component } from '@angular/core';
import { FlightTravelsService } from 'src/app/shared/services/flight-travels.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  priceRange: number[] = [29223, 445349];
  selectedAirlines: string[] = [];
  selectedStops: string[] = [];
  refundableFlights: string = '';
  airlinesList: string[] = ['Airline 1', 'Airline 2', 'Airline 3'];

  constructor(private flightTravelsService: FlightTravelsService) {}

  applyFilter() {
    const filters = {
      airlines: this.selectedAirlines,
      price: this.priceRange,
      stops: this.selectedStops,
      refundable: this.refundableFlights
    };
    // this.flightTravelsService.filterFlights(filters); // Pass filters to the service
  }
}
