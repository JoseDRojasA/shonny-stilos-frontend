import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorTemplateComponent } from './templates/administrator-template/administrator-template.component';
import { BrandsComponent } from './pages/brands/brands.component';


const routes: Routes = [
  {
    path: '',
    component: AdministratorTemplateComponent,
    children: [
      {
        path: 'marcas',
        component: BrandsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
