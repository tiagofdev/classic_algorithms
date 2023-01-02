import {Controller} from "../controller/controller";
import {AppState} from "../interface/app-state";
import {Response} from "../interface/response";
import {DataState} from "../enum/data-state.enum";
import {Component} from '@angular/core';
import {map, Observable, of, startWith} from "rxjs";
import {catchError} from "rxjs/operators";
import {NgForm} from "@angular/forms";


export class TwoSumComponent {

  constructor(private services: Controller) {}
  readonly dataState = DataState;

  twoSumResponse$!: Observable<AppState<Response>>;

  getResponse(pform: NgForm): Observable<AppState<Response>> {
    this.twoSumResponse$ = this.services.twoSum$(pform.value.inputArray,pform.value.inputTarget)
      .pipe(
        map(results => {
          return { dataState: DataState.LOADED_STATE, response: results }
        }),
        startWith({ dataState: DataState.LOADING_STATE }),
        catchError((err: string) => {
          return of({ dataState: DataState.ERROR_STATE, error: err })
        })
      );
    return this.twoSumResponse$;
  }

  getData(): any {
    return this.data;
  }

  data = {

    algorithm : "     public ArrayList<String> twoSum(String[] array, String starget) {\n" +
    "        int target = Integer.parseInt(starget);\n" +
    "        ArrayList<Integer> list = new ArrayList<>();\n" +
    "        for (String elem : array) {\n" +
    "            try {\n" +
    "                list.add(Integer.parseInt(elem));\n" +
    "            } catch (NumberFormatException nfe) {\n" +
    "                log.info(\"numberformat: parsing failed: \" + elem);\n" +
    "            }\n" +
    "        }\n" +
    "        Collections.sort(list);\n" +
    "        int low = 0;\n" +
    "        int high = list.size() - 1;\n" +
    "        ArrayList<String> result = new ArrayList<>();\n" +
    "        while ( low < high ) {\n" +
    "            if ( list.get(low) + list.get(high) == target ) {\n" +
    "                 result.add(\"{\" + list.get(low) + \",\" + list.get(high) + \"}\");\n" +
    "            }\n" +
    "            if ( list.get(low) + list.get(high) < target ) {\n" +
    "                low++;\n" +
    "            }\n" +
    "            else {\n" +
    "                high--;\n" +
    "            }\n" +
    "        }\n" +
    "        return result;\n" +
    "    }",

    title: "2 Sum Problem",
    description: "Given an unsorted integer array, find all pairs from that array that sum to a desired total." +
      " To solve this, we sort the array in ascending order and keep searching for a pair within a space" +
      " between two ends of the array, a low and high. As we loop the searches, the space span is reduced" +
      " until a pair is found. The time complexity of this implementation is  O(n.log(n)).",
    examples: "\n  Input:\n" +
      "  numbers = [8, 5, 4, 2, 7, 6, 1]\n" +
      "  target = 10\n\n" +
      "  Output:\n" +
      "  Pairs found = (8, 2) and (6, 4)\n" +
      "\n" +
      "  Input:\n" +
      "  numbers = [5, 2, 6, 8, 1, 9]\n" +
      "  target = 12\n\n" +
      "  Output:\n" +
      "  Pair not found!",

    inputs: ["Array of numbers:", "Sum Target:"],
    parameters: ["inputArray","inputTarget"],
    patterns: ["numbersInt-commas", "numberInt"],
    results: ["Pairs are: "],
    references: ["https://www.techiedelight.com/find-pair-with-given-sum-array/"]
  }

}
