import { AuthModel } from './auth.model';
import { UserDetailsModel } from './user-details.model';
import { BusinessDetailsModel } from './business-details.model';


export class UserModel extends AuthModel {
  id!: number;
  userDetails!: UserDetailsModel;
  businessDetails!: BusinessDetailsModel;
  kraForm!: File;
  businessForm!: File;
  vatForm!: File; 

  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.id = user.id;
    this.userDetails = user.userDetails;
    this.businessDetails = user.businessDetails;
    this.kraForm = user.kraForm;
    this.businessForm = user.businessForm;
    this.vatForm = user.vatForm;
  }
}
