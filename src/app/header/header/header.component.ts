import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent implements OnInit, OnDestroy{


  isAuthorizated: boolean = false;
  name: string = '';
  surname: string = ''
  private authSubs!: Subscription

  constructor(private authService: AuthService) {}


  ngOnInit(): void {
    this.authSubs = this.authService.getAuthStatusListener().subscribe({
      next: authData => {
        this.isAuthorizated = authData.isAuth;
        this.name = this.authService.getName();
        this.surname = this.authService.getSurname();
      }
    })
  }

  ngOnDestroy(): void {
    this.authSubs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }


}
