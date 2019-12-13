import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }

  getAllBooks() {
    this.httpClient.get('assets/book-list.json').subscribe(
      (data) => {
      return data.books;
      },
      (error) => {
        console.log(error);
      });
  }
}
