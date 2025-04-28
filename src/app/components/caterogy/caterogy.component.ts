import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryService } from '../../services/categoryService/category.service';
import { DishService } from '../../services/dishService/dish.service';

@Component({
  selector: 'app-caterogy',
  imports: [FontAwesomeModule, NgClass ],
  templateUrl: './caterogy.component.html',
  styleUrl: './caterogy.component.css'
})
export class CaterogyComponent {
  constructor(public categoryService: CategoryService, public dishService: DishService){
  }

  async ngOnInit() {
    await this.categoryService.getAllCategory();
  }

  onCategoryChange(category: number) {
    this.dishService.selectedCategoryId.set(category);
    console.log("categoryId: ", category)
  }
}
