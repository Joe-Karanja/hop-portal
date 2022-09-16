import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from "@angular/core";

import { MenuService } from "./menu.service";
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-menu",
  template: `
    <div class="ma-1 pa-1" *ngIf="showSwitch">
    <nz-select [nzPlaceHolder]="'Buyer'">
      <nz-option nzValue="Buyer" nzLabel="Buyer" ></nz-option>
      <nz-option nzValue="Seller" nzLabel="Seller" ></nz-option>
    </nz-select>
    </div>
    <ng-material-multilevel-menu
      [configuration]="config"
      [items]="menuItems"
      class="navigation"
      ></ng-material-multilevel-menu>
  `,
  styleUrls: ['./menu.component.scss'],
  providers: [MenuService]
})
export class MenuComponent implements OnChanges, OnInit, OnDestroy {
  @Input() direction: string;

  private langChangeSubscription!: Subscription;
  currentLang = "en";
  menuItems = [];
  config;
  showSwitch: Boolean;

  constructor(
    public translate: TranslateService,
    public menuService: MenuService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.config = {
      ...this.config,
      rtlLayout: this.direction === "rtl" ? true : false
    };
  }

  ngOnInit() {
    const roles = JSON.parse(localStorage.getItem('userRoles'));
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const menu = this.menuService.getAll();
    this.menuItems = menu;
    let filteredMenus = [];
    // this.menuItems.map(item => {
    //   for(let i = 0; i < roles.length; i++) {
    //     if (roles.includes(item.role) && !filteredMenus.includes(item)) {
    //       filteredMenus.push(item);
    //     }
    //   }
    // })
    this.menuItems.map(item => {
      for(let i = 0; i < profiles.length; i++) {
        if (profiles.includes(item.profile) && !filteredMenus.includes(item) ) {
          filteredMenus.push(item);
        }
      }
    })
    if(profiles.includes('BUSINESS_BUYER') && profiles.includes('BUSINESS_SELLER')) {
      this.showSwitch = true;
    } 
    this.menuItems = filteredMenus;
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      //const updatedMenu = this.menuService.getAll();
      const updatedMenu = filteredMenus;
      this.menuItems = updatedMenu;
    });

    this.config = {
      paddingAtStart: false,
      interfaceWithRoute: true,
      collapseOnSelect: true,
      highlightOnSelect: true,
      rtlLayout: this.direction === "rtl" ? true : false,
      selectedListFontColor: "#fcb900"
    };
  }

  ngOnDestroy() {
    this.langChangeSubscription.unsubscribe();
  }
}
