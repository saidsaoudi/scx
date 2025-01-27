import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Paginator } from 'src/app/core/models/paginator';
import { Patient } from 'src/app/core/models/patient';
import { AppState } from 'src/app/core/store/app.states';
import { selectPagination } from 'src/app/core/store/pagination/pagination.selector';
import { fetchPatients } from 'src/app/core/store/patient/patient.action';
import { selectLoadingPatients, selectPatientPayload, selectPatientTotal } from 'src/app/core/store/patient/patient.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss']
})
export class ListPatientsComponent implements OnInit {
  isLoading$ = this.store.select(selectLoadingPatients)
  patients: Patient[] = []
  pagination!: Paginator
  totalResults = 0;
  pageSize = 10; // Set your desired page size here
  numberOfPages = 0
  querySearch = '';
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.fetchPatients();
    console.log('ppp', this.isLoading$)
  }

  search(event: any){
    if(event.target.value != ""){
      this.querySearch = event.target.value
      this.store.dispatch(fetchPatients({paginate: true, paginator: new Paginator, search: this.querySearch}));
    }else{
      if(this.querySearch != ""){
        this.store.dispatch(fetchPatients({paginate: true, paginator: new Paginator, search: ""}));
        this.querySearch = ""
      }
    }
  }

  fetchPatients(){
    this.store.dispatch(fetchPatients({paginate: true, paginator: new Paginator(), search: this.querySearch}));
    this.store.select(selectPatientPayload).subscribe(patients => {
      this.patients = patients
      this.store.select(selectPagination).subscribe(pagination => {
        this.store.select(selectPatientTotal).subscribe(total => {
          this.numberOfPages = Math.ceil(total / this.pageSize);
          this.totalResults = total;
          this.pagination = pagination
        })
      })
    });
  }
  
  paginate($event: any){
    const paginator = {
      currentPage: $event.page == 0 ? 0 : $event.page * 10,
      nextPage: $event.page == 0 ? 0 : $event.page * 10,
      pageSize: this.pagination.nextPage,
      totalItems: this.pagination.totalItems,
    }
    this.store.dispatch(fetchPatients({paginate: true, paginator, search: this.querySearch}));
  }


}
