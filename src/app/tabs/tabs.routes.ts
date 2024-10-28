import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('../inicio/inicio.page').then((m) => m.InicioPage),
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('../perfil/perfil.page').then((m) => m.PerfilPage),
      },
      {
        path: 'carrito',
        loadComponent: () =>
          import('../carrito/carrito.page').then((m) => m.CarritoPage),
      },
      {
        path: 'nosotros',
        loadComponent: () =>
          import('../nosotros/nosotros.page').then((m) => m.NosotrosPage),
      },
      {
        path: 'mas',
        loadComponent: () =>
          import('../mas/mas.page').then((m) => m.MasPage),
      },
      {
        path: '',
        redirectTo: '/tabs/inicio',
        pathMatch: 'full',
      },
    ],
  },
];
