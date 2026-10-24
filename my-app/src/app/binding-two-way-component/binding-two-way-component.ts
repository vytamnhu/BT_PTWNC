// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-binding-two-way-component',
// //   standalone: false,
// //   styleUrl: './binding-two-way-component.css',
// //   templateUrl: './binding-two-way-component.html',
// // })
// // export class BindingTwoWayComponent {
// //   public hsa: number = 0;
// //   public hsb: number = 0;
// //   public hsc: number = 0;
// //   public ketqua: string = '';
// //   giaiPt2() {
// //     if (this.hsa == 0) {
// //       if (this.hsb == 0 && this.hsc == 0) {
// //         this.ketqua = "PT vo so nghiem";
// //       }
// //       else if (this.hsc != 0) { this.ketqua = "PT vo nghiem" }
// //       else { this.ketqua = "x=" + (this.hsc / this.hsb) }
// //     }
// //     else {
// //       let delta = Math.pow(this.hsb, 2)
// //     } -4 * this.hsa * this.hsc
// //     if (delta < 0) {
// //       this.ketqua = "PT bac 2 vo nghiem"
// //     }
// //     else if (delta == 0) {
// //       this.ketqua = "PT co nghiem kep x1=x2=" + (-this.hsb / (2 * this.hsa))
// //     }
// //     else {
// //       let x1 = (-this.hsb - Math.sqrt(delta)) / (2 * this.hsa)
// //       let x1 = (-this.hsb + Math.sqrt(delta)) / (2 * this.hsa)
// //       this.ketqua = "x1="+x1+"\n"x2="+x2
// //     }
// //   }

// // }
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-binding-two-way-component',
//   standalone: false,
//   styleUrl: './binding-two-way-component.css',
//   templateUrl: './binding-two-way-component.html',
// })
// export class BindingTwoWayComponent { // <-- Bắt buộc phải có từ khóa "export"
//   public hsa: number = 0;
//   public hsb: number = 0;
//   public hsc: number = 0;
//   public ketqua: string = '';

//   giaiPt2(): void {
//     // Logic xử lý phương trình
//   }
// }


import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Bắt buộc khi dùng [(ngModel)]

@Component({
  selector: 'app-binding-two-way-component',
  standalone: true, // Hoặc false tùy dự án của bạn
  imports: [FormsModule], // Thêm FormsModule vào đây
  templateUrl: './binding-two-way-component.html',
  styleUrl: './binding-two-way-component.css'
})
export class BindingTwowayComponent {
  hsa: number = 0;
  hsb: number = 0;
  hsc: number = 0;
  ketQua: string = '';

  giaiPt2(): void {
    const a = Number(this.hsa);
    const b = Number(this.hsb);
    const c = Number(this.hsc);

    if (a === 0) {
      if (b === 0) {
        this.ketQua = c === 0 ? 'Phương trình vô số nghiệm' : 'Phương trình vô nghiệm';
      } else {
        this.ketQua = `Phương trình có 1 nghiệm: x = ${-c / b}`;
      }
      return;
    }

    const delta = b * b - 4 * a * c;
    if (delta < 0) {
      this.ketQua = 'Phương trình vô nghiệm';
    } else if (delta === 0) {
      const x = -b / (2 * a);
      this.ketQua = `Phương trình có nghiệm kép: x1 = x2 = ${x}`;
    } else {
      const x1 = (-b + Math.sqrt(delta)) / (2 * a);
      const x2 = (-b - Math.sqrt(delta)) / (2 * a);
      this.ketQua = `Phương trình có 2 nghiệm phân biệt: x1 = ${x1}, x2 = ${x2}`;
    }
  }

  ptMoi(): void {
    this.hsa = 0;
    this.hsb = 0;
    this.hsc = 0;
    this.ketQua = '';
  }
}