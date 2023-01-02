import {Controller} from "../controller/controller";
import {AppState} from "../interface/app-state";
import {Response} from "../interface/response";
import {DataState} from "../enum/data-state.enum";
import {map, Observable, of, startWith} from "rxjs";
import {catchError} from "rxjs/operators";
import {NgForm} from "@angular/forms";

export class Dijkstras {
  constructor(private services: Controller) { }

  readonly  dataState = DataState;
  dijkstrasResponse$!: Observable<AppState<Response>>;

  getResponse(form: NgForm): Observable<AppState<Response>> {
    this.dijkstrasResponse$ = this.services.dijkstras$(form.value.inputEdges, form.value.inputSource)
      .pipe(
        map(results => {
          return { dataState: DataState.LOADED_STATE, response: results }
        }),
        startWith({ dataState: DataState.LOADING_STATE }),
        catchError((err: string) => {
          return of({ dataState: DataState.ERROR_STATE, error: err })
        })
      );
    return this.dijkstrasResponse$;
  }

  data = {
    title: "Dijkstra's Algorithm",
    description: "Dijkstra's algorithm finds the shortest path between two nodes of a graph! " +
      "It traverses all possible neighboring vertices, marks them as visited, calculates which " +
      "has the smallest distance, and updates the total distance to a route log.\n" +
      "There are many variants of the algorithm. In this example, the graph is directed and weighted. " +
      "The paths can be calculated on one source to all destinations or from all nodes to all " +
      "possible destinations! Time complexity is O(log(n)) where n is the number of vertices of the graph. " +
      "The standard definition of a path does not allow vertex repetition, so according to this definition (A,A) " +
      "would not be a path.",
    examples: "\n  Input:\n" +
      "  Edges = (A, B, 10)(A, E, 3)(B, C, 2) \n" +
      "          (B, E, 4)(C, D, 9)(D, C, 7) \n" +
      "          (E, B, 1)(E, C, 8)(E, D, 2)\n" +
      "  Source = A\n" +
      "  Output:     Shortest Paths:\n" +
      "    Path (A —> B): Minimum cost = 4, Route = [A, E, B]\n" +
      "\n" +
      "    Path (A —> C): Minimum cost = 6, Route = [A, E, B, C]\n" +
      "\n" +
      "    Path (A —> D): Minimum cost = 5, Route = [A, E, D]\n" +
      "\n" +
      "    Path (A —> E): Minimum cost = 3, Route = [A, E]",
    inputNotes: "Group edges with parentheses (). \n" +
      "If no source is input, all paths will be calculated!\n" +
      "Negative weights are not allowed!",
    inputs: ["Edges: ", "Source: "],
    parameters: ["inputEdges", "inputSource"],
    patterns: ["letters-numbers-commas-parentheses", "letters-numbers-notRequired"],
    results: ["Shortest Paths: "],
    references: ["https://www.techiedelight.com/single-source-shortest-paths-dijkstras-algorithm/"],
    algorithm: "public class Edge {\n" +
      "    String source, dest;\n" +
      "    int weight;\n" +
      "    public Edge(String source, String dest, String weight){\n" +
      "        this.source = source;\n" +
      "        this.dest = dest;\n" +
      "        this.weight = Integer.parseInt(weight);\n" +
      "    }\n" +
      "}    \n" +
      "public class Node {\n" +
      "    String vertex;\n" +
      "    int weight;\n" +
      "    public Node(String vertex, int weight) {\n" +
      "        this.vertex = vertex;\n" +
      "        this.weight = weight;\n" +
      "    }\n" +
      "}\n" +
      "public class Graph {\n" +
      "    Map<String, List<Edge>> adjacents = null;\n" +
      "    Graph(List<Edge> edges) {\n" +
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
      "     public ArrayList<String> dijkstras(String input, String source) {\n" +
      "        ArrayList<String> results = new ArrayList<>();\n" +
      "        List<Edge> edges = new ArrayList<>();\n" +
      "        ********************************************************\n" +
      "        edges = ... receives formatted input\n" +
      "        ********************************************************\n" +
      "        Graphd graph = new Graph(edges);\n" +
      "        final Set<String> keys = graph.adjacents.keySet();\n" +
      "        results.add(\"\");\n" +
      "        if (keys.contains(source)) {\n" +
      "            findShortestPaths(graph, keys, source, results);\n" +
      "        }\n" +
      "        else {\n" +
      "            if (Objects.equals(source, \"\")) {\n" +
      "                for (String key : keys) {\n" +
      "                    findShortestPaths(graph, keys, key, results);\n" +
      "                }\n" +
      "            }\n" +
      "            else {\n" +
      "                results.add(\"Not a valid source!\");\n" +
      "                return results;\n" +
      "            }\n" +
      "        }\n" +
      "        if (results.size() == 1) results.set(0, \"No paths were found!\");\n" +
      "        return results;\n" +
      "    }\n" +
      "\n" +
      "    public static void findShortestPaths (Graph graph, Set<String> keys,\n" +
      "                                          String source, ArrayList<String> results) {\n" +
      "        PriorityQueue<Node> minHeap;\n" +
      "        minHeap = new PriorityQueue<>(Comparator.comparingInt(node -> node.weight));\n" +
      "        minHeap.add(new Node(source, 0));\n" +
      "        Map<String, Integer> distance = new HashMap<>();\n" +
      "        Map<String, Boolean> done = new HashMap<>();\n" +
      "        Map<String, String> prev = new HashMap<>();\n" +
      "        for (String key : keys) {\n" +
      "            distance.put(key, Integer.MAX_VALUE);\n" +
      "            done.put(key, false);\n" +
      "            prev.put(key, \"\");\n" +
      "        }\n" +
      "        distance.put(source, 0);\n" +
      "        done.put(source, true);\n" +
      "        prev.put(source, \"null\");\n" +
      "\n" +
      "        while (!minHeap.isEmpty()) {\n" +
      "            Node node = minHeap.poll();\n" +
      "            String u = node.vertex;\n" +
      "            for (Edge edge : graph.adjacents.get(u)) {\n" +
      "                String v = edge.dest;\n" +
      "                int weight = edge.weight;\n" +
      "                if (!done.get(v) && (distance.get(u) + weight) < distance.get(v)) {\n" +
      "                    distance.put(v, distance.get(u) + weight);\n" +
      "                    prev.put(v, u);\n" +
      "                    minHeap.add(new Node(v, distance.get(v)));\n" +
      "                }\n" +
      "            }\n" +
      "            done.put(u, true);\n" +
      "        }\n" +
      "        List<String> route = new ArrayList<>();\n" +
      "        for (String key : keys) {\n" +
      "            if ((!Objects.equals(key, source)) && (distance.get(key) != Integer.MAX_VALUE)) {\n" +
      "                route.add(source);\n" +
      "                getRoute(prev, key, route);\n" +
      "                results.add(\"Path (\" + source + \" —> \" + key + \"): Minimum cost = \" + \n" +
      "                             distance.get(key) + \", Route = \" + route);\n" +
      "                route.clear();\n" +
      "            }\n" +
      "        }\n" +
      "\n" +
      "    }\n" +
      "\n" +
      "    private static void getRoute(Map<String, String> prev, String key, List<String> route) {\n" +
      "        if (!Objects.equals(prev.get(key), \"null\")) {\n" +
      "            getRoute(prev, prev.get(key), route);\n" +
      "            route.add(key);\n" +
      "        }\n" +
      "    }"
  }

  getData(): any {
    return this.data;
  }

}
