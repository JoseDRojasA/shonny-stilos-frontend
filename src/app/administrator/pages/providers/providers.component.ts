import { Component, OnInit, ViewChild } from '@angular/core';
import { Provider } from 'src/app/models/provider';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ProviderService } from 'src/app/services/provider.service';
import { concat } from 'rxjs';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.sass']
})
export class ProvidersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'consultant', 'consultantNumber'];
  dataSource: MatTableDataSource<Provider>;

  filter: FormControl;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private userService: UserService, private providerService: ProviderService) {
    this.dataSource = new MatTableDataSource([]);
    this.filter = new FormControl();
  }

  ngOnInit() {
    if (this.userService.user.isAdmin) {
      this.displayedColumns.push('edit', 'delete');
    }
    this.providerService.findAllProviders().subscribe(providers => {
      this.dataSource.data = providers;
    });
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProvider(id: number) {
    concat(this.providerService.deleteProvider(id), this.providerService.findAllProviders()).subscribe(providers => {
      this.dataSource.data = providers;
    });;
  }

}
