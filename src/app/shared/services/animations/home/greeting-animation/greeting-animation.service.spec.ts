import { TestBed } from '@angular/core/testing';

import { GreetingAnimationService } from './greeting-animation.service';

describe('AnimationService', () => {
  let service: GreetingAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GreetingAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
