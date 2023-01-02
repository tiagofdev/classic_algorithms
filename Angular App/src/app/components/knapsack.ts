import {Controller} from "../controller/controller";
import {AppState} from "../interface/app-state";
import {Response} from "../interface/response";
import {DataState} from "../enum/data-state.enum";
import {map, Observable, of, startWith} from "rxjs";
import {catchError} from "rxjs/operators";
import {NgForm} from "@angular/forms";

export class Knapsack {

  constructor(private services: Controller) {}
  readonly dataState = DataState;

  knapsackResponse$!: Observable<AppState<Response>>;

  getResponse(form: NgForm): Observable<AppState<Response>> {

    this.knapsackResponse$ = this.services.knapsack$(form.value.inputValues,form.value.inputWeights,
      form.value.inputMaximum)
      .pipe(
        map(results => {
          return { dataState: DataState.LOADED_STATE, response: results }
        }),
        startWith({ dataState: DataState.LOADING_STATE }),
        catchError((err: string) => {
          return of({ dataState: DataState.ERROR_STATE, error: err })
        })
      );
    return this.knapsackResponse$;
  }

  getData(): any {
    return this.data;
  }

  data = {

    algorithm : "   public ArrayList<String> knapsack(int[] values, int[] weights, int maximum) {\n " +
      "       ArrayList<String> results = new ArrayList<>();\n" +
      "       // T[i][w] stores the maximum value of knapsack having weight\n" +
      "       // less than equal to w with only first i items considered.\n" +
      "        int[][] T = new int[values.length + 1][maximum + 1];\n" +
      "        // By default in Java, all number arrays are instantiated with zeros! T[][] is all zeros!\n" +
      "        // do for i'th item\n" +
      "        for (int i = 1; i <= values.length; i++) {\n" +
      "            // consider all weights from 0 to maximum capacity\n" +
      "            for (int w = 0; w <= maximum; w++) {\n" +
      "                // don't include the i'th element if `w-weights[i-1]` is negative\n" +
      "                if (weights[i-1] > w) {\n" +
      "                    T[i][w] = T[i-1][w];\n" +
      "                }\n" +
      "                else {\n" +
      "                    // find the maximum value we get by excluding or including the i'th item\n" +
      "                    T[i][w] = Integer.max(T[i-1][w], T[i-1][w-weights[i-1]] + values[i-1]);\n" +
      "                }\n" +
      "            }\n" +
      "        }\n" +
      "        // This block captures the item weights from the table T[i][w]\n" +
      "        int res = T[values.length][maximum];\n" +
      "        int mw = maximum;\n" +
      "        StringBuilder wts = new StringBuilder();\n" +
      "        for (int i = values.length; i > 0 && res > 0; i--) {\n" +
      "            // either the result comes from the top (T[i-1][mw]) or from (values[i-1] + T[i-1]\n" +
      "            // [mw-weights[i-1]]) as in Knapsack table. If it comes from the latter one/ it means\n" +
      "            // the item is included.\n" +
      "            if (!(res == T[i - 1][mw])) {\n" +
      "                // This item is included.\n" +
      "                wts.append(weights[i - 1]).append(\" \");\n" +
      "                // Since this weight is included its value is deducted\n" +
      "                res = res - values[i - 1];\n" +
      "                mw = mw - weights[i - 1];\n" +
      "            }\n" +
      "        }\n" +
      "        // return weights\n" +
      "        results.add(wts.toString());\n" +
      "        // return maximum value\n" +
      "        results.add(Integer.toString(T[values.length][maximum]));\n" +
      "        return results;\n" +
      "    }    ",

    title: "0-1 Knapsack Problem",
    description: "Given a set of items, each with a weight and a value, find the" +
      " number of each item to include in a collection so that the total weight is less than" +
      " or equal to a given limit and the total value is as large as possible." +
      " To solve this problem, we solve smaller problems first in a bottom up manner, first looking" +
      " for the maximum value that can be attained with weight less than or equal to the given maximum" +
      " weight for the first items in the list. Then we use smaller values that have already been" +
      " memorized to build a solution. The time complexity of this implementation is O(n.w) where n is the" +
      " total number of items and w is the knapsack capacity.",
    examples: "\n  Input:\n" +
      "  value = [20, 5, 10, 40, 15, 25]\n" +
      "  weight = [1, 2, 3, 8, 7, 4]\n" +
      "  maximum weight = 10\n\n" +
      "  Output:\n" +
      "  Knapsack value is: 60\n\n" +
      "  items = (1/20) and (8/40)\n" +
      "  value = 20 + 40 = 60\n" +
      "  weight = 1 + 8 = 9 < 10\n\n",

    inputs: ["Values: ", "Weight: ","Maximum weight: "],
    parameters: ["inputValues","inputWeights","inputMaximum"],
    patterns: ["numbersInt-commas", "numbersInt-commas", "numberInt"],
    results: ["Weights are: ","Maximum Knapsack value is: "],
    references: ["https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/"]

  }

}
