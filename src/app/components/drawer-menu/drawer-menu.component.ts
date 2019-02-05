import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'poke-drawer-menu',
  templateUrl: './drawer-menu.component.html',
  styleUrls: ['./drawer-menu.component.scss']
})
export class DrawerMenuComponent implements OnInit {

  @Input()
  public open: boolean;

  constructor() { }

  ngOnInit() {
    this.open = false;
  }

}
