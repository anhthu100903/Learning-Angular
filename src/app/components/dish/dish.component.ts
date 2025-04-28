import {
  Component,
  ElementRef,
  signal,
  ViewChild,
} from '@angular/core';
import { DishItemComponent } from '../dish-item/dish-item.component';
import { DishService } from '../../services/dishService/dish.service';
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
  //lấy giá trị tham chiếu đến DOM
  @ViewChild('dishContainer', { static: true }) dishContainer!: ElementRef;

  private isLoading = signal(false); //đánh dấu đang trong quá trình loading

  constructor(private dialog: MatDialog, public dishService: DishService) {}

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;

    const atBottom =
      element.scrollHeight - element.scrollTop <= element.clientHeight + 50;

    if (atBottom && !this.isLoading() && !this.dishService.reachedEndOfList()) {
      console.log('scroll');
      this.loadMore(); // gọi hàm load thêm món ăn
    }
  }

  loadMore() {
    this.isLoading.set(true);
    this.dishService.loadMore();
    this.isLoading.set(false);
  }

  onDishSelected(dish: any) {
    this.dialog.open(DishDialogComponent, {
      data: dish,
      width: '100vw', // full chiều rộng màn hình
      height: '100vh', // full chiều cao màn hình
      maxWidth: '100vw', // tránh bị giới hạn chiều rộng
      panelClass: 'full-screen-dialog', // class tùy chỉnh
      autoFocus: false, // tránh tự scroll
    });
  }
}
