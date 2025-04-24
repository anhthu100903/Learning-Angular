import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  imports: [],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent {
  @Input() rating: number = 0;            // giá trị sao đã chọn (từ 1-5)
  @Output() ratingChange = new EventEmitter<number>(); // gửi giá trị ngược về parent

  setRating(value: number) {
    this.rating = value;
    console.log(this.rating)
    this.ratingChange.emit(this.rating);  // gửi giá trị về component cha
  }
}
