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
import { EditProfileComponent } from './persons/pages/edit-profile/edit-profile.component';
import { EditGroupComponent } from './groups/pages/edit-group/edit-group.component';
import { NewProjectComponent } from './projects/pages/new-project/new-project.component';
import { AllTaskComponent } from './task/pages/all-task/all-task.component';

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
      { path: "docentes", component: AllTeachersComponent },
        { path: "ver_persona/:code", component: SeePersonComponent },
        { path: "persona/:mail/editProfile", component:EditProfileComponent},

      { path: "materias", component: AllSubjectsComponent },
        { path: "grupos/:id", component: AllGroupsComponent },
      
      { path: "mis_materias", component: MySubjectsComponent },
      { path: "personas/:subject/:group/:id", component: PersonsGroupComponent }, //TODO: COLOCAR AQUI GROUP_NAME EN LUGAR DE GROUP
      { path: "task/:subject/:group_name/:group_id", component:AllTaskComponent},
      { path: "proyectos/:subject/:group_name/:group_id", component: ProjectsGroupComponent },
        { path: "proyecto/agregar/:subject/:group_name/:id", component:  NewProjectComponent},
        { path: "proyecto/:subject/:group/:group_id/:id", component: SeeOneProjectComponent },

      { path: "subject/group/edit/:id", component: EditGroupComponent }, //TODO: CREO QUE NO SE ESTA USANDO
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
