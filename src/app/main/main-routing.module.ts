import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    path: "",
    component: MainPageComponent,
    children: [
      // { path: "personas", component: PersonsComponent },
      // { path: "materias", component: SubjectsComponent },
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
