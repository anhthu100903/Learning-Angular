import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderItem } from '../new-order/new-order.component';

@Component({
  selector: 'app-quantity-controls',
  imports: [],
  templateUrl: './quantity-controls.component.html',
  styleUrl: './quantity-controls.component.css'
})
export class QuantityControlsComponent {
  @Input() quantity: number = 0;
  @Output() quantityChange = new EventEmitter<{ quantity: number }>();

  increase() {
    this.quantity++;
    this.quantityChange.emit({ quantity: this.quantity });
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
      this.quantityChange.emit({ quantity: this.quantity });
    }
  }
}
