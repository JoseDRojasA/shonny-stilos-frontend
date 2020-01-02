import { Component, OnInit, ViewChild } from '@angular/core';
import { Sale } from 'src/app/models/sale';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { SaleService } from 'src/app/services/sale.service';
import { merge, of, concat } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
const PAGE_SIZE = 5;
@Component({
  selector: 'app-sells',
  templateUrl: './sells.component.html',
  styleUrls: ['./sells.component.sass']
})
export class SellsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'clientName', 'edit', 'delete'];

  resultsLength = 0;
  pageSize = PAGE_SIZE
  loading = true;
  search: string;
  data: Sale[];
  timeout;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private saleService: SaleService, private matSnackBar: MatSnackBar) {
    this.data = [];
  }

  ngOnInit() {
        
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          return this.saleService.findAllSales(this.sort.active, this.sort.direction, this.paginator.pageIndex, PAGE_SIZE);
        }),
        map(data => {
          this.loading = false;
          this.resultsLength = data.count;

          return data.elements;
        }),
        catchError(() => {
          this.loading = false;
          return of([]);
        })
      ).subscribe((data: Sale[]) => this.data = data);
  }
  applyFilter(filterValue: string) {
    this.search = filterValue.trim().toLowerCase();
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.loading = true;
      this.saleService.findAllSales(this.sort.active, this.sort.direction, this.paginator.pageIndex, PAGE_SIZE, this.search).subscribe(pagination => {
        this.resultsLength = pagination.count;
        this.data = pagination.elements;
        this.loading = false;
      }, error => {
        this.matSnackBar.open(error.message, 'close', {
          duration: 3000
        });
        this.loading = false;
      })
    }, 3000);
  }
  
  deleteSale(id: number) {
    this.loading = true;
    concat(this.saleService.deleteSale(id), this.saleService.findAllSales(this.sort.active, this.sort.direction, this.paginator.pageIndex, PAGE_SIZE, this.search)).subscribe(invoices => {
      this.data = invoices.elements;
      this.resultsLength = invoices.count;
      this.loading = false;
    });;
  }
}
