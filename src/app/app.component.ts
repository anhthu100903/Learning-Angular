import { Component} from '@angular/core';
import { CaterogyComponent } from './components/caterogy/caterogy.component';
import { DishComponent } from './components/dish/dish.component';
import { NewOrderComponent } from './components/new-order/new-order.component';
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
  isCardClick: boolean = false;

  onHandleCardClick(){
    this.isCardClick = true;
  }

  onHandleBackClick(){
    this.isCardClick = false;
  }
}
