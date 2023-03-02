import { TestBed } from '@angular/core/testing';

import { GroupPersonService } from './group-person.service';

describe('GroupPersonService', () => {
  let service: GroupPersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupPersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
