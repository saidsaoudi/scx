export const MENU = [
    {
        
        'icon': 'pi pi-users',
        'label': 'Rapports Globaux',
        'showSubMenu': false,
        'children': [
            {   
                'routerLink': 'stockimages',
                'icon': 'pi pi-file-export',
                'label': 'Archive des images de stock',
                'showSubMenu': false,
                // 'children': [
                //     {
                //         'icon': 'pi-chart-line',
                //         'label': 'child 2',
                //         'showSubMenu': false,
                //         'children': [
                //             {
                //                 'routerLink': 'dashboard',
                //                 'icon': 'pi-chart-line',
                //                 'label': 'child 3',
                //             },
                //         ]
                //     },
                // ]
            },
            {
                'routerLink': 'dashboard',
                'icon': 'pi pi-file-export',
                'label': 'Archive des dispensations VS',
            },
            {
                'routerLink': 'dashboard',
                'icon': 'pi pi-user',
                'label': 'Affectation des UMMcs',
            },
            {
                'routerLink': 'dashboard',
                'icon': 'pi pi-eye',
                'label': 'Image de stock',
            },
        ]
    },
    {
        'routerLink': 'groupes',
        'icon': 'pi pi-truck',
        'label': 'Expédition',
    },
    {
        'routerLink': 'departements',
        'icon': 'pi pi-eye',
        'label': 'Traçabilité des exports'
    },
    {
        'routerLink': 'parametrage/templates',
        'icon': 'pi pi-shopping-cart',
        'label': 'Approvisionnements'
    },
    {
        'routerLink': 'receptions',
        'icon': 'pi pi-download',
        'label': 'Réceptions',
    },
    {
        'routerLink': 'receptions',
        'icon': 'pi pi-copy',
        'label': 'Dispensation',
    },
    {
        'routerLink': 'receptions',
        'icon': 'pi pi-arrow-up',
        'label': 'Sorties',
    },
    {
        'routerLink': 'receptions',
        'icon': 'pi pi-arrows-v',
        'label': 'Mouvements',
    },
    {
        'routerLink': 'receptions',
        'icon': 'pi pi-arrow-circle-left',
        'label': 'Retours',
    },
    {
        'icon': 'pi pi-file-export',
        'label': 'Rapports',
        'showSubMenu': false,
        'children': [
            {
                'icon': 'pi pi-chart-line',
                'label': 'child 1',
                'showSubMenu': false,
            },
            {
                'routerLink': 'dashboard',
                'icon': 'pi pi-chart-line',
                'label': 'menu 1',
            },
        ]
    },
    {
        'routerLink': 'receptions',
        'icon': 'pi pi-sliders-v',
        'label': 'Paramètres',
    },
    {
        'icon': 'pi pi-cog',
        'label': 'Configurations',
        'showSubMenu': false,
        'children': [
            {
                'icon': 'pi pi-chart-line',
                'label': 'child 1',
                'showSubMenu': false,
            },
            {
                'routerLink': 'dashboard',
                'icon': 'pi pi-chart-line',
                'label': 'menu 1',
            },
        ]
    },
    {
        'routerLink': 'receptions',
        'icon': 'pi pi-receipt',
        'label': 'Manuel d\'utilisation',
    },
];