import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
    this.displayCartSubject = new BehaviorSubject<boolean>(false);
    this.displayCartObservable = this.displayCartSubject.asObservable();
    if (!sessionStorage.getItem('cart')) {
      sessionStorage.setItem('cart', JSON.stringify([]));
    }
    this.cartItemsSubject = new BehaviorSubject<any[]>(JSON.parse(sessionStorage.getItem('cart')));
    this.cartItemsObservable = this.cartItemsSubject.asObservable();
    CartService.shippingFees = 6;
  }

  static shippingFees;


  displayCartSubject: BehaviorSubject<boolean>;
  displayCartObservable: Observable<boolean>;
  cartItemsSubject: BehaviorSubject<any[]>;
  cartItemsObservable: Observable<any[]>;

  private static checkItemInCart(item: any, cartItems: any[]) {
    for (let i = 0; i < cartItems.length; i++) {
      if (item.id === cartItems[i].product.id) {
        return i;
      }
    }
    return -1;
  }

  static countCartElements(cartItems: any[]) {
    let nb = 0;
    for (const cartItem of cartItems) {
      nb += cartItem.quantity;
    }
    return nb;
  }

  static calculateSubTotal(cartItems) {
    let subTotal = 0;
    for (const item of cartItems) {
      subTotal += item.quantity * item.price;
    }
    return parseFloat(subTotal.toFixed(3));
  }

  addToCart(product: any, quantity: number, price: number) {
    let cartItems = JSON.parse(sessionStorage.getItem('cart'));
    if (!cartItems) {
      cartItems = [];
    }
    const itemInCart = CartService.checkItemInCart(product, cartItems);
    if (itemInCart >= 0) {
      cartItems[itemInCart].quantity += quantity;
    } else {
      cartItems.push({
        product,
        quantity,
        price
      });
    }
    this.updateCart(cartItems);
  }

  removeFromCart(index: number) {
    const cartItems = JSON.parse(sessionStorage.getItem('cart'));

    cartItems.splice(index, 1);
    this.updateCart(cartItems);
  }

  updateCart(cartItems: any[]) {
    sessionStorage.removeItem('cart');
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
    this.cartItemsSubject.next(cartItems);

  }

  hideCart() {
    this.displayCartSubject.next(false);
  }

  displayCart() {
    console.log('cart');
    setTimeout(() => {
      this.displayCartSubject.next(true);
    }, 10);
  }


}


