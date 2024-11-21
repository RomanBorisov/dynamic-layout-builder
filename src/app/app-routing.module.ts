import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin.component';
import { LayoutComponent } from './client/layout.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'admin-panel',
        component: AdminPanelComponent
    },
    {
        path: 'layout',
        component: LayoutComponent
    },
    {
        path: '**',
        redirectTo: '/admin-panel'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

