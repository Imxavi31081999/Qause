import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopLocationComponent } from './desktop-location.component';

describe('DesktopLocationComponent', () => {
  let component: DesktopLocationComponent;
  let fixture: ComponentFixture<DesktopLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
