import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import { RestService } from '../services/rest.service';
import { Response } from '../services/classes';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor( public alertController: AlertController, private loadCtrl: LoadingController, private modalController: ModalController, public toastController: ToastController, public  restService: RestService ) { }

  regnum:number=null;
  pswrd:string=null;
  regnumValid:number=0;
  timeVar:any=null;
  inputType:string='password';
  eyeIcon:string='eye';
  sufficientLength:boolean=null;
  authStatus = new Response();

  ngOnInit() {
  }

  regnumInputChanged(){
    if(this.regnum.toString().length==9){
      //we cant check as and when user types increases server load exponentially.
        this.regnumValid=1;
      }
      else{
        this.regnumValid=-1;
      }
  }

  pswrdInputChanged(){
    if(this.pswrd&&this.pswrd.length>=8){
      this.sufficientLength=true;
    }
    else{
      this.sufficientLength=false;
    }
  }

  changeInputType(){
    if(this.inputType=='password'){
      this.inputType='text';
      this.eyeIcon='eye-off';
    }
    else{
      this.inputType='password';
      this.eyeIcon='eye';
    }
  }

 async signUp(){
    const loading = await this.loadCtrl.create({
      message: 'Please wait'
    });
    await loading.present();

    this.restService.newUser(this.regnum,this.pswrd).subscribe(
            response => {
                this.authStatus = response;
                if(this.authStatus.Status == "OK"){ //if insertion success
                  loading.dismiss();
                  this.showSuccess();
                  this.modalController.dismiss(this.regnum);
                }
                else if(this.authStatus.Status == "Exists"){ //if row already exists
                  loading.dismiss();
                  this.pswrd=null;
                  this.popAlert('Register number already exists!','','',['Ok']);
                }
                else if(this.authStatus.Status == "Wrong"){
                    loading.dismiss();
                    this.pswrd=null;
                    this.popAlert('Wrong Registration No.!','Please try again','',['Ok']);
                }
                else { //insertion error
                  loading.dismiss();
                  this.pswrd=null;
                  this.popAlert('Something went wrong','Please try again','',['Ok']);
                }
            }
    );
  }

  async showSuccess(){
      const toast = await this.toastController.create({
        message: 'Signup Successfull!',
        duration: 3000
      });
      toast.present();
  }

  async popAlert(_header,_subHeader,_message,_buttons){
    const alert = await this.alertController.create({
      header: _header,
      subHeader: _subHeader,
      message: _message,
      buttons: _buttons
    });

    await alert.present();
  }

  cancel(){
    this.modalController.dismiss();
  }
}
