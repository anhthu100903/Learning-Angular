import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DishService } from '../../services/dishService/dish.service';

@Component({
  selector: 'app-caterogy',
  imports: [FontAwesomeModule, NgClass ],
  templateUrl: './caterogy.component.html',
  styleUrl: './caterogy.component.css'
})
export class CaterogyComponent {
  selectedCategory: number = -1;
  categoryList: any[] = []; //ds ban đầu
  @Output() categoryChange = new EventEmitter<{category: number}>();
  @Input() categoryService = inject(DishService) ;

  constructor(){
    this.categoryService.getAllCategory().then((categoryList: any[]) => {
      this.categoryList = categoryList;
    })
  }

  onCategoryChange(category: number) {
    this.selectedCategory = category;
    console.log(category === this.selectedCategory);
    this.categoryChange.emit({ category: category });
  }
}
