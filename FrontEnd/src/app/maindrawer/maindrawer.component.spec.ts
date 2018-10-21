import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaindrawerComponent } from './maindrawer.component';

describe('MaindrawerComponent', () => {
  let component: MaindrawerComponent;
  let fixture: ComponentFixture<MaindrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaindrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaindrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
