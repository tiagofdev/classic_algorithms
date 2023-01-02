import {Controller} from "../controller/controller";
import {AppState} from "../interface/app-state";
import {Response} from "../interface/response";
import {DataState} from "../enum/data-state.enum";
import {map, Observable, of, startWith} from "rxjs";
import {catchError} from "rxjs/operators";
import {NgForm} from "@angular/forms";

export class Kruskal {
  constructor(private services: Controller) { }

  readonly  dataState = DataState;
  kruskalResponse$!: Observable<AppState<Response>>;

  getResponse(form: NgForm): Observable<AppState<Response>> {
    this.kruskalResponse$ = this.services.kruskal$(form.value.inputArray)
      .pipe(
        map(results => {
          return { dataState: DataState.LOADED_STATE, response: results }
        }),
        startWith({ dataState: DataState.LOADING_STATE }),
        catchError((err: string) => {
          return of({ dataState: DataState.ERROR_STATE, error: err })
        })
      );
    return this.kruskalResponse$;
  }

  data = {
    algorithm: "    public int[] kruskal(int[] array) {\n" +

      "    }",
    title: "Kruskal's Algorithm",
    description: "The Kruskal's algorithm finds the Minimum Spanning Tree(MST), which is a sub tree of a given " +
      "connected, weigthed and undirected graph G, by visiting all the vertices only once without creating a cycle, " +
      "with the minimum possible total edge weight. Such graph G, may have more than one MST. This algorithm is " +
      "often used to find the possible connections of a network using the lowest cost. It solves the traveling " +
      "salesman problem. it has a time complexity of O(E.log(V)), where E is number of edges and V is number of " +
      "vertices. Space complexity of O(log(E)).",
    examples: "\n  Input:\n" +
      "  array = [20, 5, 10, 40, 15, 25]\n" +
      "  Output:\n" +
      "  Sorted array: [5, 10, 15, 20, 25, 40]\n\n",
    inputs: ["Array: "],
    parameters: ["inputArray"],
    patterns: ["letters-numbers-commas-parentheses"],
    results: ["MST: "],
    references: ["link"]
  }

  getData(): any {
    return this.data;
  }

}


