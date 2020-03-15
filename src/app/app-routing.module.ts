import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './common/auth/login/login.component';
import { HomeComponent } from './home.component';
import { AuthGuard } from './common/auth/auth.guard';
import { MyTavernComponent } from './my-tavern/my-tavern.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'my-tavern', component: MyTavernComponent, canActivate: [AuthGuard] },
    { path: '**', component: HomeComponent, canActivate: [AuthGuard] },
    // { path: 'home', component: HomeComponent},
    // { path: '**', component: HomeComponent},
];

@NgModule({

    exports: [RouterModule],
    imports: [RouterModule.forRoot(appRoutes)],
})
export class AppRoutingModule {}
