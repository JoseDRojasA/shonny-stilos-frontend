import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatToolbarModule, MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, MatSnackBarModule, MatProgressSpinnerModule, MatCardModule, MatSelectModule, MatMenuModule, MatSortModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDividerModule } from '@angular/material';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { AdministratorTemplateComponent } from './templates/administrator-template/administrator-template.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { BrandComponent } from './pages/brand/brand.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoadingFullpageComponent } from './components/loading-fullpage/loading-fullpage.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { ProviderComponent } from './pages/provider/provider.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { SellsComponent } from './pages/sells/sells.component';
import { SellComponent } from './pages/sell/sell.component';
import {MAT_DATE_LOCALE} from '@angular/material';

@NgModule({
  declarations: [AdministratorTemplateComponent, BrandsComponent, BrandComponent, LoadingFullpageComponent, ProvidersComponent, ProviderComponent, ProductsComponent, ProductComponent, InvoicesComponent, InvoiceComponent, SellsComponent, SellComponent],
  providers: [FormBuilder, MatDatepickerModule, { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
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
    MatAutocompleteModule,
    MatSortModule,
    FlexLayoutModule,
    MatSelectModule,
    MatMenuModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ]
})
export class AdministratorModule { }
