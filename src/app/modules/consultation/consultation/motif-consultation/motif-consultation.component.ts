import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Consultation } from 'src/app/core/models/consultation';
import { AppState } from 'src/app/core/store/app.states';
import { updateConsultation } from 'src/app/core/store/consultation/consultation.action';
import { selectStatusConsultations } from 'src/app/core/store/consultation/consultation.selector';

@Component({
  selector: 'app-motif-consultation',
  templateUrl: './motif-consultation.component.html',
  styleUrls: ['./motif-consultation.component.scss']
})
export class MotifConsultationComponent implements OnInit {
  @Output() stepEmitter = new EventEmitter<any>();
  //@ts-ignore
  @Input() consultation: Consultation
  values: any[] = [];
  //@ts-ignore
  public motifForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.motifForm = this.fb.group({
      //@ts-ignore
      motifComplaint: this.fb.control([]),
      indexStep: this.fb.control(0),
      lastTimeDuration: this.fb.control(new Date()),
    });
  }

  ngOnInit(): void {
    console.log('lol',this.consultation)
    this.motifForm.get('motifComplaint')?.setValue(this.consultation.motifComplaint)
    
  }

  addMotif(){

    let payload = this.motifForm.value
    this.store.dispatch(updateConsultation({payload, id:this.route.snapshot.paramMap.get('id')}));
    this.store.select(selectStatusConsultations).subscribe((status) => {
      if (status == 'SUCCESS') {
        // window.location.reload();
      }
    });
    this.stepEmitter.emit(2)
  }

}
