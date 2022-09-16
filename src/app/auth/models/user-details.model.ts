export class UserDetailsModel {
    userLastName!: string;
    userFirstName!: string;
    userEmail!: string;
    businessSubsector!: string;
    userPhoneNumber!: string;
    userPassword!: string;

    setBusinessDetails(udm: UserDetailsModel) {
        this.userLastName = udm.userLastName;
        this.userFirstName = udm.userFirstName;
        this.userEmail = udm.userEmail;
        this.businessSubsector = udm.businessSubsector;
        this.userPhoneNumber = udm.userPhoneNumber;
    }
}