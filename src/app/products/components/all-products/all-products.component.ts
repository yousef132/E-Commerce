import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent implements OnInit {
  products: any;
  categories: any;
  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.products = data;
      },
      error: (error) => {
        alert('Error While Requesting Data');
      },
    });
  }

  getCategories() {
    this.productsService.getAllCategories().subscribe({
      next: (data) => {
        console.log(data);
        this.categories = data;
      },
      error: (error) => {
        alert('Error While Requesting Data');
      },
    });
  }

  getProductsByCategory(category: any) {
    this.productsService.filterByCategory(category.target.value).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        alert('Error While Requesting Data');
      },
    });
  }
  filter(category: any) {
    if (category.target.value === 'ALL') this.getProducts();
    else this.getProductsByCategory(category);
  }
}
