import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyShoppingBagComponent } from './empty-shopping-bag.component';

describe('EmptyShoppingBagComponent', () => {
  let component: EmptyShoppingBagComponent;
  let fixture: ComponentFixture<EmptyShoppingBagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyShoppingBagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyShoppingBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
