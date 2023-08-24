import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-user-add-form',
  templateUrl: './user-add-form.component.html',
  styleUrls: ['./user-add-form.component.scss']
})

export class UserAddFormComponent {
  newUser: FormGroup; 

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.newUser = this.fb.group({
      name: [''],
      email: [''],
      designation: [''],
      password: [''],
      role: [''],
    });
  }

  onAddUser() {
    console.log(this.newUser.value);
    this.adminService.registerUser(this.newUser.value.email, this.newUser.value.password).subscribe(
      {
        next: () => {
          this.adminService.insertUserDataModel({
            designation: this.newUser.value.designation,
            email: this.newUser.value.email,
            name: this.newUser.value.name,
            role: this.newUser.value.role
          }).subscribe({
            next: (response) => {
              console.log(response);
            },
            error: (error) => {
              console.log(error);
            },
            complete: ()=> console.log('Completed inserting of data Model subscription')
            
          })
        },
        error: (error) => {

        },
        complete: () => { 
          console.log('onAddUser function completed');
          
        }
      }
    )
  }
}
