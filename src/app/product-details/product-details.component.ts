import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productDetails: undefined | product
  productQuanity: number = 1;
  removeCart = false;
  cartData:product|undefined
  constructor(private activateRoute: ActivatedRoute, private product: ProductService, private user:UserService) { }

  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productDetails = result;
      let cartData = localStorage.getItem('localCart')
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: product) => productId === item.id.toString())
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
        
      }
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result) => {
          let items = result.filter((items:product)=> productId?.toString() === items.productId?.toString());
          if(items.length){
            this.cartData=items[0]
            this.removeCart=true;
          }
      })
  }
})
  }
  handleQuantity(val: string) {
    if (this.productQuanity < 20 && val === 'plus') {
      this.productQuanity += 1;
    }
    else if (this.productQuanity > 1 && val === 'min') {
      this.productQuanity -= 1;
    }
  }
  addToCart() {
    if (this.productDetails) {
      this.productDetails.quantity = this.productQuanity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productDetails)
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productDetails,
          productId: this.productDetails.id,
          userId
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true
          }
        })
      }
    }
  }
  removeToCart(productId: number){
    let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
    if(!localStorage.getItem('user')){
    this.product.removeItemFromCart(productId)
    
  }else{
    this.cartData && this.product.removeToCart(this.cartData.id).subscribe(()=>{
      this.product.getCartList(userId)
    })
  }
  this.removeCart = false;
  }


}
