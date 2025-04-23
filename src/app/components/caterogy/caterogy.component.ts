import { Component, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-caterogy',
  imports: [FontAwesomeModule ],
  templateUrl: './caterogy.component.html',
  styleUrl: './caterogy.component.css'
})
export class CaterogyComponent {
  @Output() categoryChange = new EventEmitter<{category: string}>();

  onCategoryChange(type: string) {
    console.log(type);
    this.categoryChange.emit({ category: type });
  }
}
