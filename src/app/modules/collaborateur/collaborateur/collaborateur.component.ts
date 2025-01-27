import { Component, Input, OnInit } from '@angular/core';
import { Collaborateur } from 'src/app/core/models/collaborateur';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-collaborateur',
  templateUrl: './collaborateur.component.html',
  styleUrls: ['./collaborateur.component.scss']
})
export class CollaborateurComponent implements OnInit {
  @Input() collaborateur!: Collaborateur
  storage_path = environment.STORAGE
  constructor() { }

  ngOnInit(): void {
  }

  countOfSubordonnes(){
    return this.collaborateur.subordonnes.length > 4 ? this.collaborateur.subordonnes.length - 4 : 0
  }

}
