import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.sass']
})
export class ProviderComponent implements OnInit {
  public form: FormGroup;
  public loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private providerService: ProviderService,
    private matSnackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      consultant: ['', Validators.required],
      consultantNumber: ['', Validators.required]
    })
    
  }
  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if(id) {
      this.loading = true;
      this.providerService.findById(id).subscribe(provider => {
        if (!provider) {
          return;
        }
        this.form.setValue({
          ...this.form.value,
          ...provider
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
    this.providerService.saveProvider(this.form.value).subscribe(provider => {
      this.router.navigate(['administrador', 'proveedores'])
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
