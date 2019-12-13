import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service';
import {BookService} from '../book.service';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.css']
})
export class ShoppingBagComponent implements OnInit {

  empty = true;
  myBooks = [];

  constructor(private cartService: CartService,
              private bookService: BookService) { }

  ngOnInit() {
    this.empty = true;
    if (JSON.parse(sessionStorage.getItem('cart')).length == 0){
      this.empty = true;
    } else {
      this.empty = false;
    }

    let i;
    for (i = 0; i < JSON.parse(sessionStorage.getItem('cart')).length ; i++) {

      this.myBooks.push( JSON.parse(sessionStorage.getItem('cart'))[i].product);
    }

  }


  removeBook(index: number) {
    this.myBooks.splice(index,1);
    sessionStorage.setItem('cart', '');
    let i;
    for (i = 0; i < this.myBooks.length; i++) {
      this.cartService.addToCart(this.myBooks[i], this.myBooks[i].quantity, this.myBooks[i].price);
    }
  }
}
