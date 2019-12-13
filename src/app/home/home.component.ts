import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit, AfterViewInit, AfterViewInit {

  myBooks = [];
  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    $('.owl-carousel').each(function() {
      $(this).owlCarousel();
    });

    this.httpClient.get('assets/book-list.json').subscribe(
      (data) => {
      console.log(data);
      let i;
      for (i = 0; i < data.books.length; i++) {
          this.myBooks.push(data.books[i]);
        }},
      (error) => {
        console.log(error);
      });
  }

  ngAfterViewInit(): void {
    $('.owl-carousel').each(function() {
      $(this).owlCarousel();
    });
  }
  redirect() {
    this.router.navigate(['/list-books']);
  }
}
