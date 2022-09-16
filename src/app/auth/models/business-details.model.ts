export class BusinessDetailsModel {
    businessType!: string;
    businessName!: string;
    businessAdress!: string;
    businessSubsector!: string;
    location!: string;
    businessPhoneNumber!: string;
    businessEmail!: string;
    kraPin: string;
    isSupplier!: boolean;
    isBuyer!: boolean;
    isBothSupplierBuyer!: boolean;
    businessDetails!: string;
    businessCapacity!: string;
    yearsOfExperience!: string;

    setBusinessDetails(bdm: BusinessDetailsModel) {
        this.businessType = bdm.businessType;
        this.businessName = bdm.businessName;
        this.businessAdress = bdm.businessAdress;
        this.businessSubsector = bdm.businessSubsector;
        this.location = bdm.location;
        this.businessPhoneNumber = bdm.businessPhoneNumber;
        this.businessEmail = bdm.businessEmail;
        this.kraPin = bdm.kraPin;
        this.isSupplier = bdm.isSupplier;
        this.isBuyer = bdm.isBuyer;
        this.isBothSupplierBuyer = bdm.isBothSupplierBuyer;
        this.businessDetails = bdm.businessDetails;
        this.businessCapacity = bdm.businessCapacity;
        this.yearsOfExperience = bdm.yearsOfExperience;
    }
} 