import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosOrderComponent } from "../pos-order/pos-order/pos-order.component";
import { OrderInfoService } from '../../services/orderInfoService/order-info.service';
import { OrderItem } from '../../models/orderInfo.model';
// export interface OrderItem {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   details: string[];
//   quantity: number;
// }

@Component({
  selector: 'app-new-order',
  imports: [CommonModule, PosOrderComponent],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css'
})
export class NewOrderComponent {
  tabs = ['New Order', 'Order History'];
  activeTab = 0;

  // Order History (ví dụ trống)
  history: OrderItem[] = [];

  constructor(public orderService: OrderInfoService){    
    effect(() => {
    const info = this.orderService.orderInfo();
    console.log('orderInfo changed:', info);
  });
  }

  ngOnInit() {
    this.orderService.setOrderId(12345); 

  }

  get orders() {
    return (this.activeTab === 0 ? this.orderService.orderInfo()?.orderItems : this.history) ?? [];
  }

  get subtotal() {
    return this.orders.reduce((sum, p) => sum + p.dish.price * p.quantity, 0);
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
    const list = this.activeTab === 0 ? this.orderService.orderInfo()?.orderItems : this.history;
    const item = list?.find(p => p.id === event.product.id);
    if (item) {
      item.quantity = event.quantity;
    }
    console.log(this.orderService.orderInfo()?.orderItems);
  }

  onRemove(item: OrderItem) {
    if (this.activeTab === 0) {
      const orders = this.orderService.orderInfo()?.orderItems;
      if (orders) {
        const index = orders.findIndex(p => p.id === item.id);
        if (index !== -1) {
          orders.splice(index, 1); // Xóa phần tử
        }
      }
    }
  }
}
