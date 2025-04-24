import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishDialogComponent } from './dish-dialog.component';

describe('DishDialogComponent', () => {
  let component: DishDialogComponent;
  let fixture: ComponentFixture<DishDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
