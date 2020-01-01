import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorTemplateComponent } from './templates/administrator-template/administrator-template.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { BrandComponent } from './pages/brand/brand.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { ProviderComponent } from './pages/provider/provider.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { AdminGuard } from '../guards/admin.guard';


const routes: Routes = [
  {
    path: '',
    component: AdministratorTemplateComponent,
    children: [
      {
        path: 'marcas',
        component: BrandsComponent
      },
      {
        path: 'marca',
        canActivate: [AdminGuard],
        component: BrandComponent
      },
      {
        path: 'marca/:id',
        canActivate: [AdminGuard],
        component: BrandComponent
      },
      {
        path: 'proveedores',
        component: ProvidersComponent
      },
      {
        path: 'proveedor',
        canActivate: [AdminGuard],
        component: ProviderComponent
      },
      {
        path: 'proveedor/:id',
        canActivate: [AdminGuard],
        component: ProviderComponent
      },
      {
        path: 'productos',
        component: ProductsComponent
      },
      {
        path: 'producto',
        canActivate: [AdminGuard],
        component: ProductComponent
      },
      {
        path: 'producto/:id',
        canActivate: [AdminGuard],
        component: ProductComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
