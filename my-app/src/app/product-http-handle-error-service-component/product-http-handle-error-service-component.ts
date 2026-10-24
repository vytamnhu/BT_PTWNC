import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../classes/IProduct';
import { ProductHttpHandleErrorService } from '../services/product-http-handle-error-service';

@Component({
  selector: 'app-product-http-handle-error-service-component',
  standalone: false,
  templateUrl: './product-http-handle-error-service-component.html',
  styleUrl: './product-http-handle-error-service-component.css',
})
export class ProductHttpHandleErrorServiceComponent implements OnInit {
  products = signal<Product[]>([]);
  errMessage = signal<string>('');

  constructor(private _service: ProductHttpHandleErrorService) {}

  ngOnInit(): void {
    this._service.getProductList().subscribe({
      next: (data: Product[]) => {
        this.products.set(data);
        this.errMessage.set('');
      },
      error: (err: Error) => {
        this.errMessage.set(err.message);
      }
    });
  }
}