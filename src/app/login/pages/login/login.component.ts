import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private matSnack: MatSnackBar,
    private userService: UserService,
    private router: Router) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loading = false;
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.invalid) {
      this.matSnack.open('Revise los datos ingresados', 'cerrar', {
        duration: 3000
      });
      return;
    }
    this.loading = true;
    this.userService.authenticate(this.form.value).subscribe(user => {
      this.userService.user = user;
    }, error => {
      this.matSnack.open(error.message, 'cerrar', {
        duration: 3000
      })
    })
  }

}
