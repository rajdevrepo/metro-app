import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();

  show() {
    this.loadingSubject.next(true); 
  }

  hide() {
    //this.loadingSubject.next(false);
    setTimeout(() => {
      this.loadingSubject.next(false);
    }, 900);
  }
}
