import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';
// import { D3Service } from '../d3.service';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[zoomableOf]'
})
export class ZoomableDirective implements OnInit {
    @Input('zoomableOf') zoomableOf: ElementRef;
    zoom;

    constructor(private _element: ElementRef) {}

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
        this.applyZoomableBehaviour(this.zoomableOf, this._element.nativeElement);
    }

    applyZoomableBehaviour(svgElement, containerElement) {
        let svg, container, zoomed;
        svg = d3.select(svgElement);
        container = d3.select(containerElement);
        zoomed = () => {
          const transform = d3.event.transform;
          container.attr('transform', 'translate(' + transform.x + ',' + transform.y + ') scale(' + transform.k + ')');
        };

        this.zoom = d3.zoom().on('zoom', zoomed);
        svg.call(this.zoom).on('dblclick.zoom', null);
    }
}
