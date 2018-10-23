import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {RocketLaunchDataService} from '../rocket-launch-data.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {RocketLaunchInfo} from '../rocket-launch/rocket-launch';

@Component({
    selector: 'app-lateral-drawer',
    templateUrl: './lateral-drawer.component.html',
    styleUrls: ['./lateral-drawer.component.css']
})
export class LateralDrawerComponent implements OnInit {


    @ViewChild('paginator') paginator: MatPaginator;
    public rocketLaunchDataSource = new MatTableDataSource([]);

    @Output() selectedLaunchIdEventEmitter = new EventEmitter<number>();

    constructor(public dataSource: RocketLaunchDataService) {
    }
    ngOnInit() {
        this.dataSource.getAllData().then((data: Array<RocketLaunchInfo>) => {
            this.rocketLaunchDataSource.data = data;
        });
        this.rocketLaunchDataSource.paginator = this.paginator;
    }
}
