import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  category_url = 'http://localhost:3000/category';

  categories = signal<any[]>([]);

  constructor() { }

  async getAllCategory(): Promise<void> {
    try {
      const data = await fetch(this.category_url);

      const text = await data.text();
      const jsonData = JSON.parse(text);
      console.log('Parsed JSON:', jsonData);

      this.categories.set(jsonData ?? []);
    } catch (error) {
      console.error('Error fetching or parsing data:', error);
      this.categories.set([]);
    }
  }
}
