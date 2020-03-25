import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMyTavern, TavernServiceService } from '../common/auth/tavern-service.service';
import { ModalComponent } from '../common/modal/modal.component';
import { RoomService } from './room-service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-my-tavern',
  templateUrl: './my-tavern.component.html',
  styleUrls: ['./my-tavern.component.less']
})

export class MyTavernComponent implements OnInit, OnDestroy {

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
  searchText = '';
  searchUpdated = new Subject<string>();
  subscription = new Subscription();

  constructor(private tavernService: TavernServiceService, private Modal: ModalComponent, private roomService: RoomService) {
    this.subscription = this.searchUpdated.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((searchValue) => {
      this.searchRooms(searchValue)
    })
   }

  ngOnInit(): void {
    this.rooms = [];
    this.tavernService.getCurrentTavern('').subscribe((response) => {
      this.rooms = response;
      this.TavernName = response[0].TavernName;
      this.UserName = response[0].UserName;
      this.TavernID = response[0].TavernID
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
      this.tavernService.getCurrentTavern('').subscribe((response) => {
      this.rooms = response;
    });
    }
    
  }

  deleteRoom(room): void {
    this.roomService.deleteRoom(room).subscribe()
    this.tavernService.getCurrentTavern('').subscribe((response) => {
      this.rooms = response;
    });
  }

  updateRoom(form, room): void {
    if (form.valid) {
      this.roomService.updateRoom(room).subscribe();
      this.tavernService.getCurrentTavern('').subscribe((response) => {
      this.rooms = response;
    });
    }
  }

  search($event): void {
    this.searchUpdated.next($event.target.value);
  }

  searchRooms(searchValue: string) {
    this.tavernService.getCurrentTavern(searchValue).subscribe((rooms) => {
      this.rooms = rooms
    })
  } 
}
