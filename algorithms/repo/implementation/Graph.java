package com.titi.algorithms.repo.implementation;

import java.util.ArrayList;
import java.util.HashMap;

public class Graph {
    HashMap<String, ArrayList<String>> adjacents;
    Graph(ArrayList<Edge> edges) {
        adjacents = new HashMap<>();
        for (Edge edge : edges) {
            if(!adjacents.containsKey(edge.source))
                adjacents.put(edge.source, new ArrayList<>());
            if(!adjacents.containsKey(edge.dest))
                adjacents.put(edge.dest, new ArrayList<>());
            adjacents.get(edge.source).add(edge.dest);
            adjacents.get(edge.dest).add(edge.source);
        }
    }
}
