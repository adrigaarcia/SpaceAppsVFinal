import {Component, OnInit} from '@angular/core';
import {SharedDataService} from '../shared-data.service';
import {RocketLaunchInfo} from '../rocket-launch/rocket-launch';
import {icon, latLng, marker, tileLayer, Layer, LatLng} from 'leaflet';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    // Base layer (MAP)
    public baseLayer = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    // Different launch markers
    public markers: Layer[] = [];

    // Center in the map
    public center: LatLng = latLng([46.8523, -121.7603]);

    // Initial options configuration
    public options = {
        layers: [
            this.baseLayer
        ],
        zoom: 10,
        center: latLng([46.8523, -121.7603])
    };

    public launchRocketsData: Array<RocketLaunchInfo> = [];

    private addMarker(title: string, position: [number, number]) {
        const newMarker = marker(
            position,
            {
                icon: icon({
                    iconSize: [41, 44],
                    iconAnchor: [13, 41],
                    iconUrl: 'assets/rocket-launch.png'
                }),
                title: title
            }
        );

        this.markers.push(newMarker);
    }

    constructor(private dataSource: SharedDataService) {
    }

    ngOnInit() {
        // Obtiene la información sobre lanzamientos
        this.dataSource.getData(1).then((data: Array<RocketLaunchInfo>) => {
            this.launchRocketsData = data;
            const nextLaunch: RocketLaunchInfo = data[0];
            this.center = latLng(nextLaunch.coordinates);
            data.forEach((element: RocketLaunchInfo) => this.addMarker(element.name, element.coordinates));
        });


        this.dataSource.onSelectedLaunchChangeListener((id: Number) => {
            const selected = this.launchRocketsData.find((element: RocketLaunchInfo) => element.id === id);
            this.center = latLng(selected.coordinates);
        });
    }
}
