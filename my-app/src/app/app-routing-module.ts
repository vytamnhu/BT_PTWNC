import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list-component/product-list-component';
import { ProductDropdownListComponent } from './product-dropdown-list-component/product-dropdown-list-component';
import { ProductListCallServiceComponent } from './product-list-call-service-component/product-list-call-service-component';
import { ProductListCallHttpServiceComponent } from './product-list-call-http-service-component/product-list-call-http-service-component';
import { ProductDetailComponent } from './product-detail-component/product-detail-component';
import { ProductHttpHandleErrorServiceComponent } from './product-http-handle-error-service-component/product-http-handle-error-service-component';
import { Contact } from './contact/contact';
import { ProductListAdvancedComponent } from './product-list-advanced-component/product-list-advanced-component';
import { ProductListSearchComponent } from './product-list-search-component/product-list-search-component';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';
import { authGuard } from './classes/auth.guard';
import { CourseRegistrationComponent } from './course-registration-component/course-registration-component';
import { LoginComponent } from './login-component/login-component';
import { CourseRegistrationReactiveComponent } from './course-registration-reactive-component/course-registration-reactive-component';
import { FakeProductComponent } from './fake-product-component/fake-product-component';
import { FakeProduct2Component } from './fake-product2-component/fake-product2-component';
import { BooksComponent } from './books-component/books-component';
import { BookDetailComponent } from './book-detail-component/book-detail-component';
import { BookNewComponent } from './book-new-component/book-new-component';
import { BookUpdateComponent } from './book-update-component/book-update-component';
import { BookDeleteComponent } from './book-delete-component/book-delete-component';
import { FashionDetailComponent } from './fashion-detail-component/fashion-detail-component';
import { FashionComponent } from './fashion-component/fashion-component';
import { FashionNewComponent } from './fashion-new-component/fashion-new-component';
import { FashionUpdateComponent } from './fashion-update-component/fashion-update-component';
import { FashionDeleteComponent } from './fashion-delete-component/fashion-delete-component';
import { FashionDetailSlugComponent } from './fashion-detail-slug/fashion-detail-slug';

const routes: Routes = [
  // 1. Mở trang chủ -> tự động chuyển hướng sang /products
  { path: '', redirectTo: 'products', pathMatch: 'full' },

  // 2. Các trang bài học khác
  { path: 'learn-directive', component: ProductListComponent },
  { path: 'learn-directive-2', component: ProductDropdownListComponent },
  { path: 'product-list-call-service', component: ProductListCallServiceComponent },
  { path: 'product-list-call-http-service', component: ProductListCallHttpServiceComponent },

  { path: 'search-products', component: ProductListSearchComponent },

  // 3. Các Route chính
  { path: 'contacts', component: Contact },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products', component: ProductListAdvancedComponent },
  { path: 'course-register', component: CourseRegistrationComponent },
  { path: 'course-reactive-register', component: CourseRegistrationReactiveComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'sample-nested', component: ProductListAdvancedComponent,
    children: [
      { path: 'search-child', component: ProductListSearchComponent },
      { path: 'detail/:id', component: ProductDetailComponent }
    ]
  },
  {
    path: 'lazyinfo',
    loadComponent: () => import('./lazy-component/lazy-component')
      .then(c => c.LazyComponent),
    canActivate: [authGuard]
  },

  { path: 'fakeproducts', component: FakeProductComponent },
  { path: 'fakeproducts2', component: FakeProduct2Component },
  { path: 'book-list', component: BooksComponent },
  { path: 'book-detail', component: BookDetailComponent },
  { path: 'book-new', component: BookNewComponent },
  { path: 'book-update', component: BookUpdateComponent },
  { path: 'book-delete', component: BookDeleteComponent },
  { path: 'fashion-list', component: FashionComponent },
  { path: 'fashion-detail', component: FashionDetailComponent },
  { path: 'fashion-new', component: FashionNewComponent },
  { path: 'fashion-update', component: FashionUpdateComponent },
  { path: 'fashion-delete', component: FashionDeleteComponent },
  { path: 'fashion-detail-slug/:slug', component: FashionDetailSlugComponent },
 // 4. WILDCARD ROUTE: Nhập sai URL -> nhảy về 404 (LUÔN ĐẶT Ở DÒNG CUỐI CÙNG)
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }