import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaterogyComponent } from './caterogy.component';

describe('CaterogyComponent', () => {
  let component: CaterogyComponent;
  let fixture: ComponentFixture<CaterogyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaterogyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaterogyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
