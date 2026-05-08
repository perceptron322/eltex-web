import { Routes } from '@angular/router';
import { MainPage } from './ui/pages/main-page/main-page';
import { BlogPage } from './ui/pages/blog-page/blog-page';
import { SeparateBlogPage } from './ui/components/separate-blog-page/separate-blog-page';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        title: 'Главная',
        component: MainPage
    },
    {
        path: 'blog',
        title: 'Посты',
        loadComponent: () =>
            import('./ui/pages/blog-page/blog-page').then(m => m.BlogPage)
    },
    {
        path: 'blog/:id',
        loadComponent: () =>
            import('./ui/components/separate-blog-page/separate-blog-page').then(m => m.SeparateBlogPage)
    }
];
