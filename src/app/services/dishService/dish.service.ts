import { inject, Injectable, signal, effect } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Dish } from '../../models/dish.model';
import { HttpClient } from '@angular/common/http';
import { explicitEffect } from 'ngxtension/explicit-effect';

//cho phép class này được inject ở nơi khác
@Injectable({
  providedIn: 'root', //tự tạo 1 instance duy nhất
})
export class DishService {
  private dishUrl = 'http://localhost:3000/dishes';
  private http = inject(HttpClient);

  private dishesSignal = signal<Dish[]>([]);

  startIndex = signal(0);
  limit = signal(6);
  selectedCategoryId = signal(-1);
  reachedEndOfList = signal(false); //đánh dấu đang ở cuối danh sách

  constructor() {
    // Reset startIndex khi selectedCategoryId thay đổi
    explicitEffect([this.selectedCategoryId], ([categoryId]) => {
      this.resetPage();
    });
  
    // Load page khi startIndex, limit, hoặc selectedCategoryId thay đổi
    explicitEffect(
      [this.startIndex, this.limit, this.selectedCategoryId],
      ([start, limit, categoryId]) => this.loadPage(start, limit, categoryId)
    );
  }
  
  private async loadPage(start: number, limit: number, categoryId: number) {
    const url = this.buildUrl(start, limit, categoryId);
    const list = await firstValueFrom(this.http.get<Dish[]>(url));
  
    // Cập nhật cờ reachedEndOfList nếu đã đến cuối danh sách
    this.updateReachedEndStatus(list.length < limit);
  
    // Cập nhật danh sách món ăn
    this.updateDishes(start, list);
  
    console.log('Loaded dishes:', list);
  }
  
  private buildUrl(start: number, limit: number, categoryId: number) {
    const base = `${this.dishUrl}?_start=${start}&_limit=${limit}`;
    return categoryId === -1
      ? base
      : `${base}&categoryId=${categoryId}`;
  }
  
  private resetPage() {
    this.startIndex.set(0); // Đặt lại trang về đầu
  }
  
  private updateReachedEndStatus(isEnd: boolean) {
    this.reachedEndOfList.set(isEnd); // Cập nhật trạng thái cuối danh sách
  }
  
  private updateDishes(start: number, list: Dish[]) {
    if (start === 0) {
      this.dishesSignal.set(list); // Nếu là trang đầu, thay thế danh sách
    } else {
      this.dishesSignal.update(dishes => [...dishes, ...list]); // Nếu là các trang sau, thêm vào danh sách hiện tại
    }
  }
  
  loadMore() {
    if (!this.reachedEndOfList()) {
      this.startIndex.update(v => v + this.limit()); // Tải thêm nếu chưa đến cuối danh sách
    }
  }
  
  get dishes() {
    return this.dishesSignal.asReadonly(); // Lấy danh sách món ăn
  }
}
