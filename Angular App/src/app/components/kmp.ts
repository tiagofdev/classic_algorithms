// Knuth, Morris, Pratt

import {Controller} from "../controller/controller";
import {AppState} from "../interface/app-state";
import {Response} from "../interface/response";
import {DataState} from "../enum/data-state.enum";
import {map, Observable, of, startWith} from "rxjs";
import {catchError} from "rxjs/operators";
import {NgForm} from "@angular/forms";

export class KMP {
  constructor(private services: Controller) { }

  readonly  dataState = DataState;

  kmpResponse$!: Observable<AppState<Response>>;
  getResponse(form: NgForm): Observable<AppState<Response>> {
    this.kmpResponse$ = this.services.kmp$(form.value.inputPattern, form.value.inputString)
      .pipe(
        map(results => {
          return { dataState: DataState.LOADED_STATE, response: results }
        }),
        startWith({ dataState: DataState.LOADING_STATE }),
        catchError((err: string) => {
          return of({ dataState: DataState.ERROR_STATE, error: err })
        })
      );
    return this.kmpResponse$;
  }

  data = {
    title: "Knuth Morris Pratt Algorithm",
    description: "The KMP algorithm searches for occurrences of a substring or pattern " +
      "within a main text string. Whenever a mismatch is detected, it avoids and bypasses " +
      "previously matched characters. The time complexity is O(n) in the worst case. " +
      "This implementation will stop the recursion and return if it finds the graph has a cycle. " +
      "This is a common application in text editing software, databases and search results.",
    examples: "\n  Input:\n" +
      "  Pattern = ility\n" +
      "  String = \"inutility futility mobility\"\n" +
      "  Output:\n" +
      "  Number of occurrences: 3\n" +
      "  Pattern found at indexes: 4,12,20",
    inputNotes: "Numbers allowed" ,
    inputs: ["Pattern: ", "String: "],
    parameters: ["inputPattern", "inputString"],
    patterns: ["letters-numbers", "letters-numbers"],
    results: ["Number of Occurrences: ", "Pattern found at indexes: "],
    references: ["https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/"],
    algorithm: "public ArrayList<String> kmp(String pattern, String text) {\n" +
      "        int pSize = pattern.length();\n" +
      "        int tSize = text.length();\n" +
      "        int[] lps = new int[pSize];\n" +
      "        StringBuilder indexes = new StringBuilder();\n" +
      "        computeLPS(pattern, pSize, lps);\n" +
      "        int p = 0;\n" +
      "        int t = 0;\n" +
      "\n" +
      "        while (t < tSize) {\n" +
      "            if (pattern.charAt(p) == text.charAt(t)) {\n" +
      "                p++;\n" +
      "                t++;\n" +
      "            }\n" +
      "            if (p == pSize) {\n" +
      "                indexes.append(t - p).append(\"-\");\n" +
      "                p = lps[p - 1];\n" +
      "            }\n" +
      "            else if (t < tSize && pattern.charAt(p) != text.charAt(t)) {\n" +
      "                if (p != 0)\n" +
      "                    p = lps[p - 1];\n" +
      "                else\n" +
      "                    t = t + 1;\n" +
      "            }\n" +
      "        }\n" +
      "        ArrayList<String> results = new ArrayList<>();\n" +
      "        indexes.deleteCharAt(indexes.length() - 1);\n" +
      "        String[] count = indexes.toString().split(\"-\");\n" +
      "        results.add(Integer.toString(count.length));\n" +
      "        results.add(indexes.toString());\n" +
      "        System.out.println(\"any results : \" + results);\n" +
      "        return results;\n" +
      "    }\n" +
      "\n" +
      "    public static void computeLPS(String pattern, int pSize, int[] lps) {\n" +
      "        int length = 0;\n" +
      "        int i = 1;\n" +
      "        lps[0] = 0;\n" +
      "        while (i < pSize) {\n" +
      "            if (pattern.charAt(i) == pattern.charAt(length)) {\n" +
      "                length++;\n" +
      "                lps[i] = length;\n" +
      "                i++;\n" +
      "            }\n" +
      "            else {\n" +
      "                if (length != 0) {\n" +
      "                    length = lps[length - 1];\n" +
      "                }\n" +
      "                else {\n" +
      "                    lps[i] = length;\n" +
      "                    i++;\n" +
      "                }\n" +
      "            }\n" +
      "        }\n" +
      "    }"

  }

  getData(): any {
    return this.data;
  }
}
