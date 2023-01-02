package com.titi.algorithms.repo.implementation;

public class Edge {
    String source, dest;
    int weight;
    public Edge(String source, String dest, String weight) {
        this.source = source;
        this.dest = dest;
        this.weight = Integer.parseInt(weight);
    }

    public Edge(String source, String dest) {
        this.source = source;
        this.dest = dest;
        this.weight = Integer.MIN_VALUE;
    }
}
