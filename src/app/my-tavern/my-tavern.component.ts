import { Component, OnInit, OnChanges } from '@angular/core';
import { IMyTavern, TavernServiceService } from '../common/auth/tavern-service.service';

@Component({
  selector: 'app-my-tavern',
  templateUrl: './my-tavern.component.html',
  styleUrls: ['./my-tavern.component.less']
})

export class MyTavernComponent implements OnInit {
  rooms: IMyTavern[];
  TavernName = '';
  UserName = '';

  constructor(private tavernService: TavernServiceService) { }

  ngOnInit(): void {
    this.rooms = [];
    this.tavernService.getCurrentTavern().subscribe((response) => {
      this.rooms = response;
      this.TavernName = response[0].TavernName;
      this.UserName = response[0].UserName;
    });
  }

}
