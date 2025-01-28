import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone : false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  value!: number;

  loginForm: FormGroup;
  isLoading = false;

  constructor( private router: Router
  ) {
    this.loginForm = new FormGroup({
      login: new FormControl("said@gmail.com", [Validators.required]),
      password: new FormControl("Trewq11221@", Validators.required),
    });
  }

  ngOnInit() {
    
  }

  onSubmit() {
    this.isLoading = true;
    let data = { centerId: 46, stationId: 92, ...this.loginForm.value}
    // this.authService.login(data).subscribe(
    //   data => {
    //     this.isLoading = false;
    //   }
    // );
    this.router.navigate(['/dashboard']); 
  }
  
}
