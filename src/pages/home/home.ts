import { Component } from "@angular/core";
import { NavController, NavParams, ModalController } from "ionic-angular";
import { TimePage } from "../time/time";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  email: any;
  num: string[];
  items: Array<{ title: string; id: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.num = ["1", "2", "3", "4", "5"];
    this.items = [];
    for (let i = 0; i < 5; i++) {
      this.items.push({
        title: "สนาม " + this.num[i],
        id: "stadium" + this.num[i]
      });
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
    this.email = this.navParams.get("email");
    console.log("user email: " + this.email);
  }

  selectTime(itemId) {
    const stadium = document.getElementById(itemId).id;
    console.log('homepage ' + stadium);
    
    let fieldModal = this.modalCtrl.create(TimePage,  {stadium: stadium, email: this.email});
    fieldModal.present();
  }
}
