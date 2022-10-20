import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {FormBuilder} from "@angular/forms"
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchFormControl!: FormControl;

  constructor(private formBuilder: FormBuilder, private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchFormControl = this.formBuilder.control(this.searchFormControl)
  }

  saveText() {
    this.searchService.getText(this.searchFormControl.value)
  }

}
