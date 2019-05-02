import { Directive, Input, ElementRef } from '@angular/core';
import * as d3 from 'd3';
// import { D3Service } from '../d3.service';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[draggableNode]'
})
export class DraggableDirective {
    @Input('draggableNode') draggableNode: Node;

    // tslint:disable:no-input-rename
    @Input('graph') graph;

    @Input('sticky') sticky = {s: false};

    constructor(private _element: ElementRef) { }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
      // console.log('nodes', this.nodes);
        this.applyDraggableBehaviour(this._element.nativeElement, this.draggableNode, this.graph, this.sticky);
    }

    applyDraggableBehaviour(element, node, graph, sticky) {
        const d3element = d3.select(element);

        function started() {
          /** Preventing propagation of dragstart to parent elements */
          d3.event.sourceEvent.stopPropagation();
          console.log('darg', d3.event);

          if (!d3.event.active) {
            graph.simulation.alphaTarget(0.1).restart();
          }

          d3.event.on('drag', dragged).on('end', ended);

          function dragged() {
            node.fx = d3.event.x;
            node.fy = d3.event.y;
          }

          function ended() {
            console.log(node);
            if (!d3.event.active) {
              graph.simulation.alphaTarget(0);
            }

            // if (node.id === graph.root.obid) {
            //   graph.selectedCenter = {x: node.x, y: node.y };
            //   graph.simulation.force("x", d3.forceX().x((d) => node.x));
            //   graph.simulation.force("y", d3.forceY().y((d) => node.y));
            // } else {
              if (!sticky.s) {
                node.fx = null;
                node.fy = null;
                node.isStatic = false;
              }
            // }

            // nodes.forEach((n, i) => {
            //   nodes.splice(i, 1, { ...n, x: node.x, y: node.y });
            // });

            // graph.simulation.force('x', d3.forceX().x((d) => node.x));
            // graph.simulation.force('y', d3.forceY().y((d) => node.y));

            // console.log(graph.selectedCenter);

            // console.log(nodes.length);

            // nodes.map((n: any) => {
            //   return { ...n, x: node.x, y: node.y };
            // });
            graph.simulation.alpha(0.1).restart();
          }
        }

        d3element.call(d3.drag()
          .on('start', started));
    }
}
