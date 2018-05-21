import { MessageserviceProvider } from './../../providers/messageservice/messageservice';
import { Contact } from './../../models/Contact';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events, Alert, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import * as CryptoJS from 'crypto-js';
import {Buffer} from 'buffer/';
import * as crypto from 'crypto-browserify';
import { findIndex } from 'rxjs/operator/findIndex';



@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
 
  dec: string;
  //contact : Contact= this.navParams.get("contact") as Contact;
  uid = this.navParams.get("contactuid") as Contact;
  firemessages= firebase.database().ref('/messages');
  contact : any;
  allmessages = []; 
  newmessage;
  kmessages= [];

 constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
 public messageservice: MessageserviceProvider, public events : Events, public zone :NgZone  ) {
  this.contact = this.messageservice.contact; 
  this.events.subscribe('newmessage', () => {
    this.allmessages = [];
    this.kmessages=[];
   this.allmessages = this.messageservice.allmessages;
  //  this.decrypt(this.allmessages);

  })  
  }

  decrypt(mymessage,index){
    let decrypted = CryptoJS.AES.decrypt( mymessage, 'TheKey%%123');
    this.dec= decrypted.toString(CryptoJS.enc.Utf8);
  
      let alert = this.alertCtrl.create({
        title: 'Decrypted Message',
        subTitle: this.dec,
        buttons: ['OKEY']
      });
      alert.present();
    
    
    
   
  }

  addmessage() {
     this.messageservice.addnewmessage(this.newmessage).then(() => {
      this.newmessage = '';
    })
  }

  ionViewDidEnter() {
    this.messageservice.getallmessages();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

  exitChat() {
  this.navCtrl.push('ContactPage');
  }

}
