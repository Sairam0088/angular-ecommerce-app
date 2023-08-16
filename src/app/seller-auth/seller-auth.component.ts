import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  constructor(private seller:SellerService, private router:Router){}

  showLogin=false
  authError=""

  ngOnInit():void{
    this.seller.reloadSeller()
  }
  signUp(data:SignUp):void{
    this.seller.userSignUp(data)
  }

  login(data:SignUp):void{
    this.authError=""
    this.seller.userLogin(data)
    this.seller.isLogginError.subscribe((error)=>{
      if(error){
        this.authError="Email or Password is incorrect"
      }
    })
  }

  openLogin(){
    this.showLogin=true
  }
  openSignUp(){
    this.showLogin=false
  }

}
