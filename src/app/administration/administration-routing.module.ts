import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasRoleGuard } from '../auth/guards/has-role.guard';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AllGroupsComponent } from './groups/pages/all-groups/all-groups.component';
import { AllStudentsComponent } from './persons/pages/all-students/all-students.component';
import { AllTeachersComponent } from './persons/pages/all-teachers/all-teachers.component';
import { AllSubjectsComponent } from './subjects/pages/all-subjects/all-subjects.component';
import { MySubjectsComponent } from './subjects/pages/my-subjects/my-subjects.component';
import { SeePersonComponent } from './persons/pages/see-person/see-person.component';
import { PersonsGroupComponent } from './groups/pages/persons-group/persons-group.component';
import { ProjectsGroupComponent } from './groups/pages/projects-group/projects-group.component';
import { SeeOneProjectComponent } from './projects/pages/see-one-project/see-one-project.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardAdminComponent,
    children: [

      {
        path: "estudiantes",
        canLoad: [HasRoleGuard],
        data: { allowedRoles: ["docente"] },
        component: AllStudentsComponent
      },
      { path: "ver_persona/:code", component: SeePersonComponent },
      { path: "docentes", component: AllTeachersComponent },
      { path: "materias", component: AllSubjectsComponent },
      { path: "mis_materias", component: MySubjectsComponent },
      { path: "grupos/:id", component: AllGroupsComponent },
      { path: "personas/:subject/:group/:id", component: PersonsGroupComponent },
      { path: "proyectos/:subject/:group_name/:group_id", component: ProjectsGroupComponent },
      { path: ":subject:/:group/:project_id", component: SeeOneProjectComponent },
      { path: "**", redirectTo: "" }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AdministrationRoutingModule { }
