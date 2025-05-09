import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosOrderComponent } from './pos-order.component';

describe('PosOrderComponent', () => {
  let component: PosOrderComponent;
  let fixture: ComponentFixture<PosOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
