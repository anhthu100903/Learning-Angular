import { Component, inject } from '@angular/core';
import { CaterogyComponent } from "./components/caterogy/caterogy.component";
import { DishComponent } from "./components/dish/dish.component";
import { NewOrderComponent } from "./components/new-order/new-order.component";
import { Dish } from './models/dish.model';
import { DishService } from './services/dishService/dish.service';

@Component({
  selector: 'app-root',
  imports: [CaterogyComponent, DishComponent, NewOrderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentCategory: string = '';

  onCategorySelected(event: { category: string }) {
  }  

  onHandleCategoryChange(event: {category: string}){
    console.log('Selected Category in Parent:', event.category);
    this.currentCategory = event.category;
  }
}
