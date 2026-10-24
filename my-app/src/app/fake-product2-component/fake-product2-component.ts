import { Component, OnInit, inject } from '@angular/core';
import { FakeProduct2Service } from '../services/fake-product2-service';

@Component({
  selector: 'app-fake-product2-component',
  standalone: false,
  styleUrl: './fake-product2-component.css',
  templateUrl: './fake-product2-component.html',
})
export class FakeProduct2Component implements OnInit {
  data: any[] = [];
  errMessage: string = '';

  private productService = inject(FakeProduct2Service);

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        console.log('Dữ liệu API nhận được:', res); // Log kiểm tra
        this.data = res;
      },
      error: (err: any) => {
        console.error('Lỗi khi gọi API:', err);
        this.errMessage = err.message || 'Đã xảy ra lỗi khi tải dữ liệu!';
      }
    });
  }
}