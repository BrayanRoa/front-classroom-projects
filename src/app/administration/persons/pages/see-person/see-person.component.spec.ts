import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeePersonComponent } from './see-person.component';

describe('SeePersonComponent', () => {
  let component: SeePersonComponent;
  let fixture: ComponentFixture<SeePersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeePersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
