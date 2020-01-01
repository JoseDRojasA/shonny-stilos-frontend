import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.sass']
})
export class BrandComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandService,
    private matSnackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required]
    })
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if(id) {
      this.loading = true;
      this.brandService.findById(id).subscribe(brand => {
        if (!brand) {
          return;
        }
        this.form.setValue({
          ...this.form.value,
          ...brand
        })
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
    this.brandService.saveBrand(this.form.value).subscribe(brand => {
      this.router.navigate(['administrador', 'marcas'])
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
