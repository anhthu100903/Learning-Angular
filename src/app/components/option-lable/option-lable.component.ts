import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-option-lable',
  imports: [CurrencyPipe],
  templateUrl: './option-lable.component.html',
  styleUrl: './option-lable.component.css'
})
export class OptionLableComponent {
  @Input() title: string = '';
  @Input() price: string = '';

}
