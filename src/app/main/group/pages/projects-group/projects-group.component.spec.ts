import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsGroupComponent } from './projects-group.component';

describe('ProjectsGroupComponent', () => {
  let component: ProjectsGroupComponent;
  let fixture: ComponentFixture<ProjectsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
