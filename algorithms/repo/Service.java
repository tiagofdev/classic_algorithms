package com.titi.algorithms.repo;

import java.util.ArrayList;

public interface Service {
    ArrayList<String> twoSum(int[] array, int target);
    ArrayList<String> knapsack(int[] values, int[] weights, int maximum);
    ArrayList<String> quicksort(int[] array);
    ArrayList<String> dijkstras(String edges, String source);
    ArrayList<String> dfs(String inputEdges, String source);
    ArrayList<String> kmp(String pattern, String text);
    ArrayList<String> coinChange(int[] coins, int change);
    ArrayList<String> jobSequencing(String jobs, int deadline);
    ArrayList<String> graphColoring(String inputEdges);

}
