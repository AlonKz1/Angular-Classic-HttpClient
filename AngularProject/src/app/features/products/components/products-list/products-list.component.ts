import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductsListService } from 'src/app/core/services/products-list.service';
import { SearchService } from 'src/app/core/services/search.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  constructor(
    private searchService: SearchService,
    private productsService: ProductsListService,
    private formBuilder: FormBuilder
  ) {}

  searchResult: string = '';
  productsList!: Product[];
  categoryForm!: FormControl
  valueSelected!: string | null

  ngOnInit(): void {
    this.searchService.searchText$.subscribe((t) => {
      console.log(t);
      this.searchResult = t;
    });
    if(this.valueSelected) this.chooseCategory(this.valueSelected)

    this.reloadProducts();
  }

  ngOnDestroy(): void {
    this.valueSelected = null
  }

  reloadProducts() {
    console.log("hello")
    this.productsService.getAllProducts()?.subscribe((list) => {
      this.productsList = list
    });
  }

  async deleteProduct(id: number) {
    try {
      await this.productsService.deleteProduct(id)?.toPromise();
      alert('Deleted');
      this.reloadProducts();
    } catch(err) {
      console.log(err)
      alert('Cannot Delete Product');
    }
  }

  async chooseCategory(category: string) {
    console.log(category)
    try{
      await this.productsService.getProductsByCategory(this.valueSelected!).subscribe(results => {
        this.productsList = results
      })
    }catch(err) {
      console.log(err)
    }
  }

  getAllProducts(){
    this.valueSelected = null
    this.reloadProducts();
  }
 }
