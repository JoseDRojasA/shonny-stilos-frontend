import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Brand } from 'src/app/models/brand';
import { Provider } from 'src/app/models/provider';
import { forkJoin } from 'rxjs';
import { ProviderService } from 'src/app/services/provider.service';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  public form: FormGroup;
  public loading: boolean;
  public brands: Brand[];
  public providers: Provider[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private brandService: BrandService,
    private providerService: ProviderService,
    private matSnackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      buyPrice: ['', Validators.required],
      price: ['', Validators.required],
      amount: ['', Validators.required],
      minAmount: ['', Validators.required],
      active: [true, Validators.required],
      brand: ['', Validators.required],
      provider: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.loading = true;
    if(id) {
      forkJoin(this.productService.findById(id), this.providerService.findAllProviders(), this.brandService.findAllBrands())
      .subscribe(results => {
        const [product, providers, brands] = results;
        this.providers = providers;
        this.brands = brands;
        if (!product) {
          return;
        }
        this.form.setValue({
          ...this.form.value,
          ...product,
          brand: product.brand.id,
          provider: product.provider.id
        })
        this.form.controls.amount.disable();
      }, error => {
        this.matSnackBar.open(error.message, 'close', {
          duration: 3000
        });
        this.loading = false;
      }, () => {
        this.loading = false;
      })
    } else {
      forkJoin(this.providerService.findAllProviders(), this.brandService.findAllBrands())
      .subscribe(results => {
        const [providers, brands] = results;
        this.providers = providers;
        this.brands = brands;
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
    if (this.form.value.price < this.form.value.buyPrice) {
      this.matSnackBar.open('El precio de venta no puede ser menor al precio de compra', 'cerrar', {
        duration: 3000
      });
      return;
    }    
    this.form.controls.amount.enable();
    this.loading = true;
    this.productService.saveProduct({
      ...this.form.value,
      provider: {
        id: this.form.value.provider
      },
      brand: {
        id: this.form.value.brand
      }
    }).subscribe(product => {
      this.router.navigate(['administrador', 'productos'])
    }, error => {
      this.matSnackBar.open(error.message, 'close', {
        duration: 3000
      });
      this.form.controls.amount.disable();
      this.loading = false;
    }, () => {
      this.loading = false;
    })
  }
}
