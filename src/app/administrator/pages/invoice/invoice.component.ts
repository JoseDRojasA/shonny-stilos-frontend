import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { forkJoin } from 'rxjs';
import { ProviderService } from 'src/app/services/provider.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Provider } from 'src/app/models/provider';
import { InvoiceProduct } from 'src/app/models/invoice-product';
import { Invoice } from 'src/app/models/invoice';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.sass']
})
export class InvoiceComponent implements OnInit {

  displayedColumns: string[] = ['product', 'amount', 'price', 'total', 'delete'];
  public total: number;
  public form: FormGroup;
  public loading: boolean;
  public products: Product[];
  public providers: Provider[];
  invoiceProducts: MatTableDataSource<InvoiceProduct>;
  newInvoiceProduct: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private providerService: ProviderService,
    private productService: ProductService,
    private invoiceService: InvoiceService,
    private matSnackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      id: [''],
      date: [new Date(), Validators.required],
      serial: ['', Validators.required],
      provider: ['', Validators.required],
    })
    this.invoiceProducts = new MatTableDataSource([]);
    this.newInvoiceProduct = this.formBuilder.group({
      product: ['', Validators.required],
      amount: ['', Validators.required],
      buyPricePerUnit: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.invoiceProducts.connect().subscribe(invoiceProducts => {
      this.total = invoiceProducts.reduce((total, invoiceProduct) => total + invoiceProduct.buyPricePerUnit * invoiceProduct.amount, 0);
    });
    this.loading = true;
    if (id) {
      forkJoin(
        this.invoiceService.findById(id),
        this.productService.findAllProducts(),
        this.providerService.findAllProviders()
      )
        .subscribe(([invoice, products, providers]) => {
          this.products = products;
          this.providers = providers;
          if (!invoice) {
            return;
          }
          let { id, date, serial } = invoice;
          date = new Date(date);
          this.form.setValue({
            ...this.form.value,
            id, date, serial,
            provider: invoice.provider.id
          });
          invoice.invoiceProducts.forEach(invoiceProduct => {
            invoiceProduct.productName = products.find(product => product.id === invoiceProduct.id.product).name;

          })
          this.invoiceProducts.data = invoice.invoiceProducts;
          this.total = invoice.invoiceProducts.reduce((total, invoiceProduct) => total + invoiceProduct.buyPricePerUnit * invoiceProduct.amount, 0);
        }, error => {
          this.matSnackBar.open(error.message, 'close', {
            duration: 3000
          });
          this.loading = false;
        }, () => {
          this.loading = false;
        })
    } else {
      forkJoin(
        this.productService.findAllProducts(),
        this.providerService.findAllProviders()
      )
        .subscribe(([products, providers]) => {
          this.products = products;
          this.providers = providers;
        }, error => {
          this.matSnackBar.open(error.message, 'close', {
            duration: 3000
          });
          this.loading = false;
        }, () => {
          this.loading = false;
        })
    }
  }
  onSubmit() {
    if (this.form.invalid) {
      this.matSnackBar.open('Revise los datos ingresados', 'cerrar', {
        duration: 3000
      });
      return;
    }
    this.loading = true;
    const invoice = new Invoice({
      date: new Date(this.form.value.date),
      id: this.route.snapshot.params.id,
      serial: this.form.value.serial,
      provider: {
        id: this.form.value.provider
      },
      invoiceProducts: this.invoiceProducts.data.map(invoiceProduct => {
        return {
          buyPricePerUnit: invoiceProduct.buyPricePerUnit,
          amount: invoiceProduct.amount,
          product: {
            id: invoiceProduct.id.product
          }
        };
      })
    });
    this.invoiceService.saveInvoice(invoice).subscribe(() => {
      this.router.navigate(['administrador', 'facturas'])
    }, error => {
      this.matSnackBar.open(error.message, 'close', {
        duration: 3000
      });
      this.loading = false;
    }, () => {
      this.loading = false;
    })
  }


  deleteProduct(id: number) {
    this.invoiceProducts.data = this.invoiceProducts.data.filter(invoiceProduct => invoiceProduct.id.product != id);
  }

  addProduct() {
    this.newInvoiceProduct.markAllAsTouched();
    if (this.newInvoiceProduct.invalid) {
      this.matSnackBar.open('El producto ingresado está incompleto', 'cerrar', {
        duration: 3000
      });
      return;
    }
    const product = this.newInvoiceProduct.value.product.id;
    const invoiceProducts = this.invoiceProducts.data.find(invoiceProduct => invoiceProduct.id.product === product);
    if (!product) {
      this.matSnackBar.open('Escoja el producto de las opciones', 'cerrar', {
        duration: 3000
      });
      return;
    }
    console.log(invoiceProducts)
    if (invoiceProducts) {
      this.matSnackBar.open('El producto ya ha sido ingresado a la tabla', 'cerrar', {
        duration: 3000
      });
      return;
    }
    this.invoiceProducts.data.push({
      amount: this.newInvoiceProduct.value.amount,
      buyPricePerUnit: this.newInvoiceProduct.value.buyPricePerUnit,
      id: {
        product
      },
      productName: this.newInvoiceProduct.value.product.name
    });
    this.invoiceProducts.data = this.invoiceProducts.data.slice(0);
    this.newInvoiceProduct.reset();
  }

  displayName(element) {
    return element ? element.name : null;
  }
}
