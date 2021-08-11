import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'tabs',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: '',
        loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
    },
    {
        path: 'parametre',
        loadChildren: () => import('./parametre/parametre.module').then( m => m.ParametrePageModule)
    },
    {
        path: 'demande',
        loadChildren: () => import('./demande/demande.module').then( m => m.DemandePageModule)
    },
    {
        path: 'edit-profile',
        loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
    },
    {
        path: 'forgot',
        loadChildren: () => import('./forgot/forgot.module').then( m => m.ForgotPageModule)
    },
    {
        path: 'edit-compte',
        loadChildren: () => import('./edit-compte/edit-compte.module').then( m => m.EditComptePageModule)
    },
    {
        path: 'test',
        loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
    },
    {
        path: 'page-detail/:id',
        loadChildren: () => import('./page-detail/page-detail.module').then( m => m.PageDetailPageModule)
    },
    {
        path: 'paiement/:id',
        loadChildren: () => import('./paiement/paiement.module').then( m => m.PaiementPageModule)
    },  {
    path: 'home1',
    loadChildren: () => import('./home1/home1.module').then( m => m.Home1PageModule)
  },

  // {
  //   path: 'test-transfer',
  //   loadChildren: () => import('./test-transfer/test-transfer.module').then( m => m.TestTransferPageModule)
  // },
  // {
  //   path: 'upload',
  //   loadChildren: () => import('./upload/upload.module').then( m => m.UploadPageModule)
  // },

      // {
      //   path: 'test-transfer',
      //   loadChildren: () => import('./test-transfer/test-transfer.module').then( m => m.TestTransferPageModule)
      // },



];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
