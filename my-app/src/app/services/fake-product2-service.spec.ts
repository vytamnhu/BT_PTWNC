import { TestBed } from '@angular/core/testing';
import { FakeProduct2Service } from './fake-product2-service';

describe('FakeProduct2Service', () => {
  let service: FakeProduct2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeProduct2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
