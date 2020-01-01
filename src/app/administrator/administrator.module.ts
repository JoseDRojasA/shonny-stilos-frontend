import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatToolbarModule, MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule } from '@angular/material';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { AdministratorTemplateComponent } from './templates/administrator-template/administrator-template.component';
import { BrandsComponent } from './pages/brands/brands.component';


@NgModule({
  declarations: [AdministratorTemplateComponent, BrandsComponent],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule
  ]
})
export class AdministratorModule { }
