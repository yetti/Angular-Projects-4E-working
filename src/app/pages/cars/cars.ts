import { Component, computed, inject, viewChild } from '@angular/core';
import { GoogleMap, MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { Parking } from '../../core/services/parking';
import { parseCoordinates } from '../../shared/coordinates';

@Component({
  selector: 'app-cars',
  imports: [GoogleMap, MapAdvancedMarker, MapInfoWindow],
  templateUrl: './cars.html',
  styleUrl: './cars.scss',
})
export class Cars {
  private readonly localisationService = inject(NzI18nService);
  private parkingService = inject(Parking);
  private readonly info = viewChild.required(MapInfoWindow);
  options: google.maps.MapOptions = {
    center: { lat: 37.98, lng: 23.72 },
    zoom: 9,
    mapId: '8fcde981f526e1cbe7350da2',
  };
  advancedMarkerOptions: google.maps.marker.AdvancedMarkerElementOptions = { gmpDraggable: false };
  readonly positions = computed(() =>
    this.parkingService.tickets().map((ticket) => ({
      car: ticket.plateNo,
      location: parseCoordinates(ticket.location),
    })),
  );

  showTicket(marker: MapAdvancedMarker) {
    const ticket = this.parkingService
      .tickets()
      .find((ticket) => ticket.plateNo === marker.advancedMarker.title);

    this.info().infoWindow?.setHeaderContent(ticket?.plateNo);
    this.info().open(
      marker,
      false,
      `Arrived at: ${ticket?.arrival.toLocaleString(this.localisationService.getLocale().locale, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })}`,
    );
  }
}
