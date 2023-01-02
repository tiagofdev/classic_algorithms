import {Controller} from "../controller/controller";
import {AppState} from "../interface/app-state";
import {Response} from "../interface/response";
import {DataState} from "../enum/data-state.enum";
import {map, Observable, of, startWith} from "rxjs";
import {catchError} from "rxjs/operators";
import {NgForm} from "@angular/forms";

export class Quicksort {
  constructor(private services: Controller) { }

  readonly  dataState = DataState;
  quicksortResponse$!: Observable<AppState<Response>>;

  getResponse(form: NgForm): Observable<AppState<Response>> {
    this.quicksortResponse$ = this.services.quicksort$(form.value.inputArray)
      .pipe(
        map(results => {
          return { dataState: DataState.LOADED_STATE, response: results }
        }),
        startWith({ dataState: DataState.LOADING_STATE }),
        catchError((err: string) => {
          return of({ dataState: DataState.ERROR_STATE, error: err })
        })
      );
    return this.quicksortResponse$;
  }

  data = {
    algorithm: "    public int[] quicksort(int[] array) {\n" +
      "        quicksortRecursive(array, 0, array.length - 1);\n" +
      "        return array;\n" +
      "    }\n" +
      "    public static void swap (int[] array, int i, int j) {\n" +
      "        int temp = array[i];\n" +
      "        array[i] = array[j];\n" +
      "        array[j] = temp;\n" +
      "    }\n" +
      "        // Divides the array into two partitions\n" +
      "    public static int partition(int[] array, int start, int end) {\n" +
      "        // Choose the last element as a pivot from the array\n" +
      "        int pivot = array[end];\n" +
      "        int tempIndex = start;\n" +
      "        // each time we find an element less than or equal to the pivot,\n" +
      "        // `tempIndex` is incremented, and that element would be placed\n" +
      "        for (int i = start; i < end; i++) {\n" +
      "        // Move the temporary pivot index forward\n" +
      "            if (array[i] <= pivot) {\n" +
      "                swap(array, i, tempIndex);\n" +
      "                tempIndex++;\n" +
      "            }\n" +
      "        }\n" +
      "        // Swap the current element with the element at the temporary pivot index\n" +
      "        swap(array, end, pIndex);\n" +
      "        // return temporary pivot index\n" +
      "        return pIndex;\n" +
      "    }\n" +
      "    public static void quicksortRecursive(int[] array, int start, int end) {\n" +
      "        // base condition\n" +
      "        if (start >= end) {\n" +
      "            return;\n" +
      "        }\n" +
      "        int pivot = partition(array, start, end);\n" +
      "        // Sort the two partitions\n" +
      "        // recursive on subarray with elements less than the pivot\n" +
      "        quicksortRecursive(array, start, pivot - 1);\n" +
      "        // recursive on subarray with elements greater than the pivot\n" +
      "        quicksortRecursive(array, pivot + 1, end);\n" +
      "    }",
    title: "Quicksort",
    description: "Quicksort is an efficient recursive sorting algorithm which makes comparison in the time complexity" +
      " of O(n log(n)) operations to sort an array of size n. In the worst case scenario, it makes 0(n^2) comparisons." +
      " This version sorts integer arrays only.",
    examples: "\n  Input:\n" +
      "  array = [20, 5, 10, 40, 15, 25]\n" +
      "  Output:\n" +
      "  Sorted array: [5, 10, 15, 20, 25, 40]\n\n",
    inputs: ["Array: "],
    parameters: ["inputArray"],
    patterns: ["numbersInt-commas"],
    results: ["Sorted Array: "],
    references: ["https://en.wikipedia.org/wiki/Quicksort"]
  }

  getData(): any {
    return this.data;
  }

}


