import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { AdministratorTemplateComponent } from './templates/administrator-template/administrator-template.component';
import { BrandsComponent } from './pages/brands/brands.component';


@NgModule({
  declarations: [AdministratorTemplateComponent, BrandsComponent],
  imports: [
    CommonModule,
    AdministratorRoutingModule
  ]
})
export class AdministratorModule { }
