#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Jan 10 14:25:19 2023

@author: chengchichu
"""

#def gnp_random_connected_graph(n, p):
#    """
#    Generates a random undirected graph, similarly to an Erdős-Rényi 
#    graph, but enforcing that the resulting graph is conneted
#    """
#    edges = combinations(range(n), 2)
#    G = nx.Graph()
#    G.add_nodes_from(range(n))
#    if p <= 0:
#        return G
#    if p >= 1:
#        return nx.complete_graph(n, create_using=G)
#    for _, node_edges in groupby(edges, key=lambda x: x[0]):
#        node_edges = list(node_edges)
#        random_edge = random.choice(node_edges)
#        G.add_edge(*random_edge)
#        for e in node_edges:
#            if random.random() < p:
#                G.add_edge(*e)
#    return G
#
#
#from itertools import combinations, groupby
#import networkx as nx
#import random
#import matplotlib.pyplot as plt
#
#nodes = 40
#seed = random.randint(1,10)
#probability = 0.001
#G = gnp_random_connected_graph(nodes,probability)
#
#plt.figure(figsize=(10,6))
#
#nx.draw(G, node_color='lightblue', 
#        with_labels=True, 
#        node_size=500)

import networkx as nx
import random
import json
from networkx.readwrite import json_graph
import matplotlib.pyplot as plt

#def save(G, fname):
#    json.dump(dict(nodes=[[n, G.node[n]] for n in G.nodes()],
#                   edges=[[u, v, G.edges[u][v]] for u,v in G.edges()]),
#              open(fname, 'w'), indent=2)
#
#def load(fname):
#    G = nx.DiGraph()
#    d = json.load(open(fname))
#    G.add_nodes_from(d['nodes'])
#    G.add_edges_from(d['edges'])
#    return G

D = nx.gn_graph(10, kernel=lambda x: x ** 0.5)

plt_1 = plt.figure(figsize=(10, 20))

nx.draw(D, node_color='lightblue', 
        with_labels=True, 
        node_size=500)
plt.show()


save(D, "sample.json")
#sim = json.dumps(json_graph.node_link_data(D))



#with open("/Users/chengchichu/Desktop/py/jsgraph_flow/sample.json", "w") as outfile:
#     outfile.write(sim)
