import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RDVpourSoiComponent } from './rdvpour-soi.component';

describe('RDVpourSoiComponent', () => {
  let component: RDVpourSoiComponent;
  let fixture: ComponentFixture<RDVpourSoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RDVpourSoiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RDVpourSoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
