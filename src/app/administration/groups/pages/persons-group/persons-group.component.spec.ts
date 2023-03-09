import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsGroupComponent } from './persons-group.component';

describe('PersonsGroupComponent', () => {
  let component: PersonsGroupComponent;
  let fixture: ComponentFixture<PersonsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonsGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
