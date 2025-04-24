import { Component, ElementRef, HostListener, inject, Input, SimpleChanges, ViewChild } from '@angular/core';
import { DishItemComponent } from '../dish-item/dish-item.component';
import { DishService } from '../../services/dishService/dish.service';
import { Dish } from '../../models/dish.model';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DishDialogComponent } from '../dish-dialog/dish-dialog.component';

@Component({
  selector: 'app-dish',
  imports: [DishItemComponent, CommonModule, MatProgressSpinnerModule],
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.css',
})
export class DishComponent {
  @Input() selectedCategory: number = -1;
  @ViewChild('dishContainer', { static: true }) dishContainer!: ElementRef;

  dishService: DishService = inject(DishService);

  currentPage: number = 1; //số trang hiện tại
  limit: number = 6;
  isLoading: boolean = false; //tránh load liên tục
  reachedEndOfList = false; //đánh dấu đã load hết list

  dishes: Dish[] = []; //ds món ăn ban đầu

  constructor(private dialog: MatDialog) {}
  
  ngOnInit() {
    this.resetAndLoadDishes(); //lọc lần đầu tiên khi component được khởi tạo
  }

  ngOnChanges(changes: SimpleChanges) {
    //lọc khi dishList hoặc selectedCategory có thay đổi
    if (changes['selectedCategory'] && !changes['selectedCategory'].firstChange) {
      this.resetAndLoadDishes(); // ✅ gọi khi selectedCategory thay đổi
    }
  }
  
  resetAndLoadDishes() {
    this.currentPage = 0;
    this.dishes = [];
    this.reachedEndOfList = false;
    this.loadMore();
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
  
    const atBottom =
      element.scrollHeight - element.scrollTop <= element.clientHeight + 50;
  
    if (atBottom && !this.isLoading && !this.reachedEndOfList) {
      this.loadMore(); // gọi hàm load thêm món ăn
    }
  }

  loadMore() {
    this.isLoading = true;

    const loader = this.selectedCategory === -1
      ? this.dishService.getDishesByStartIndex(this.currentPage*this.limit, this.limit) // (_start, _limit)
      : this.dishService.getDishByCategoryId(this.selectedCategory, this.currentPage*this.limit, this.limit);
      // : this.dishService.getDishByCategoryId(this.selectedCategory, this.currentPage, this.limit);

      console.log(this.selectedCategory)
    loader.then((newDishes) => {
      if (newDishes.length === 0) {
        this.reachedEndOfList = true; // Đánh dấu đã đến cuối danh sách
      } else {
        this.dishes = [...this.dishes, ...newDishes];
        this.currentPage++;
      }
      
      this.isLoading = false;
    }).catch(() => {
      this.isLoading = false;
    });
  }

  onDishSelected(dish: any) {
    this.dialog.open(DishDialogComponent, {
      data: dish,
      // width: '120%',
      height: '90vh',
      panelClass: 'dish-dialog-panel',
    });
  }
}
