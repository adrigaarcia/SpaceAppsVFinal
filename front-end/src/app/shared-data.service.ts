import {Injectable} from '@angular/core';
import {RocketLaunchInfo, RocketLaunchJSON} from './rocket-launch/rocket-launch';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {

    private onSelectedLaunchChangeFunction: (Number) => void;

    // Esta promise obtiene los datos de lanzamiento de cohetes
    private gettingLaunchesData: Promise<Array<RocketLaunchInfo>> = new Promise<Array<RocketLaunchInfo>>((resolve, reject) => {
        const jsonURL = 'http://127.0.0.1:5000/launcher';
        this.http.get<Array<RocketLaunchJSON>>(jsonURL).toPromise().catch(reason => {
            reject(reason);
        }).then((content: any) => {
            const dataArray: Array<RocketLaunchJSON> = content.items;
            const toReturn = dataArray.map(actual =>
                new RocketLaunchInfo(actual.id, new Date(), actual.name,
                    actual.rocket, actual.url, actual.location, actual.coordinates));
            resolve(toReturn);
        });
    });

    public onSelectedLaunchChangeListener(func: (Number) => void) {
        this.onSelectedLaunchChangeFunction = func;
    }

    public changeSelectedLaunch(id: Number) {
        console.log(id);
        this.onSelectedLaunchChangeFunction(id);
    }


    public getData(type: Number): Promise<Array<RocketLaunchInfo>> {
        return this.gettingLaunchesData;
    }

    constructor(private http: HttpClient) {
    }
}
