import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { concat } from 'rxjs';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.sass']
})
export class BrandsComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<Brand>;

  filter: FormControl;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private brandService: BrandService, private userService: UserService) {
    this.dataSource = new MatTableDataSource([]);
    this.filter = new FormControl();
  }

  ngOnInit() {
    if (this.userService.user.isAdmin) {
      this.displayedColumns.push('edit', 'delete');
    }
    this.brandService.findAllBrands().subscribe(brands => {
      this.dataSource.data = brands;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteBrand(id: number) {
    concat(this.brandService.deleteBrand(id), this.brandService.findAllBrands()).subscribe(brands => {
      this.dataSource.data = brands;
    });;
  }
}
