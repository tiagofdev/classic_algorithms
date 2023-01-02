package com.titi.algorithms.repo.implementation;
import com.titi.algorithms.repo.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@RequiredArgsConstructor
@org.springframework.stereotype.Service
@Transactional
@Slf4j
public class Implementation implements Service {

    @Override
    public ArrayList<String> twoSum(int[] array, int target) {

        Arrays.sort(array);
        int low = 0;
        int high = array.length - 1;
        StringBuilder stringArray = new StringBuilder();
        while ( low < high ) {
            if ( array[low] + array[high] == target ) {
                stringArray.append("(").append(array[low]).append(",").append(array[high]).append(")");
            }
            if ( array[low] + array[high] < target ) {
                low++;
            }
            else {
                high--;
            }
        }
        ArrayList<String> result = new ArrayList<>();
        if ( stringArray.isEmpty() ) {
            result.add(" Not found");
        }
        else {
            result.add(stringArray.toString());
        }
        return result;
    }

    @Override
    public ArrayList<String> knapsack(int[] values, int[] weights, int maximum) {
        ArrayList<String> results = new ArrayList<>();

        if (values.length != weights.length) {
            results.add("Values and Weights must have the same number of elements!");
            return results;
        }
        // T[i][w] stores the maximum value of knapsack having weight
        // less than equal to w with only first i items considered.
        int[][] T = new int[values.length + 1][maximum + 1];
        // By default in Java, all number arrays are instantiated with zeros! T[][] is all zeros!
        // do for i'th item
        for (int i = 1; i <= values.length; i++) {
            // consider all weights from 0 to maximum capacity
            for (int w = 0; w <= maximum; w++) {
                // don't include the i'th element if `w-weights[i-1]` is negative
                if (weights[i-1] > w) {
                    T[i][w] = T[i-1][w];
                }
                else {
                    // find the maximum value we get by excluding or including the i'th item
                    T[i][w] = Integer.max(T[i-1][w], T[i-1][w-weights[i-1]] + values[i-1]);
                }
            }
        }
        // This block captures the item weights from the table T[i][w]
        int res = T[values.length][maximum];
        int mw = maximum;
        StringBuilder wts = new StringBuilder();
        for (int i = values.length; i > 0 && res > 0; i--) {
            // either the result comes from the top (T[i-1][mw]) or from (values[i-1] + T[i-1]
            // [mw-weights[i-1]]) as in Knapsack table. If it comes from the latter one/ it means
            // the item is included.
            if (!(res == T[i - 1][mw])) {
                // This item is included.
                wts.append(weights[i - 1]).append(" ");
                // Since this weight is included its value is deducted
                res = res - values[i - 1];
                mw = mw - weights[i - 1];
            }
        }
        // return weights
        results.add(wts.toString());
        // return maximum value
        results.add(Integer.toString(T[values.length][maximum]));
        return results;
    }

    @Override
    public ArrayList<String> quicksort(int[] array) {
        quicksortRecursive(array, 0, array.length - 1);
        ArrayList<String> result = new ArrayList<>();
        StringBuilder stringArray = new StringBuilder();
        stringArray.append("[");
        for (int j : array) stringArray.append(j).append(", ");
        if (stringArray.length() > 1) stringArray.setLength(stringArray.length() - 2);
        stringArray.append("]");
        result.add(stringArray.toString());
        return result;
    }

    public static void quicksortRecursive(int[] array, int start, int end) {
        // base condition
        if (start >= end) {
            return;
        }
        // rearrange elements across pivot
        int pivot = partition(array, start, end);

        // recur on subarray containing elements less than the pivot
        quicksortRecursive(array, start, pivot - 1);

        // recur on subarray containing elements more than the pivot
        quicksortRecursive(array, pivot + 1, end);
    }

    public static int partition(int[] array, int start, int end) {
        // Pick the rightmost element as a pivot from the array
        int pivot = array[end];

        // elements less than the pivot will be pushed to the left of `tempIndex`
        // elements more than the pivot will be pushed to the right of `tempIndex`
        // equal elements can go either way
        int tempIndex = start;

        // each time we find an element less than or equal to the pivot,
        // `tempIndex` is incremented, and that element would be placed
        // before the pivot.
        for (int i = start; i < end; i++)
        {
            if (array[i] <= pivot)
            {
                // Move the temporary pivot index forward
                swap(array, i, tempIndex);
                tempIndex++;
            }
        }

        // swap `tempIndex` with pivot
        swap(array, end, tempIndex);

        // return `tempIndex` (index of the pivot element)
        return tempIndex;
    }

    public static void swap (int[] array, int i, int j) {
        int temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    @Override
    public ArrayList<String> dijkstras(String input, String source) {
        ArrayList<String> results = new ArrayList<>();
        List<Edge> edges = new ArrayList<>();
        String[] parts = input.split("\\(");
        for (int i = 0; i < parts.length; i++) {
            if (!Objects.equals(parts[i], "")) {
                String editedPart = parts[i];
                while (editedPart.contains(")"))
                    editedPart = editedPart.replace(")","");
                String[] edge = editedPart.split(",");
                if (edge.length == 3)
                    edges.add(new Edge(edge[0].trim(), edge[1].trim(), edge[2].trim()));
                else {
                    results.add("Invalid input: " + editedPart);
                    return results;
                }
            }
        }
        GraphDirected graph = new GraphDirected(edges);
        final Set<String> keys = graph.adjacents.keySet();
        results.add("");
        if (keys.contains(source)) {
            findShortestPaths(graph, keys, source, results);
        }
        else {
            if (Objects.equals(source, "")) {
                for (String key : keys) {
                    findShortestPaths(graph, keys, key, results);
                }
            }
            else {
                results.add("Not a valid source!");
                return results;
            }
        }
        if (results.size() == 1) results.set(0, "No paths were found!");
        return results;
    }

    public static void findShortestPaths (GraphDirected graph, Set<String> keys,
                                          String source, ArrayList<String> results) {
        // PriorityQueue compares items in the queue and places items with the smallest
        // weight on top, which is the first element
        PriorityQueue<NodeWeightedGraph> minHeap;
        minHeap = new PriorityQueue<>(Comparator.comparingInt(node -> node.weight));
        minHeap.add(new NodeWeightedGraph(source, 0));
        Map<String, Integer> distance = new HashMap<>();
        Map<String, Boolean> done = new HashMap<>();
        Map<String, String> prev = new HashMap<>();
        for (String key : keys) {
            distance.put(key, Integer.MAX_VALUE);
            done.put(key, false);
            prev.put(key, "");
        }
        distance.put(source, 0);
        done.put(source, true);
        prev.put(source, "null"); // Previous map will hold the route from destination to source
        // While the heap is not empty
        while (!minHeap.isEmpty()) {
            // pool returns and removes the top element of the heap
            NodeWeightedGraph node = minHeap.poll();
            String u = node.vertex;
            // This loops all edges adjacent to node u only
            //for (EdgeWeighted edge : (EdgeWeighted) graph.adjacents.get(u)) {
            for (Edge edge : graph.adjacents.get(u)) {
                String v = edge.dest;
                int weight = edge.weight;
                // If adjacent is not visited and has not been initialized
                if (!done.get(v) && (distance.get(u) + weight) < distance.get(v)) {
                    // Record the new distance to from u to adjacent v
                    distance.put(v, distance.get(u) + weight);
                    // Record adjacent to route pointing to previous node u
                    prev.put(v, u);
                    /* Add this adjacent recorded node to the heap
                     I think it's here where the magic happens
                     If this new distance is shorter than the top element, it will be
                     placed on the top of the queue*/
                    minHeap.add(new NodeWeightedGraph(v, distance.get(v)));
                }
            }
            // Record node as visited
            done.put(u, true);
        }
        List<String> route = new ArrayList<>();
        for (String key : keys) {
            if ((!Objects.equals(key, source)) && (distance.get(key) != Integer.MAX_VALUE)) {
                route.add(source);
                getRoute(prev, key, route);
                results.add("Path (" + source + " —> " + key + "): Minimum cost = " +
                            distance.get(key) + ", Route = " + route);
                route.clear();
            }
        }

    }

    private static void getRoute(Map<String, String> prev, String key, List<String> route) {
        if (!Objects.equals(prev.get(key), "null")) {
            getRoute(prev, prev.get(key), route);
            route.add(key);
        }
    }

    @Override
    public ArrayList<String> dfs(String inputEdges, String source) {
        ArrayList<String> results = new ArrayList<>();
        List<Edge> edges = new ArrayList<>();
        String[] parts = inputEdges.split("\\(");
        for (String part : parts) {
            if (!Objects.equals(part, "")) {
                String editedPart = part;
                while (editedPart.contains(")"))
                    editedPart = editedPart.replace(")", "");
                String[] edge = editedPart.split(",");
                if (edge.length == 2)
                    edges.add(new Edge(edge[0].trim(), edge[1].trim()));
                else {
                    results.add("Invalid input: " + editedPart);
                    return results;
                }
            }
        }
        GraphDirected graph = new GraphDirected(edges);
        final Set<String> keys = graph.adjacents.keySet();
        results.add("");
        if (keys.contains(source)) {
            topologicalOrdering(graph, keys, source, results);
        }
        else {
            results.add("Not a valid source node!");
            return results;
        }
        return results;
    }

    public void topologicalOrdering(GraphDirected graph, Set<String> keys,
                                    String source, ArrayList<String> results) {
        Stack<String> stack = new Stack<>();
        Map<String, Boolean> discovered = new HashMap<>();
        Map<String, Boolean> finished = new HashMap<>();
        for (String key : keys) {
            discovered.put(key, false);
            finished.put(key, false);
        }
        depthFirstSearch(graph, source, discovered, finished, stack, results);
        Iterator<String> it = stack.iterator();
        StringBuilder order = new StringBuilder();
        while(it.hasNext()) {
            order.append(stack.pop()).append(" > ");
        }
        order.deleteCharAt(order.length() - 2);
        String[] words = order.toString().split("\\s+");
        // words holds how many words there are in order !!!
        if (words.length == 1) results.set(0, "No adjacent nodes directed from " + source + " were found!");
        else results.add(order.toString());
        discovered.clear();
        finished.clear();
    }

    public void depthFirstSearch(GraphDirected graph, String source,
                                 Map<String, Boolean> discovered,Map<String, Boolean> finished,
                                 Stack<String> stack, ArrayList<String> results) {
        if (discovered.get(source) && !finished.get(source)) {
            results.add("This graph contains a cycle!");
            stack.clear();
            for (String d : discovered.keySet())
                finished.put(d, true);
            return;
        }
        if (finished.get(source))
            return;
        discovered.put(source, true);
        for (Edge edge : graph.adjacents.get(source)) {
            depthFirstSearch(graph, edge.dest, discovered, finished, stack, results);
        }
        finished.put(source, true);
        stack.push(source);
    }

    @Override
    public ArrayList<String> kmp(String pattern, String text) {
        int pSize = pattern.length();
        int tSize = text.length();
        int[] lps = new int[pSize];
        StringBuilder indexes = new StringBuilder();
        computeLPS(pattern, pSize, lps);
        int p = 0;
        int t = 0;

        while (t < tSize) {
            if (pattern.charAt(p) == text.charAt(t)) {
                p++;
                t++;
            }
            if (p == pSize) {
                indexes.append(t - p).append(",");
                p = lps[p - 1];
            }
            else if (t < tSize && pattern.charAt(p) != text.charAt(t)) {
                if (p != 0)
                    p = lps[p - 1];
                else
                    t = t + 1;
            }
        }
        ArrayList<String> results = new ArrayList<>();
        if ( !indexes.isEmpty() ) {
            indexes.deleteCharAt(indexes.length() - 1);
            String[] count = indexes.toString().split(",");
            results.add(Integer.toString(count.length));
            results.add(indexes.toString());
        }
        else {
            results.add("0");
            results.add("Not found!");
        }
        return results;
    }

    public static void computeLPS(String pattern, int pSize, int[] lps) {
        int length = 0;
        int i = 1;
        lps[0] = 0;
        while (i < pSize) {
            if (pattern.charAt(i) == pattern.charAt(length)) {
                length++;
                lps[i] = length;
                i++;
            }
            else {
                if (length != 0) {
                    length = lps[length - 1];
                }
                else {
                    lps[i] = length;
                    i++;
                }
            }
        }
    }

    @Override
    public ArrayList<String> coinChange(int[] coins, int target) {
        ArrayList<ArrayList<Integer>> answer = new ArrayList<>();
        ArrayList<Integer> temp = new ArrayList<>();
        ArrayList<Integer> values = new ArrayList<>();
        Set<Integer> set = new HashSet<>();
        for (int coin : coins) set.add(coin);
        values.addAll(set);
        Collections.sort(values);
        ArrayList<String> results = new ArrayList<>();
        if ( target > 100 )
            return results;
        findNumbers(answer, values, target, 0, temp);
        results.add(Integer.toString(answer.size()));
        results.add("");
        for (ArrayList<Integer> a : answer) {
            StringBuilder combo = new StringBuilder();
            for (int i : a) {
                combo.append(i).append(",");
            }
            combo.deleteCharAt(combo.length() - 1);
            results.add(combo.toString());
        }
        return results;
    }

    public static void findNumbers(ArrayList<ArrayList<Integer>> answer,
                                   ArrayList<Integer> coins, int target, int index,
                                   ArrayList<Integer> temp) {
        if (target == 0) {
            // Adding list log to answer from temp
            answer.add(new ArrayList<>(temp));
            return;
        }
        for (int i = index; i < coins.size(); i++) {
            // checking that sum does not become negative
            if ((target - coins.get(i)) >= 0) {
                // adding element which can contribute to sum
                temp.add(coins.get(i));
                findNumbers(answer, coins, target - coins.get(i), i, temp);
                // removing element from list (backtracking)
                temp.remove(coins.get(i));
            }
        }
    }

    @Override
    public ArrayList<String> jobSequencing(String inputJobs, int deadline) {
        ArrayList<String> results = new ArrayList<>();

        List<Job> jobs = new ArrayList<>();
        String[] parts = inputJobs.split("\\(");
        for (String part : parts) {
            if (!Objects.equals(part, "")) {
                String editedPart = part;
                while (editedPart.contains(")"))
                    editedPart = editedPart.replace(")", "");
                String[] job = editedPart.split(",");
                if (job.length == 3)
                    jobs.add(new Job(job[0].trim(), job[1].trim(), job[2].trim()));
                else {
                    results.add("Invalid input: " + editedPart);
                    return results;
                }
            }
        }
        int totalProfit = 0;
        jobs.sort(Comparator.comparingInt(a -> a.deadline));
        ArrayList<Job> sequenced = new ArrayList<>();
        PriorityQueue<Job> maxHeap = new PriorityQueue<>((a,b) -> b.profit - a.profit);
        for (int i = jobs.size() - 1; i > -1; i--) {
            int slot_available;

            if (i == 0) {
                slot_available = jobs.get(i).deadline;
            }
            else {
                slot_available = jobs.get(i).deadline - jobs.get(i - 1).deadline;
            }
            maxHeap.add(jobs.get(i));
            while(slot_available > 0 && maxHeap.size() > 0) {
                Job job = maxHeap.remove();
                slot_available--;
                sequenced.add(job);
                totalProfit += job.profit;
            }
        }
        sequenced.sort(Comparator.comparingInt(a -> a.deadline));
        StringBuilder ids = new StringBuilder();
        for (Job job : sequenced)
            ids.append(job.id).append("-");
        ids.deleteCharAt(ids.length() - 1);
        results.add(ids.toString());
        results.add(Integer.toString(totalProfit));
        return results;
    }

    @Override
    public ArrayList<String> graphColoring(String inputEdges) {
        ArrayList<String> results = new ArrayList<>();
        results.add("");
        ArrayList<Edge> edges = new ArrayList<>();
        String[] parts = inputEdges.split("\\(");
        for (String part : parts) {
            if (!Objects.equals(part, "")) {
                String editedPart = part;
                while (editedPart.contains(")"))
                    editedPart = editedPart.replace(")", "");
                String[] edge = editedPart.split(",");
                if (edge.length == 2)
                    edges.add(new Edge(edge[0].trim(), edge[1].trim()));
                else {
                    results.add("Invalid input: " + editedPart);
                    return results;
                }
            }
        }
        final String[] colors = { "RED", "GREEN", "BLUE", "ORANGE", "CYAN", "MAGENTA",
                "YELLOW", "PINK", "GREY", "TEAL", "BROWN", "PURPLE", "BEIGE", "BLACK" };
        final Graph graph = new Graph(edges);
        final Set<String> keys = graph.adjacents.keySet();
        Map<String, Integer> coloring = new HashMap<>();
        for (String vertex : keys) {

            Set<Integer> assigned = new TreeSet<>();
            for (String adjacent : graph.adjacents.get(vertex)) {
                if (coloring.containsKey(adjacent))
                    assigned.add(coloring.get(adjacent));
            }
            int color = 0;
            for (Integer c : assigned) {
                if (color != c) break;
                color++;
            }
            coloring.put(vertex, color);
            results.add("The color of vertex " + vertex + " is " + colors[coloring.get(vertex)]);
        }
        return results;
    }


}
