import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProfileComponent } from './profiles/create-profile/create-profile.component';
import { ProfilesListComponent } from './profiles/profiles-list/profiles-list.component';

const routes: Routes = [
  {path: '', component: ProfilesListComponent},
  {path: 'create', component: CreateProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
