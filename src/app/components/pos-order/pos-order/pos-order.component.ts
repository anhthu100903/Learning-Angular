import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderItem } from '../../../models/orderInfo.model'; 
import { QuantityControlsComponent } from "../../quantity-controls/quantity-controls.component";

@Component({
  selector: 'app-pos-order',
  imports: [CommonModule, QuantityControlsComponent],
  templateUrl: './pos-order.component.html',
  styleUrl: './pos-order.component.css'
})
export class PosOrderComponent {
  @Input() product!: OrderItem;
  @Output() quantityChange = new EventEmitter<{ product: OrderItem; quantity: number }>();
  @Output() remove = new EventEmitter<OrderItem>();
}
