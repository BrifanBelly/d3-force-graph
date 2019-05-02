import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[menu1]',
    template: `
    <svg:g *ngFor="let m of menuList" class="menu-item" (click)="clicked(m, $event)">
    <title> {{m.name}}</title>
    <svg:circle [attr.r]="m.r" [attr.cx]="m.cx" [attr.cy]="m.cy"></svg:circle>
    <svg:text class="fa menu-icon" [attr.x]="m.cx - 7" [attr.y]="m.cy + 4"> {{m.icon}} </svg:text>
    </svg:g>`,
    styles: [`.menu-item > circle { fill: white; stroke: #006699; stroke-width: 1}`,
             `.menu-item:hover > circle { fill: #adf; stroke-width: 2; stroke: #fff }`]
})
export class Menu1Component implements OnInit {
    // tslint:disable-next-line:no-input-rename
    @Input('menu1') menu;
    @Output() menuClicked: EventEmitter<number> = new EventEmitter<number>();
    menuList = [];
    icons = ['\uf039', '\uf06e', '\uf065', '\uf0eb'];
    names = ['actions menu', 'eye', 'details form', 'mark on graph'];
    constructor() { }

    ngOnInit(): void {
        const angle = d3
      .scaleLinear()
      .domain([0, this.menu])
      .range([-1.4, -6]);

        for (let i = 0; i < this.menu; i++) {
            this.menuList
            .push({r: 20, cx:  Math.sin(angle(i)) * 60, cy: Math.cos(angle(i)) * 60, id: i + 1, icon: this.icons[i], name: this.names[i]});
        }
    }

    clicked(m, event) {
        event.preventDefault();
        this.menuClicked.emit(m.id);
        // alert('clicked menu item > ' + m.id);
    }
}
