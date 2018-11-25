import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirstPage } from '../first/first';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public ngFireAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  errorAlert(){
    this.alertCtrl.create({
      title: "Alert",
      subTitle: "E-mail or Password is incorrect",
      buttons: ['OK']
    }).present();
  }

  succesAlert() {
    this.alertCtrl.create({
      title: "Success",
      subTitle: "Resgister successfully!! You can login now",
      buttons: ['OK']
    }).present();
  }

  onClickRegis(email, password){
    if(email && password) {
      if(!this.validateEmail(email) || password.length < 6) {
        this.errorAlert();
      } else {
        this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password).then((res) => {
          this.succesAlert();
          this.navCtrl.setRoot(FirstPage);
        });
      }
    }
  }

}
