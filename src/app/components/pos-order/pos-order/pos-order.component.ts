import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderItem } from '../../new-order/new-order.component';

@Component({
  selector: 'app-pos-order',
  imports: [CommonModule],
  templateUrl: './pos-order.component.html',
  styleUrl: './pos-order.component.css'
})
export class PosOrderComponent {
  @Input() product!: OrderItem;
  @Output() quantityChange = new EventEmitter<{ product: OrderItem; quantity: number }>();
  @Output() remove = new EventEmitter<OrderItem>();

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

  onRemove() {
    this.remove.emit(this.product);
  }
}
