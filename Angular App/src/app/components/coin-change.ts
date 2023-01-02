// Coin Change

import {Controller} from "../controller/controller";
import {AppState} from "../interface/app-state";
import {Response} from "../interface/response";
import {DataState} from "../enum/data-state.enum";
import {map, Observable, of, startWith} from "rxjs";
import {catchError} from "rxjs/operators";
import {NgForm} from "@angular/forms";

export class CoinChange {
  constructor(private services: Controller) { }

  readonly  dataState = DataState;

  coinChangeResponse$!: Observable<AppState<Response>>;
  getResponse(form: NgForm): Observable<AppState<Response>> {
    this.coinChangeResponse$ = this.services.coinChange$(form.value.inputCoins, form.value.inputChange)
      .pipe(
        map(results => {
          return { dataState: DataState.LOADED_STATE, response: results }
        }),
        startWith({ dataState: DataState.LOADING_STATE }),
        catchError((err: string) => {
          return of({ dataState: DataState.ERROR_STATE, error: err })
        })
      );
    return this.coinChangeResponse$;
  }

  data = {
    title: "Coin Change",
    description: "Given an unlimited supply of coins of different values, find all possible " +
      "distinct ways to get the desired change. The idea is to get all possible combinations, not " +
      "the number of combinations or the best or the minimum combination. Therefore, this differs " +
      "from the classic Coin Change algorithm which searches the number of combinations only. It is " +
      "a special case of the Knapsack problem in which more than a pair of denominations can be " +
      "selected and items can be repeated. Time complexity is O(n.c) where n is the number of coins and c is " +
      "the change.",
    examples: "\n  Input:\n" +
      "  Coins = 5,10,25\n" +
      "  Change = 30\n" +
      "  Output:\n" +
      "  Number of combinations: 5\n" +
      "  Coin combinations: \n" +
      "    5,5,5,5,5,5\n" +
      "    5,5,5,5,10\n" +
      "    5,5,10,10\n" +
      "    5,25\n" +
      "    10,10,10",
    inputNotes: "Keep change values below 100!" ,
    inputs: ["Coins: ", "Change: "],
    parameters: ["inputCoins", "inputChange"],
    patterns: ["numbersInt-commas", "numberInt"],
    results: ["Number of combinations: ", "Coin combinations: "],
    references: ["https://www.geeksforgeeks.org/combinational-sum/"],
    algorithm: "    public ArrayList<String> coinChange(int[] coins, int target) {\n" +
      "        ArrayList<ArrayList<Integer>> answer = new ArrayList<>();\n" +
      "        ArrayList<Integer> temp = new ArrayList<>();\n" +
      "        ArrayList<Integer> values = new ArrayList<>();\n" +
      "        Set<Integer> set = new HashSet<>();\n" +
      "        for (int x = 0; x < coins.length; x++)\n" +
      "            set.add(coins[x]);\n" +
      "        values.addAll(set);\n" +
      "        Collections.sort(values);\n" +
      "        findNumbers(answer, values, target, 0, temp);\n" +
      "        return answer;\n" +
      "    }\n" +
      "\n" +
      "    public static void findNumbers(ArrayList<ArrayList<Integer>> answer,\n" +
      "                                   ArrayList<Integer> coins, int target, int index,\n" +
      "                                   ArrayList<Integer> temp) {\n" +
      "        if (target == 0) {\n" +
      "            // Adding list log to answer from temp\n" +
      "            answer.add(new ArrayList<>(temp));\n" +
      "            return;\n" +
      "        }\n" +
      "        for (int i = index; i < coins.size(); i++) {\n" +
      "            // checking that sum does not become negative\n" +
      "            if ((target - coins.get(i)) >= 0) {\n" +
      "                // adding element which can contribute to sum\n" +
      "                temp.add(coins.get(i));\n" +
      "                findNumbers(answer, coins, target - coins.get(i), i, temp);\n" +
      "                // removing element from list (backtracking)\n" +
      "                temp.remove(coins.get(i));\n" +
      "            }\n" +
      "        }\n" +
      "    }"
  }

  getData(): any {
    return this.data;
  }
}
