import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Docteur } from 'src/app/core/models/docteur';
import { Paginator } from 'src/app/core/models/paginator';
import { Specialite } from 'src/app/core/models/specialite';
import { SpecialiteService } from 'src/app/core/services/specialite/specialite.service';
import { AppState } from 'src/app/core/store/app.states';
import { addRendezVous } from 'src/app/core/store/rendez-vous/rendez-vous.action';
import { selectNewRendezVous, selectStatusRendezVous } from 'src/app/core/store/rendez-vous/rendez-vous.selector';
import { searchSpecialite } from 'src/app/core/store/specialite/specialite.action';
import { selectSpecialitePayload } from 'src/app/core/store/specialite/specialite.selector';
import { localStorageHelper } from 'src/app/helpers/localStorage.helper';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.scss']
})
export class RendezVousComponent implements OnInit {
  //@ts-ignore
  patient: Patient;
  date: Date[] | undefined;
  reason = '';
  filtredSpecialite: Specialite[] = []
  //@ts-ignore
  selectedSpecialite: Specialite
  days: Date[] = [];
  disabledDates: Date[] = [];
  doctors: Docteur[] = [];
  filtredDoctors: Docteur[] = [];
  slots: any[] = [];
  showCalendar = false
  selectedSlotIndex = -1;
  selectedDoctorIndex = -1;
  selectedDate = new Date()

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private store: Store<AppState>,
    private specialiteService: SpecialiteService
  ) { }

  ngOnInit(): void {
    this.patient = this.config.data;
  }

  items: any[] | undefined;

  selectedItem: any;

  suggestions: any;

  search(event: AutoCompleteCompleteEvent) {
      this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
  }

  searchSpecialite(event: any) {
    let querySearch = event.query
    this.store.dispatch(searchSpecialite({paginate: true, paginator: new Paginator(), search: querySearch}));
    this.store.select(selectSpecialitePayload).subscribe(specialites => {
      this.filtredSpecialite = specialites
    });

  }

  onSelect(event: any){
    this.getDaysBySpecialite(event.id)
  }

  getDaysBySpecialite(id: any){
    this.specialiteService.getDaysBySpecialite(id).subscribe(days => {
      days.forEach((day: any) => {
        const originalDate = new Date(day);
        originalDate.setHours(0, 0, 0, 0);
        this.days.push(originalDate)
      });
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonthIndex = currentDate.getMonth();
      this.disableDates(currentYear, currentMonthIndex)
      this.showCalendar = true
    })
  }

  onMonthChange(event: any) {
    this.disabledDates = [];
    const year = event.year;
    const month = event.month - 1;

    this.disableDates(year, month)
  }

  disableDates(year: any, month: any){
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysSet = new Set(this.days.map(day => day.toString()));

    for (let date = new Date(firstDayOfMonth); date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
        const dateString = date.toString();
        if (!daysSet.has(dateString)) {
            this.disabledDates.push(new Date(date));
        }
    }
  }

  onSelectDate(event: Date) {
    if(new Date(event).getTime() != new Date(this.selectedDate).getTime()){
      this.selectedDoctorIndex = -1
      this.selectedSlotIndex = -1
      this.filtredDoctors = []
      this.selectedDate = event;
      const formattedDate = this.formatDate(event);
      this.loadSlotsByDate(formattedDate);
    }
    
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  loadSlotsByDate(formattedDate: string) {
    this.specialiteService.getSlotsBySpecialite(this.selectedSpecialite.id, formattedDate)
      .subscribe(slots => {
        this.doctors = slots.doctors;
        this.slots = slots.slots.map((slot: any) => ({
          start: this.formatTime(slot.start),
          end: this.formatTime(slot.end),
          doctors: slot.doctors,
        }));
      });
  }

  formatTime(timeString: string): string {
    const time = new Date(timeString);
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  onSlotSelect(index: any){
    this.selectedSlotIndex = index;
    let slotDoctors = this.slots[index].doctors
    this.filtredDoctors = this.doctors.filter(doctor => slotDoctors.includes(doctor.id));
  }
  onDoctorSelect(index: any){
    this.selectedDoctorIndex = index;
  }

  saveRendezVous(){
    const date = new Date(this.selectedDate);
    const start = this.slots[this.selectedSlotIndex].start;
    const end = this.slots[this.selectedSlotIndex].end;
    
    // Get the date components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to the month since it's zero-based
    const day = date.getDate().toString().padStart(2, '0');
    
    let payload = {
      "reason": this.reason,
      "startTime": `${year}-${month}-${day}T${start}:00.000Z`,
      "endTime": `${year}-${month}-${day}T${end}:00.000Z`,
      "centerId": localStorageHelper.getItem('centerId'),
      "stationId": localStorageHelper.getItem('stationId'),
      "doctorId": this.filtredDoctors[this.selectedDoctorIndex].id,
      "patientId": this.patient.id
    }

    this.store.dispatch(addRendezVous({payload}));
    this.store.select(selectStatusRendezVous).subscribe((status) => {
      if (status == 'SUCCESS') {
        this.ref.close()
      }
    });
  }


  
}