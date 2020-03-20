import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IRoom {
    RoomnName: string;
    TavernID: number;
    Availability: boolean;
    RoomID: number;
    DailyRate: number;
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient,
  ) { }

  createRoom(room : IRoom): Observable<IRoom>{
    return this.http.post<IRoom> ('http://localhost:3000/add-room', room);
  }

  deleteRoom(room: IRoom): Observable<IRoom>{
    let httpParams = new HttpParams().set( 'roomID' , room.RoomID.toString());
    let options = { params: httpParams };
    return this.http.delete<IRoom> ('http://localhost:3000/delete-room', options)
  }
}
