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
  selector: 'app-planification-aps',
  standalone:false,
  templateUrl: './planification-aps.component.html',
  styleUrl: './planification-aps.component.scss'
})
export class PlanificationApsComponent {
  headerColumuns = [
    'DCI',
    'Hay hassani',
    'Benslimane',
    'El Jadida',
    'SSidi Bennour',
    'Berrechid',
    'Settat',
    'Ben Msik',
    'Aîn Sebàa',
    'Mohemmadia',
    'Nouaceur'
  ];
  produits: Produits[] | undefined;
  selectedProduits: Produits | undefined;

  dci: Dci[] | undefined;
  selectedDci: Dci | undefined;


  rangeDates: Date[] | undefined;

}
