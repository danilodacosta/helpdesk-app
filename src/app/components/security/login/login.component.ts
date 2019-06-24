import { CurrentUser } from './../../../model/currentUser.model';
import { UserService } from './../../../service/user.service';
import { User } from './../../../model/user.model';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = new User('', '', '', '');
  shared: SharedService;
  message: string;

  constructor(private userService: UserService, private router: Router) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {}

  login() {
    this.message = '';
    this.userService.login(this.user).subscribe((userAuthentication: CurrentUser) => {
      this.shared.token = userAuthentication.token;
      this.shared.user = userAuthentication.user;
      this.shared.user.profile = this.shared.user.profile.substring(5);
      this.shared.showTemplate.emit(true);
      this.router.navigate(['/']);
    }, err => {
      this.shared.token = '';
      this.shared.user = null;
      this.shared.showTemplate.emit(false);
      this.message = 'Erro!';
    });
  }

  cancelLogin() {
    this.message = '';
    this.user = new User('', '', '', '');
    window.location.href = '/';
    window.location.reload();
  }

  getFromGruopClass(isInvalid: boolean , isDirty): {} {
    return {
      'form-group'  : true,
      'has-error'   : isInvalid && isDirty,
      'has-success' : !isInvalid && isDirty
    };
  }

}
