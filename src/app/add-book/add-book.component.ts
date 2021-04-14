import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';
import {BooksService} from '../_services/books.service';
import {NotifierService} from 'angular-notifier';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {


  file = null;
  loading = false;
  avatarUrl: string;
  productForm: FormGroup;

  constructor(private msg: NzMessageService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private booksService: BooksService,
              private notifierService: NotifierService
  ) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      file: ['', Validators.required],
    });
  }

  get f() {
    return this.productForm.controls;
  }
  onSubmit() {
    let body = new FormData();
    // Add file content to prepare the request
    body.append('file', this.file);
    body.append('price', this.f.price.value);
    body.append('description', this.f.description.value);
    body.append('name', this.f.name.value);
    this.booksService.addBook(body)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);

        },
        error => {
          this.notifierService.show({
            type: 'error',
            message: 'Error on adding product',
          });

        }, () => {
          this.notifierService.show({
            type: 'success',
            message: 'Product added successfully',
          });
        });
  }

  updateFileVar($event) {
    const target = event.target as HTMLInputElement;
    this.file = (target.files as FileList)[0];
  }
}
