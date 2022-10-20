import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductsListService } from 'src/app/core/services/products-list.service';
import { map, filter, switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  editProductForm!: FormGroup;
  updatedProductSubject = new BehaviorSubject<Product | null>(null);
  id: any;

  get updatedProduct$() {
    return this.updatedProductSubject.asObservable()
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsListService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map((p) => p['id']),
        filter((p) => p),
        switchMap((id) => this.productService.getProductById(id))
      )
      .subscribe((o) => {
        console.log(o);
        this.buildForm(o);
      });
  }

  buildForm(p: Product) {
    this.editProductForm = this.formBuilder.group({
      id: [p.id],
      name: [p.name, [Validators.required]],
      category: [p.category],
      price: [p.price],
    });
  }

  async save() {
    try {
      console.log('save');
      await this.productService
        .UpdateProduct(this.editProductForm.value)
        .toPromise();
      this.updatedProductSubject.next(this.editProductForm.value);
    } catch (err) {
      console.log(err);
    }
  }
}
