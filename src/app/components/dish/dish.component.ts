import {
  Component,
  effect,
  ElementRef,
  Input,
  signal,
  SimpleChanges,
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
  //lấy giá trị selectedCategory từ cha
  @Input() selectedCategory: number = -1;

  //lấy giá trị tham chiếu đến DOM
  @ViewChild('dishContainer', { static: true }) dishContainer!: ElementRef;

  limit: number = 6;
  currentPage = signal(0); //số trang hiện tại
  isLoading = signal(false); //đánh dấu đang trong quá trình loading
  reachedEndOfList = signal(false); //đánh dấu đang ở cuối danh sách

  constructor(private dialog: MatDialog, public dishService: DishService) {
  }

  ngOnInit() {
    this.loadMore();
  }

  ngOnChanges(changes: SimpleChanges) {
    //lọc khi dishList hoặc selectedCategory có thay đổi
    if (
      changes['selectedCategory'] &&
      !changes['selectedCategory'].firstChange
    ) {
      this.resetAndLoadDishes(); //gọi khi selectedCategory thay đổi
    }
  }

  resetAndLoadDishes() {
    this.currentPage.set(0);
    this.reachedEndOfList.set(false);
    this.dishContainer.nativeElement.scrollTop = 0; // scroll về đầu
    this.loadMore();
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;

    const atBottom =
      element.scrollHeight - element.scrollTop <= element.clientHeight + 50;

    if (atBottom && !this.isLoading() && !this.reachedEndOfList()) {
      console.log("scroll")
      this.loadMore(); // gọi hàm load thêm món ăn
    }
  }

  async loadMore() {
    this.isLoading.set(true);

    try {
      const start = this.currentPage() * this.limit;
      if (this.selectedCategory === -1) {
        await this.dishService.getDishesByStartIndex(start, this.limit);
      } else {
        await this.dishService.getDishByCategoryId(
          this.selectedCategory,
          start,
          this.limit
        );
      }

      // nếu service.dishes() trả về ít hơn limit => end
      if ( this.dishService.dishes().length < (this.currentPage() + 1) * this.limit) {
        this.reachedEndOfList.set(true);
      } else {
        this.currentPage.update((n) => n + 1);
      }
    } finally {
      this.isLoading.set(false);
    }
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
