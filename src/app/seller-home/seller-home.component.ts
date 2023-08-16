import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {

  productList: undefined | product[];
  deleteMessage: undefined | string;
  deleteButton=faTrash;
  updateButton=faEdit;
  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.list()
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.deleteMessage = "Product is deleted successfully"
        this.list()
      }

    })
    setTimeout(() => {
      this.deleteMessage = undefined
    }, 3000);

  }

  list() {
    this.product.productList().subscribe((result) => {
      console.warn(result)
      if (result) {
        this.productList = result;
      }
    });
  }

}
