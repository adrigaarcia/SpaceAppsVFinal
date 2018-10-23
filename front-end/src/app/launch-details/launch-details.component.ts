import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RocketLaunchInfo} from '../rocket-launch/rocket-launch';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {RocketLaunchDataService} from '../rocket-launch-data.service';

@Component({
    selector: 'app-launch-details',
    templateUrl: './launch-details.component.html',
    styleUrls: ['./launch-details.component.css']
})
export class LaunchDetailsComponent implements OnInit {

    public selectedLaunch: RocketLaunchInfo = new RocketLaunchInfo(12, new Date(), 'Space X Apollo', 'Tesla Model S',
        'http://www.google.es', 'Plesetsk Cosmodrome, Russian Federation', [62.92883, 40.457098]);

    @Input()
    set selectedLaunchID(id: number) {
        this.dataSource.getLaunchDataById(id).then((value: RocketLaunchInfo)  => {
            this.selectedLaunch = value;
        });
    }

    @Output() backPulsed = new EventEmitter<boolean>();

    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dataSource: RocketLaunchDataService) {
        iconRegistry.addSvgIcon(
            'go-back',
            sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-arrow_back_ios-24px.svg'));
    }

    ngOnInit() {
    }

}
