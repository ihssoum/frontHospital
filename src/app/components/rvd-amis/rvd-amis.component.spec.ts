import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RvdAmisComponent } from './rvd-amis.component';

describe('RvdAmisComponent', () => {
  let component: RvdAmisComponent;
  let fixture: ComponentFixture<RvdAmisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RvdAmisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RvdAmisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
