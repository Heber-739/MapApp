import { PlacesService } from '../../services';
import { MapService } from './../../services/map.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-location',
  templateUrl: './my-location.component.html',
  styleUrls: ['./my-location.component.css']
})
export class MyLocationComponent   {

  constructor(private placeService:PlacesService ,private mapService:MapService) { }


  goToMyLocation(){
    if(!this.placeService.isUserLocationReady) throw new Error("No hay ubicacion de usuario");
    if(!this.mapService.isMapReady) throw new Error("No hay mapa disponible");

    this.mapService.flyTo(this.placeService.userLocation!)

  }



}
