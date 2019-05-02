import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[menu2]',
    template: `
    <svg:g *ngFor="let m of menuList" class="menu-item" (click)="clicked(m, $event)">
    <title> {{m.data.name}}</title>
    <svg:path [attr.d]="arc(m)"></svg:path>
    <svg:text class="fa" [attr.x]="arc.centroid(m)[0] - 6" [attr.y]="arc.centroid(m)[1] + 6"> {{m.data.icon}} </svg:text>
    </svg:g>`,
    styles: [`.menu-item > path { fill: white; stroke: #006699; stroke-width: 1}`,
             `.menu-item:hover > path { fill: #adf; stroke-width: 2; stroke: #fff }`]
})
export class Menu2Component implements OnInit {
    // tslint:disable-next-line:no-input-rename
    @Input('menu2') menu;
    @Output() menuClicked: EventEmitter<number> = new EventEmitter<number>();
    menuList = [];
    icons = ['\uf039', '\uf06e', '\uf065', '\uf0eb'];
    names = ['actions menu', 'eye', 'details form', 'mark on graph'];
    constructor() { }

    arc = d3.arc()
  .innerRadius(52)
  .outerRadius(83);

  pie = d3.pie()
        .value((d: any) => d.width)
        .startAngle(-90 * (Math.PI / 180))
        .endAngle(90 * (Math.PI / 180))
        .padAngle(.05)
        .sort(null);

    ngOnInit(): void {
    //     const angle = d3
    //   .scaleLinear()
    //   .domain([0, this.menu])
    //   .range([-1.4, -6]);

        for (let i = 0; i < this.menu; i++) {
            this.menuList
            .push({id: i + 1, width: 10, icon: this.icons[i], name: this.names[i]});
        }
        this.menuList = this.pie(this.menuList);
    }

    clicked(m, event) {
        console.log('cliaked', m);
        event.preventDefault();
        this.menuClicked.emit(m.data.id);
        // alert('clicked menu item > ' + m.id);
    }
}
