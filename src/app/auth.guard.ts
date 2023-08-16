import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SellerService } from './services/seller.service';
import { Observable } from 'rxjs';
import { state } from '@angular/animations';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private sellerService:SellerService){}
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    if(localStorage.getItem('seller')) {
      return true
    }
  return this.sellerService.isSellerLoggedIn;
}}
