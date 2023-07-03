import { Route } from '../../interfaces/directions';
import { Feature } from '../../interfaces/places';
import { MapService } from '../../services';
import { PlacesService } from './../../services/places.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent   {

  public selectedId:string = '';

  constructor(private mapService:MapService,private placesService:PlacesService) { }

  get isLoadingPlaces():boolean{
    return this.placesService.isLoadingPlaces
  }

  get places():Feature[]{
    return this.placesService.places
  }

  flyTo(place:Feature){
    this.selectedId=place.id;
    const [lng,lat]=place.center;
    this.mapService.flyTo([lng,lat])
  }

  getDirection(place:Feature){
    this.mapService.getRouteTwoPoints(
      this.placesService.userLocation!,
      place.center as [number,number]
    )
    this.placesService.deletePlaces()
  }


  



}
 