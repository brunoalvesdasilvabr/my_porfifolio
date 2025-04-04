import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _isTranslating = new BehaviorSubject<boolean>(false);
  isTranslating$ = this._isTranslating.asObservable();
  constructor() {}

  setIsTranslating() {
    this._isTranslating.next(true);
  }
}
