import { UserService } from './../../service/user.service';
import { SharedService } from './../../service/shared.service';
import { User } from './../../model/user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from 'src/app/model/response-api.model';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;

  user = new User('', '', '', '');
  shared: SharedService;
  message: {};
  classCss: {};

  constructor(
    private userService: UserService,
    private route: ActivatedRoute) {
      this.shared = SharedService.getInstance();
    }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if (id !== undefined) {
        this.findById(id);
    }
  }

  findById(id: string){
    this.userService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.user = responseApi.data;
      this.user.password = '';
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  register() {
    this.message = '';
    this.userService.createOrUpdate(this.user).subscribe((responseApi: ResponseApi) => {
        this.user = new User('', '', '', '');
        const userRest: User = responseApi.data;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Usuário ${userRest.email} , foi registrado com sucesso`
        });
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  private showMessage(message: {type: string, text: string}): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      // tslint:disable-next-line:object-literal-key-quotes
      'alert' : true
    };
    this.classCss['alert-' + type] = true;
  }

  getFromGruopClass(isInvalid: boolean , isDirty): {} {
    return {
      'form-group'  : true,
      'has-error'   : isInvalid && isDirty,
      'has-success' : !isInvalid && isDirty
    };
  }
}
