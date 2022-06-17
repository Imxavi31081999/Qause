import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileActivityTaskComponent } from './mobile-activity-task.component';

describe('MobileActivityTaskComponent', () => {
  let component: MobileActivityTaskComponent;
  let fixture: ComponentFixture<MobileActivityTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileActivityTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileActivityTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
