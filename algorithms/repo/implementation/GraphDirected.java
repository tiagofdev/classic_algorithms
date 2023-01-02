package com.titi.algorithms.repo.implementation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GraphDirected {
    HashMap<String, ArrayList<Edge>> adjacents;
    GraphDirected (List<Edge> edges) {
        adjacents = new HashMap<>();
        for (Edge edge: edges) {
            if(!adjacents.containsKey(edge.source))
                adjacents.put(edge.source, new ArrayList<>());
            if(!adjacents.containsKey(edge.dest))
                adjacents.put(edge.dest, new ArrayList<>());
            adjacents.get(edge.source).add(edge);
        }
    }
}
