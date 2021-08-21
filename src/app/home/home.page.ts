import { Component } from '@angular/core';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, LatLngBounds, ILatLng, Marker, MarkerOptions, Polyline, Encoding, Geocoder, Spherical } from "@ionic-native/google-maps";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public map: GoogleMap;

  constructor(private geolocation: Geolocation, private launchNavigator: LaunchNavigator) {}

  ngOnInit(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.createMap(resp.coords.latitude, resp.coords.longitude);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  public createMap(lat, lng){
    // Set the coordinates.
    const coordinates: LatLng = new LatLng(lat, lng);
    /* The create() function will take the ID of your map element */
    this.map = GoogleMaps.create('map', {
      styles: [
        {
          "featureType": "poi.business",
          "stylers": [
            { "visibility": "off" }
          ]
        },
        {
          "featureType": "transit.station.bus",
          "stylers":  [
            { "visibility": "off" }
          ]
        }
      ],
      camera: {
        target: coordinates,
        zoom: 16
      },
      controls: {
        compass: false,
        myLocationButton: false,
        myLocation: true
      }
    });

    this.map.one( GoogleMapsEvent.MAP_READY ).then(() => {

    });

  }

  public navigate(){
    this.launchNavigator.availableApps().then((apps) => {
      console.log(`Available apps: ${apps}`);
      
    });
  }

}
