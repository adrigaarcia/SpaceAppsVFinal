export class RocketLaunchInfo {
    public id: Number;
    public date: Date;
    public name: String;
    public rocket: String;
    public url: String;
    public location: String;
    public coordinates: [Number, Number];

    constructor(id: Number, date: Date, name: String, rocket: String, url: String, location: String, coordinates: [Number, Number]) {
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
    public id: Number;
    public date: String;
    public name: String;
    public rocket: String;
    public url: String;
    public location: String;
    public coordinates: [Number, Number];
}
