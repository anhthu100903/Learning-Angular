import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosOrderComponent } from "../pos-order/pos-order/pos-order.component";
export interface OrderItem {
  id: number;
  name: string;
  price: number;
  image: string;
  details: string[];
  quantity: number;
}

@Component({
  selector: 'app-new-order',
  imports: [CommonModule, PosOrderComponent],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css'
})
export class NewOrderComponent {
  tableName = 'Table 01';
  orderNumber = '0056';

  tabs = ['New Order', 'Order History'];
  activeTab = 0;

  // ví dụ dữ liệu New Order
  newOrders: OrderItem[] = [
    {
      id: 1,
      name: 'Grill Pork Chop',
      price: 12.99,
      image: '/assets/image.png',
      details: ['size: large', 'spicy: medium'],
      quantity: 1
    },
    {
      id: 2,
      name: 'Orange Juice',
      price: 5.00,
      image: '/assets/image.png',
      details: [],
      quantity: 2
    },
    {
      id: 3,
      name: 'Orange Juice',
      price: 5.00,
      image: '/assets/image.png',
      details: ['size: large'],
      quantity: 2
    }
  ];

  // Order History (ví dụ trống)
  history: OrderItem[] = [];

  get orders() {
    return this.activeTab === 0 ? this.newOrders : this.history;
  }

  get subtotal() {
    return this.orders.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }

  get tax() {
    return this.subtotal * 0.06;
  }

  get total() {
    return this.subtotal + this.tax;
  }

  selectTab(i: number) {
    this.activeTab = i;
  }

  onQtyChange(event: { product: OrderItem; quantity: number }) {
    // đã thay đổi quantity, Angular binding đã cập nhật
  }

  onRemove(item: OrderItem) {
    if (this.activeTab === 0) {
      this.newOrders = this.newOrders.filter(p => p.id !== item.id);
    }
  }
}
