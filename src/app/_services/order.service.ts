import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_API, ORDER, USER} from '../_globals/vars';

@Injectable({providedIn: 'root'})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  getAllOrders() {
    return this.http.get(BASE_API + ORDER);
  }

  addOrder(order: any) {
    return this.http.post(BASE_API + ORDER, order);
  }

}
