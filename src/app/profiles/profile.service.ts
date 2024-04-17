import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Profile } from "./profile.model";
import { Subject, map } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class ProfileService {

    private profiles: Profile[] = [];
    private profilesSubs = new Subject<{ profiles: Profile[] }>

    constructor(private http: HttpClient, private router: Router) {}

    addProfile(name: string, surname: string, birthday: Date, height: string, weight: string, position: string, description: string) {
        
        const stringBirth = birthday.toISOString().substring(0, 10);
        console.log(stringBirth)
        const profileData = new FormData();
        profileData.append('name', name)
        profileData.append('surname', surname)
        profileData.append('birthday', stringBirth)
        profileData.append('height', height)
        profileData.append('weight', weight)
        profileData.append('position', position)
        profileData.append('description', description)

        this.http.post<{message: string, profile: Profile}>('http://localhost:3000/api/profiles', profileData).subscribe({
            next: () => {
                console.log('Profile created')
                this.router.navigate(['/']) 
            },
            error: () => {
                console.log("Profile not created")
            }
        });
    
    }

    getProfiles() {

        this.http.get<{ message: string, profiles: any }>('http://localhost:3000/api/profiles')
        .pipe(map(profileData => {
            return {
                profiles: profileData.profiles.map((profile: { _id: any; name: any; surname: any; birthday: any; height: any; weight: any; position: any; description: any; }) => {
                    return {
                        id: profile._id,
                        name: profile.name, 
                        surname: profile.surname,
                        birthday: profile.birthday,
                        height: profile.height,
                        weight: profile.weight,
                        position: profile.position,
                        description: profile.description
                    }
                })
            }
        }))
        .subscribe({
            next: (fetchedProfiles) => {
                this.profiles = fetchedProfiles.profiles;
                this.profilesSubs.next({ profiles: [...this.profiles] });
            }
        })
    }

    getProfilesUpdateListener() {
        return this.profilesSubs.asObservable();
    }

    deleteProfile(profileID: string) {
        return this.http.delete('http://localhost:3000/api/profiles/' + profileID)
    }
}