import { Component, OnInit, OnChanges } from '@angular/core';
import { IMyTavern, TavernServiceService } from '../common/auth/tavern-service.service';
import { ICurrentlyLoggedInUser } from '../common/auth/auth.service';

@Component({
  selector: 'app-my-tavern',
  templateUrl: './my-tavern.component.html',
  styleUrls: ['./my-tavern.component.less']
})

export class MyTavernComponent implements OnInit {
  tavern: IMyTavern[];
  tavernName = '';
  //user: ICurrentlyLoggeInUser;

  constructor(private tavernService: TavernServiceService) { }

  ngOnInit(): void {
    this.tavern = [];
    this.tavernService.getCurrentTavern().subscribe((response) => {
      this.tavern = response;
      console.log(response)
    });
    
  }

}
