import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { MatPaginator, MatTableDataSource, MatTable } from '@angular/material'
import { RocketLaunchInfo } from '../rocket-launch';

@Component({
  selector: 'app-maindrawer',
  templateUrl: './maindrawer.component.html',
  styleUrls: ['./maindrawer.component.css']
})
export class MaindrawerComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'location', 'date', 'hour', 'view'];

  constructor(public data: SharedDataService) { }

  @ViewChild('myMatPaginator') myPaginator: MatPaginator;
  @ViewChild('myMatTable') myTable: MatTable<RocketLaunchInfo>;
  public matdatasource = new MatTableDataSource([]);

  ngOnInit() {
    this.matdatasource.data = this.data.launchRocketsData;
    this.matdatasource.paginator = this.myPaginator;
  }

}
