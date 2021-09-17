import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeLoaderComponent } from './stripe-loader.component';

describe('StripeLoaderComponent', () => {
  let component: StripeLoaderComponent;
  let fixture: ComponentFixture<StripeLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripeLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
