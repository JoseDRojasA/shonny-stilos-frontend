import { Component } from '@angular/core';
import { MenuItem } from 'src/app/models/menuItem';


@Component({
  selector: 'app-administrator-template',
  templateUrl: './administrator-template.component.html',
  styleUrls: ['./administrator-template.component.sass']
})
export class AdministratorTemplateComponent {
  public options: Array<MenuItem>;

  constructor() {
    this.options = [
      {
        label: 'Marcas',
        url: '/administrador/marcas'
      },
      {
        label: 'Facturas',
        url: '/administrador/facturas'
      },
      {
        label: 'Productos',
        url: '/administrador/productos'
      },
      {
        label: 'Proveedores',
        url: '/administrador/proveedores'
      },
      {
        label: 'Ventas',
        url: '/administrador/ventas'
      }
    ]
  }

}
