import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone : false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  value!: number;
    
    paymentOptions: any[] = [
        { name: 'Infirmiére', value: 1 , icon: 'pi pi-align-left' },
        { name: 'Spécialiste', value: 2 },
        { name: 'Généraliste', value: 3 }
    ];

  loginForm: FormGroup;
  isLoading = false;

  constructor(
  ) {
    this.loginForm = new FormGroup({
      // login: new FormControl("IUM0114542", [Validators.required]),
      // password: new FormControl("R1=4V/f9", Validators.required),
      login: new FormControl("090099895", [Validators.required]),
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
  }
  
}
