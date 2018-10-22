import {Component, OnInit} from '@angular/core';
import {SharedDataService} from '../shared-data.service';
import {RocketLaunchInfo} from '../rocket-launch/rocket-launch';
// Leflet variable
declare let L;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    public launchRocketsData: Array<RocketLaunchInfo> = [];

    constructor(private dataSource: SharedDataService) {
    }

    ngOnInit() {
        // Initial configuration of Map
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
        });
    }
}
