import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CartService} from '../cart.service';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {


  myBooks = [];
  connected: boolean;
  constructor(private http: HttpClient,
              private cartService: CartService,
              private router: Router,
              private notifierService: NotifierService) {
  }

  ngOnInit() {
    this.http.get('assets/book-list.json').subscribe(
      (data) => {
        console.log(data);
        let i;
        for (i = 0; i < data.books.length; i++) {
          this.myBooks.push(data.books[i]);
        }
      },
      (error) => {
        console.log(error);
      });
  }

  addToShoppingBag(book: any) {
    if (localStorage.getItem('user') === null) {
      this.router.navigate(['/sign-in']);

    } else {
      this.connected = true;
    }
    this.cartService.addToCart(book , book.quantity , book.price);

    this.notifierService.show({
      type: 'success',
      message: 'Book added successfully to your shopping bag',
      id: book.id // Again, this is optional
    });
  }


}
