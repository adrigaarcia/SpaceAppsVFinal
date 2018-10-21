import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
// Leflet variable
declare let L;

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

	constructor(private data: SharedDataService) { }

	ngOnInit() {

		var first = this.data.launchRocketsData[0];

		var mymap = L.map('mapid').setView(first.coordinates, 13);

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
			maxZoom: 18,
			id: 'mapbox.streets'
		}).addTo(mymap);

		this.data.launchRocketsData.forEach((element) => {
			var texto = "<b>" + element.name + "</b><br />"
			+ "Hora: " + element.date.toLocaleTimeString() + "<br />"
			+ "Fecha: " + element.date.toLocaleDateString() + "<br />" 
			+ "Cohete: " + element.rocket;

			if(element.url != null) {
				texto = texto + "<br />"
				+ "Url: " + element.url;
			}  
			L.marker(element.coordinates).addTo(mymap)
				.bindPopup(texto);

		});

		this.data.onFocusChange((id: Number) => {
			this.data.launchRocketsData.forEach((element) => {
				if(element.id === id){
					mymap.setView(element.coordinates, 13);
				}
			});
		});
	}

	OnChanges() {

	}

}
