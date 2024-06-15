import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogInComponent } from '../user-log-in/user-log-in.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  hide:boolean=true;

  userRegistrationForm!:FormGroup;
  
  constructor(private fb:FormBuilder, private userService:UserService, private route:Router){
    this.initializer();
   this.userService.userAuthReload();
  }
  
  initializer(){
    this.userRegistrationForm = this.fb.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      dob:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(4)]],
      country:['',[Validators.required]]
    })
  }

  get Name(){
    return this.userRegistrationForm.get('name');
  }
  get Phone(){
    return this.userRegistrationForm.get('phone');
  }
  get DOB(){
    return this.userRegistrationForm.get('dob');
  }
  get Email(){
    return this.userRegistrationForm.get('email');
  }
  get Password(){
    return this.userRegistrationForm.get('password');
  }

  getFormData(){
    console.log(this.userRegistrationForm.value);
   

    if(this.userRegistrationForm.invalid){
      alert('Registration succesfully done...!');
    }else {
      console.log('registration failed');
    }
    this.usersData();
  }

  usersData(){
    this.userService.userSignUp(this.userRegistrationForm.value).subscribe((result)=>{
      console.log(result)
      localStorage.setItem('user',JSON.stringify(result.body))
      this.route.navigate([' '])

    })
  }




  
}
