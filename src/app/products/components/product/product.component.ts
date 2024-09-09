import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product:any;
  @Output() event = new EventEmitter();
  addButton:boolean = false;
  quantity:any=0;
  add(){
    this.event.emit({item:this.product,quantity:this.quantity});
    this.quantity = "";
  }
}
