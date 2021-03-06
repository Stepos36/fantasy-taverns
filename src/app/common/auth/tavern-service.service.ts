import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ITavern {
  Id: number;
  TavernName: string;
}

export interface IMyTavern {
  RoomId: number;
  RoomName: string;
  RoomStatus: boolean;
  DailyRate: number;
  UserName : string;
  TavernID: number;
  TavernName: string;
}

@Injectable({
  providedIn: 'root'
})
export class TavernServiceService {
  
  // taverns: ITavern[] = [
  //   { Id:1 , TavernName: 'Tavern #1' },
  //   { Id:2 , TavernName: 'Tavern #2' },
  //   { Id:3 , TavernName: 'Tavern #3' },
  //   { Id:4 , TavernName: 'Tavern #4' },
  //   { Id:5 , TavernName: 'Moe\'s' }
  // ]

  constructor(
    private http: HttpClient,
  ) { }

  getTaverns(): Observable<ITavern[]>{
    return this.http.get<ITavern[]> (`http://localhost:3000/taverns`);
  }
  getCurrentTavern(searchText: string): Observable<IMyTavern[]>{
    return this.http.get<IMyTavern[]> (`http://localhost:3000/my-tavern?Search=${searchText}`);
  }
}
