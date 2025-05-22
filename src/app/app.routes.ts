import { Routes } from '@angular/router';
import { MainmenuComponent } from './pages/mainmenu/mainmenu.component';
import { BlogComponent } from './pages/blog/blog.component';


export const routes: Routes = [
    {path: '', component: MainmenuComponent},
    {path: 'doublog', component: BlogComponent},
];