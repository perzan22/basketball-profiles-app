import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private token!: string;
    private userID!: string;
    private name: string = '';
    private surname: string = '';
    private isAuth: boolean = false;
    private authStatusListener = new Subject<{ isAuth: boolean }>;

    constructor(private http: HttpClient, private router: Router, private cookies: CookieService) {}

    getToken() {
        return this.token;
    }

    getUserId() {
        return this.userID;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getName() {
        return this.name;
    }

    getSurname() {
        return this.surname;
    }

    getIsAuth() {
        return this.isAuth;
    }

    createUser(email: string, password: string, name: string, surname: string) {
        const authData: AuthData = { email: email, password: password, name: name, surname: surname };
        this.http.post<{ token: string, userID: string, name: string, surname: string }>('http://localhost:3000/api/users/signup', authData).subscribe({
            next: response => {
                this.isAuth = true;
                this.userID = response.userID;
                this.name = response.name;
                this.surname = response.surname;
                this.authStatusListener.next({ isAuth: true });
                this.setCookies();
                this.router.navigate(['/']);
            }
        })
    }

    login(email: string, password: string) {
        const authData = { email: email, password: password }
        this.http.post<{ token: string, userID: string, name: string, surname: string }>('http://localhost:3000/api/users/login', authData).subscribe({
            next: response => {
                const token = response.token;
                this.token = token;
                if(token) {
                    this.isAuth = true;
                    this.userID = response.userID;
                    this.name = response.name;
                    this.surname = response.surname;
                    this.authStatusListener.next({ isAuth: true });
                    this.setCookies();
                    this.router.navigate(['/']);
                }
            }
        })
    }

    logout() {
        this.authStatusListener.next({ isAuth: false });
        this.isAuth = false;
        this.name = '';
        this.surname = '';
        this.token = '';
        this.userID = '';
        this.clearCookies();
    }

    private setCookies() {
        this.cookies.set('SESSION_TOKEN', this.token, 1);
        this.cookies.set('USER_ID', this.userID, 1);
        this.cookies.set('USER_NAME', this.name, 1);
        this.cookies.set('USER_SURNAME', this.surname, 1);
    }

    private clearCookies() {
        this.cookies.delete('SESSION_TOKEN');
        this.cookies.delete('USER_ID');
        this.cookies.delete('USER_NAME');
        this.cookies.delete('USER_SURNAME');
    }

    private getCookiesData() {
        const token = this.cookies.get('SESSION_TOKEN');
        const userID = this.cookies.get('USER_ID');
        const name = this.cookies.get('USER_NAME');
        const surname = this.cookies.get('USER_SURNAME');

        if(!token) {
            return;
        }

        return {
            token: token,
            userID: userID,
            name: name,
            surname: surname
        }
    }

    autoAuth() {
        const authInfo = this.getCookiesData();
        if (!authInfo) {
            return;
        }

        this.token = authInfo.token;
        this.userID = authInfo.userID;
        this.name = authInfo.name;
        this.surname = authInfo.surname;
        this.isAuth = true;
        this.authStatusListener.next({ isAuth: true });
    }


}