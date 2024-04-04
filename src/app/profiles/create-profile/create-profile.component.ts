import { Component } from '@angular/core';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.sass'
})
export class CreateProfileComponent {

  positions = [
    {value: 'pg', viewValue: 'PG - Point Guard'},
    {value: 'sg', viewValue: 'SG - Shooting Guard'},
    {value: 'sf', viewValue: 'SF - Small Forward'},
    {value: 'pf', viewValue: 'PF - Power Forward'},
    {value: 'c', viewValue: 'C - Center'},

  ] 
}
