import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeProductService {
  private http = inject(HttpClient);

  getFakeProductData(): Observable<any> {
    return this.http.get('https://fakestoreapi.com/products');
  }
}