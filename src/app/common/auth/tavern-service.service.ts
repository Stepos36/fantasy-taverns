import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ITavern {
  ID: number;
  Name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TavernServiceService {
  
  taverns: ITavern[] = [
    { ID:1 , Name: 'Tavern #1' },
    { ID:2 , Name: 'Tavern #2' },
    { ID:3 , Name: 'Tavern #3' },
    { ID:4 , Name: 'Tavern #4' },
    { ID:5 , Name: 'Moe\'s' }
  ]

  constructor() { }

  getTaverns(): ITavern[]{
    return this.taverns
  }
}
