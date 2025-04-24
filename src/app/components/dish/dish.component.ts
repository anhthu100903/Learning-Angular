import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { DishItemComponent } from '../dish-item/dish-item.component';
import { DishService } from '../../services/dishService/dish.service';
import { Dish } from '../../models/dish.model';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DishDialogComponent } from '../dish-dialog/dish-dialog.component';

@Component({
  selector: 'app-dish',
  imports: [DishItemComponent, CommonModule],
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.css',
})
export class DishComponent {
  @Input() selectedCategory: number = -1;

  dishService: DishService = inject(DishService);

  dishList: Dish[] = []; //ds ban đầu

  constructor(private dialog: MatDialog) {}

  loadDishs() {
    if (this.selectedCategory === -1) {
      this.dishService.getAllDishs().then((dishList: Dish[]) => {
        this.dishList = dishList;
        // this.filterDish = dishList;
      });
    } else {
      this.dishService
        .getDishByCategoryId(this.selectedCategory)
        .then((list: Dish[]) => {
          this.dishList = list;
        });
    }
  }

  ngOnInit() {
    this.loadDishs(); //lọc lần đầu tiên khi component được khởi tạo
  }

  ngOnChanges(changes: SimpleChanges) {
    //lọc khi dishList hoặc selectedCategory có thay đổi
    if (changes['selectedCategory']) {
      this.loadDishs(); // ✅ gọi khi selectedCategory thay đổi
    }
  }

  onDishSelected(dish: any) {
    this.dialog.open(DishDialogComponent, {
      data: dish,
      width: '80vw',
      height: '80vh',
      panelClass: 'dish-dialog-panel',
    });
  }
}
