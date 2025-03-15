import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { map } from 'leaflet';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogTablbordComponent } from '../dialog-tablbord/dialog-tablbord.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.states';
import { ULC } from 'src/app/core/models/ulc';
import { fetchUlcs } from 'src/app/core/store/ulc/ulc.action';
import { selectLoadingUlcs, selectUlcPayload } from 'src/app/core/store/ulc/ulc.selector';
import { selectLoadingMinMaxStatistics, selectLoadingStatistics, selectMinMaxStatistic, selectStatisticPayload } from 'src/app/core/store/statistic/statistic.selector';
import { Statistic } from 'src/app/core/models/statistic';
import { fetchMinMaxStatistics, fetchStatistics } from 'src/app/core/store/statistic/statistic.action';
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
import { StatisticService } from 'src/app/core/services/statistic/statistic.service';
import { FileUpload } from 'primeng/fileupload';

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
const colors = [
  "#FF5733", // Red-Orange
  "#33FF57", // Green
  "#3357FF", // Blue
  "#FF33A1", // Pink
  "#FF5733", // Orange
  "#FFD700", // Gold
  "#8A2BE2", // Blue-Violet
  "#FF1493", // Deep Pink
  "#20B2AA", // Light Sea Green
  "#D2691E", // Chocolate
  "#DC143C", // Crimson
  "#F08080", // Light Coral
  "#32CD32", // Lime Green
  "#FFD700", // Gold
  "#4682B4", // Steel Blue
  "#800080", // Purple
  "#00FA9A", // Medium Spring Green
  "#2E8B57", // Sea Green
  "#A52A2A", // Brown
  "#98FB98", // Pale Green
];

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

   // File upload component reference
   @ViewChild(FileUpload) fileUpload: FileUpload;

  isEcraser = false
  isUploading = false
  
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
  selectedEntity: any
  REGIONS = {
        bk_indices, cs, daraa_tafilalt, eod, fes_meknes, go, lsa, ms, orientl, rabat_sal_kenit, sm, tta
    }
  
  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;


 
  isULCsLoading$ = this.store.select(selectLoadingUlcs)
  isUlcStatisticLoading$ = this.store.select(selectLoadingStatistics)
  isUlcMinMaxStatisticLoading$ = this.store.select(selectLoadingMinMaxStatistics)
  isUlcStatisticYearLoading$ = this.store.select(selectLoadingStatisticYear)
  ulcs: ULC[] = []
  ulcForDropDown: [] = []
  ummcForDropDown: [] = []
  minMaxStatistics!: any
  statistic: Statistic[] = []
  markers = [];
  initialMarkers = [];
  showInitialMarkers = false;
  currentUlc : any;
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
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private statisticService: StatisticService
  ) { }
  map: any;

  onUpload(event: any): void {
    this.isUploading = true;
    const files = this.fileUpload.files;
    const file = files[0]; // Get the selected file

    if (file) {
      const formData = new FormData();
      formData.append('file', file, file.name);
      //@ts-ignore
      formData.append('isEcraser', this.isEcraser);

      // Send the file to the server (replace the URL with your actual API endpoint)
      this.statisticService.uploadFile(formData).subscribe(
        (response) => {
          this.currentUlc = null
          this.currentUmmc = null
          this.showInitialMarkers = false
          this.store.dispatch(fetchStatistics({payload: {type: 'ulc', start_date: this.formateDates()[0], end_date: this.formateDates()[1]}}));
          this.store.dispatch(fetchStatisticYear({payload: {taux: this.filterYearPerTaux, start_date: this.formateDates()[0], end_date: this.formateDates()[1]}}));
          this.isUploading = false;
          // Reset the FileUpload component
          this.fileUpload.clear();  // This will reset the file input and clear the selected files
        },
        (error) => {
          console.error('Error uploading file', error);
        }
      );
    }
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
  taux_service_medicament: any;
  taux_service_ordonnance: any;
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
      // console.log(regionKey); // Key (e.g., 'bk_indices')
      //@ts-ignore
      // console.log(this.REGIONS[regionKey]); // Value (e.g., JSON data for bk_indices)
      //@ts-ignore
      this.geoJsonLayer = L.geoJSON((this.REGIONS[regionKey] as any).default, {
        style: {
          color: 'blue',  // Border color
          weight: 1,
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
        this.selectedEntity = null
        this.ummcForDropDown = []
        //@ts-ignore
        this.ummcForDropDown.push({ name: 'Toutes les UMMCs', value: 'ALL' })
        this.showInitialMarkers = false
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
            this.ummcForDropDown.push({ name: ummc.name, value: ummc.id})
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
        // console.log('Clicked ULC:', ulc);
        this.currentUlc = ulc
        //@ts-ignore
        this.store.dispatch(fetchStatistics({payload: {type: 'ummc', ulc_id: ulc.id, start_date: this.formateDates()[0], end_date: this.formateDates()[1]}}));
        this.store.dispatch(fetchMinMaxStatistics({payload: {type: 'ummc', ulc_id: ulc.id, start_date: this.formateDates()[0], end_date: this.formateDates()[1]}}));
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
    // console.log('AVG: ',result / stats.length)
    return result / stats.length
  }

  showInitial(){
    this.selectedEntity = null
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
    this.store.dispatch(fetchMinMaxStatistics({payload: {type: 'ulc', start_date: this.formateDates()[0], end_date: this.formateDates()[1]}}));
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

    // console.log(firstDateOfPreviousMonth); // Output: First date of the previous month
    // console.log(lastDateOfPreviousMonth);  // Output: Last date of the previous month

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

  onEntityChange(event: any) {
    this.onDeleteDataByLabel(this.selectedTaux.name)
    // Determine the value to check against
    const isAll = event.value.value === 'ALL';
    // console.log(isAll, 'hhh')
  
    // Create a new datasets array based on the current datasets
    const updatedDatasets = this.databar.datasets.map((item: any) => {
      // Log the item for debugging purposes
      // console.log(item);
  
      // Set hidden based on whether the value is 'ALL' or matching the label
      item.hidden = !isAll && item.label !== event.value.name;
  
      // Return the modified item
      return item;
    });

  //@ts-ignore
    let addedTaux = [
      {
        label: this.selectedTaux.name,
        //@ts-ignore
        data: this[this.selectedTaux.value].datasets[0].data,  // example data
        borderColor: '#000000',
        tension: 0.4,
        borderWidth: 2,
    },
    ]
    // Set the new array to 'datasets' to ensure Angular detects the change
    this.databar = {
      ...this.databar,  // Keep other properties like 'labels'
      datasets: [
        ...updatedDatasets, 
        ...(isAll ? [] : addedTaux)  // Only add `addedTaux` if `isAll` is false
      ],  // Set the new datasets array
    };
    
  }

  onDeleteDataByLabel(label: string) {
    // Filter out the dataset that matches the given label
    const updatedDatasets = this.databar.datasets.filter((item: any) => item.label !== label);

    // Update the databar with the new datasets array
    this.databar = {
        ...this.databar,  // Keep other properties like 'labels'
        datasets: updatedDatasets,  // Set the new datasets array without the item to delete
    };
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
    this.store.select(selectMinMaxStatistic).subscribe(minMax => {
      //@ts-ignore
      this.minMaxStatistics = minMax
    });
    //@ts-ignore
    this.ulcForDropDown.push({ name: 'Toutes les ULCs', value: 'ALL' })
    this.initialDatesFilter()
    this.store.dispatch(fetchUlcs({payload: {start_date: this.formateDates()[0], end_date: this.formateDates()[1]}}));
    //@ts-ignore
    this.store.dispatch(fetchMinMaxStatistics({payload: {type: 'ulc', start_date: this.formateDates()[0], end_date: this.formateDates()[1]}}));
    this.store.dispatch(fetchStatistics({payload: {type: 'ulc', start_date: this.formateDates()[0], end_date: this.formateDates()[1]}}));
    this.store.dispatch(fetchStatisticYear({payload: {taux: this.filterYearPerTaux, start_date: this.formateDates()[0], end_date: this.formateDates()[1]}}));
    this.store.select(selectUlcPayload).subscribe(ulcs => {
      this.ulcs = ulcs
      
      ulcs.forEach((u: any) => {
        //@ts-ignore
        this.ulcForDropDown.push({ name: u.name, value: u.id})
      })
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
      'taux_service_ordonnance',
      'taux_service_medicament',
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
          this[key].labels.push(data.formatted_date);
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
      { name: "Taux de service ordonnance", value: "taux_service_ordonnance" },
      { name: "Taux de service medicament", value: "taux_service_medicament" },
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
      const labels = statistic.map(item => item.formatted_date);
      
      // Prepare datasets for each ULC
      const datasets: any[] = [];
      const isAll = !this.selectedEntity || this.selectedEntity?.value === 'ALL';
    
      statistic.forEach((item: any, index: number) => {
        item.entity.forEach((entity: any) => {
          // Check if dataset already exists for this ULC
          let dataset = datasets.find(ds => ds.label === entity.entity_name);
    
          // If dataset doesn't exist, create a new one
          if (!dataset) {
            dataset = {
              label: entity.entity_name,
              data: Array(statistic.length).fill(0), // Initialize with zeros
              fill: false,
              borderColor: this.getRandomUniqueColor(), //entity.entity_color,
              tension: 0.4,
              hidden: !isAll && this.selectedEntity?.name !== entity.entity_name, // Set hidden based on selectedEntity
            };
            datasets.push(dataset);
          }
    
          // Set the taux_peremption for the corresponding date index
          //@ts-ignore
          dataset.data[index] = parseFloat(entity[this.filterYearPerTaux]);
        });
      });
    
      // Update the databar with new datasets
      this.databar = {
        labels,
        datasets: datasets.map(item => ({
          ...item,
          hidden: !isAll && item.label !== this.selectedEntity?.name, // Adjust visibility based on selectedEntity
        })),
      };

      this.onDeleteDataByLabel(this.selectedTaux.name)

      //@ts-ignore
      let addedTaux = [
        {
          label: this.selectedTaux.name,
          //@ts-ignore
          data: this[this.selectedTaux.value].datasets[0].data,
          borderColor: '#000000',
          tension: 0.4,
          borderWidth: 2,
      },
      ]
      // Set the new array to 'datasets' to ensure Angular detects the change
      this.databar = {
        ...this.databar,  // Keep other properties like 'labels'
        datasets: [
          ...this.databar.datasets, 
          ...(isAll ? [] : addedTaux)  // Only add `addedTaux` if `isAll` is false
        ],  // Set the new datasets array
      };

    });
    


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
    this.selectedEntity = null;
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
      this.store.dispatch(fetchMinMaxStatistics({payload: {type: 'ulc', start_date: this.formateDates()[0], end_date: this.formateDates()[1]}}))
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

  getMinMax(taux: any) {
    return {
      min: {
        entity_name: this.minMaxStatistics?.[taux]?.min?.entity_name,
        value: parseFloat(this.minMaxStatistics?.[taux]?.min?.value).toFixed(2)
      },
      max: {
        entity_name: this.minMaxStatistics?.[taux]?.max?.entity_name,
        value: parseFloat(this.minMaxStatistics?.[taux]?.max?.value).toFixed(2)
      }
    };
  }
  // Function to get random unique color
  getRandomUniqueColor() {
    // Shuffle the array and return the first color
    const shuffledColors = [...colors]; // Copy the array to avoid mutating the original
    for (let i = shuffledColors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledColors[i], shuffledColors[j]] = [shuffledColors[j], shuffledColors[i]]; // Swap elements
    }
    return shuffledColors[0]; // Return the first color from shuffled array
  }

  
}
