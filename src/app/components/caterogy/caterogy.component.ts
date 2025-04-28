import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryService } from '../../services/categoryService/category.service';

@Component({
  selector: 'app-caterogy',
  imports: [FontAwesomeModule, NgClass ],
  templateUrl: './caterogy.component.html',
  styleUrl: './caterogy.component.css'
})
export class CaterogyComponent {
  selectedCategory: number = -1;
  //gửi giá trị category đến component cha
  @Output() categoryChange = new EventEmitter<{category: number}>();

  constructor(public categoryService: CategoryService){
  }

  async ngOnInit() {
    await this.categoryService.getAllCategory();
  }

  onCategoryChange(category: number) {
    this.selectedCategory = category;
    console.log(category === this.selectedCategory);
    this.categoryChange.emit({ category: category }); //gửi sự kiện đi
  }
}
