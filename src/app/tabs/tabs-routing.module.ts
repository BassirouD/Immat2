import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'document',
        loadChildren: () => import('../document/document.module').then(m => m.DocumentModule)
      },
      {
        path: 'historique',
        loadChildren: () => import('../historique/historique.module').then(m => m.HistoriqueModule)
      },
      {
        path: 'compte',
        loadChildren: () => import('../compte/compte.module').then( m => m.ComptePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
