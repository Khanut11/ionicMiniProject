import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


/**
 * Generated class for the TimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-time',
  templateUrl: 'time.html',
})
export class TimePage {
  times: string[];
  items: Array<{title: string, id: string}>;

  itemId: string;
  email: string;
  stadium: string;
  date: string;
  time: string;
  disable: boolean;

  reserveList : FirebaseListObservable<any>

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, private fdb: AngularFireDatabase) {

      this.reserveList = this.fdb.list('/reserves');

      this.times = [ '08.00 - 09.00', '09.00 - 10.00', '10.00 - 11.00', '11.00 - 12.00', '12.00 - 13.00' , '13.00 - 14.00', '14.00 - 15.00', '15.00 - 16.00', '16.00 - 17.00', '17.00 - 18.00', '18.00 -19.00', '19.00 - 20.00', '20.00 - 21.00', '21.00 - 22.00', '22.00 - 23.00'];
      
      this.items = [];
      for (let i = 0; i < this.times.length ;i++) {

        this.items.push({
          title: this.times[i],
          id: 'reserveBtn' + i
        });
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimePage');
    this.stadium = this.navParams.get('stadium');
    this.email = this.navParams.get('email');
    console.log('timepage: ' + this.stadium);
  }

  closeBtn() {
    this.navCtrl.pop();
  }

  disabledBtn(itemId: string) {
    return (<HTMLInputElement> document.getElementById(itemId)).disabled = true;
  }

  succesAlert() {
    this.alertCtrl.create({
      title: 'จองสนามสำเร็จ',
      subTitle: 'ยืนยันการจองสนามเรียบร้อย',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('SuccessBtn Email: + ' + this.email + ' Stadium: ' + this.stadium + ' Date: ' + this.date + ' Time: ' + this.time);
            // this.disabledBtn(this.itemId);
            this.disable = this.disabledBtn(this.itemId);
            this.addReserve();
          }
        }
      ]
    }).present();
  }

  comfirmAlert() {
    this.alertCtrl.create({
      title: 'ยืนยันการจองสนาม',
      subTitle: 'วันที่: ' + this.date + 'เวลา: ' + this.time,
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
        },
        {
          text: 'ยืนยัน',
          handler: () => {            
            this.succesAlert();
          }
        }
      ]
    }).present();
  }

  reserveBtn(itemId: string, myDateTime) {
    const reserveTime = document.getElementById(itemId).textContent;
    
    console.log(reserveTime);
    console.log(myDateTime);
    this.itemId = itemId;
    this.date = myDateTime;
    this.time = reserveTime;

    this.comfirmAlert();
    
  }

  addReserve(){
    console.log('addReserve Function is OK');
    console.log('Email: ' + this.email + ' Stadium: ' + this.stadium + ' Date: ' + this.date + ' Time: ' + this.time + ' Disable: ' + this.disable);
    console.log('reserveList' + this.reserveList);
    
    this.reserveList.push({
      email: this.email,
      stadium: this.stadium,
      date: this.date,
      time: this.time,
      price: '700',
      status: 'No confirm',
      disable: this.disable
    });
  }

}
