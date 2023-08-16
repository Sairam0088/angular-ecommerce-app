import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {

  cartItems:cart[]|undefined
  priceSummary:priceSummary={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
}
  constructor(private product:ProductService, private router:Router, private user:UserService) {}

  ngOnInit():void{
    this.loadDetails();
    }
    removeToCart(cartId:number|undefined){    
      cartId && this.product.removeToCart(cartId).subscribe((result)=>{
          this.loadDetails();
        
      })
    }
    checkout(){
      this.router.navigate(['/checkout'])
    }
    loadDetails(){
      this.product.currentCart().subscribe((result)=>{
        this.cartItems=result;
        let price=0;
        result.forEach((item)=>{
          if(item.quantity){
          price=price+(+item.price* +item.quantity)
        }
        })
        this.priceSummary.price=price;
        this.priceSummary.discount=price/10;
        this.priceSummary.tax=price/10;
        this.priceSummary.delivery=100;
        this.priceSummary.total=price+(price/10)+100-(price/10);
        if(!this.cartItems.length){
          this.router.navigate(['/'])
        }
      })
    }
    
  }

