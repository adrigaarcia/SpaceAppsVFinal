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

    public baseLayer = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    // Layers control object with our two base layers and the three overlay layers
    public layersControl = {
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
        // Obtiene periodicamente la información
        this.dataSource.getData(1).then((data: Array<RocketLaunchInfo>) => {
            this.launchRocketsData = data;
            const nextLaunch: RocketLaunchInfo = data[0];
            // mymap.setView(nextLaunch.coordinates, 13);
            this.options['center'] = latLng(nextLaunch.coordinates);
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

                const actualMarker = marker(element.coordinates, {
                    icon: icon({
                        iconSize: [25, 41],
                        iconAnchor: [13, 41],
                        iconUrl: 'assets/marker-icon.png',
                        shadowUrl: 'assets/marker-shadow.png'
                    }),
                    title: element.name
                });

                this.options.layers.push(actualMarker);
                this.layersControl.overlays[element.id.toString()] = actualMarker;

            });
        });


        this.dataSource.onSelectedLaunchChangeListener((id: Number) => {
            const selected = this.launchRocketsData.find((element: RocketLaunchInfo) => {
                return element.id === id;
            });

            // mymap.setView(selected.coordinates, 13);
            this.options['center'] = latLng(selected.coordinates);
        });
    }
}
