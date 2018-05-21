import { UserserviceProvider } from './../../providers/userservice/userservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { Contact } from '../../models/Contact';
import { MessageserviceProvider } from '../../providers/messageservice/messageservice';
/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  contacts = [];
  filteredcontacts = [];
  buddyid;
  firedata = firebase.database().ref('contacts/');
  currentUserId=firebase.auth().currentUser.uid;


  constructor(public navCtrl: NavController, public navParams: NavParams,
     public userservice:UserserviceProvider, public messageservice:MessageserviceProvider) {
  userservice.getallusers().then((res: any) => {
    this.contacts = res;
    this.filteredcontacts = res ; 
})
  }
  ionViewDidLoad() {}
  searchuser(searchbar) {
    this.filteredcontacts = this.contacts;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }
 
    this.filteredcontacts = this.contacts.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  openChat(contact) {
    this.buddyid= contact.uid;
    this.messageservice.addContact(contact);
    this.navCtrl.setRoot('MessagePage', {
    
    });
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.setRoot('SigninPage');
    })
  }

}




