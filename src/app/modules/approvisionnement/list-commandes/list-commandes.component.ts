import { Component } from '@angular/core';

interface Produits {
  name: string;
  code: string;
}
interface Fournisseur{
  name: string;
  code: string;
}
interface Destination{
  name: string;
  code: string;
}
@Component({
  selector: 'app-list-commandes',
  standalone:false,
  templateUrl: './list-commandes.component.html',
  styleUrl: './list-commandes.component.scss'
})
export class ListCommandesComponent {
  headerColumuns = [
    'N° commande',
    'N° de Produits',
    'QTY total',
    'Date de passation de commande',
    'Date de livraison proposée',
    'Fournisseur',
    'Destination',
    'Date de livraison réelle',
    'Statut'
  ];
  produits: Produits[] | undefined;
  selectedProduits: Produits | undefined;

  fournisseur: Fournisseur[] | undefined;
  selectedFournisseur: Fournisseur | undefined;

  destination: Destination[] | undefined;
  selectedDestination: Destination | undefined;

  rangeDates: Date[] | undefined;
}
