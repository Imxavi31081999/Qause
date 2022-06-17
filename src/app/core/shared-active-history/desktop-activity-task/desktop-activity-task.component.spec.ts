import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopActivityTaskComponent } from './desktop-activity-task.component';

describe('DesktopActivityTaskComponent', () => {
  let component: DesktopActivityTaskComponent;
  let fixture: ComponentFixture<DesktopActivityTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopActivityTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopActivityTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
