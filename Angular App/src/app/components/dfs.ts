// Depth First Search

import {Controller} from "../controller/controller";
import {AppState} from "../interface/app-state";
import {Response} from "../interface/response";
import {DataState} from "../enum/data-state.enum";
import {map, Observable, of, startWith} from "rxjs";
import {catchError} from "rxjs/operators";
import {NgForm} from "@angular/forms";

export class DFS {
  constructor(private services: Controller) { }

  readonly  dataState = DataState;

  dfsResponse$!: Observable<AppState<Response>>;
  getResponse(form: NgForm): Observable<AppState<Response>> {
    this.dfsResponse$ = this.services.dfs$(form.value.inputEdges, form.value.inputSource)
      .pipe(
        map(results => {
          return { dataState: DataState.LOADED_STATE, response: results }
        }),
        startWith({ dataState: DataState.LOADING_STATE }),
        catchError((err: string) => {
          return of({ dataState: DataState.ERROR_STATE, error: err })
        })
      );
    return this.dfsResponse$;
  }

  data = {
    title: "Depth First Search",
    description: "DFS is an algorithm for traversing or searching a tree, as far as possible along " +
      "each branch before backtracking and following another branch. This algorithm is used to find connected " +
      "components, topological sorting and solving mazes. In topological sorting, each adjacent node v " +
      "connected to the root is visited only after all its dependencies (children or branches) are " +
      "visited. Topological ordering is possible if and only if the graph is directed and acyclic. " +
      "This implementation will stop the recursion and return if it finds the graph has a cycle. Time complexity " +
      "is O(n) where n is the number of vertices.",
    examples: "\n  Input:\n" +
      "  Edges = (A, B)(A, E)(B, C) \n" +
      "          (B, E)(D, C) \n" +
      "          (E, C)(E, D)\n" +
      "  Source = A\n" +
      "  Output:\n     Topological Ordering:\n" +
      "    A > B > E > D > C",
    inputNotes: "Group edges with parentheses (). \n" ,
    inputs: ["Edges: ", "Source: "],
    parameters: ["inputEdges", "inputSource"],
    patterns: ["letters-numbers-commas-parentheses", "letters-numbers"],
    results: ["Topological Ordering: "],
    references: ["UMGC - CMSC 350 - Data Structures"],
    algorithm: "public class Edge {\n" +
      "    String source, dest;\n" +
      "    public Edge(String source, String dest) {\n" +
      "        this.source = source;\n" +
      "        this.dest = dest;\n" +
      "    }\n" +
      "}\n" +
      "public class GraphDirected {\n" +
      "    Map<String, List<Edge>> adjacents = null;\n" +
      "    public GraphDirected (List<Edge> edges) {\n" +
      "        adjacents = new HashMap<>();\n" +
      "        for (Edge edge: edges) {\n" +
      "            if(!adjacents.containsKey(edge.source))\n" +
      "                adjacents.put(edge.source, new ArrayList<>());\n" +
      "            if(!adjacents.containsKey(edge.dest))\n" +
      "                adjacents.put(edge.dest, new ArrayList<>());\n" +
      "            adjacents.get(edge.source).add(edge);\n" +
      "        }\n" +
      "    }\n" +
      "}\n" +
      "public ArrayList<String> dfs(String inputEdges, String source) {\n" +
      "        ArrayList<String> results = new ArrayList<>();\n" +
      "        List<Edge> edges = new ArrayList<>();\n" +
      "        ********************************************************\n" +
      "        edges = ... receives formatted input\n" +
      "        ********************************************************\n" +
      "        GraphDirected graph = new GraphDirected(edges);\n" +
      "        final Set<String> keys = graph.adjacents.keySet();\n" +
      "        results.add(\"\");\n" +
      "        if (keys.contains(source)) {\n" +
      "            topologicalOrdering(graph, keys, source, results);\n" +
      "        }\n" +
      "        else {\n" +
      "            results.add(\"No adjacent nodes to \" + source + \"!\");\n" +
      "            return results;\n" +
      "        }\n" +
      "        return results;\n" +
      "    }\n" +
      "\n" +
      "    public void topologicalOrdering(GraphDirected graph, Set<String> keys,\n" +
      "                                    String source, ArrayList<String> results) {\n" +
      "        Stack<String> stack = new Stack<>();\n" +
      "        Map<String, Boolean> discovered = new HashMap<>();\n" +
      "        Map<String, Boolean> finished = new HashMap<>();\n" +
      "        for (String key : keys) {\n" +
      "            discovered.put(key, false);\n" +
      "            finished.put(key, false);\n" +
      "        }\n" +
      "        depthFirstSearch(graph, source, discovered, finished, stack, results);\n" +
      "        Iterator<String> it = stack.iterator();\n" +
      "        StringBuilder order = new StringBuilder();\n" +
      "        while(it.hasNext()) {\n" +
      "            order.append(stack.pop()).append(\" > \");\n" +
      "        }\n" +
      "        order.deleteCharAt(order.length() - 2);\n" +
      "        String[] words = order.toString().split(\"\\\\s+\");\n" +
      "        if (words.length == 1) results.set(0, \"No adjacent nodes to \" + source + \" were found!\");\n" +
      "        else results.add(order.toString());\n" +
      "        discovered.clear();\n" +
      "        finished.clear();\n" +
      "    }\n" +
      "\n" +
      "    public void depthFirstSearch(GraphDirected graph, String source,\n" +
      "                                 Map<String, Boolean> discovered,Map<String, Boolean> finished,\n" +
      "                                 Stack<String> stack, ArrayList<String> results) {\n" +
      "        if (discovered.get(source) && !finished.get(source)) {\n" +
      "            results.add(\"This graph contains a cycle!\");\n" +
      "            stack.clear();\n" +
      "            for (String d : discovered.keySet())\n" +
      "                finished.put(d, true);\n" +
      "            return;\n" +
      "        }\n" +
      "        if (finished.get(source))\n" +
      "            return;\n" +
      "        discovered.put(source, true);\n" +
      "        for (Edge edge : graph.adjacents.get(source)) {\n" +
      "            depthFirstSearch(graph, edge.dest, discovered, finished, stack, results);\n" +
      "        }\n" +
      "        finished.put(source, true);\n" +
      "        stack.push(source);\n" +
      "    }"
  }

  getData(): any {
    return this.data;
  }
}
