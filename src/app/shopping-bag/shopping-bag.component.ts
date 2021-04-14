import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service';
import {BookService} from '../book.service';
import {BASE_API, PICTURES} from '../_globals/vars';
import {OrderService} from '../_services/order.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.css']
})
export class ShoppingBagComponent implements OnInit {

  empty = true;
  myBooks = [];
  BASE_API = BASE_API;
  PICTURES = PICTURES;

  constructor(private cartService: CartService,
              private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.empty = true;
    if (JSON.parse(sessionStorage.getItem('cart')).length === 0) {
      this.empty = true;
    } else {
      this.empty = false;
    }

    let i;
    for (i = 0; i < JSON.parse(sessionStorage.getItem('cart')).length ; i++) {

      this.myBooks.push( JSON.parse(sessionStorage.getItem('cart'))[i]);
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

  submitOrder() {
    console.log(this.myBooks);
    this.orderService.addOrder(this.myBooks).subscribe(
      (data: any) => {
        console.log(data);
      },
      () => {},
      () => {
        sessionStorage.removeItem('cart');
        this.router.navigate(['/orders-list']);
      }
    );
  }
}
