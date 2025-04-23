import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dish-item',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './dish-item.component.html',
  styleUrl: './dish-item.component.css'
})
export class DishItemComponent {
  @Input() dish: any;
}
