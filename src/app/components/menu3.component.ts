import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[menu3]',
    template: `
    <svg:path [attr.d]="pathData" fill=#aaa opacity=.95></svg:path>
    <svg:g *ngFor="let m of menuList" class="menu-item" (click)="clicked(m, $event)">
    <title> {{m.name}}</title>
    <svg:circle [attr.r]="m.r" [attr.cx]="m.cx" [attr.cy]="m.cy"></svg:circle>
    <svg:text class="fa menu-icon" [attr.x]="m.cx - 7" [attr.y]="m.cy + 4"> {{m.icon}} </svg:text>
    </svg:g>`,
    styles: [`.menu-item > circle { fill: rgba(0,0,0,0.0); stroke: white; stroke-width: 1.5; opacity: 1}`,
             `.menu-item:hover > circle { fill: rgba(0,180,200,0.5); stroke: #fff }`,
             `.menu-icon {fill: white}`,
             `.menu-item:hover > .menu-icon {fill: rgba(0,0,60,0.9)}`]
})
export class Menu3Component implements OnInit {
    // tslint:disable-next-line:no-input-rename
    @Input('menu3') menu;
    @Output() menuClicked: EventEmitter<number> = new EventEmitter<number>();
    menuList = [];
    icons = ['\uf039', '\uf06e', '\uf065', '\uf0eb'];
    names = ['actions menu', 'eye', 'details form', 'mark on graph'];
    radius = 80;
    pathData;

    arc = d3.arc()
    .innerRadius(this.radius - 25)
    .outerRadius(this.radius + 25)
    .cornerRadius(50);

    pie = d3.pie()
          .value((d: any) => d)
          .startAngle(-30 * (Math.PI / 180))
          .endAngle(120 * (Math.PI / 180))
          .sort(null);

    constructor() { }

    ngOnInit(): void {
        const angle = d3
      .scaleLinear()
      .domain([0, this.menu])
      .range([-2.95, -5.56]);

        for (let i = 0; i < this.menu; i++) {
            this.menuList
            // tslint:disable-next-line:max-line-length
            .push({r: 20, cx:  Math.sin(angle(i)) * this.radius, cy: Math.cos(angle(i)) * this.radius, id: i + 1, icon: this.icons[i], name: this.names[i]});
        }
        // this.pathData = this.pie([1]);
        this.pathData = this.arc(<any>this.pie([1])[0]);
        console.log(this.pathData);
    }

    clicked(m, event) {
        event.preventDefault();
        this.menuClicked.emit(m.id);
        // alert('clicked menu item > ' + m.id);
    }
}
