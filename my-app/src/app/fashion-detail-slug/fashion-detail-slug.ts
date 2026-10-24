import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FashionAPIService } from '../services/fashion-apiservice';
import { Fashion } from '../classes/Fashion';

@Component({
  selector: 'app-fashion-detail-slug',
  standalone: false,
  templateUrl: './fashion-detail-slug.html',
  styleUrl: './fashion-detail-slug.css'
})
export class FashionDetailSlugComponent implements OnInit {
  // Dùng Signal quản lý dữ liệu nhận về
  fashion = signal<Fashion | null>(null);
  errorMessage = signal<string>('');

  constructor(
    private route: ActivatedRoute,       // Dùng để lấy tham số trên URL
    private _service: FashionAPIService // Dùng để gọi API Backend
  ) {}

  ngOnInit(): void {
    // Đọc tham số 'slug' từ đường dẫn URL
    this.route.paramMap.subscribe(params => {
      const slugParam = params.get('slug');
      if (slugParam) {
        this.fetchDataBySlug(slugParam);
      }
    });
  }

  fetchDataBySlug(slug: string) {
    this._service.getFashionBySlug(slug).subscribe({
      next: (data) => {
        // Ep kiểu dữ liệu trả về sang Object Fashion
        const fashionObj = Object.assign(new Fashion(), data);
        this.fashion.set(fashionObj);
      },
      error: (err) => this.errorMessage.set(err.message || 'Lỗi không thể lấy dữ liệu!')
    });
  }
}