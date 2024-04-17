import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.sass'
})
export class CreateProfileComponent implements OnInit {

  form!: FormGroup;

  positions = [
    { value: 'PG - Point Guard' },
    { value: 'SG - Shooting Guard' },
    { value: 'SF - Small Forward' },
    { value: 'PF - Power Forward' },
    { value: 'C - Center' },

  ]

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {

    this.form = new FormGroup({
      'name': new FormControl(null, {
        validators: [Validators.required]
      }),
      'surname': new FormControl(null, {
        validators: [Validators.required]
      }),
      'birthday': new FormControl(null, {
        validators: [Validators.required]
      }),
      'height': new FormControl(null, {
        validators: [Validators.required, Validators.min(100), Validators.max(300)]
      }),
      'weight': new FormControl(null, {
        validators: [Validators.required, Validators.min(20), Validators.max(250)]
      }),
      'position': new FormControl(null, {
        validators: [Validators.required]
      }),
      'description': new FormControl(null),

      'strengths1': new FormControl(false),
      'strengths2': new FormControl(false),
      'strengths3': new FormControl(false),
      'strengths4': new FormControl(false),
      'strengths5': new FormControl(false),
      'strengths6': new FormControl(false),
      'strengths7': new FormControl(false),
      'strengths8': new FormControl(false)
    });
  }

  onSubmitProfile() {

    if (this.form.invalid) {
      return;
    }
    this.profileService.addProfile(this.form.value.name, this.form.value.surname, this.form.value.birthday, this.form.value.height, this.form.value.weight, this.form.value.position, this.form.value.description);
  }


}
