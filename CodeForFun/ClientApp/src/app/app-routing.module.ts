import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginRedirectComponent } from './auth/redirect/login-redirect.component';

const routes: Routes = [
    {
        path: 'login-callback',
        component: LoginRedirectComponent
    },
    {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'products',
                component: ProductsComponent
            },
            {
                path: '**',
                redirectTo: 'products',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
