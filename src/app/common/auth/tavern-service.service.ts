import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ITavern {
  Id: number;
  Name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TavernServiceService {
  
  taverns: ITavern[] = [
    { Id:1 , Name: 'Tavern #1' },
    { Id:2 , Name: 'Tavern #2' },
    { Id:3 , Name: 'Tavern #3' },
    { Id:4 , Name: 'Tavern #4' },
    { Id:5 , Name: 'Moe\'s' }
  ]

  constructor() { }

  getTaverns(): ITavern[]{
    return this.taverns
  }
}
