import { Routes } from '@angular/router';
import { BlogviewComponent } from './blogview/blogview.component';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { BlogsComponent } from './blogs/blogs.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {path:"blogview/:id",component:BlogviewComponent},
     {path:"create",component:CreateComponent},
     {path:"",component:HomeComponent},
     {path:"home",component:BlogsComponent},
    {path:"myblogs",component:MyblogsComponent},
    {path:"login",component:RegisterComponent},
     {path:"profile",component:ProfileComponent}
];
