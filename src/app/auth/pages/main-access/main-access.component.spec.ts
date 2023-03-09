import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAccessComponent } from './main-access.component';

describe('MainAccessComponent', () => {
  let component: MainAccessComponent;
  let fixture: ComponentFixture<MainAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
