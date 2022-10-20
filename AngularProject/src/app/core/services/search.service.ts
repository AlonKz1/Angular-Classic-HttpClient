import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchText = new BehaviorSubject("")

  get searchText$() {
    return this.searchText.asObservable()
  }

  getText(txt: string) {
    console.log(txt)
    this.searchText.next(txt)
  }

  constructor() { }
}
