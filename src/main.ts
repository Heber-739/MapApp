import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
Mapboxgl.accessToken = 'pk.eyJ1IjoiaGViZXI3MyIsImEiOiJjbGppd2x1MXEwM256M2tvN3d4cG84M3dpIn0.r50Tp_Sfq5WGqB7oc4JTqw';


if(!navigator.geolocation){
alert('Navegador no soporta la Geolocalizacion')
throw new Error("Navegador no soporta la Geolocalizacion");

}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
