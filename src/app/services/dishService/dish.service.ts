import { Injectable, signal } from '@angular/core';
import { Dish } from '../../models/dish.model';

//cho phép class này được inject ở nơi khác
@Injectable({
  providedIn: 'root', //tự tạo 1 instance duy nhất
})
export class DishService {
  dish_url = 'http://localhost:3000/dishes';

  // Khai báo signal để lưu dữ liệu
  dishes = signal<Dish[]>([]);

  constructor() {}

  //lấy ds các món có phân trang
  async getDishesByStartIndex(
    startIndex: number = 0,
    limit: number = 6
  ): Promise<void> {
    try {
      const data = await fetch(
        `${this.dish_url}?_start=${startIndex}&_limit=${limit}`
      );
      const jsonData = await data.json();
      console.log(`Start index ${startIndex} - Dishes:`, jsonData);

      // nếu startIndex = 0 (reset), ghi đè; ngược lại append
      if (startIndex === 0) {
        this.dishes.set(jsonData);
      } else {
        this.dishes.update((curr) => [...curr, ...jsonData]);
      }
    } catch (error) {
      console.error(`Error fetching dishes by start index:`, error);
      this.dishes.set([]);
    }
  }

  async getDishByCategoryId(
    categoryId: number,
    startIndex: number = 0,
    limit: number = 6
  ): Promise<void> {
    try {
      const data = await fetch(
        `${this.dish_url}?categoryId=${categoryId}&_start=${startIndex}&_limit=${limit}`
      );
      const text = await data.text();
      const jsonData = JSON.parse(text);
      console.log(
        `Dishes with categoryId ${categoryId}:`,
        jsonData,
        `Start index: ${startIndex}`
      );
      
      // nếu startIndex = 0 (reset), ghi đè; ngược lại append
      if (startIndex === 0) {
        this.dishes.set(jsonData);
      } else {
        this.dishes.update((curr) => [...curr, ...jsonData]);
      }
    } catch (error) {
      console.error(
        `Error fetching dishes by categoryId ${categoryId}:`,
        error
      );
      this.dishes.set([]);
    }
  }
}
