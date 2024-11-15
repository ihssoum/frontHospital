import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPriseRDVComponent } from './button-prise-rdv.component';

describe('ButtonPriseRDVComponent', () => {
  let component: ButtonPriseRDVComponent;
  let fixture: ComponentFixture<ButtonPriseRDVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonPriseRDVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonPriseRDVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
