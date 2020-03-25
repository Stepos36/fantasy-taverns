import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { IMyTavern, TavernServiceService } from '../common/auth/tavern-service.service';
import { ModalComponent } from '../common/modal/modal.component';
import { NgForm } from '@angular/forms';
import { RoomService } from './room-service';

@Component({
  selector: 'app-my-tavern',
  templateUrl: './my-tavern.component.html',
  styleUrls: ['./my-tavern.component.less']
})

export class MyTavernComponent implements OnInit {

  rooms: IMyTavern[];
  TavernName = '';
  UserName = '';
  TavernID = 0;
  roomBeingEdited = {
    RoomID: '',
    RoomName: '',
    TavernID: 0,
    DailyRate: 0,
    Availability: false,
  };

  constructor(private tavernService: TavernServiceService, private Modal: ModalComponent, private roomService: RoomService) { }

  ngOnInit(): void {
    this.rooms = [];
    this.tavernService.getCurrentTavern().subscribe((response) => {
      this.rooms = response;
      this.TavernName = response[0].TavernName;
      this.UserName = response[0].UserName;
      this.TavernID = response[0].TavernID
    });
  }

  openModal(content): void {
    this.Modal.openVerticallyCentered(content)

  }

  assignRoomToModal(room): void {
    this.roomBeingEdited = {
      RoomID: room.RoomID,
      TavernID: this.TavernID,
      RoomName: room.RoomName,
      DailyRate: room.DailyRate,
      Availability: room.RoomStatus,
    }
  }

  createRoom(form): void {
    if (form.valid) {
      this.roomService.createRoom(form.value).subscribe();
      this.tavernService.getCurrentTavern().subscribe((response) => {
      this.rooms = response;
    });
    }
    
  }

  deleteRoom(room): void {
    this.roomService.deleteRoom(room).subscribe()
    this.tavernService.getCurrentTavern().subscribe((response) => {
      this.rooms = response;
    });
  }

  logForm(room): void {
    this.roomService.updateRoom(room).subscribe();
      this.tavernService.getCurrentTavern().subscribe((response) => {
      this.rooms = response;
    });
  }
}
