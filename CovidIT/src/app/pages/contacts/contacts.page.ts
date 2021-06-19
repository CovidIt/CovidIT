import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import {Contatto} from '../../model/contatto.model';
import {ContattoService} from "../../services/contatto.service";
import {EmailComposer} from "@ionic-native/email-composer/ngx";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts$: Contatto[];
  constructor(private contactService: ContattoService,
              private callNumber: CallNumber,
              private emailComposer: EmailComposer) { }

  ngOnInit() {
    this.contacts$=this.contactService.list();
  }
  chiama(numero: string){
    this.callNumber.callNumber(numero, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
  private get isEmailClientConfigured(): Promise<boolean> {
    return this.emailComposer.isAvailable();
  }

  inviamail(mail: string){
    if(this.isEmailClientConfigured) {
      const email = {
        to: mail
      };
      this.emailComposer.open(email);
    }
    else {
      console.log("Non si possono inviare mail da questo dispositivo.");
    }
  }
}
