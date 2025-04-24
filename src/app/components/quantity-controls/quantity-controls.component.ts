import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderItem } from '../new-order/new-order.component';

@Component({
  selector: 'app-quantity-controls',
  imports: [],
  templateUrl: './quantity-controls.component.html',
  styleUrl: './quantity-controls.component.css'
})
export class QuantityControlsComponent {
  @Input() product!: OrderItem;
  @Output() quantityChange = new EventEmitter<{ product: OrderItem; quantity: number }>();

  increase() {
    this.product.quantity++;
    this.quantityChange.emit({ product: this.product, quantity: this.product.quantity });
  }

  decrease() {
    if (this.product.quantity > 1) {
      this.product.quantity--;
      this.quantityChange.emit({ product: this.product, quantity: this.product.quantity });
    }
  }
}
