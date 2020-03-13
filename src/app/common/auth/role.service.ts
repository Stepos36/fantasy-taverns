import { Injectable } from '@angular/core';

export interface IRole {
  Id: number;
  Name: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  
  roles: IRole[] = [
    { Id:1 , Name: 'Manager' },
    { Id:2 , Name: 'Owner' },
  ]

  constructor() { }

  getRoles(): IRole[]{
    return this.roles
  }
}
