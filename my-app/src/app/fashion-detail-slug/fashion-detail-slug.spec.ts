import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FashionDetailSlug } from './fashion-detail-slug';

describe('FashionDetailSlug', () => {
  let component: FashionDetailSlug;
  let fixture: ComponentFixture<FashionDetailSlug>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FashionDetailSlug],
    }).compileComponents();

    fixture = TestBed.createComponent(FashionDetailSlug);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
