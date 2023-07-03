import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import {Popup,Map, Marker} from 'mapbox-gl';

/* import {Map, Popup } from 'mapbox-gl';
 */
@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;
  constructor( private placesService:PlacesService, private mapService:MapService) { }

  ngAfterViewInit(): void {
    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
      });
 
      const popup = new Popup()
      .setHTML(`
      <h4>Hola</h4>
      <span>Aquí estoy ahora!</span>
      `)

      new Marker({color:'red'})
      .setLngLat(this.placesService.userLocation!).setPopup(popup)
      .addTo(map)

      this.mapService.setMap(map);
    
  }
}
