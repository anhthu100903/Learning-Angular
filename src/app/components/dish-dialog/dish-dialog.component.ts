import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { QuantityControlsComponent } from '../quantity-controls/quantity-controls.component';
import { RatingComponent } from '../rating/rating.component';
import { OrderInfoService } from '../../services/orderInfoService/order-info.service';
import { ToastMessageComponent } from "../shared/toast-message/toast-message/toast-message.component";
// import { randomUUID } from 'crypto';

@Component({
  selector: 'app-dish-dialog',
  imports: [MatIconModule, QuantityControlsComponent, RatingComponent, ToastMessageComponent],
  templateUrl: './dish-dialog.component.html',
  styleUrl: './dish-dialog.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class DishDialogComponent {
  @ViewChild('toast') toast!: ToastMessageComponent;

  userRating: number = 0;
  quantity: number = 1;

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
    private dialogRef: MatDialogRef<DishDialogComponent>,
    public orderService: OrderInfoService
  ) {}

  addToOrder() {
    const orderItem = {
      id: 1,
      dish: this.dish,
      details: [
        `Size: ${this.selectedSize.label}`,
        ...Array.from(this.selectedAdds).map((add) => add.label),
      ],
      quantity: this.quantity || 1, // Sử dụng quantity hoặc mặc định là 1
    };

    // Gọi service để thêm item vào order
    this.orderService.createOrder(orderItem);

    alert("Lưu thành công!");

    // Đóng dialog sau khi thêm
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
