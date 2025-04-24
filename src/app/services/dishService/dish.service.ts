import { Injectable } from '@angular/core';
import { Dish } from '../../models/dish.model';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  dish_url = 'http://localhost:3000/dishes'
  category_url = 'http://localhost:3000/category'
  constructor() { }

  async getDishesByStartIndex(startIndex: number = 0, limit: number = 6): Promise<Dish[]> {
    try {
      const data = await fetch(`${this.dish_url}?_start=${startIndex}&_limit=${limit}`);
      const jsonData = await data.json();
      console.log(`Start index ${startIndex} - Dishes:`, jsonData);
      return jsonData ?? [];
    } catch (error) {
      console.error(`Error fetching dishes by start index:`, error);
      return [];
    }
  }

  async getAllCategory(): Promise<Dish[]> {
    try {
      const data = await fetch(this.category_url);
      
      const text = await data.text(); // Lấy response body dưới dạng text
      const jsonData = JSON.parse(text); // Thử parse thủ công
      console.log('Parsed JSON:', jsonData);
      return jsonData ?? [];
    } catch (error) {
      console.error('Error fetching or parsing data:', error);
      return [];
    }
  }

  async getDishByCategoryId(categoryId: number, startIndex: number = 0, limit: number = 6): Promise<Dish[]> {
    try {
      const data = await fetch(`${this.dish_url}?categoryId=${categoryId}&_start=${startIndex}&_limit=${limit}`);
      const text = await data.text();
      const jsonData = JSON.parse(text);
      console.log(`Dishes with categoryId ${categoryId}:`, jsonData, `Start index: ${startIndex}`);
      return jsonData ?? [];
    } catch (error) {
      console.error(`Error fetching dishes by categoryId ${categoryId}:`, error);
      return [];
    }
  }  
}
