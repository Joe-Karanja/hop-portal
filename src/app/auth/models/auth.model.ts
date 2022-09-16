export class AuthModel {
  access_token: string;
  refresh_token: string;
  expires_in: Date;
  user_details: {
    id: number;
    createdOn: string;
    softDelete: boolean;
    email: string;
    phoneNumber: string;
    isFirstTimeLogin: boolean;
    channel: string;
    firstName: string;
    lastName: string;
    remarks: string;
    blockedBy: string;
    blockedRemarks: string;
    loginAttempts: number;
    isBeingEdited: boolean;
    primaryProfile: string;
    beingEdited: boolean;
    firstTimeLogin: boolean;
    isBlocked: boolean;
    profileArray: string[]
  }
  user_roles: string[];
  business_id: string;

  setAuth(auth: AuthModel) {
    this.access_token = auth.access_token;
    this.refresh_token = auth.refresh_token;
    this.expires_in = auth.expires_in;
    this.user_details = auth.user_details; 
    this.user_details.id = auth.user_details.id;
    this.user_details.createdOn = auth.user_details.createdOn;
    this.user_details.softDelete = auth.user_details.softDelete;
    this.user_details.email = auth.user_details.email;
    this.user_details.phoneNumber = auth.user_details.phoneNumber;
    this.user_details.isFirstTimeLogin = auth.user_details.isFirstTimeLogin;
    this.user_details.channel = auth.user_details.channel;
    this.user_details.firstName = auth.user_details.firstName;
    this.user_details.lastName = auth.user_details.lastName;
    this.user_details.remarks = auth.user_details.remarks;
    this.user_details.blockedBy = auth.user_details.blockedBy;
    this.user_details.blockedRemarks = auth.user_details.blockedRemarks;
    this.user_details.loginAttempts = auth.user_details.loginAttempts;
    this.user_details.isBeingEdited = auth.user_details.isBeingEdited;
    this.user_details.primaryProfile = auth.user_details.primaryProfile;
    this.user_details.beingEdited = auth.user_details.beingEdited;
    this.user_details.firstTimeLogin = auth.user_details.firstTimeLogin;
    this.user_details.isBlocked = auth.user_details.isBlocked;
    this.user_details.profileArray = auth.user_details.profileArray;
    this.business_id = auth.business_id;
  }
}
