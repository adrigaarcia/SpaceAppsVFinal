import {Component, OnInit, ViewChild} from '@angular/core';
import {SharedDataService} from '../shared-data.service';
import {MatPaginator, MatTable, MatTableDataSource} from '@angular/material';
import {RocketLaunchInfo} from '../rocket-launch/rocket-launch';

@Component({
  selector: 'app-lateral-drawer',
  templateUrl: './lateral-drawer.component.html',
  styleUrls: ['./lateral-drawer.component.css']
})
export class LateralDrawerComponent implements OnInit {

    public displayedColumns: string[] = ['name', 'location', 'date', 'hour', 'view'];

    constructor(public dataSource: SharedDataService) {
    }

    @ViewChild('myMatPaginator') myPaginator: MatPaginator;
    @ViewChild('myMatTable') myTable: MatTable<RocketLaunchInfo>;
    public matdatasource = new MatTableDataSource([]);

    ngOnInit() {
        this.dataSource.getData(1).then((data: Array<RocketLaunchInfo>) => {
            this.matdatasource.data = data;
        });
        this.matdatasource.paginator = this.myPaginator;
    }
}
