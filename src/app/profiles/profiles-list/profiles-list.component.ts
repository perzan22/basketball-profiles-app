import { Component, OnDestroy, OnInit } from '@angular/core';
import { Profile } from '../profile.model';
import { ProfileService } from '../profile.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrl: './profiles-list.component.sass'
})
export class ProfilesListComponent implements OnInit, OnDestroy{


  profiles: Profile[] = [];
  private profileSubs!: Subscription;
  public isAuth: boolean = false
  userID!: String
  private authStatusSubs!: Subscription;

  constructor(private profileService: ProfileService, private authService: AuthService) {}

  ngOnInit(): void {
    
    this.profileService.getProfiles();
    this.profileSubs = this.profileService.getProfilesUpdateListener().subscribe({
      next: profileData => {
        this.profiles = profileData.profiles;

      }
    })
    this.userID = this.authService.getUserId();
    this.isAuth = this.authService.getIsAuth();
    this.authStatusSubs = this.authService.getAuthStatusListener().subscribe({
      next: isAuthenticated => {
        this.isAuth = isAuthenticated.isAuth
        this.userID = this.authService.getUserId();
      }
    })
  }

  ngOnDestroy(): void {
    this.profileSubs.unsubscribe();
    this.authStatusSubs.unsubscribe();
  }

  onDelete(profileID: string) {
    this.profileService.deleteProfile(profileID).subscribe({
      next: () => {
        this.profileService.getProfiles();
      }
    })
  }

}
