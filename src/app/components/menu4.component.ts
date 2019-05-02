import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[menu4]',
    template: `
    <svg:defs>
        <svg:mask id='mask'>
            <svg:path [attr.d]="mask" fill=white></svg:path>
            <svg:path *ngFor="let m of menuList" [attr.d]="arc(m)" fill=black ></svg:path>
        </svg:mask>

        <svg:mask id='mask2'>
            <svg:path [attr.d]="pathData" fill=#fff ></svg:path>
        </svg:mask>
    </svg:defs>

    <svg:path [attr.d]="pathData" fill=#aaa opacity=.95></svg:path>

    <svg:path [attr.d]="mask" mask="url(#mask)" fill=#006699 opacity=0.4></svg:path>

    <svg:g *ngFor="let m of menuList; let i = index" class="menu-item" (click)="clicked(m, $event)">
        <title> {{m.data.name}}</title>
        <svg:path class="item" [attr.d]="arc(m)"></svg:path>
        <svg:path class="highlight" mask="url(#mask2)" [attr.d]="arc3(mask2[i])" fill=#006699 ></svg:path>
        <svg:text class="fa" [attr.x]="arc.centroid(m)[0] - 6" [attr.y]="arc.centroid(m)[1] + 6"> {{m.data.icon}} </svg:text>
    </svg:g>

    `,
    styles: [`.menu-item > path { stroke: #006699; stroke-width: 0; opacity: 0}`,
             `.menu-item:hover > .highlight { opacity: 1}`]
})
export class Menu4Component implements OnInit {
    // tslint:disable-next-line:no-input-rename
    @Input('menu4') menu;
    @Output() menuClicked: EventEmitter<number> = new EventEmitter<number>();
    radius = 73;
    pathData;
    mask;
    mask2;
    menuList = [];
    icons = ['\uf039', '\uf06e', '\uf065', '\uf0eb'];
    names = ['actions menu', 'eye', 'details form', 'mark on graph'];
    constructor() { }

    arc = d3.arc()
  .innerRadius(this.radius - 20)
  .outerRadius(this.radius + 20);

  pie = d3.pie()
        .value((d: any) => d.width)
        .startAngle(-20 * (Math.PI / 180))
        .endAngle(110 * (Math.PI / 180))
        .padAngle(.02)
        .sort(null);

    arc2 = d3.arc()
    .innerRadius(this.radius - 20)
    .outerRadius(this.radius + 24)
    .cornerRadius(25);

    pie2 = d3.pie()
          .value((d: any) => d)
          .startAngle(-23 * (Math.PI / 180))
          .endAngle(112 * (Math.PI / 180))
          .sort(null);

     arc3 = d3.arc()
   .innerRadius(this.radius + 18)
   .outerRadius(this.radius + 23.5);

    ngOnInit(): void {
    //     const angle = d3
    //   .scaleLinear()
    //   .domain([0, this.menu])
    //   .range([-1.4, -6]);

        for (let i = 0; i < this.menu; i++) {
            this.menuList
            .push({id: i + 1, width: 10, icon: this.icons[i], name: this.names[i]});
        }

        this.mask2 = this.pie(this.menuList);
        this.menuList = this.pie(this.menuList);
        this.mask = this.arc(<any>this.pie(<any>[{width: 1}])[0]);
        this.pathData = this.arc2(<any>this.pie2([1])[0]);
    }

    clicked(m, event) {
        console.log('cliaked', m);
        event.preventDefault();
        this.menuClicked.emit(m.data.id);
        // alert('clicked menu item > ' + m.id);
    }
}
