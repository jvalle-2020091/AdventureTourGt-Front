import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPlacesComponent } from './category-places.component';

describe('CategoryPlacesComponent', () => {
  let component: CategoryPlacesComponent;
  let fixture: ComponentFixture<CategoryPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPlacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
