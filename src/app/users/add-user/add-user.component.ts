import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { HttpService } from '../../shared/http.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  cardTitle: string;
  editBool: boolean;
  editData: boolean;
  errorMessage: string;
  form: FormGroup;
  loading: boolean = false;
  user: any;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private _httpService: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
    this.editBool = this.data['updateUser']
    
    this.editData = this.data['updateUser'];
    this.cardTitle = this.editData ? "Update User Details": "Add a New User";
    this.user = this.data['data'];
    this.form = this.fb.group({
      //userName: [this.user ? this.user['userName']: '', Validators.compose([Validators.required])],
      email:[this.user ? this.user['email']: '', Validators.compose([Validators.email, Validators.required])],
      firstName:[this.user ? this.user['firstName']: '', Validators.compose([Validators.required])],
      lastName:[this.user ? this.user['lastName']: '', Validators.compose([Validators.required])],
      remarks:[this.user ? this.user['remarks']: '', Validators.compose([Validators.required])],
      phoneNumber:[this.user ? this.user['phoneNumber'].slice(3): '', Validators.compose([Validators.required])],
      phoneNumberPrefix:[this.user ? this.user['phoneNumber'].slice(0,4): '', Validators.compose([Validators.required])]
    });
    if (this.editBool && this.user['email']) {
      this.form.controls.email.disable();
    } else {
      this.form.controls.email.enable();
    }
  }

  private submitUsersDetails(model): void {
    this.loading = true;
    this._httpService.postRB('api/v1/user/create-hop-users', model).subscribe(res => {
      if (res['status'] === 200) {
        if (res["message"] == "Data staged successfully") {
          this.toastr.success('User created awaiting approval', 'Success!')
          this.close();
          this.loading = false;
        } else {
          this.toastr.success("User created successfully", "Success!");
          this.loading = false;
        }
        this.close();
      } else if (res['status'] === 403) {
        this.errorMessage = this._httpService.loadErrorMessage();
        this.loading = false;
      } else {
        this.loading = false;
        this.errorMessage = res['message']
      }
    })
  }

  //creates a new user
  addNewUser(): void {
    let model = {
      email: this.form.value.email,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      remarks: this.form.value.remarks,
      phoneNumber: this.form.value.phoneNumberPrefix + this.form.value.phoneNumber,
      previousData: {}
    };
    let newModel = {
      email: this.form.value.email,
      phoneNumber: this.form.value.phoneNumberPrefix + this.form.value.phoneNumber
    };
    this.submitUsersDetails(model);
    // this._httpService.post("api/v1/user/email-lookup", newModel).subscribe(res => {
    //   if (res["status"] === 200) {
    //     this.submitUsersDetails(model);
    //   } else if (res["status"] === 400) {
    //     this.errorMessage = res["message"];
    //     this.loading = false;
    //   }
    // })
  }

  //updates user details
  editUser(): void {
    const model = {
      id: this.user['id'],
      email: this.user['email'],
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      phoneNumber: this.form.value.phoneNumberPrefix + this.form.value.phoneNumber,
      remarks: this.form.value.remarks,
      previousData: {
        id: this.data['data']['id'],
        email: this.user["email"],
        firstName: this.user["firstName"],
        lastName: this.user["lastName"],
        phoneNumber: this.user["phoneNumber"],
        remarks: this.user["remarks"]
      }
    };
    this._httpService.post("api/v1/user/update-user", model).subscribe(res => {
      if (res['status'] === 200) {
        if(res["message"] = "Data staged successfully") {
          this.toastr.success("User details updated, awaiting approval", "Success!");
        } else {
          this.toastr.success("User details updated", "Success!");
        }
        this.close();
      } else {
        this.toastr.error("User details were not updated", "Error!");
        this.close();
      }
    })
  }

  //closes dialog
  close(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 500);
  }
}
