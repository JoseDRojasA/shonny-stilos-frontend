import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { merge, of, concat } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { Invoice } from 'src/app/models/invoice';

const PAGE_SIZE = 5;

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.sass']
})
export class InvoicesComponent implements AfterViewInit {

  displayedColumns: string[] = ['date', 'serial', 'providerName', 'edit', 'delete'];

  resultsLength = 0;
  pageSize = PAGE_SIZE
  loading = true;
  search: string;
  data: Invoice[];
  timeout;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private invoiceService: InvoiceService, private matSnackBar: MatSnackBar) {
    this.data = [];
  }

  ngAfterViewInit() {
    
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          return this.invoiceService.findAllInvoices(this.sort.active, this.sort.direction, this.paginator.pageIndex, PAGE_SIZE);
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
      ).subscribe((data: Invoice[]) => this.data = data);
  }

  applyFilter(filterValue: string) {
    this.search = filterValue.trim().toLowerCase();
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.loading = true;
      this.invoiceService.findAllInvoices(this.sort.active, this.sort.direction, this.paginator.pageIndex, PAGE_SIZE, this.search).subscribe(pagination => {
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

  deleteinvoice(id: number) {
    this.loading = true;
    concat(this.invoiceService.deleteInvoices(id), this.invoiceService.findAllInvoices(this.sort.active, this.sort.direction, this.paginator.pageIndex, PAGE_SIZE, this.search)).subscribe(invoices => {
      this.data = invoices.elements;
      this.resultsLength = invoices.count;
      this.loading = false;
    });;
  }
}
