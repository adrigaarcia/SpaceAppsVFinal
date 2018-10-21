import { Injectable } from '@angular/core';
import { RocketLaunchInfo } from './rocket-launch';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private onFocusChangeFunction: (Number) => void;

  /*
  * Id of the launch on focus
  */
  public onFocusChange(func: (Number) => void) {
    this.onFocusChangeFunction = func;
  }

  public changeFocus(id: Number) {
    this.onFocusChangeFunction(id);
  }

  async function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  /*
  * Actual rockets data
  */
  public launchRocketsData: Array<RocketLaunchInfo>;

  private loadData(){
    var jsonURL = "http://127.0.0.1:5000/launcher";
    var observ = this.http.get(jsonURL);
    observ.subscribe(data => this.launchRocketsData = data.items.map(dato => (
        {
        name: dato.name,
        id: dato.id,
        coordinates: dato.coordinates,
         date: new Date (dato.date),
         rocket: dato.rocket,
         url: dato.url,
         location: dato.location
}
)), error => console.log(error));
    await delay(1000);
  }

  constructor(private http: HttpClient) {
    this.loadData();
  }
}
