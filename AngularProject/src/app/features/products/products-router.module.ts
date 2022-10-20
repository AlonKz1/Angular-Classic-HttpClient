import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ProductsHomeComponent } from './components/products-home/products-home.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

const routes: Routes = [
  {path: '', component: ProductsHomeComponent, children: [
    {path: "list", component: ProductsListComponent},
    {path: "edit/:id", component: EditProductComponent},
    {path: "add", component: AddNewProductComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
