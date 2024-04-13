import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Profile } from "./profile.model";

@Injectable({ providedIn: 'root' })
export class ProfileService {


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
}