interface ICreateAccount {
    businessType: 'personal' | 'corporate';
    businessSubsector: '1-1' | '2-10' | '10-50' | '50+';
    businessName: string;
    businessAdress: string;
    location: '1' | '2' | '3';
    businessPhoneNumber: string;
    businessEmail: string;
    kraPin: string;
    isSupplier: boolean;
    isBuyer: boolean;
    isBothSupplierBuyer: boolean;
    businessDetails: string;
    businessCapacity: '1-1' | '2-10' | '10-50' | '50+';
    yearsOfExperience: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userPhoneNumber: string;
    vatForm: any;
    kraForm: any;
    businessForm:any;
  }
  
  const inits: ICreateAccount = {
    businessType: 'personal',
    businessSubsector: '50+',
    businessAdress: 'ded',
    location: '1',
    businessPhoneNumber: 'Keenthemes Inc.',
    businessEmail: 'chweya.eugene@eclectics.io',
    isSupplier: false,
    isBuyer: true,
    isBothSupplierBuyer: false,
    businessDetails: 'lorem ipsum',
    businessCapacity: '2-10',
    yearsOfExperience: '10',
    userFirstName: 'Eugene',
    userLastName: 'Chweya',
    userEmail: 'ngugichweya@gmail.com',
    userPhoneNumber: '0705289881',
    vatForm: undefined,
    kraForm: undefined,
    businessForm: undefined,
    businessName: "name",
    kraPin: ""
  };
  
  export { ICreateAccount, inits };
  