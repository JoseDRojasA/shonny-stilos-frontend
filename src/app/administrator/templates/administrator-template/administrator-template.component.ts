import { Component } from '@angular/core';
import { MenuItem } from 'src/app/models/menuItem';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-administrator-template',
  templateUrl: './administrator-template.component.html',
  styleUrls: ['./administrator-template.component.sass']
})
export class AdministratorTemplateComponent {
  public options: Array<MenuItem>;
  public name: string;

  constructor(private userService: UserService) {
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
    ];
    this.name = `${this.userService.user.person.name}`.trim();
  }

}
