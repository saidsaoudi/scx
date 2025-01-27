import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { City } from 'src/app/core/models/city';
import { Paginator } from 'src/app/core/models/paginator';
import { Province } from 'src/app/core/models/province';
import { AppState } from 'src/app/core/store/app.states';
import { fetchCities } from 'src/app/core/store/city/city.action';
import { selectCityPayload, selectCityTotal } from 'src/app/core/store/city/city.selector';
import { selectPagination } from 'src/app/core/store/pagination/pagination.selector';
import { updatePatient } from 'src/app/core/store/patient/patient.action';
import { selectStatusPatients } from 'src/app/core/store/patient/patient.selector';
import { fetchProvinces } from 'src/app/core/store/province/province.action';
import { selectProvincePayload, selectProvinceTotal } from 'src/app/core/store/province/province.selector';

@Component({
  selector: 'app-modif-patient',
  templateUrl: './modif-patient.component.html',
  styleUrls: ['./modif-patient.component.scss']
})
export class ModifPatientComponent implements OnInit {

  //@ts-ignore
  patient: Patient;
  patientForm!: FormGroup;
  provinces: Province[] = []
  cities: City[] = []
  filtredCities: City[] = [];
  showCities = false
  birthDate = '';
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private store: Store<AppState>,
  ) {
    

  }

  ngOnInit(): void {
    // this.fetchCities();
    this.patient = this.config.data;
    if(this.patient){
      this.fetchProvinces();
      let year = this.patient.user.birthDate.split('-')[0]
      let month = this.patient.user.birthDate.split('-')[1]
      let day = this.patient.user.birthDate.split('-')[2].split('T')[0]
      this.birthDate = year+'-'+month+'-'+day;
      this.initForm()
    }
  
  }

  initForm(){
    this.patientForm = new FormGroup({
      cine: new FormControl(this.patient.cine),
      lastName: new FormControl(this.patient.user.lastName),
      firstName: new FormControl(this.patient.user.firstName),
      gender: new FormControl(this.patient.user.gender),
      birthDate: new FormControl(this.birthDate),
      email: new FormControl(this.patient.user.email),
      address: new FormControl(this.patient.user.address),
      address2: new FormControl(this.patient.user.address2),
      postalCode: new FormControl(this.patient.user.postalCode),
      phoneNumber: new FormControl(this.patient.user.phoneNumber),
      medicalCover: new FormControl(this.patient.medicalCover),
      affiliationNumber: new FormControl(this.patient.affiliationNumber),
      city: new FormControl(this.patient.city.id),
      province: new FormControl(this.patient.city.province.id),
    });
  }

  fetchProvinces(){
    this.store.dispatch(fetchProvinces({paginate: true, paginator: new Paginator(), search: ""}));
    this.store.select(selectProvincePayload).subscribe(provinces => {
      this.provinces = provinces
      this.fetchCities()
      this.store.select(selectPagination).subscribe(pagination => {
      })
    });
  }

  fetchCities(){
    this.store.dispatch(fetchCities({paginate: true, paginator: new Paginator(), search: ""}));
    this.store.select(selectCityPayload).subscribe(cities => {
      this.cities = cities
      this.filtredCities = this.filtredCities = this.cities.filter(c => c.provinceId == this.patient.city.province.id)
      setTimeout(() => {
        this.showCities = true
        this.initForm()
      }, 100)
      this.store.select(selectPagination).subscribe(pagination => {
        this.store.select(selectCityTotal).subscribe(total => {

        })
      })
    });
  }

  provinceChange(event: any){
    this.filtredCities = this.cities.filter(c => c.provinceId == event.target.value)
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
    this.store.dispatch(updatePatient({payload, id:this.patient.id}));
    this.store.select(selectStatusPatients).subscribe((status) => {
      if (status == 'SUCCESS') {
        window.location.reload();
      }
    });
  }

}
