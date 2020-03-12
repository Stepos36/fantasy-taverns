import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TavernServiceService, ITavern } from '../tavern-service.service';
import { IRole, RoleService } from '../role.service';

@Component({
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit, OnDestroy {
    userName = '';
    password = '';
    newTavernName ='';
    showSignup = false;
    taverns: ITavern[];
    roles: IRole[];
    tavern: {};
    role: {};

    constructor(private router: Router, private authService: AuthService, private tavernService: TavernServiceService, private roleService: RoleService) {}

    ngOnInit(): void {
        console.log('comes into being');
        this.taverns = this.tavernService.getTaverns();
        this.roles = this.roleService.getRoles()
    }

    ngOnDestroy(): void {
        console.log('is destroyed');
    }

    toggleSignup(): void {
        this.showSignup = !this.showSignup;
        this.userName ='';
        this.password =''
    }

    changeRole(role): void {
        this.role = role;
        this.newTavernName = '';
        this.tavern = {};
    }

    chooseTavern(tavern): void {
        this.tavern = tavern
    }

    createNewTavern(tavernName): void {
        let newID = this.tavernService.getTaverns().length+1;
        this.tavern = {
            ID: newID,
            Name: tavernName,
        }
    }

    checkForOwner(tavernName): void {
        if (this.role.ID == 2) {
            this.createNewTavern(tavernName);
        }
    }

    signup(): void {
        const payload = {
            userName: this.userName,
            password: this.password,
            tavern: this.tavern,
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
