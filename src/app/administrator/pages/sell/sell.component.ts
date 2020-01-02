import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { SaleProduct } from 'src/app/models/sale-product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SaleService } from 'src/app/services/sale.service';
import { forkJoin } from 'rxjs';
import { Sale } from 'src/app/models/sale';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.sass']
})
export class SellComponent implements OnInit {
  public displayedColumns: string[] = ['product', 'amount', 'price', 'discount', 'total','delete'];
  public total: number;
  public form: FormGroup;
  public loading: boolean;
  public products: Product[];
  public saleProducts: MatTableDataSource<SaleProduct>;
  public newSaleProduct: FormGroup;

  constructor(   
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private saleService: SaleService,
    private matSnackBar: MatSnackBar) {
      this.form = this.formBuilder.group({
        id: [''],
        date: [new Date(), Validators.required],
        clientName: ['', Validators.required]
      })
      this.saleProducts = new MatTableDataSource([]);
      this.newSaleProduct = this.formBuilder.group({
        product: ['', Validators.required],
        amount: ['', Validators.required],
        discount: [0, Validators.required],
      });
      this.total = 0;
    }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    
    this.saleProducts.connect().subscribe(saleProducts => {
      this.total = saleProducts.reduce((total, saleProduct) => total + saleProduct.price * saleProduct.amount - saleProduct.discount, 0)
    })
    this.loading = true;
    if(id) {
      forkJoin(
        this.saleService.findById(id),
        this.productService.findAllProducts()
      )
      .subscribe(([invoice, products]) => {
        this.products = products;
        if (!invoice) {
          return;
        }
        let {id, date, clientName} = invoice;
        date = new Date(date);
        this.form.setValue({
          ...this.form.value,
          id,
          date,
          clientName
        });
        invoice.saleProducts.forEach(invoiceProduct => {
          invoiceProduct.productName = products.find(product => product.id === invoiceProduct.id.product).name;
        })
        this.saleProducts.data = invoice.saleProducts;
        this.total = invoice.saleProducts.reduce((total, saleProduct) => total + saleProduct.price * saleProduct.amount - saleProduct.discount, 0)
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
        this.productService.findAllProducts()
      )
      .subscribe(([products]) => {
        this.products = products;
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
    const sale = new Sale({
      date: new Date(this.form.value.date),
      id: this.route.snapshot.params.id,
      clientName: this.form.value.clientName,
      saleProducts: this.saleProducts.data.map(saleProduct => {
        return {
          buyPrice: saleProduct.buyPrice,
          amount: saleProduct.amount,
          discount: saleProduct.discount,
          price: saleProduct.price,
          product: {
            id: saleProduct.id.product
          }
        };
      })
    });
    this.saleService.saveSale(sale).subscribe(() => {
      this.router.navigate(['administrador', 'ventas'])
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
    this.saleProducts.data = this.saleProducts.data.filter(saleProduct => saleProduct.id.product != id);
  }

  addProduct() {
    this.newSaleProduct.markAllAsTouched();
    if (this.newSaleProduct.invalid) {
      this.matSnackBar.open('El producto ingresado está incompleto', 'cerrar', {
        duration: 3000
      });
      return;
    }
    const product = this.newSaleProduct.value.product.id;
    const saleProducts = this.saleProducts.data.find(invoiceProduct => invoiceProduct.id.product === product);
    if (!product) {
      this.matSnackBar.open('Escoja el producto de las opciones', 'cerrar', {
        duration: 3000
      });
      return;
    }
    if (saleProducts) {
      this.matSnackBar.open('El producto ya ha sido ingresado a la tabla', 'cerrar', {
        duration: 3000
      });
      return;
    }
    
    this.saleProducts.data.push({
      amount: this.newSaleProduct.value.amount,
      buyPrice: this.products.find(p => p.id === product).buyPrice,
      price: this.newSaleProduct.value.product.price,
      discount: this.newSaleProduct.value.discount,
      id: {
        product
      },
      productName: this.newSaleProduct.value.product.name
    });
    this.saleProducts.data = this.saleProducts.data.slice(0);
    this.newSaleProduct.reset({
      product: '',
      amount: '',
      discount: 0
    });
  }

  displayName(element) {
    return element ? element.name: null;
  }
}
