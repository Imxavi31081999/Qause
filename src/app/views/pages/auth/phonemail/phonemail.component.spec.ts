import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonemailComponent } from './phonemail.component';

describe('PhonemailComponent', () => {
  let component: PhonemailComponent;
  let fixture: ComponentFixture<PhonemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhonemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
