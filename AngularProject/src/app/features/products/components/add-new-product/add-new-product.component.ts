import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsListService } from 'src/app/core/services/products-list.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css'],
})
export class AddNewProductComponent implements OnInit {

  productForm!: FormGroup

  constructor(
    private productsService: ProductsListService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
   this.productForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      category: [""],
      price: [0]
    })
  }

  async save() {
   await this.productsService.addNewProduct(this.productForm.value).toPromise()
   this.router.navigate(["/", "products", "list"])
  }
}
