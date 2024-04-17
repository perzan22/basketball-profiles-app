import { Component, OnDestroy, OnInit } from '@angular/core';
import { Profile } from '../profile.model';
import { ProfileService } from '../profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrl: './profiles-list.component.sass'
})
export class ProfilesListComponent implements OnInit, OnDestroy{


  profiles: Profile[] = [];
  private profileSubs!: Subscription;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfiles();
    this.profileSubs = this.profileService.getProfilesUpdateListener().subscribe({
      next: profileData => {
        this.profiles = profileData.profiles;
      }
    })

  }

  ngOnDestroy(): void {
    this.profileSubs.unsubscribe();
  }

  onDelete() {
    return
  }

}
