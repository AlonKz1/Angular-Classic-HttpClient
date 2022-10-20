import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsListService {
  private serverUrl = environment.serverUrl;

  getAllProducts(): Observable<Product[]> | null {
    const result = this.httpClient.get<Product[]>(`${this.serverUrl}products`);
    return result;
  }

  deleteProduct(id: number): Observable<any> | null {
    console.log(id);
    const result = this.httpClient.delete<any>(
      `http://localhost:3000/products/${id}`
    );
    return result;
  }

  getProductById(id: number): Observable<Product> {
    console.log(id);
    const result = this.httpClient.get<Product>(
      `${this.serverUrl}products/${id}`
    );
    console.log(result);
    return result;
  }

  UpdateProduct(p: Product): Observable<Product> {
    console.log(p.id);
    const id = p.id
    // const id = p.id.toString()
    const result = this.httpClient.put<Product>(
      `http://localhost:3000/products/${id}`, p
    );
    return result;
  }

  addNewProduct(p: Product) {
    return this.httpClient.post<Product>(`${this.serverUrl}products`, p)
  }

  getProductsByCategory(category: string) {
    const result = this.httpClient.get<Product[]>(`${this.serverUrl}products/category/${category}`);
    return result
  }

  productsListSubject = new BehaviorSubject<Product[]>([]);

  get productsList$() {
    return this.productsListSubject.asObservable();
  }

  constructor(private httpClient: HttpClient) {}
}
