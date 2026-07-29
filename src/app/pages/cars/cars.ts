import { Component, computed, inject, viewChild } from '@angular/core';
import { GoogleMap, MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';
import { Parking } from '../../core/services/parking';

@Component({
  selector: 'app-cars',
  imports: [GoogleMap, MapAdvancedMarker, MapInfoWindow],
  templateUrl: './cars.html',
  styleUrl: './cars.scss',
})
export class Cars {
  private parkingService = inject(Parking);
  private readonly info = viewChild.required(MapInfoWindow);
  options: google.maps.MapOptions = {
    center: { lat: 37.98, lng: 23.72 },
    zoom: 9,
    mapId: '8fcde981f526e1cbe7350da2',
  };
  advancedMarkerOptions: google.maps.marker.AdvancedMarkerElementOptions = { gmpDraggable: false };
  positions = computed(() => {
    console.log(this.parkingService.tickets());
    return this.parkingService.tickets().map((ticket) => {
      const coords = ticket.location.split(',');
      console.log(coords[0], coords[1]);
      //23.7275, 37.9838 Athens, Greece wrong
      //37.9838, 23.7275 Athens, Greece right
      return {
        car: ticket.plateNo,
        location: {
          lat: Number(coords[0]),
          lng: Number(coords[1]),
        },
      };
    });
  });

  showTicket(marker: MapAdvancedMarker) {
    const ticket = this.parkingService
      .tickets()
      .find((ticket) => ticket.plateNo === marker.advancedMarker.title);

    this.info().open(marker, false, `Arrived at: ${ticket?.arrival}`);
  }
}
