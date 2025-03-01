import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { map } from 'leaflet';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogTablbordComponent } from '../dialog-tablbord/dialog-tablbord.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.states';
import { ULC } from 'src/app/core/models/ulc';
import { fetchUlcs } from 'src/app/core/store/ulc/ulc.action';
import { selectLoadingUlcs, selectUlcPayload } from 'src/app/core/store/ulc/ulc.selector';
import { selectLoadingStatistics, selectStatisticPayload } from 'src/app/core/store/statistic/statistic.selector';
import { Statistic } from 'src/app/core/models/statistic';
import { fetchStatistics } from 'src/app/core/store/statistic/statistic.action';
import { selectLoadingStatisticYear, selectStatisticYearPayload } from 'src/app/core/store/statistic/statisticYear/statistic-year.selector';
import { fetchStatisticYear } from 'src/app/core/store/statistic/statisticYear/statistic-year.action';
import { MessageService } from 'primeng/api';
//@ts-ignore
import * as bk_indices from '../../../../assets/regions/bk_indices.json';
import * as cs from '../../../../assets/regions/cs.json';
import * as daraa_tafilalt from '../../../../assets/regions/daraa_tafilalt.json';
import * as eod from '../../../../assets/regions/eod.json';
import * as fes_meknes from '../../../../assets/regions/fes_meknes.json';
import * as go from '../../../../assets/regions/go.json';
import * as lsa from '../../../../assets/regions/lsa.json';
import * as ms from '../../../../assets/regions/ms.json';
import * as orientl from '../../../../assets/regions/orientl.json';
import * as rabat_sal_kenit from '../../../../assets/regions/rabat_sal_kenit.json';
import * as sm from '../../../../assets/regions/sm.json';
import * as tta from '../../../../assets/regions/tta.json';

interface Region {
  name: string;
  code: string;
}
interface Province {
  name: string;
  code: string;
}
interface Hopital {
  name: string;
  code: string;
}
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false,
  styleUrls: ['./dashboard.component.scss'],
  providers: [DialogService,MessageService]
})
export class DashboardComponent implements OnInit {
  regions: Region[] | undefined;
  selectedRegion: Region | undefined;

  province : Province[] | undefined;
  selectedProvince: Province | undefined;

  hopital : Hopital[] | undefined;
  selectedHopital: Hopital | undefined;
  rangeDates: Date[] | undefined;
  tauxForDropDownUlc: [] = []
  tauxForDropDownUmmc: [] = []
  selectedTaux: any = { name: "Taux de péremption", value: "taux_peremption" }
  REGIONS = {
        bk_indices, cs, daraa_tafilalt, eod, fes_meknes, go, lsa, ms, orientl, rabat_sal_kenit, sm, tta
    }
  
  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;


 
  isULCsLoading$ = this.store.select(selectLoadingUlcs)
  isUlcStatisticLoading$ = this.store.select(selectLoadingStatistics)
  isUlcStatisticYearLoading$ = this.store.select(selectLoadingStatisticYear)
  ulcs: ULC[] = []
  statistic: Statistic[] = []
  markers = [];
  initialMarkers = [];
  showInitialMarkers = false;
  currentUlc : ULC;
  currentUmmc : any;
  filterYearPerTaux = ['taux_peremption']
  geoJsonLayer: any

  icons = {
    uclGreen: L.icon({
      iconUrl:
        '../../../../assets/markers/ulcGreen.png',
      iconSize: [55, 55], // size of the icon
      shadowSize: [41, 41], // size of the shadow
      // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    }),
    ulcYellow: L.icon({
      iconUrl:
        '../../../../assets/markers/ulcYellow.png',
      iconSize: [55, 55], // size of the icon
      shadowSize: [41, 41], // size of the shadow
      // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    }),
    ulcRed: L.icon({
      iconUrl:
        '../../../../assets/markers/ulcRed.png',
      iconSize: [55, 55], // size of the icon
      shadowSize: [41, 41], // size of the shadow
      // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    }),
    ummcRed: L.icon({
      iconUrl:
        '../../../../assets/markers/ummcRed.png',
      iconSize: [55, 55], // size of the icon
      shadowSize: [41, 41], // size of the shadow
      // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    }),
    ummcGreen: L.icon({
      iconUrl:
        '../../../../assets/markers/ummcGreen.png',
      iconSize: [55, 55], // size of the icon
      shadowSize: [41, 41], // size of the shadow
      // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    }),
    ummcYellow: L.icon({
      iconUrl:
        '../../../../assets/markers/ummcYellow.png',
      iconSize: [55, 55], // size of the icon
      shadowSize: [41, 41], // size of the shadow
      // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    }),
  }



  constructor(
    private dialogService: DialogService,
    private store: Store<AppState>,
    private messageService: MessageService
  ) { }
  map: any;

  onUpload(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Fichier téléchargé avec le mode de base' });
}
  markerLocations = [
    {
      lng:-7.09262,
      lat:  31.791702,
      zoom: 10,
    },
  ];
  taux_peremption: any;
  taux_occupation: any;
  taux_proche_perime: any;
  taux_rupture: any;
  taux_disponibilite_a: any;
  taux_disponibilite_b: any;
  taux_disponibilite_c: any;
  taux_proche_penuerie: any;
  taux_prescription: any;
  taux_couverture: any;
  taux_adoption: any;
  databar : any;
  databardouble : any;

  options: any;
  optionsdata: any;
  optionsdatadouble : any;

  ngAfterViewInit() {
    this.map = map('map').setView([33.589886,-7.603869 ], 6);
    
    L.tileLayer('https://mt.google.com/vt/lyrs=m&gl=ma&x={x}&y={y}&z={z}', {
    }).addTo(this.map);

    Object.keys(this.REGIONS).forEach(regionKey => {
      console.log(regionKey); // Key (e.g., 'bk_indices')
      //@ts-ignore
      console.log(this.REGIONS[regionKey]); // Value (e.g., JSON data for bk_indices)
      //@ts-ignore
      this.geoJsonLayer = L.geoJSON((this.REGIONS[regionKey] as any).default, {
        style: {
          color: 'blue',  // Border color
          weight: 2,
          fillColor: 'lightblue',  // Fill color
          fillOpacity: 0.5
        }
      }).addTo(this.map);
    });
    
    
  }

  addMarkers() {
    this.markers.forEach((m) => this.map.removeLayer(m));
    this.markers = [];
   // Initialize an array to keep track of markers
    this.markers = [];

    // Store the initial state of markers
    this.initialMarkers = []; 

// Loop through ULCs and create markers
    this.ulcs.forEach((ulc) => {
      //@ts-ignore
      let AVG = this.getAvgDisponibiliteA(ulc.statistics)
      let ULCICON = (AVG >= 0 && AVG < 34) ? this.icons.ulcRed : ((AVG >= 34 && AVG <= 66) ? this.icons.ulcYellow : this.icons.uclGreen)
      const marker = L.marker([ulc.position_x, ulc.position_y], { icon: ULCICON })
        .addTo(this.map)
        .bindTooltip(
          `<div>
              <h4>ULC: <span style="color: #25265E" >${ulc.name}</span></h4>
              <h4>Nbr UMMC: <span style="color: #25265E" >${ulc.ummcs.length}</span></h4>
              <h4>Taux de disponibilité A: <span style="color: #25265E" >${AVG.toFixed(2)}%</span></h4>
           </div>`,
          { 
              permanent: false, 
              direction: "top", 
              className: "custom-tooltip"
          }
      );

      // Store the marker in the array
      //@ts-ignore
      this.markers.push(marker);
      //@ts-ignore
      this.initialMarkers.push(marker); // Save initial markers

      // Add click event to the marker
      marker.on('click', () => {
        this.showInitialMarkers = true
        // Zoom and center the map on the clicked marker
        this.map.setView([ulc.position_x, ulc.position_y], 7);
        // Remove all markers from the map
        this.markers.forEach((m) => this.map.removeLayer(m));
        this.markers = [];

        // Add only the clicked marker
        //@ts-ignore
        // let AVG = this.getAvgDisponibiliteA(ulc.statistics)
        // let ULCICON = (AVG >= 0 && AVG <= 33) ? this.icons.ulcRed : ((AVG >= 34 && AVG <= 66) ? this.icons.ulcYellow : this.icons.uclGreen)
        // const clickedMarker = L.marker([ulc.position_x, ulc.position_y], { icon:  ULCICON})
        //   .addTo(this.map)

        // Loop through related ummcs and add markers
        ulc.ummcs.forEach((ummc) => {
          //@ts-ignore
          let AVG = this.getAvgDisponibiliteA(ummc.statistics)
          let UMMCICON = (AVG >= 0 && AVG < 34) ? this.icons.ummcRed : ((AVG >= 34 && AVG <= 66) ? this.icons.ummcYellow : this.icons.ummcGreen)
          const ummcMarker = L.marker([ummc.position_x, ummc.position_y], { icon:  UMMCICON})
            .addTo(this.map)
            .bindTooltip(
              `<div>
                  <h4><span style="color: #25265E" >${ummc.name}</span></h4>
                  <h4>Taux de disponibilité A: <span style="color: #25265E" >${AVG.toFixed(2)}%</span></h4>
               </div>`,
              { 
                  permanent: false, 
                  direction: "top", 
                  className: "custom-tooltip"
              }
          );

          // Store the ummc markers to be removed later
          //@ts-ignore
          this.markers.push(ummcMarker);
          ummcMarker.on('click', ()=> {
            this.currentUmmc = ummc;
            this.store.dispatch(fetchStatistics({payload: {type: 'ummc', ummc_id: ummc.id, start_date: this.formateDates()[0], end_date: this.formateDates()[1]}}));
          })
        });
        console.log('Clicked ULC:', ulc);
        this.currentUlc = ulc
        //@ts-ignore
        this.store.dispatch(fetchStatistics({payload: {type: 'ummc', ulc_id: ulc.id, start_date: this.formateDates()[0], end_date: this.formateDates()[1]}}));
        let payload = {taux: this.filterYearPerTaux, start_date: this.formateDates()[0], end_date: this.formateDates()[1], ulc_id: this.currentUlc?.id}
        this.store.dispatch(fetchStatisticYear({payload}));
        // Store the clicked marker in the array
        //@ts-ignore
        // this.markers.push(clickedMarker);
      });
    });


  }

  getAvgDisponibiliteA(stats: any){
    let result = 0;
    stats.forEach((s:any) => {
      result += parseFloat(s.taux_disponibilite_a)
    })
    console.log('AVG: ',result / stats.length)
    return result / stats.length
  }

  showInitial(){
    //@ts-ignore
    this.currentUlc = null;
    this.currentUmmc = null;
    this.filterYearPerTaux = ['taux_peremption']
    this.selectedTaux = { name: "Taux de péremption", value: "taux_peremption" }
    let payload = {taux: this.filterYearPerTaux, start_date: this.formateDates()[0], end_date: this.formateDates()[1], ulc_id: this.currentUlc?.id}
    this.store.dispatch(fetchStatisticYear({payload}));
    this.map.setView([33.589886,-7.603869], 6);
    this.showInitialMarkers = false;
    this.store.dispatch(fetchStatistics({payload: {type: 'ulc', start_date: this.formateDates()[0], end_date: this.formateDates()[1]}}));
    // Remove all markers from the map
    this.markers.forEach((m) => this.map.removeLayer(m));
    this.markers = [];

    // Restore the initial markers
    this.initialMarkers.forEach((marker) => {
      //@ts-ignore
      marker.addTo(this.map);
      //@ts-ignore
      this.markers.push(marker);
    });
  }

  initialDatesFilter(){
    const today = new Date();

    // Get first date of the previous month
    const firstDateOfPreviousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

    // Get last date of the previous month
    const lastDateOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    console.log(firstDateOfPreviousMonth); // Output: First date of the previous month
    console.log(lastDateOfPreviousMonth);  // Output: Last date of the previous month

    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    const firstDateFormatted = formatDate(firstDateOfPreviousMonth);
    const lastDateFormatted = formatDate(lastDateOfPreviousMonth);
    
    this.rangeDates = [firstDateOfPreviousMonth, lastDateOfPreviousMonth]
}


  onTauxChange(event: any){
    this.filterYearPerTaux = [event.value.value]
    
    let payload = {taux: this.filterYearPerTaux, start_date: this.formateDates()[0], end_date: this.formateDates()[1], ulc_id: this.currentUlc?.id}
  
    this.store.dispatch(fetchStatisticYear({payload}));
  }

  calculateMoyenGlobalTaux(data: any){
    let result = 0
    data.datasets[0].data?.forEach((value: any) => {
      //@ts-ignore
      result += parseFloat(value)
      
    });
    return parseFloat((result / data.datasets[0].data?.length).toString()).toFixed(2) == 'NaN' ? 0 : parseFloat((result / data.datasets[0].data?.length).toString()).toFixed(2)
  }

  ngOnInit() {
    
    this.initialDatesFilter()
    this.store.dispatch(fetchUlcs({payload: {start_date: this.formateDates()[0], end_date: this.formateDates()[1]}}));
    //@ts-ignore
    this.store.dispatch(fetchStatistics({payload: {type: 'ulc', start_date: this.formateDates()[0], end_date: this.formateDates()[1]}}));
    this.store.dispatch(fetchStatisticYear({payload: {taux: this.filterYearPerTaux, start_date: this.formateDates()[0], end_date: this.formateDates()[1]}}));
    this.store.select(selectUlcPayload).subscribe(ulcs => {
      this.ulcs = ulcs
      this.addMarkers();
    });
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const chartColors = {
      textColor: documentStyle.getPropertyValue('--text-color'),
      textColorSecondary: documentStyle.getPropertyValue('--text-color-secondary'),
      surfaceBorder: documentStyle.getPropertyValue('--surface-border'),
      borderColor: documentStyle.getPropertyValue('--blue-500'),
      backgroundColor: '#d3e6ff',
    };

    const createChartConfig = () => ({
      labels: [],
      datasets: [{
        label: '',
        data: [],
        fill: true,
        borderColor: chartColors.borderColor,
        tension: 0.4,
        backgroundColor: chartColors.backgroundColor,
      }],
    });

    const chartKeys = [
      'taux_peremption', 
      'taux_occupation', 
      'taux_proche_perime', 
      'taux_rupture', 
      'taux_disponibilite_a', 
      'taux_disponibilite_b', 
      'taux_disponibilite_c',
      'taux_adoption',
      'taux_couverture',
      'taux_prescription',
      'taux_proche_penuerie'
    ];

    // Initialize charts
    

    this.store.select(selectStatisticPayload).subscribe(statistic => {
      //@ts-ignore
      chartKeys.forEach(key => this[key] = createChartConfig());
      this.statistic = statistic;

      statistic.forEach(data => {
        chartKeys.forEach(key => {
          //@ts-ignore
          this[key].labels.push(data.date);
          //@ts-ignore
          this[key].datasets[0].data.push(data[key] == null ? 0 : data[key]);
        });
      });

      // Trigger change detection once for all charts
      //@ts-ignore
      chartKeys.forEach(key => this[key] = { ...this[key] });
    });





    this.regions = [
      { name: 'Grand Casablanca', code: 'GC' },
      { name: 'Chaouia-Ouardigha', code: 'CO' },
      { name: 'Fès-Boulemane', code: 'FB' },
      { name: 'Guelmim-Es Semara', code: 'GS' },
      { name: 'Meknès-Tafilalet', code: 'MT' }
    ];
    this.province = [
      { name: 'Casablanca', code: 'CO' },
      { name: 'Mohammédia', code: 'FB' },
      { name: 'Nouaceur', code: 'GC' },
      { name: 'Médiouna', code: 'GS' },
    ];
    this.hopital = [
      { name: 'Casablanca', code: 'CO' },
      { name: 'Mohammédia', code: 'FB' },
      { name: 'Nouaceur', code: 'GC' },
      { name: 'Médiouna', code: 'GS' },
    ];
    //@ts-ignore
    this.tauxForDropDownUlc = [
      { name: "Taux de péremption", value: "taux_peremption" },
      { name: "Taux d'occupation", value: "taux_occupation" },
      { name: "Taux de proche périmé", value: "taux_proche_perime" },
      { name: "Taux de rupture", value: "taux_rupture" },
      { name: "Taux de disponibilité A", value: "taux_disponibilite_a" },
      { name: "Taux de disponibilité B", value: "taux_disponibilite_b" },
      { name: "Taux de disponibilité C", value: "taux_disponibilite_c" },
    ];

    //@ts-ignore
    this.tauxForDropDownUmmc = [
      { name: "Taux de péremption", value: "taux_peremption" },
      { name: "Taux d'occupation", value: "taux_occupation" },
      { name: "Taux de proche périmé", value: "taux_proche_perime" },
      { name: "Taux de rupture", value: "taux_rupture" },
      { name: "Taux d'adoption", value: "taux_adoption" },
      { name: "Taux couverture", value: "taux_couverture" },
      { name: "Taux prescription", value: "taux_prescription" },
      { name: "Taux de pneurie", value: "taux_proche_penuerie" },
      { name: "Taux de disponibilité A", value: "taux_disponibilite_a" },
      { name: "Taux de disponibilité B", value: "taux_disponibilite_b" },
      { name: "Taux de disponibilité C", value: "taux_disponibilite_c" },
    ];
    

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          display: false
        },
      },
      scales: {
        x: {
          display: false
      },
        y: {
          display: false
        },
      },
    };
    //data bar

    this.store.select(selectStatisticYearPayload).subscribe(statistic => {
      // Extract labels for dates
      //@ts-ignore
      const labels = statistic.map(item => item.date);
    
      // Prepare datasets for each ULC
      const datasets: any[] = [];
    
      statistic.forEach((item: any, index: number) => {
        item.entity.forEach((entity: any) => {
          // Check if dataset already exists for this ULC
          //@ts-ignore
          let dataset = datasets.find(ds => ds.label === entity.entity_name);
    
          // If not, create a new one
          if (!dataset) {
            //@ts-ignore
            dataset = {
              label: entity.entity_name,
              data: Array(statistic.length).fill(0), // Initialize with zeros
              fill: false,
              borderColor: entity.entity_color, 
              tension: 0.4,
              hidden: false,
            };
            //@ts-ignore
            datasets.push(dataset);
          }
    
          // Set the taux_peremption for the corresponding date index
          //@ts-ignore
          dataset.data[index] = parseFloat(entity[this.filterYearPerTaux]);
        });
      });
    
      this.databar = {
        labels: labels,
        datasets: datasets
      };
    });
    


  //   this.databar = {
  //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //           datasets: [
  //               {
  //                   label: 'First Dataset',
  //                   data: [65, 59, 80, 81, 56, 55, 40],
  //                   fill: false,
  //                   borderColor: '#3357FF',
  //                   tension: 0.4
  //               },
  //             //   {
  //             //       label: 'Second Dataset',
  //             //       data: [28, 48, 40, 19, 86, 27, 90],
  //             //       fill: false,
  //             //       borderColor: documentStyle.getPropertyValue('--pink-500'),
  //             //       tension: 0.4
  //             //   },
  //             //   {
  //             //       label: 'Trow Dataset',
  //             //       data: [15, 20, 60, 17, 90, 30, 93],
  //             //       fill: false,
  //             //       borderColor: documentStyle.getPropertyValue('--yellow-500'),
  //             //       tension: 0.4
  //             //   },
  //             //   {
  //             //     label: 'four Dataset',
  //             //     data: [62, 51, 33, 65, 80, 40, 12],
  //             //     fill: false,
  //             //     borderColor: documentStyle.getPropertyValue('--purple-500'),
  //             //     tension: 0.4
  //             // },
  //             // {
  //             //   label: 'five Dataset',
  //             //   data: [100, 30, 50, 70, 55, 33, 81],
  //             //   fill: false,
  //             //   borderColor: documentStyle.getPropertyValue('--rose-500'),
  //             //   tension: 0.4
  //             // },
  //             // {
  //             //   label: '6 Dataset',
  //             //   data: [120, 90, 70, 33, 15, 17, 25],
  //             //   fill: false,
  //             //   borderColor: documentStyle.getPropertyValue('--stone-500'),
  //             //   tension: 0.4
  //             // },
  //             // {
  //             //   label: '7 Dataset',
  //             //   data: [58, 35, 120, 65, 15, 23, 77],
  //             //   fill: false,
  //             //   borderColor: documentStyle.getPropertyValue('--cyan-500'),
  //             //   tension: 0.4
  //             // },
  //             // {
  //             //   label: '8 Dataset',
  //             //   data: [58, 35, 120, 65, 15, 23, 77],
  //             //   fill: false,
  //             //   borderColor: documentStyle.getPropertyValue('--cyan-500'),
  //             //   tension: 0.4
  //             // },
  //             // {
  //             //   label: '9 Dataset',
  //             //   data: [120, 35, 120, 65, 15, 23, 77],
  //             //   fill: false,
  //             //   borderColor: documentStyle.getPropertyValue('--cyan-500'),
  //             //   tension: 0.4
  //             // },
  //             // {
  //             //   label: '10 Dataset',
  //             //   data: [26, 35, 120, 65, 15, 23, 77],
  //             //   fill: false,
  //             //   borderColor: documentStyle.getPropertyValue('--cyan-500'),
  //             //   tension: 0.4
  //             // },
  //             // {
  //             //   label: '11 Dataset',
  //             //   data: [69, 35, 120, 65, 15, 23, 77],
  //             //   fill: false,
  //             //   borderColor: documentStyle.getPropertyValue('--cyan-500'),
  //             //   tension: 0.4
  //             // },
  //             // {
  //             //   label: '12 Dataset',
  //             //   data: [23, 35, 120, 65, 15, 23, 77],
  //             //   fill: false,
  //             //   borderColor: documentStyle.getPropertyValue('--cyan-500'),
  //             //   tension: 0.4
  //             // },
  //             // {
  //             //   label: '12 Dataset',
  //             //   data: [23, 35, 120, 65, 15, 23, 77],
  //             //   fill: false,
  //             //   borderColor: documentStyle.getPropertyValue('--cyan-500'),
  //             //   tension: 0.4
  //             // },
  //             // {
  //             //   label: '13 Dataset',
  //             //   data: [96, 35, 132, 65, 53, 23, 77],
  //             //   fill: false,
  //             //   borderColor: documentStyle.getPropertyValue('--cyan-500'),
  //             //   tension: 0.4
  //             // },
  //             // {
  //             //   label: '14 Dataset',
  //             //   data: [120, 99, 85, 65, 32, 23, 77],
  //             //   fill: false,
  //             //   borderColor: documentStyle.getPropertyValue('--cyan-500'),
  //             //   tension: 0.4
  //             // },
  //             // {
  //             //   label: '15 Dataset',
  //             //   data: [20, 15, 150, 88, 15, 23, 123],
  //             //   fill: false,
  //             //   borderColor: documentStyle.getPropertyValue('--cyan-500'),
  //             //   tension: 0.4
  //             // },
  //             // {
  //             //   label: '16 Dataset',
  //             //   data: [56, 35, 120, 65, 15, 23, 77],
  //             //   fill: false,
  //             //   borderColor: documentStyle.getPropertyValue('--cyan-500'),
  //             //   tension: 0.4
  //             // },
  //             // {
  //             //   label: '17 Dataset',
  //             //   data: [88, 35, 120, 65, 15, 23, 77],
  //             //   fill: false,
  //             //   borderColor: documentStyle.getPropertyValue('--cyan-500'),
  //             //   tension: 0.4
  //             // },
  //             // {
  //             //   label: '18 Dataset',
  //             //   data: [192, 35, 120, 65, 15, 23, 77],
  //             //   fill: false,
  //             //   borderColor: documentStyle.getPropertyValue('--cyan-500'),
  //             //   tension: 0.4
  //             // },
  //             // {
  //             //   label: '19 Dataset',
  //             //   data: [165, 35, 120, 65, 15, 23, 77],
  //             //   fill: false,
  //             //   borderColor: documentStyle.getPropertyValue('--cyan-500'),
  //             //   tension: 0.4
  //             // },
  //             // {
  //             //   label: '20 Dataset',
  //             //   data: [215, 35, 120, 65, 15, 23, 77],
  //             //   fill: false,
  //             //   borderColor: documentStyle.getPropertyValue('--cyan-500'),
  //             //   tension: 0.4
  //             // }
  //           ]
  // };

  this.optionsdata = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
        legend: {
            labels: {
                color: textColor
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: textColorSecondary
            },
            grid: {
                color: surfaceBorder,
                drawBorder: false
            }
        },
        y: {
            ticks: {
                color: textColorSecondary
            },
            grid: {
                color: surfaceBorder,
                drawBorder: false
            }
        }
      }

    };

    //chart bar double 
    this.databardouble = {
      labels: ['ELOXATINE', 'VIVALAN', 'MYNAZOL', 'NOCAND', 'GASTROLIBER', 'ZELDOX', 'AVT','HYDROXO','MUSARIL','CLAFORAN','RIFASONE','AMOXIL','AMOXIL','UNASYN','DILATOR','FORMOFTIL','UMILINE','GLEMA','XANTHIUM','GYNOMYK','FLUMAX','TRIFAX'],
      datasets: [
          {
              type: 'bar',
              label: 'Dataset 1',
              backgroundColor: documentStyle.getPropertyValue('--blue-500'),
              data: [50, 25, 12, 48, 90, 76, 42,21, 84, 24, 75, 37, 65, 34,60, 50, 40, 30, 20, 10,20,30]
          },
          {
              type: 'bar',
              label: 'Dataset 2',
              backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
              data: [21, 84, 24, 75, 37, 65, 34,50, 25, 12, 48, 90, 76, 42,5, 34,60, 50, 40, 30, 20, 10]
          }
      ]
  }; 

  this.optionsdatadouble = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
          tooltip: {
              mode: 'index',
              intersect: false
          },
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              stacked: true,
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              stacked: true,
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }
      }
  };
  }

  formateDates(){
    //@ts-ignore
    const formattedDates = this.rangeDates.map(date => {
      // Get the local date parts
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getDate()).padStart(2, '0');
      
      // Format as YYYY-MM-DD
      return `${year}-${month}-${day}`;
   });

   return formattedDates
  }

  filterByDates(){
    this.showInitialMarkers = false;
    //@ts-ignore
    this.currentUlc = null;
    this.currentUmmc = null;
    this.map.setView([33.589886,-7.603869 ], 6);
    this.store.dispatch(fetchUlcs({payload: {start_date: this.formateDates()[0], end_date: this.formateDates()[1]}}));
    this.store.dispatch(fetchStatisticYear({payload: {taux: this.filterYearPerTaux, start_date: this.formateDates()[0], end_date: this.formateDates()[1]}}));


    //@ts-ignore
    if(this.rangeDates){
      
    //  if(!this.showInitialMarkers){
      this.store.dispatch(fetchStatistics({payload: {type: 'ulc', start_date: this.formateDates()[0], end_date: this.formateDates()[1]}}))
    //  }else{
    //   //@ts-ignore
    //   this.store.dispatch(fetchStatistics({payload: {type: 'ummc', ulc_id: this.currentUlc.id, start_date: this.formateDates()[0], end_date: this.formateDates()[1]}}))
    //  }
    }
  }

  DetailTablBoard() {
    const ref = this.dialogService.open(DialogTablbordComponent, {
      header: 'TAUX DE PÉREMPTION',
      width: '50%',
      data: {}
    });

    ref.onClose.subscribe((data) => {
      console.log('Dialog closed with data:', data);
    });
  }
}
