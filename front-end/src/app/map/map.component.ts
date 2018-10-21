import {Component, OnInit} from '@angular/core';
import {SharedDataService} from '../shared-data.service';
import {RocketLaunchInfo} from '../rocket-launch/rocket-launch';
import {icon, latLng, marker, tileLayer} from 'leaflet';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    baseLayer = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    // Marker for the top of Mt. Ranier
    summit = marker([46.8523, -121.7603], {
        icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/marker-icon.png',
            shadowUrl: 'assets/marker-shadow.png'
        }),
        title: 'Prueba'
    });

    // Layers control object with our two base layers and the three overlay layers
    layersControl = {
        baseLayers: {
            'Street Maps': this.baseLayer
        },
        overlays: {}
    };

    public options = {
        layers: [
            this.baseLayer
        ],
        zoom: 7,
        center: latLng([46.8523, -121.7603])
    };

    public launchRocketsData: Array<RocketLaunchInfo> = [];

    constructor(private dataSource: SharedDataService) {
    }

    ngOnInit() {
        this.options.layers.push(this.summit);
        this.layersControl.overlays['sdfsdf'] = this.summit;

        /* // Initial configuration of Map
         const mymap = L.map('mapid').setView([0, 0], 13);

         L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?' +
             'access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
             maxZoom: 18,
             id: 'mapbox.streets'
         }).addTo(mymap);

         // Obtiene periodicamente la información
         this.dataSource.getData(1).then((data: Array<RocketLaunchInfo>) => {
             this.launchRocketsData = data;
             const nextLaunch: RocketLaunchInfo = data[0];
             mymap.setView(nextLaunch.coordinates, 13);
             data.forEach((element) => {
                 let texto = '<b>' + element.name + '</b><br />'
                     + element.id + '</b><br />'
                     + 'Hora: ' + element.date.toLocaleTimeString() + '<br />'
                     + 'Fecha: ' + element.date.toLocaleDateString() + '<br />'
                     + 'Cohete: ' + element.rocket;

                 if (element.url != null) {
                     texto = texto + '<br />'
                         + 'Url: ' + element.url;
                 }
                 L.marker(element.coordinates).addTo(mymap)
                     .bindPopup(texto);

             });
         });


         this.dataSource.onSelectedLaunchChangeListener((id: Number) => {
             console.log(id);
             const selected = this.launchRocketsData.find((element: RocketLaunchInfo) => {
                 return element.id === id;
             });

             mymap.setView(selected.coordinates, 13);
         });*/
    }
}
