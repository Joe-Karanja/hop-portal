import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class MenuService {
  constructor(public translate: TranslateService) {}

  getAll() {
    return [
      //HOP_ADMIN
      {
        label: this.translate.instant("Dashboard"),
        icon: "appstore",
        role: "manage dashboard",
        profile: "HOP_ADMIN",
        items: [
          {
            link: "/charts",
            icon: "",
            label: this.translate.instant("Transactions Dashboard")
          }
        ]
      },
      {
        label: this.translate.instant("Companies"),
        icon: "business",
        profile: "HOP_ADMIN",
        role: "manage transactions",
        items: [
          { 
            link: "/companies/overview",
            //icon: "crop_square", 
            label: this.translate.instant("Companies")
          },
        ]
      },
      {
        label: this.translate.instant("Qusetionnaires"),
        icon: "insert_drive_file",
        role: "manage reports",
        profile: "HOP_ADMIN",
        items: [
          {
            link: "/questionnaires/overview",
            icon: "",
            label: this.translate.instant("Questions")
          },
          {
            link: "/questionnaires/categories",
            icon: "",
            label: this.translate.instant("Categories")
          }
        ]
      },
      {
        label: this.translate.instant("Products"),
        icon: "shopping_cart",
        role: "manage workflow",
        profile: "HOP_ADMIN",
        items: [
          {
            link: "/products/all", 
            icon: "",
            label: this.translate.instant('Supplier Products')
          }
        ]
      },
      {
        label: this.translate.instant("Tendering"),
        icon: "next_week",
        role: "manage workflow",
        profile: "HOP_ADMIN",
        items: [
          {
            link: "/tendering-hop/hop-RFI", 
            icon: "",
            label: this.translate.instant('RFIs')
          },
          {
            link: "/tendering-hop/hop-RFQ", 
            icon: "",
            label: this.translate.instant('RFQs')
          },
          {
            link: "/tendering-hop/hop-RFP", 
            icon: "",
            label: this.translate.instant('RFPs')
          },
          {
            link: "/tendering-hop/hop-purchase-orders", 
            icon: "",
            label: this.translate.instant('Purchase Orders')
          },
        ]
      },
      {
        label: this.translate.instant("Payments"),
        icon: "lock",
        role: "manage payments",
        profile: "HOP_ADMIN",
        items: [
          { 
            link: "/payments/orders", 
            icon: "",
            label: this.translate.instant('Purchase Orders') 
          },
          { 
            link: "/payments/invoices", 
            icon: "",
            label: this.translate.instant('Invoices') 
          },
        ]
      },
      {
        label: this.translate.instant("User Management"),
        icon: "face",
        role: "manage users",
        profile: "HOP_ADMIN",
        items: [
          { 
            link: "/users/list-users", 
            icon: "",
            label: this.translate.instant('List Users') 
          },
          { 
            link: "/users/admin-users", 
            icon: "",
            label: this.translate.instant('Admin Users') 
          },
          { 
            link: "/users/audit-trail", 
            icon: "",
            label: this.translate.instant('Audit Trail') 
          }
        ]
      },
      {
        label: this.translate.instant("Profiles Management Module"),
        icon: "recent_actors",
        role: "manage RBAC",
        profile: "HOP_ADMIN",
        items: [
          {
            link: "/rbac/all-profiles",
            icon: "", 
            label: this.translate.instant('Profiles')
          },
          {
            link: "/rbac/all-roles",
            icon: "", 
            label: this.translate.instant('roles')
          }
        ]
      },
      {
          label: this.translate.instant("Configurations Module"),
          icon: "settings",
          role: "manage configurations",
          profile: "HOP_ADMIN",
          items: [
            {
              link: "/configurations/email-templates",
              icon: "",
              label: this.translate.instant("Email Templates")
            },
            {
              link: "/configurations/sms-templates",
              icon: "",
              label: this.translate.instant("SMS Templates")
            },
            {
              link: "/configurations/business-categories",
              icon: "",
              label: this.translate.instant("Business Settings")
            }
          ]
        },
      
      // // Buyer
      {
        label: this.translate.instant("Dashboard"),
        icon: "appstore",
        role: "manage dashboard",
        profile: "BUSINESS_BUYER",
        items: [
          {
            link: "/charts",
            icon: "",
            label: this.translate.instant("Transactions Dashboard")
          }
        ]
      },
      {
        label: this.translate.instant("Tendering"),
        icon: "next_week",
        role: "manage workflow",
        profile: "BUSINESS_BUYER",
        items: [
          // {
          //   link: "/tendering/RFI", 
          //   icon: "",
          //   label: this.translate.instant('RFIs')
          // },
          {
            link: "/tendering/RFQ", 
            icon: "",
            label: this.translate.instant('RFQs')
          },
          // {
          //   link: "/tendering/purchase-orders", 
          //   icon: "",
          //   label: this.translate.instant('Purchase Orders')
          // },
          
          // {
          //   link: "/tendering/RFP", 
          //   icon: "",
          //   label: this.translate.instant('RFPs')
          // },
        ]
      },

      {
        label: this.translate.instant("Payments"),
        icon: "lock",
        role: "manage payments",
        profile: "BUSINESS_BUYER",
        items: [
          { 
            link: "/payments/orders", 
            icon: "",
            label: this.translate.instant('Purchase Orders') 
          },
          { 
            link: "/payments/invoices", 
            icon: "",
            label: this.translate.instant('Invoices') 
          },
        ]
      },

      {
        label: this.translate.instant("User Management"),
        icon: "face",
        role: "manage users",
        profile: "BUSINESS_BUYER",
        items: [
          { 
            link: "/users/list-users", 
            icon: "",
            label: this.translate.instant('List Users') 
          },
          { 
            link: "/users/audit-trail", 
            icon: "",
            label: this.translate.instant('Audit Trail') 
          }
        ]
      },
      
      {
        label: this.translate.instant("Business Profile"),
        icon: "business",
        role: "manage dashboard",
        profile: "BUSINESS_BUYER",
        items: [
          {
            link: "/my-company/general",
            icon: "",
            label: this.translate.instant("Company Details")
          },
          {
            link: "/my-company/questions",
            icon: "",
            label: this.translate.instant("Questionnaires")
          }
        ]
      },

      //Seller
      {
        label: this.translate.instant("Dashboard"),
        icon: "appstore",
        role: "manage dashboard",
        profile: "BUSINESS_SELLER",
        items: [
          {
            link: "/charts",
            icon: "",
            label: this.translate.instant("Transactions Dashboard")
          }
        ]
      },
      {
        label: this.translate.instant("Tendering"),
        icon: "next_week",
        role: "manage workflow",
        profile: "BUSINESS_SELLER",
        items: [
          {
            link: "/tendering-seller/supplier-RFI", 
            icon: "",
            label: this.translate.instant('RFIs')
          },
          {
            link: "/tendering-seller/supplier-RFQ", 
            icon: "",
            label: this.translate.instant('RFQs')
          },
          // {
          //   link: "/tendering-seller/supplier-RFP", 
          //   icon: "",
          //   label: this.translate.instant('RFPs')
          // },
          // {
          //   link: "/tendering-seller/orders", 
          //   icon: "",
          //   label: this.translate.instant('Orders')
          // },
        ]
      },
      {
        label: this.translate.instant("Products"),
        icon: "shopping_cart",
        role: "manage dashboard",
        profile: "BUSINESS_SELLER",
        items: [
          {
            link: "/products/my-products",
            icon: "",
            label: this.translate.instant("Products")
          }
        ]
      },
      {
        label: this.translate.instant("Payments"),
        icon: "lock",
        role: "manage payments",
        profile: "BUSINESS_SELLER",
        items: [
          { 
            link: "/payments/orders", 
            icon: "",
            label: this.translate.instant('Purchase Orders') 
          },
          { 
            link: "/payments/invoices", 
            icon: "",
            label: this.translate.instant('Invoices') 
          },
        ]
      },

      {
        label: this.translate.instant("User Management"),
        icon: "face",
        role: "manage users",
        profile: "BUSINESS_SELLER",
        items: [
          { 
            link: "/users/list-users", 
            icon: "",
            label: this.translate.instant('List Users') 
          },
          { 
            link: "/users/audit-trail", 
            icon: "",
            label: this.translate.instant('Audit Trail') 
          }
        ]
      },

      {
        label: this.translate.instant("Business Profile"),
        icon: "business",
        role: "manage dashboard",
        profile: "BUSINESS_SELLER",
        items: [
          {
            link: "/my-company/general",
            icon: "",
            label: this.translate.instant("My Company")
          }
        ]
      }

    ];
  }
}
