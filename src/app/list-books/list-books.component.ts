import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CartService} from '../cart.service';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {BooksService} from '../_services/books.service';
import {BASE_API, PICTURES} from '../_globals/vars';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {


  myBooks = [];
  connected: boolean;
  BASE_API = BASE_API;
  PICTURES = PICTURES;

  constructor(private http: HttpClient,
              private cartService: CartService,
              private router: Router,
              private notifierService: NotifierService,
              private booksService: BooksService) {

  }
  getAllBooks() {
    this.booksService.getAllBooks().subscribe(
      (books: any) => {
        this.myBooks = books;
        console.log(BASE_API + PICTURES + this.myBooks[61].fileStorageProperties.uploadDir);
      }, (error) => {
        console.log(error);
      }, () => {
      }
    );
  }

  ngOnInit() {
    this.getAllBooks();
  }


  addToShoppingBag(book: any) {
    if (localStorage.getItem('currentUser') === null) {
      this.router.navigate(['/sign-in']);

    } else {
      this.connected = true;
    }
    this.cartService.addToCart(book , 1 , book.price);

    this.notifierService.show({
      type: 'success',
      message: 'Book added successfully to your shopping bag',
      id: book.id // Again, this is optional
    });
  }


}
