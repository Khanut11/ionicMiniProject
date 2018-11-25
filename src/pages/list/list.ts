import { Component, Injectable } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Injectable()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  reserveList : FirebaseListObservable<any>
  key: any

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, private fdb: AngularFireDatabase) {

      this.reserveList = fdb.list('/reserves');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  removeBtn(key){
    console.log("removeBtn on clicked");
    this.key = key;
    console.log(this.key = key);
    this.removeAlert();
  }

  removeAlert(){
    this.alertCtrl.create({
      title: 'ยกเลิกการจอง',
      subTitle: 'คุณต้องการยกเลิกการจองนี้หรือไม่',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: () => {
            this.removeReserve();
          }
        }
      ]
    }).present();
  }

  succesAlert() {
    this.alertCtrl.create({
      title: 'สำเร็จ',
      subTitle: 'ยกเลิกการจองสนามเรียบร้อย',
      buttons: ['OK']
    }).present();
  }

  removeReserve(){
    this.reserveList.remove(this.key).then(() => {
      this.succesAlert();
    }, error => {
      console.log(error);
    });
  }
}
