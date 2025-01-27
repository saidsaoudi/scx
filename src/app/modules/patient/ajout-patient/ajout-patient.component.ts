import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { City } from 'src/app/core/models/city';
import { Paginator } from 'src/app/core/models/paginator';
import { Province } from 'src/app/core/models/province';
import { AppState } from 'src/app/core/store/app.states';
import { fetchCities } from 'src/app/core/store/city/city.action';
import { selectCityPayload, selectCityTotal } from 'src/app/core/store/city/city.selector';
import { selectPagination } from 'src/app/core/store/pagination/pagination.selector';
import { addPatient } from 'src/app/core/store/patient/patient.action';
import { selectLoadingPatients, selectNewPatient, selectStatusPatients } from 'src/app/core/store/patient/patient.selector';
import { fetchProvinces } from 'src/app/core/store/province/province.action';
import { selectProvincePayload, selectProvinceTotal } from 'src/app/core/store/province/province.selector';

@Component({
  selector: 'app-ajout-patient',
  templateUrl: './ajout-patient.component.html',
  styleUrls: ['./ajout-patient.component.scss']
})
export class AjoutPatientComponent implements OnInit {
  isLoading$ = this.store.select(selectLoadingPatients)
  patientForm: FormGroup;
  provinces: Province[] = []
  cities: City[] = []
  filtredCities: City[] = [];
  pagination!: Paginator
  totalResults = 0;
  pageSize = 10; // Set your desired page size here
  numberOfPages = 0
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.patientForm = new FormGroup({
      cine: new FormControl(""),
      lastName: new FormControl(""),
      firstName: new FormControl(""),
      gender: new FormControl(""),
      birthDate: new FormControl(""),
      email: new FormControl(""),
      address: new FormControl(""),
      address2: new FormControl(""),
      postalCode: new FormControl("0"),
      phoneNumber: new FormControl(""),
      medicalCover: new FormControl(""),
      affiliationNumber: new FormControl(""),
      city: new FormControl(""),
    });
  }

  ngOnInit(): void {
    this.fetchProvinces();
    this.fetchCities();
  }

  provinceChange(event: any){
    this.filtredCities = this.cities.filter(c => c.provinceId == event.target.value)
  }

  fetchProvinces(){
    this.store.dispatch(fetchProvinces({paginate: true, paginator: new Paginator(), search: ""}));
    this.store.select(selectProvincePayload).subscribe(provinces => {
      this.provinces = provinces
      this.store.select(selectPagination).subscribe(pagination => {
        this.store.select(selectProvinceTotal).subscribe(total => {
          this.numberOfPages = Math.ceil(total / this.pageSize);
          this.totalResults = total;
          this.pagination = pagination
        })
      })
    });
  }

  fetchCities(){
    this.store.dispatch(fetchCities({paginate: true, paginator: new Paginator(), search: ""}));
    this.store.select(selectCityPayload).subscribe(cities => {
      this.cities = cities
      this.store.select(selectPagination).subscribe(pagination => {
        this.store.select(selectCityTotal).subscribe(total => {
          this.numberOfPages = Math.ceil(total / this.pageSize);
          this.totalResults = total;
          this.pagination = pagination
        })
      })
    });
  }

  onSubmit(){
    let payload = {
        cine: this.patientForm.value.cine,
        city: {
            id: parseInt(this.patientForm.value.city)
        },
        medicalCover: this.patientForm.value.medicalCover,
        affiliationNumber: this.patientForm.value.affiliationNumber,
        center: {
            id: 46
        },
        user: {
            firstName: this.patientForm.value.firstName,
            lastName: this.patientForm.value.lastName,
            gender: this.patientForm.value.gender,
            birthDate: this.patientForm.value.birthDate,
            phoneNumber: this.patientForm.value.phoneNumber,
            address: this.patientForm.value.address
        }
    }
    this.store.dispatch(addPatient({payload}));
    this.store.select(selectStatusPatients).subscribe((status) => {
      if (status == 'SUCCESS') {
        this.store.select(selectNewPatient).subscribe((patient) => {
            this.router.navigate(['patients/detail', patient.id]);
        });
      }
    });
  }

}
