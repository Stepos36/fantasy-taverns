import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
    userName = '';
    password = '';
    showSignup = false;

    constructor(private router: Router, private authService: AuthService) {}

    ngOnInit(): void {
        console.log('comes into being');
    }

    ngOnDestroy(): void {
        console.log('is destroyed');
    }

    toggleSignup(): void {
        this.showSignup = !this.showSignup;
        this.userName ='';
        this.password =''
    }

    signup(): void {
        const payload = {
            userName: this.userName,
            password: this.password,
        };
        console.log(payload);
    }

    login(): void {
        this.authService.login(this.userName, this.password).subscribe(
            (response) => {
                if (response.success) {
                    console.log('successful login');
                    this.router.navigateByUrl('/home');
                }
            },
            (error) => {
                console.log('username/password incorrect');
            },
        );
    }
}
