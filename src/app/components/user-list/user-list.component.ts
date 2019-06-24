import { Router } from '@angular/router';
import { DialogService } from './../../service/dialog.service';
import { SharedService } from './../../service/shared.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ResponseApi } from 'src/app/model/response-api.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  page = 0;
  count = 5;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listUser = [];

  constructor(private dialogService: DialogService, private userService: UserService, private router: Router) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page, this.count);
  }

  findAll(page: number, count: number) {
    this.userService.findAll(page, count).subscribe((responseApi: ResponseApi) => {
        this.listUser = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['totalPages']);
    },  err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  edit(id: string) {
    this.router.navigate(['/user-new', id]);
  }

  delete(id: string) {
    this.dialogService.confirm('VocÊ deseja remover esse usuário ?')
    .then((deletado: boolean) => {
        if (deletado) {
          this.message = {};
          this.userService.delete(id).subscribe((responseApi: ResponseApi) => {
            this.showMessage({
              type: 'success',
              text: `Usuário deletado com sucesso !`
            });
            this.findAll(this.page, this.count);
          }, err => {
              this.showMessage({
                type: 'error',
                text: err['error']['errors'][0]
              });
            });
    }
  });

  }

setNextPage(event: any) {
  event.preventDefault();
  if (this.page + 1 < this.pages.length) {
      this.page = this.page + 1;
      this.findAll(this.page, this.count);
  }
}

setPreviousPage(event: any) {
  event.preventDefault();
  if (this.page > 0) {
      this.page = this.page - 1;
      this.findAll(this.page, this.count);
  }
}

setPage(i , event: any) {
  event.preventDefault();
  this.page = i;
  this.findAll(this.page, this.count);
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
}
