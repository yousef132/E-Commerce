import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly productsUrl = 'https://fakestoreapi.com/products';
  private readonly categoriesUrl = 'https://fakestoreapi.com/products/categories';
  private readonly filterWithCategoryUrl = 'https://fakestoreapi.com/products/category/';
  constructor(private http: HttpClient) {}
  getAllProducts() {
    return this.http.get(this.productsUrl);
  }
  getAllCategories() {
    return this.http.get(this.categoriesUrl);
  }

  filterByCategory(category: any) {
    return this.http.get(this.filterWithCategoryUrl + category);
  }

  getProducttById(id:any){
    return this.http.get(this.productsUrl + '/' + id);
  }
}
