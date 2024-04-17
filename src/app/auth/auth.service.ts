import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient, private router: Router) {}


    createUser(email: string, password: string, name: string, surname: string) {
        const authData: AuthData = { email: email, password: password, name: name, surname: surname };
        this.http.post('http://localhost:3000/api/users/signup', authData).subscribe({
            next: () => {
                this.router.navigate(['/']);
            }
        })
    }
}