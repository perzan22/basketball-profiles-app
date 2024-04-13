import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Profile } from "./profile.model";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProfileService {

    private profiles: Profile[] = [];
    private profilesSubs = new Subject<{ profiles: Profile[] }>

    constructor(private http: HttpClient) {}

    addProfile(name: string, surname: string) {
        
        const profile: Profile = { name: name, surname: surname }

        this.http.post('http://localhost:3000/api/profiles', profile).subscribe({
            next: () => {
                console.log('Profile created')
            },
            error: () => {
                console.log("Profile nopt created")
            }
    });
    
    }

    getProfiles() {

        this.http.get<{ message: string, profiles: Profile[] }>('http://localhost:3000/api/profiles').subscribe({
            next: (fetchedProfiles) => {
                this.profiles = fetchedProfiles.profiles;
                this.profilesSubs.next({ profiles: [...this.profiles] });
            }
        })
    }

    getProfilesUpdateListener() {
        return this.profilesSubs.asObservable();
    }
}