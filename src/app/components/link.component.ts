import { Component, Input } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[link]',
    template: `
    <svg:line
    style="stroke-width:2; stroke: #000"
        [attr.x1]="link.source.x"
        [attr.y1]="link.source.y"
        [attr.x2]="link.target.x"
        [attr.y2]="link.target.y"
    ></svg:line>
    `
})
export class LinkComponent {
@Input() link;
}
