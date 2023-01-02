import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {Controller} from "./controller/controller";
import {DataState} from "./enum/data-state.enum";
import {TwoSumComponent} from "./components/twosum.component";
import {DynamicChildLoaderDirective} from "./loadComponent.directive";
import {AboutComponent} from "./components/about.component";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {AppState} from "./interface/app-state";
import {Response} from "./interface/response";
import {Knapsack} from "./components/knapsack";
import {Quicksort} from "./components/quicksort";
import {Dijkstras} from "./components/dijkstras";
import {Kruskal} from "./components/kruskal";
import {DFS} from "./components/dfs";
import {KMP} from "./components/kmp";
import {CoinChange} from "./components/coin-change";
import {JobSequencing} from "./components/job-sequencing";
import {GraphColoring} from "./components/graph-coloring";
import Graph from "graphology";
import Sigma from "sigma";
import getNodeProgramImage from "sigma/rendering/webgl/programs/node.image";

import ForceSupervisor from "graphology-layout-force/worker";


@Component({
  selector: 'appRoot',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None // This allows parent app.component.css to define classes
  // to be used in children styles
})
export class AppComponent implements OnInit {

  //previousComponent; // by default start with about
  currentComponent;
  data: any;
  readonly dataState = DataState;
  component: any;
  @ViewChild(DynamicChildLoaderDirective, {static: true})
  dynamicChild!: DynamicChildLoaderDirective;
  colors = [ "red", "green", "blue", "orange", "cyan", "magenta",
    "goldenrod", "brown", "pink", "teal", "coral", "seagreen", "indigo", "lime", "saddlebrown",
    "skyblue", "slateblue", "royalblue", "peru", "olive", "yellow"];
  @ViewChild('onesieForm')
  myForm!: NgForm;

  problems: Array<any> = [
    {value: "about", label: "About", button: "aboutButton", component: AboutComponent},
    {value: "dijkstras", label: "Dijkstra's", button: "dijkstrasButton", component: Dijkstras},
    {value: "coloring", label: "Graph Coloring", button: "coloringButton", component: GraphColoring},
    {value: "dfs", label: "Depth First Search", button: "dfsButton", component: DFS},
    //{value: "kruskal", label: "Kruskal", button: "kruskalButton", component: Kruskal},
    {value: "twoSum", label: "Two Sum", button: "twoSumButton", component: TwoSumComponent},
    {value: "knapsack", label: "0-1 Knapsack", button: "knapsackButton", component: Knapsack},
    {value: "quicksort", label: "Quicksort", button: "quicksortButton", component: Quicksort},
    {value: "kmp", label: "Knuth Morris Pratt", button: "kmpButton", component: KMP},
    {value: "coinChange", label: "Coin Change", button: "coinChangeButton", component: CoinChange},
    {value: "jobSeq", label: "Job Sequencing", button: "jobSeqButton", component: JobSequencing}

  ];

  constructor(private controller: Controller, public viewContainerRef: ViewContainerRef) {
    this.currentComponent = this.problems[0];
  }

  ngAfterViewInit(): void {
    this.switchComponent(this.currentComponent);
  }

  ngOnInit(): void {
    this.component = new this.currentComponent.component(this.controller);
    this.data = this.component.getData();
    //console.log(this.data["title"]);
  }

  switchComponent(problem: any): void {
    this.response$ = new Observable<AppState<Response>>();

    // uncheck previous component button
    // @ts-ignore
    document.getElementById(this.currentComponent.button)!.checked = false;
    document.getElementById(this.currentComponent.button)!.style.backgroundColor = "gray";
    // Unload about child component
    if (this.currentComponent.value === "about") {
      //this.dynamicChild.viewContainerRef.clear();
    }
    // ... or clear data
    else {
      this.component = null;
      this.data = null;
    }

    this.currentComponent = problem;
    // check this component button
    // @ts-ignore
    document.getElementById(problem.button)!.checked = true;
    document.getElementById(problem.button)!.style.backgroundColor = "seagreen";
    if (problem.value === "about") {
      // this.dynamicChild.viewContainerRef.createComponent(problem.component);
    }
    else {
      this.component = new this.currentComponent.component(this.controller);
      this.data = this.component.getData();
    }
    const sigma_container = document.getElementById("sigma-container") as HTMLElement;
    sigma_container!.style.height = "0";
    sigma_container!.style.border = "none";
    this.refresh_graph();

    this.myForm.resetForm();

    // This lets you access elements of the DOM
    // this.MyDOMElement.nativeElement.appendChild(new_element);
  }

  response$!: Observable<AppState<Response>>;


  getResponse(form: NgForm): void {
    // This block is to remove any extra white space or commas.
    // This is a measure against those users who just want to see the world burn!
    let inputs = form.value;

    for (let input in inputs) {
      let value = inputs[input];
      value = value.trim();
      while (value.startsWith(",") || value.endsWith(",") || value.startsWith(" ") || value.endsWith(" ")) {
        if (value.startsWith(",")) {
          value = value.slice(1);
        }
        if (value.endsWith(",")) {
          value = value.slice(0, -1);
        }
        value = value.trim();
      }
      inputs[input] = value;
    }

    // Graph Drawing Algorithm
    if ( this.component.data.title === "Depth First Search" ||
          this.component.data.title === "Graph Coloring Problem" ||
      this.component.data.title === "Dijkstra's Algorithm") {
      this.refresh_graph();
      const sigma_container = document.getElementById("sigma-container") as HTMLElement;
      sigma_container.style.height = "400px";
      sigma_container.style.width = "600px";
      sigma_container.style.border = "1px solid black";
      const graph_container = document.getElementById("graph") as HTMLElement;
      graph_container.style.height = "398px";
      const graph_data = new Graph();
      let str = inputs.inputEdges;
      let parts = str.split("(");

      for (let x = 0; x < parts.length; x++) {

        if (parts[x] != "") {

          let edited_part = parts[x];

          while (edited_part.includes(")")) {
            edited_part = edited_part.replace(")", "");
          }
          let edge = edited_part.split(",");
          if (!graph_data.hasNode(edge[0])) {
            const r_color = Math.floor(Math.random() * this.colors.length);
            graph_data.addNode(edge[0], {size: 15, label: edge[0], color: this.colors[r_color]});
          }
          if (!graph_data.hasNode(edge[1])) {
            const r_color = Math.floor(Math.random() * this.colors.length);
            graph_data.addNode(edge[1], {size: 15, label: edge[1], color: this.colors[r_color]});
          }
          if ( this.component.data.title === "Dijkstra's Algorithm" ) {
            if ( graph_data.hasEdge(edge[1], edge[0]) ) {
              graph_data.addEdge(edge[0], edge[1], {
                type: "arrow",
                size: 4,
                label: '         ' + edge[2],
                color: "black",
                weight: edge[2] });
            } else {
              graph_data.addEdge(edge[0], edge[1], {
                type: "arrow",
                size: 8,
                label: edge[2],
                weight: edge[2] });
            }

          } else if ( this.component.data.title === "Depth First Search" ) {
            graph_data.addEdge(edge[0], edge[1], {
              type: "arrow",
              size: 8});
          }
          else {
            graph_data.addEdge(edge[0], edge[1], {type: "line", size: 2});
          }

        }
      }
      graph_data.nodes().forEach((node, i) => {
        const angle = (i * 2 * Math.PI) / graph_data.order;
        graph_data.setNodeAttribute(node, "x", 100 * Math.cos(angle));
        graph_data.setNodeAttribute(node, "y", 100 * Math.sin(angle));
      });


      // this.response$.subscribe( response => {
      //   let results = response.response?.data.results;
      //
      // });

      const renderer = new Sigma(graph_data, graph_container, {
        allowInvalidContainer: true,
        renderEdgeLabels: true

      });
      const layout = new ForceSupervisor(graph_data);
      layout.start();

      // Get Result from Backend Server
      this.response$ = this.component.getResponse(form);

      // Update Graph Coloring Problem with colors from results
      if ( this.component.data.title === "Graph Coloring Problem") {
        this.response$.subscribe( response => {
          let results = response.response?.data.results;
          for ( let i = 0; i < results!.length; i++ ) {
            if ( results![i] != "" ) {
              let vertex = results![i].substring(20,21);
              let color = results![i].substring(25);
              color = color.toLowerCase();
              graph_data.setNodeAttribute(vertex, "color", color);
            }
          }
        });

      }

    }


  }

  refresh_graph() {
    // to delete & refresh the graph
    let g = document.getElementById('graph') as HTMLElement;

    let p = g!.parentNode;

    p!.removeChild(g);
    let c = document.createElement('div');
    c.setAttribute('id', 'graph');
    p!.appendChild(c);

  }

}
