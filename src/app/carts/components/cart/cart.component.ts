import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../products/services/products.service';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [ProductsService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  products: any;
  cartProducts: any[]=[];
  totalAmount: number = 0;
  orderCreated:boolean = false;
  constructor( private cartsService:CartsService) {

  }
  ngOnInit(): void {
    this.getCartProducts();
    this.calculateTotalAmount();
    console.log(this.totalAmount);
  }
  getCartProducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
  }
  calculateTotalAmount(): void {
    for (let x in this.cartProducts) {
      this.totalAmount +=
        this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  decreaseQuantity(index: any) {
    if (this.cartProducts[index].quantity == 1) {
      this.removeFromCart(index);
      return;
    }else {
      this.cartProducts[index].quantity--;
      this.calculateTotalAmount();
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
  increaseQuantity(index: any) {
    this.cartProducts[index].quantity++;
    this.calculateTotalAmount();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  clearCart() {
    this.cartProducts = [];
    this.calculateTotalAmount();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  updateQuantity(index: number, amount: any) {

    if(parseInt(amount) < 0){
      alert('Quantity cannot be less than  0');
      amount = 1000;
      return;
    }
    console.log(typeof amount);
    console.log('---');
    this.cartProducts[index].quantity = amount;
    this.calculateTotalAmount();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  removeFromCart(index: any) {
    this.cartProducts.splice(index, 1);
    this.calculateTotalAmount();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  orderNow() {
    console.log("hello");
    let order = {
      userId: 5,
      date: new Date(),
      products: this.cartProducts.map(function(item,index){
        return {
          productId: item.item.id,
          quantity: item.quantity
        }
      }),
    };
    console.log(order);
    this.cartsService.createOrder(order).subscribe({
      next: (res)=>{
        this.orderCreated = true;
        this.cartProducts = [];
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      },
      error: (err)=>{
        alert(err.error.message);
      }
    })



  }
}
