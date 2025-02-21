import { Routes } from '@angular/router';
import { Exercise1Component } from './pages/exercise1/exercise1.component';
import { Exercise2Component } from './pages/exercise2/exercise2.component';
import { ShopComponent } from './pages/shop/shop.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './helpers/auth.guard';

export const routes: Routes = [

    {
        path: '', // Ruta base de la aplicación
        loadComponent: () => import('./shared/layout/layout.component').then(m => m.LayoutComponent), // Carga el componente principal del layout
        children: [ // Rutas hijas dentro del layout
            {
                path: 'exercise1', // Ruta para Exercise1
                loadComponent: () => import('./pages/exercise1/exercise1.component').then(m => m.Exercise1Component),
                canActivate: [authGuard] // Protegida por el guard de autenticación
            },
            {
                path: 'exercise2', // Ruta para Exercise2
                loadComponent: () => import('./pages/exercise2/exercise2.component').then(m => m.Exercise2Component),
                canActivate: [authGuard] // Protegida por el guard de autenticación
            },
            {
                path: 'shop', // Ruta para la tienda
                loadComponent: () => import('./pages/shop/shop.component').then(m => m.ShopComponent),
                canActivate: [authGuard] // Protegida por el guard de autenticación
            },
            {
                path: 'home', // Ruta de inicio
                loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
                canActivate: [authGuard] // Protegida por el guard de autenticación
            },
            {
                path: 'login', // Ruta para la pantalla de login
                loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
            },
        ],
    },
    {
        path: '**', // Cualquier otra ruta no definida
        redirectTo: 'login' // Redirige al login
    }
];
