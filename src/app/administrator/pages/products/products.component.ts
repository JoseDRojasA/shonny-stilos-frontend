import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { concat } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'brand', 'price','amount', 'telephone'];
  dataSource: MatTableDataSource<Product>;
  loading: boolean;

  filter: FormControl;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private userService: UserService, private productService: ProductService, private matSnackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource([]);
    this.filter = new FormControl();
    this.loading = false;
  }

  ngOnInit() {
    if (this.userService.user.isAdmin) {
      this.displayedColumns.push('edit', 'delete');
    }
    this.loading = true;
    this.productService.findAllProducts().subscribe(products => {
      this.dataSource.data = products;
    }, error => {
      this.matSnackBar.open(error.message, 'close', {
        duration: 3000
      });
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProduct(id: number) {
    concat(this.productService.deleteProduct(id), this.productService.findAllProducts()).subscribe(products => {
      this.dataSource.data = products;
    });;
  }
}
