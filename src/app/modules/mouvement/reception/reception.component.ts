import { Component } from '@angular/core';

interface Produits {
  name: string;
  code: string;
}
interface Dci{
  name: string;
  code: string;
}

@Component({
  selector: 'app-reception',
  standalone:false,
  templateUrl: './reception.component.html',
  styleUrl: './reception.component.scss'
})
export class ReceptionComponent {
  checked: boolean = false;
  headerColumuns = [
    'Type de mouvement',
    'Origine',
    'Destination',
    'Dépôt',
    'Quantité totale',
    'NB des ref',
    'POD',
    'Date opération',
  ];
  produits: Produits[] | undefined;
  selectedProduits: Produits | undefined;

  dci: Dci[] | undefined;
  selectedDci: Dci | undefined;


  rangeDates: Date[] | undefined;

}
