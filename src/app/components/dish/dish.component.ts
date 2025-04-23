import { Component, inject, Input } from '@angular/core';
import { DishItemComponent } from "../dish-item/dish-item.component";
import { DishService } from '../../services/dishService/dish.service';
import { Dish } from '../../models/dish.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dish',
  imports: [DishItemComponent, CommonModule],
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.css'
})
export class DishComponent {
  @Input() selectedCategory: string = '';


  dishService: DishService = inject(DishService);

  dishList: Dish[] = []; //ds ban đầu
  filterDish: Dish[] = []; // ds đã lọc

  constructor(){
    this.dishService.getAllDishs().then((dishList: Dish[]) => {
      this.dishList = dishList;
      this.filterDish = dishList;
    })
  }

  ngOnInit(){
    this.filterDishList(); //lọc lần đầu tiên khi component được khởi tạo
  }

  ngOnChanges() {
    this.filterDishList(); //lọc khi dishList hoặc selectedCategory có thay đổi
  }

  filterDishList() {
    if(this.selectedCategory.toLocaleLowerCase() === "all"){
      this.filterDish = this.dishList;
    }
    else {
      this.filterDish = this.dishList.filter((dish) =>
        dish.category.toLocaleLowerCase() === this.selectedCategory.toLocaleLowerCase()
      );
    }
    
    console.log(this.filterDish);
  }
}
