import * as d3 from 'd3';

export class ForceDirectedGraph {
    simulation: d3.Simulation<any, any>;

    constructor(public nodes, public links, public center = {x: 1900 / 2, y: 900 / 2}) {
        this.initialiseForce();
    }

    initialiseForce(): any {
        this.simulation = d3.forceSimulation()
        .force('charge', d3.forceManyBody().strength(-5000))
        .force('collide', d3.forceCollide((d: any) => d.r))
        .force('x', d3.forceX().x((d: any) => this.center.x))
        .force('y', d3.forceY().y((d: any) => this.center.y));

        this.initNodes();
        this.initLinks();
    }

    initLinks(): any {
        this.simulation.force('links', d3.forceLink(this.links)
        .id((d: any) => d.id)
        .strength(1));
    }

    initNodes(): any {
        this.simulation.nodes(this.nodes);
    }
}
