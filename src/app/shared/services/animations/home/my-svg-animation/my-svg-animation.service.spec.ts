import { TestBed } from '@angular/core/testing';

import { MySvgAnimationService } from './my-svg-animation.service';

describe('MySvgAnimationService', () => {
  let service: MySvgAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MySvgAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
