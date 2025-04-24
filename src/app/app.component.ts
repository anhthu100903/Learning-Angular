import { Component, inject } from '@angular/core';
import { CaterogyComponent } from './components/caterogy/caterogy.component';
import { DishComponent } from './components/dish/dish.component';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { Dish } from './models/dish.model';
import { DishService } from './services/dishService/dish.service';
import { CardButtonComponent } from './components/card-button/card-button.component';

@Component({
  selector: 'app-root',
  imports: [
    CaterogyComponent,
    DishComponent,
    NewOrderComponent,
    CardButtonComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  currentCategory: number = -1;

  onCategorySelected(event: { category: number }) {}

  onHandleCategoryChange(event: { category: number }) {
    console.log('Selected Category in Parent:', event.category);
    this.currentCategory = event.category;
  }
}
