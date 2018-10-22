import {Component, OnInit} from '@angular/core';
import {RocketLaunchInfo} from '../rocket-launch/rocket-launch';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-launch-details',
    templateUrl: './launch-details.component.html',
    styleUrls: ['./launch-details.component.css']
})
export class LaunchDetailsComponent implements OnInit {

    public selectedLaunch: RocketLaunchInfo = new RocketLaunchInfo(12, new Date(), 'Space X Apollo', 'Tesla Model S',
        'http://www.google.es', 'Plesetsk Cosmodrome, Russian Federation', [62.92883, 40.457098]);

    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'go-back',
            sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-arrow_back_ios-24px.svg'));
    }

    ngOnInit() {
    }

}
