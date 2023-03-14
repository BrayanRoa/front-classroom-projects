import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeOneProjectComponent } from './see-one-project.component';

describe('SeeOneProjectComponent', () => {
  let component: SeeOneProjectComponent;
  let fixture: ComponentFixture<SeeOneProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeOneProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeOneProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
