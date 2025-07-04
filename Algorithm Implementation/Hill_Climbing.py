def hill_climbing(graph, heuristics, start):
    current = start
    path = [current]

    while True:
        neighbors = graph.get(current, [])
        if not neighbors:
            break

       
        next_node = min(neighbors, key=lambda x: heuristics[x])

        # If the next node is not better, then here is stop 
        if heuristics[next_node] >= heuristics[current]:
            break

        current = next_node
        path.append(current)

    print("Path:", " -> ".join(path))
    print("Reached:", current)
    print("Heuristic:", heuristics[current])

# Each node points to possible next steps
graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': [],
    'F': []
}

# Heuristics (the lower, the better)
heuristics = {
    'A': 10,
    'B': 8,
    'C': 9,
    'D': 5,
    'E': 7,
    'F': 6
}

start_node = 'A'
hill_climbing(graph, heuristics, start_node)
