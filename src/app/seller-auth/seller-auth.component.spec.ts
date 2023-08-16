import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAuthComponent } from './seller-auth.component';

describe('SellerAuthComponent', () => {
  let component: SellerAuthComponent;
  let fixture: ComponentFixture<SellerAuthComponent>;

  let showLogin=false

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerAuthComponent]
    });
    fixture = TestBed.createComponent(SellerAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
