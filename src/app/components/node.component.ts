import { Component, Input, HostListener, ElementRef, ViewChild } from '@angular/core';
import { LabelComponent } from './label.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[node]',
    template: `
    <svg:g #parent [attr.transform]="'translate('+ node.x +','+ node.y +')'" class="node">
        <svg:circle #nodeEle
        fill=white stroke-width=2 [attr.r]="node.r" [attr.cx]="0"  [attr.cy]="0" class="circle">
        </svg:circle>

        <svg:text class="fa"
        [attr.x]="-10"
        [attr.y]="6">
        {{ node.icon }}
        </svg:text>
                    <svg:g #description
                    class="description"
                    [nodeName]="node"
                    [ngStyle]="{'display' : (node.showLabel ? 'block': 'none') }">
                    </svg:g>

                    <svg:circle #hoverPanel r=50 fill=white opacity=0 ></svg:circle>
                    <svg:g #menu class="node-menu" style="opacity: 0; display: none" *ngIf="node.id === 0 || true">
                    <ng-content></ng-content>
                    </svg:g>
    </svg:g>
    `,
    styleUrls: ['component.styles.css']
})
export class NodeComponent {
    @Input() node;
    @ViewChild('nodeEle') nodeRef: ElementRef;
    @ViewChild('description') description: LabelComponent;
    @ViewChild('menu') menu: ElementRef;
    @ViewChild('parent') parent: ElementRef;
    @ViewChild('hoverPanel') hoverPanel: ElementRef;
    boxWidth = 0;
    mouseclicked = false;

    constructor() {}

    @HostListener('mouseover') onMouseHover() {
        this.node.fx = this.node.x;
        this.node.fy = this.node.y;
        this.description.mouseEnter();
        this.nodeRef.nativeElement.setAttribute('r', '50');
        this.nodeRef.nativeElement.setAttribute('stroke-width', '5');
        this.hoverPanel.nativeElement.setAttribute('r', '80');
        if (this.menu) {
        this.menu.nativeElement.setAttribute('style', 'opacity: 1');
        this.menu.nativeElement.setAttribute('style', 'display: block');
        }
    }

    @HostListener('mouseout') onMouseOut() {
        this.node.fx = null;
        this.node.fy = null;
        if (!this.mouseclicked) {
        this.description.mouseLeave();
        this.nodeRef.nativeElement.setAttribute('r', this.node.r);
        this.nodeRef.nativeElement.setAttribute('stroke-width', '2');
        this.hoverPanel.nativeElement.setAttribute('r', '50');
        if (this.menu) {
        this.menu.nativeElement.setAttribute('style', 'opacity: 0');
        this.menu.nativeElement.setAttribute('style', 'display: none');
        }
    }
    }

    @HostListener('click', ['$event']) click(event) {
        event.preventDefault();
        this.mouseclicked = true;
    }
}
