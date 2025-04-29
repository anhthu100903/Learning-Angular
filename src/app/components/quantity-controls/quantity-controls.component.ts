import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderItem } from '../../models/orderInfo.model';
import { OrderInfoService } from '../../services/orderInfoService/order-info.service';

@Component({
  selector: 'app-quantity-controls',
  imports: [],
  templateUrl: './quantity-controls.component.html',
  styleUrl: './quantity-controls.component.css'
})
export class QuantityControlsComponent {
  @Input() quantity: number = 0;
  @Input() id: number = 0;
  @Output() quantityChange = new EventEmitter<{ quantity: number }>();

  constructor(public orderService: OrderInfoService){

  }

  increase() {
    this.quantity++;
    this.quantityChange.emit({ quantity: this.quantity });
    this.orderService.updateProductQuantity(this.id, this.quantity); // Cập nhật trực tiếp
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
      this.quantityChange.emit({ quantity: this.quantity });
      this.orderService.updateProductQuantity(this.id, this.quantity); // Cập nhật trực tiếp
    }
  }
}
