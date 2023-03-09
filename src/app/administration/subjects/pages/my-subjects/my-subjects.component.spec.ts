import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySubjectsComponent } from './my-subjects.component';

describe('MySubjectsComponent', () => {
  let component: MySubjectsComponent;
  let fixture: ComponentFixture<MySubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySubjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
