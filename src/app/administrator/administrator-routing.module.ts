import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorTemplateComponent } from './templates/administrator-template/administrator-template.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { BrandComponent } from './pages/brand/brand.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { ProviderComponent } from './pages/provider/provider.component';


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
        component: BrandComponent
      },
      {
        path: 'marca/:id',
        component: BrandComponent
      },
      {
        path: 'proveedores',
        component: ProvidersComponent
      },
      {
        path: 'proveedor',
        component: ProviderComponent
      },
      {
        path: 'proveedor/:id',
        component: ProviderComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
