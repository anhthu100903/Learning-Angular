import { Injectable } from '@angular/core';
import { Dish } from '../../models/dish.model';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  url = 'http://localhost:3000/dish'
  constructor() { }

  async getAllDishs(): Promise<Dish[]> {
    try {
      const data = await fetch(this.url);
      
      const text = await data.text(); // Lấy response body dưới dạng text
      const jsonData = JSON.parse(text); // Thử parse thủ công
      console.log('Parsed JSON:', jsonData);
      return jsonData ?? [];
    } catch (error) {
      console.error('Error fetching or parsing data:', error);
      return [];
    }
  }
}
