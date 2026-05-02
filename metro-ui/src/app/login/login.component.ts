import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { takeUntil } from 'rxjs';
import { UnSub } from '../../common/unsub';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends UnSub implements OnInit {
  constructor(private accountService: AccountService, private router: Router, private fb: FormBuilder) {
    super();
  }
  isformValid = false;
  loginForm: FormGroup = new FormGroup({});
  getlogindetls() {
    if (!this.loginForm.valid) {
      this.isformValid = true;
      return;
    }
    let model = {
      UserName: this.loginForm.controls['username'].value
    }
    this.accountService.getuser(model).pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        localStorage.setItem('loginUser', this.loginForm.controls['username'].value);
        this.router.navigate(['/dashboard']);
      })
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }
}
