import {Component, OnInit, ViewChild} from '@angular/core';
import {SharedDataService} from '../shared-data.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {RocketLaunchInfo} from '../rocket-launch/rocket-launch';

@Component({
    selector: 'app-lateral-drawer',
    templateUrl: './lateral-drawer.component.html',
    styleUrls: ['./lateral-drawer.component.css']
})
export class LateralDrawerComponent implements OnInit {
    constructor(public dataSource: SharedDataService) {
    }

    @ViewChild('myMatPaginator') myPaginator: MatPaginator;
    public matdatasource = new MatTableDataSource([]);

    ngOnInit() {
        this.dataSource.getData(1).then((data: Array<RocketLaunchInfo>) => {
            this.matdatasource.data = data;
        });
        this.matdatasource.paginator = this.myPaginator;
    }
}
