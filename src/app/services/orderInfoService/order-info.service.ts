import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { OrderInfo } from '../../models/orderInfo.model';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, startWith, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderInfoService {
  private baseUrl = 'http://localhost:3000/order-info';
  private http = inject(HttpClient);

  orderId = signal<number>(0);
  private orderId$ = toObservable(this.orderId);

  private orderRequest$ = this.orderId$.pipe(
    switchMap((id) =>
      this.http
        .get<OrderInfo[]>(`${this.baseUrl}?orderId=${id}`)
        .pipe(
          map((orderList: OrderInfo[]) =>
            orderList.length > 0 ? orderList[0] : undefined
          )
        )
    ),
    startWith(undefined)
  );

  orderInfo = toSignal(this.orderRequest$, { initialValue: undefined });

  setOrderId(id: number) {
    this.orderId.set(id);
  }

  // cập nhật quantity cho sản phẩm (chỉ cập nhật trong bộ nhớ tạm)
  updateProductQuantity(productId: number, newQuantity: number) {
    const order = this.orderInfo(); // Lấy dữ liệu đơn hàng

    if (order) {
      // Kiểm tra xem order có phải là undefined hay không
      const product = order.orderItems.find((item) => item.id === productId);

      if (product) {
        // Nếu tìm thấy sản phẩm, cập nhật số lượng
        product.quantity = newQuantity;
        console.log(
          `Updated quantity for product ID ${productId} to ${newQuantity}`
        );
      } else {
        console.log(`Product with ID ${productId} not found in the order.`);
      }
    } else {
      console.log('Order data is undefined.');
    }
  }

  //thêm order (chỉ cập nhật trong bộ nhớ tạm)
  createOrder(newOrderItem: any) {
    const order = this.orderInfo(); // Lấy thông tin đơn hàng hiện tại
  
    if (order) {
      // Nếu order đã tồn tại, kiểm tra orderItems và thêm item mới vào đó
      order.orderItems.push(newOrderItem); // Thêm item mới vào orderItems
  
      console.log('New order item added successfully:', newOrderItem);
    } else {
      console.log('Error: No order found');
    }
  }
}
