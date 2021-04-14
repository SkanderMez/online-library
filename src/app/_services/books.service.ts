import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_API, PRODUCTS, USER} from '../_globals/vars';

@Injectable({providedIn: 'root'})
export class BooksService {
  constructor(private http: HttpClient) {
  }

  getAllBooks() {
    return this.http.get(BASE_API + PRODUCTS);

  }

  addBook(book: any) {
    return this.http.post(BASE_API + PRODUCTS , book);
  }
}
