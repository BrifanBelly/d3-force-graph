import { Component, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[nodeName]',
    template: `
    <svg:rect class="box" #bbox style="fill-opacity: .7;"></svg:rect>
                        <svg:text fill="#fff"
                        *ngIf="node.icon !== 'Area'"
                        lengthAdjust="spacingAndGlyphs"
                        [attr.textLength]="node.r * 3 - 3">
                            <tspan [attr.dy]="(i + 1) * 15 / (i + 1)" [attr.x]= "node.r" *ngFor="let n of node.name; let i = index">
                            {{n}}
                            </tspan>
                        </svg:text>
    `
})
export class LabelComponent implements AfterViewInit {
    // tslint:disable-next-line:no-input-rename
    @Input('nodeName') node;
    @ViewChild('bbox') bboxElement: ElementRef;
    description: ElementRef;
    boxWidth;

    constructor(private _element: ElementRef) {
    this.description = _element;
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            const bbox = this.description.nativeElement.getBBox();
            this.boxWidth = bbox.width;

            if (bbox.x !== 0) {
              const rect = this.bboxElement.nativeElement;
              rect.setAttribute('x', bbox.x - 5);
              rect.setAttribute('y', bbox.y - 2);
              rect.setAttribute('rx', 5);
              rect.setAttribute('ry', 10);
              rect.setAttribute('width', bbox.width + 10);
              rect.setAttribute('height', bbox.height + 4);
              rect.setAttribute('class', 'bounding');
            }

            this.description.nativeElement
            .setAttribute('transform', 'translate(' + (-this.node.r - this.boxWidth / 2 ) + ',' + this.node.r + ')');
          });
    }

    mouseEnter() {
        // tslint:disable-next-line:max-line-length
        this.description.nativeElement.setAttribute('transform', 'translate(' + (-this.node.r - this.boxWidth / 2 ) + ',' + (this.node.r + 25) + ')');
    }

    mouseLeave() {
        // tslint:disable-next-line:max-line-length
        this.description.nativeElement.setAttribute('transform', 'translate(' + (-this.node.r - this.boxWidth / 2 ) + ',' + (this.node.r) + ')');
    }
}
