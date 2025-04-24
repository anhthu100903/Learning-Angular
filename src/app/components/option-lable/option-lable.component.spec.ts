import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionLableComponent } from './option-lable.component';

describe('OptionLableComponent', () => {
  let component: OptionLableComponent;
  let fixture: ComponentFixture<OptionLableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionLableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionLableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
