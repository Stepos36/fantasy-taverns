import { Component, OnInit, OnChanges } from '@angular/core';
import { IMyTavern, TavernServiceService } from '../common/auth/tavern-service.service';
import { ModalComponent } from '../common/modal/modal.component';

@Component({
  selector: 'app-my-tavern',
  templateUrl: './my-tavern.component.html',
  styleUrls: ['./my-tavern.component.less']
})

export class MyTavernComponent implements OnInit {
  rooms: IMyTavern[];
  TavernName = '';
  UserName = '';
  roomBeingEdited = {
    RoomID: '',
    RoomName: '',
    DailyRate: '',
    Availability: '',
  };

  constructor(private tavernService: TavernServiceService, private Modal: ModalComponent) { }

  ngOnInit(): void {
    this.rooms = [];
    this.tavernService.getCurrentTavern().subscribe((response) => {
      this.rooms = response;
      this.TavernName = response[0].TavernName;
      this.UserName = response[0].UserName;
      console.log(this.rooms)
    });
  }

  openModal(content): void {
    this.Modal.openVerticallyCentered(content)
  }

  assignRoomToModal(room): void {
    this.roomBeingEdited = {
      RoomID: room.RoomID,
      RoomName: room.RoomName,
      DailyRate: room.DailyRate,
      Availability: room.RoomStatus,
    }
  }
}
