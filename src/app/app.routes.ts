import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/inicio',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'carrito',
    loadComponent: () => import('./carrito/carrito.page').then( m => m.CarritoPage)
  },
  {
    path: 'inicio',
    loadComponent: () => import('./inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./nosotros/nosotros.page').then( m => m.NosotrosPage)
  },
  {
    path: 'mas',
        loadComponent: () => import('./mas/mas.page').then(m => m.MasPage),
    },
  {
    path: 'canjear-puntos',
    loadComponent: () => import('./canjear-puntos/canjear-puntos.page').then( m => m.CanjearPuntosPage)
  },
];
