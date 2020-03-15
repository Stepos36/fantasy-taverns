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
    tavern: ITavern;
    role: IRole;

    constructor(private router: Router, private authService: AuthService, private tavernService: TavernServiceService, private roleService: RoleService) {}

    ngOnInit(): void {
        console.log('comes into being');
        this.tavernService.getTaverns().subscribe((response) => {this.taverns = response});
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
        this.tavern = {
            Id: 0,
            TavernName: 'Choose Your Tavern'
        };
    }

    chooseTavern(tavern): void {
        this.tavern = tavern;
    }

    createNewTavern(tavernName): void {
        this.tavern = {
            Id: 0,
            TavernName: tavernName,
        }
    }

    checkForOwner(tavernName): void {
        if (this.role.Id == 2) {
            this.createNewTavern(tavernName);
        }
    }

    signup(): void {
        const payload = {
            UserName: this.userName,
            Password: this.password,
            Tavern: this.tavern,
        };

        this.authService.create(payload).subscribe(
            (user) => {
                if (user) {
                    this.toggleSignup();
                    console.log('Successfuly Signed Up!');
                }
            },
        (error) => {
            console.log(error);
        },
        );
    }

    login(): void {
        this.authService.login(this.userName, this.password).subscribe(
            (response) => {
                if (response.success) {
                    console.log('successful login');
                    this.router.navigateByUrl('/my-tavern');
                }
            },
            (error) => {
                console.log('username/password incorrect');
            },
        );
    }
}
