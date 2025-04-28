import { Component, Inject, ViewEncapsulation  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule }   from '@angular/material/icon';
import { QuantityControlsComponent } from "../quantity-controls/quantity-controls.component";
import { RatingComponent } from "../rating/rating.component";

@Component({
  selector: 'app-dish-dialog',
  imports: [MatIconModule, QuantityControlsComponent, RatingComponent],
  templateUrl: './dish-dialog.component.html',
  styleUrl: './dish-dialog.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class DishDialogComponent {
  userRating: number = 0;
  quantity: number = 0;
  // @Input() 
  
  sizes = [
    { label: 'Small', extra: 0 },
    { label: 'Large', extra: 3 },
    { label: 'Medium', extra: 1.5 },
  ];
  selectedSize = this.sizes[0];

  adds = [
    { label: 'More BBQ sos', extra: 0 },
    { label: 'Extra french fries', extra: 1 },
    { label: 'Mushroom soup', extra: 3.5 },
    { label: 'Lemon Juice (set)', extra: 2.5 },
  ];
  selectedAdds = new Set<any>();

  selectSize(sz: any) {
    this.selectedSize = sz;
  }
  
  toggleAdd(add: any) {
    this.selectedAdds.has(add)
      ? this.selectedAdds.delete(add)
      : this.selectedAdds.add(add);
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public dish: any,
    private dialogRef: MatDialogRef<DishDialogComponent>
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
