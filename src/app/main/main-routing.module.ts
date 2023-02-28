import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AllPersonsComponent } from './persons/page/all-persons/all-persons.component';
import { AllSubjectsComponent } from './subject/pages/all-subjects/all-subjects.component';
// import { PersonsGroupComponent } from './group/pages/persons-group/persons-group.component';
import { AllGroupsComponent } from './group/pages/all-groups/all-groups.component';

const routes: Routes = [
  {
    path: "",
    component: MainPageComponent,
    children: [
      { path: "personas", component: AllPersonsComponent },
      { path: "materias", component: AllSubjectsComponent },
      { path: "grupos/:id", component: AllGroupsComponent},
      { path: "**", redirectTo: "" }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule { }
