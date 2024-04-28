import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Profile } from '../profile.model';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.sass'
})
export class CreateProfileComponent implements OnInit {

  private mode = 'create'
  private profileID: string | null = null

  profile!: Profile
  form!: FormGroup;

  positions = [
    { value: 'PG - Point Guard' },
    { value: 'SG - Shooting Guard' },
    { value: 'SF - Small Forward' },
    { value: 'PF - Power Forward' },
    { value: 'C - Center' },

  ]

  constructor(private profileService: ProfileService, public route: ActivatedRoute) {}

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
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.profileID = paramMap.get('postId');
        this.profileService.getProfile(this.profileID).subscribe(profileData => {
          this.profile = {id: profileData._id, name: profileData.name, surname: profileData.surname,
                          birthday: profileData.birthday, height: profileData.height, weight: profileData.weight, 
                          position: profileData.position, description: profileData.description, creator: profileData.creator};
          this.form.setValue({'name': this.profile.name, 'surname': this.profile.surname, 'birthday': this.profile.birthday, 'height:': this.profile.height, 'weight': this.profile.weight,
            'position': this.profile.position, 'description': this.profile.description
          });
        });
      } else {
        this.mode = 'create';
        this.profileID = null;
      }
    });
  }

  onSubmitProfile() {

    if (this.form.invalid) {
      return;
    }
    this.profileService.addProfile(this.form.value.name, this.form.value.surname, this.form.value.birthday, this.form.value.height, this.form.value.weight, this.form.value.position, this.form.value.description);
    this.form.reset();
  }
    



}
