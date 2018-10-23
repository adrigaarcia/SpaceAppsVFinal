import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-maindrawer',
    templateUrl: './main-drawer.component.html',
    styleUrls: ['./main-drawer.component.css']
})
export class MainDrawerComponent implements OnInit {

    public showDetails = false;

    public selectedLaunchId = 0;

    public onLaunchSelected(id: number) {
        this.selectedLaunchId = id;
        this.showDetails = true;
    }

    constructor() {
    }

    ngOnInit() {
    }
}
