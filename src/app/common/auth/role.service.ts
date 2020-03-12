import { Injectable } from '@angular/core';

export interface IRole {
  ID: number;
  Name: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  
  roles: IRole[] = [
    { ID:1 , Name: 'Manager' },
    { ID:2 , Name: 'Owner' },
  ]

  constructor() { }

  getRoles(): IRole[]{
    return this.roles
  }
}
