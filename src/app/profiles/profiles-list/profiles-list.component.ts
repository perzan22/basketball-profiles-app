import { Component } from '@angular/core';
import { Profile } from '../profile.model';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrl: './profiles-list.component.sass'
})
export class ProfilesListComponent {

  profiles: Profile[] = [];

  
}
