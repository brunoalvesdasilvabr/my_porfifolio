import { TestBed } from '@angular/core/testing';

import { ProjectBoxAnimationService } from './project-box-animation.service';

describe('ProjectBoxAnimationService', () => {
  let service: ProjectBoxAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectBoxAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
