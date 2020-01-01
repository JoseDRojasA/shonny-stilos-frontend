import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatToolbarModule, MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, MatSnackBarModule, MatProgressSpinnerModule, MatCardModule } from '@angular/material';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { AdministratorTemplateComponent } from './templates/administrator-template/administrator-template.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { BrandComponent } from './pages/brand/brand.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoadingFullpageComponent } from './components/loading-fullpage/loading-fullpage.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { ProviderComponent } from './pages/provider/provider.component';


@NgModule({
  declarations: [AdministratorTemplateComponent, BrandsComponent, BrandComponent, LoadingFullpageComponent, ProvidersComponent, ProviderComponent],
  providers: [FormBuilder],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ]
})
export class AdministratorModule { }
