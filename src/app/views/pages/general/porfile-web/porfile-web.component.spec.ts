import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorfileWebComponent } from './porfile-web.component';

describe('PorfileWebComponent', () => {
  let component: PorfileWebComponent;
  let fixture: ComponentFixture<PorfileWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorfileWebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorfileWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
