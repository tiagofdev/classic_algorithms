// Coin Change

import {Controller} from "../controller/controller";
import {AppState} from "../interface/app-state";
import {Response} from "../interface/response";
import {DataState} from "../enum/data-state.enum";
import {map, Observable, of, startWith} from "rxjs";
import {catchError} from "rxjs/operators";
import {NgForm} from "@angular/forms";

export class GraphColoring {
  constructor(private services: Controller) { }

  readonly  dataState = DataState;

  coloringResponse$!: Observable<AppState<Response>>;
  getResponse(form: NgForm): Observable<AppState<Response>> {
    this.coloringResponse$ = this.services.coloring$(form.value.inputEdges)
      .pipe(
        map(results => {
          return { dataState: DataState.LOADED_STATE, response: results }
        }),
        startWith({ dataState: DataState.LOADING_STATE }),
        catchError((err: string) => {
          return of({ dataState: DataState.ERROR_STATE, error: err })
        })
      );
    return this.coloringResponse$;
  }

  data = {
    title: "Graph Coloring Problem",
    description: "The graph coloring problem involves assigning colors to certain vertices of a " +
      "graph in a way such that no two adjacent vertices have the same color. The chromatic number " +
      "is the smallest number of colors needed to color the graph.",
    examples: "\n  Input:\n" +
      "  Edges = (A,B)(A,E)(A,F)(D,E)\n" +
      "         (B,E)(B,D)(C,D)(C,E)\n" +
      "  Output:\n" +
      "  Graph Coloring: \n" +
      "    The color of vertex A is RED\n" +
      "    The color of vertex B is GREEN\n" +
      "    The color of vertex C is RED\n" +
      "    The color of vertex D is BLUE\n" +
      "    The color of vertex E is YELLOW\n" +
      "    The color of vertex F is GREEN",
    inputNotes: "Use Parentheses and commas!" ,
    inputs: ["Edges: "],
    parameters: ["inputEdges"],
    patterns: ["letters-numbers-commas-parentheses"],
    results: ["Graph Coloring: "],
    references: ["https://www.techiedelight.com/greedy-coloring-graph/"],
    algorithm: "  public ArrayList<String> graphColoring(String inputEdges) {\n" +
      "        ArrayList<String> results = new ArrayList<>();\n" +
      "        results.add(\"\");\n" +
      "        ArrayList<Edge> edges = new ArrayList<>();\n" +
      "        ********************************************************\n" +
      "        edges = ... formatted input \n" +
      "        ********************************************************\n" +
      "        final String[] colors = \{ \"RED\", \"GREEN\", \"BLUE\", \"YELLOW\", \"CYAN\", \"MAGENTA\",\n" +
      "            \"ORANGE\", \"BLACK\", \"WHITE\", \"BROWN\", \"PINK\", \"PURPLE\", \"GRAY\", \"TEAL\" };\n" +
      "        final Graph graph = new Graph(edges);\n" +
      "        final Set<String> keys = graph.adjacents.keySet();\n" +
      "        Map<String, Integer> coloring = new HashMap<>();\n" +
      "        for (String vertex : keys) {\n" +
      "            Set<Integer> assigned = new TreeSet<>();\n" +
      "            for (String adjacent : graph.adjacents.get(vertex)) {\n" +
      "                if (coloring.containsKey(adjacent))\n" +
      "                    assigned.add(coloring.get(adjacent));\n" +
      "            }\n" +
      "            int color = 0;\n" +
      "            for (Integer c : assigned) {\n" +
      "                if (color != c) break;\n" +
      "                color++;\n" +
      "            }\n" +
      "            coloring.put(vertex, color);\n" +
      "            results.add(\"The color of vertex \" + vertex + \" is \" + colors[coloring.get(vertex)]);\n" +
      "        }\n" +
      "        return results;\n" +
      "    }"
  }

  getData(): any {
    return this.data;
  }
}
