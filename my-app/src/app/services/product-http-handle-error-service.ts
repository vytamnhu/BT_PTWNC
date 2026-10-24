import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Product } from '../classes/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductHttpHandleErrorService {
  private _url: string = '/datasets/product.json';

  constructor(private _http: HttpClient) {}

  // Lấy danh sách toàn bộ sản phẩm
  getProductList(): Observable<Product[]> {
    return this._http.get<Product[]>(this._url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // Tìm sản phẩm theo ID từ file JSON
  getProductById(id: number): Observable<Product | undefined> {
    return this.getProductList().pipe(
      map((products: Product[]) => products.find((p) => p.id === id)),
      catchError(this.handleError)
    );
  }

  // Xử lý lỗi tập trung
  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(error.message || 'Lỗi tải dữ liệu sản phẩm'));
  }
}