import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsHomeComponent } from './components/products-home/products-home.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';
import { RouterModule } from '@angular/router';
import { ProductRoutingModule } from './products-router.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductsHomeComponent,
    ProductsListComponent,
    AddNewProductComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProductRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
