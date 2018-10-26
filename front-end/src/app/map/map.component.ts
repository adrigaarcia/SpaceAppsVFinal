import {Component, Input, OnInit} from '@angular/core';
import {RocketLaunchDataService} from '../rocket-launch-data.service';
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

    @Input()
    set selectedLaunchID(id: number) {
        this.dataSource.getLaunchDataById(id).then((value: RocketLaunchInfo)  => {
            this.center = latLng(value.coordinates);
        });
    }

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

    constructor(private dataSource: RocketLaunchDataService) {
    }

    ngOnInit() {
        // Obtiene la información sobre lanzamientos y la coloca sobre el mapa
        this.dataSource.getAllData().then((data: Array<RocketLaunchInfo>) => {
            this.center = latLng(data[0].coordinates);
            data.forEach((element: RocketLaunchInfo) => this.addMarker(element.name, element.coordinates));
        });
    }
}
