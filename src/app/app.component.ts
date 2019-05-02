import { Component, OnInit } from '@angular/core';
import { ForceDirectedGraph } from './force-directed.graph';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MenuClickService } from './menu-click.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'svg-menues';
  numberOfNodes = 20;
  curentIndex = 0;
  nodes = [];
  links = [];
  force;
  height = 900;
  width = 1900;
  icons: any[] = ['\uf044', '\uf1c0', '\uf1c7', '\uf187', '\uf108', '\uf2c2', '\uf2b9', '\uf234', '\uf037', '\uf0f9', '\uf2a3', '\uf2b9'];

  constructor(private menu: MenuClickService) {}

  ngOnInit() {
    this.nodes.push({id: 0, name: [this.fakeName], icon: this.randomIcon, r: 20, showLabel: true});

      for (let i = 0; i < this.numberOfNodes; i++) {
        this.nodes.push({id: i + 1, name: [this.fakeName], icon: this.randomIcon, r: 20, showLabel: true });
        this.links.push({source: this.getRandomInt(i), target: i + 1});
      }
      this.force = new ForceDirectedGraph(this.nodes, this.links);
  }

  tabChanged = (index: number): void => {
    console.log('tabChangeEvent => ', index);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  get randomIcon() {
    return this.icons[Math.floor(Math.random() * this.icons.length)];
  }

  get fakeName() {
    return Math.random().toString(36).substring(2, this.getRandomInt(15)) + Math.random().toString(36).substring(2, this.getRandomInt(15));
  }

  menuItemClicked(id) {
    this.menu.menuItemClicked(id);
  }

}
