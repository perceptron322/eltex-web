import { Routes } from '@angular/router';
import { MainPage } from './ui/pages/main-page/main-page';
import { BlogPage } from './ui/pages/blog-page/blog-page';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: MainPage
    },
    {
        path: 'blog',
        loadComponent: () =>
            import('./ui/pages/blog-page/blog-page').then(m => m.BlogPage)
    },
];
