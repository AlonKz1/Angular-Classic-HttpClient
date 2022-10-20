import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms"



@NgModule({
  declarations: [
    SearchComponent,
  ],
  exports: [SearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class SharedModule { }
