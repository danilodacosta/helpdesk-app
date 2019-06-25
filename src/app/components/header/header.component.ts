import { User } from './../../model/user.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  public shared: SharedService;

  constructor(){
      this.shared = SharedService.getInstance();
      this.shared.user = new User('','','','');
  }

  ngOnInit(){
  }

  signOut() : void {
    this.shared.token = null;
    this.shared.user = null;
    window.location.href = '/login';
    window.location.reload();
  }
}
