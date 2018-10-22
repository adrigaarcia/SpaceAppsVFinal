export class RocketLaunchInfo {
    public id: number;
    public date: Date;
    public name: string;
    public rocket: string;
    public url: string;
    public location: string;
    public coordinates: [number, number];

    constructor(id: number, date: Date, name: string, rocket: string, url: string, location: string, coordinates: [number, number]) {
        this.id = id;
        this.date = date;
        this.name = name;
        this.rocket = rocket;
        this.url = url;
        this.location = location;
        this.coordinates = coordinates;
    }
}

export class RocketLaunchJSON {
    public id: number;
    public date: string;
    public name: string;
    public rocket: string;
    public url: string;
    public location: string;
    public coordinates: [number, number];
}
