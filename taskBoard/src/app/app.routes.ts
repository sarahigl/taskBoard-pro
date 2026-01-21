import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './features/about/about';

export const routes: Routes = [
    { path: '', component: Home }, 
    //{ path: 'about', component: About }, 
    {
        path: 'tasks',
        loadChildren: () =>
            import('./features/tasks/tasks-page/routes').then(m=>m.TASKS_ROUTES)
    },
    { 
        path: 'about', 
        loadChildren: () => import('./features/about/route')
        .then(m => m.ABOUT_ROUTES)
    }
];
