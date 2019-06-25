import { ActivatedRoute } from '@angular/router';
import { TicketService } from './../../service/ticket.service';
import { Ticket } from './../../model/ticket.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
import { ResponseApi } from 'src/app/model/response-api.model';

@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.component.html',
  styleUrls: ['./ticket-new.component.scss']
})
export class TicketNewComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;

  ticket = new Ticket('', 0, '', '', '', '', null, null, '', null);

  shared: SharedService;
  message: {};
  classCss: {};

  constructor(private ticketService: TicketService, private route: ActivatedRoute) {
    this.shared = SharedService.getInstance();
   }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if (id !== undefined) {
        this.findById(id);
    }
  }


  findById(id: string) {
    this.ticketService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.ticket = responseApi.data;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }


  register() {
    this.message = '';
    this.ticketService.createOrUpdate(this.ticket).subscribe((responseApi: ResponseApi) => {
        this.ticket = new Ticket('', 0, '', '', '', '', null, null, '', null);
        const ticketRest: Ticket = responseApi.data;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Ticket ${ticketRest.number} , foi registrado com sucesso`
        });
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  onFileChange(event): void{
    if(event.target.files[0].size > 2000000){
      this.showMessage({
        type: 'error',
        text: 'Maximum image size is 2 MB'
      });
    } else {
      this.ticket.image = '';
      var reader = new FileReader();
      reader.onloadend = (e: Event) => {
          this.ticket.image = reader.result.toString();
      }
      reader.readAsDataURL(event.target.files[0]);
    }
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

  getFormGroupClass(isInvalid: boolean , isDirty): {} {
    return {
      'form-group'  : true,
      'has-error'   : isInvalid && isDirty,
      'has-success' : !isInvalid && isDirty
    };
  }



}
