import { throwError } from 'rxjs';
import { MapService } from './map.service';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public userLocation?: [number, number];

  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(private placesApi:PlacesApiClient,
    private mapService:MapService ) {
    this.getUserLocation();
  }

  async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (err) => {
          alert('No se pudo obtener la geolocalizacion');
          console.log(err);
          reject();
        }
      );
    });
  }

  getPlacesByQuery(query: string = '') {
    

    if(query.length==0){
      this.isLoadingPlaces=false;
      this.places = [];
      return;
    }

    if(!this.userLocation) throw new Error("No hay userLocation");

    this.isLoadingPlaces = true;
    this.placesApi
      .get<PlacesResponse>(
        `/${query}.json`,{
          params:{
            proximity: this.userLocation.join(','),
          }
        }
      )
      .subscribe({
        next: (res) => {
          this.places = res.features;
          this.isLoadingPlaces = false;
          this.mapService.createMarkersFromPlaces(res.features,this.userLocation!)
        },
      });
  }

  deletePlaces(){
    this.places=[];
  }
}
