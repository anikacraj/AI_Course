def beam_search(graph, heuristics, start, goal, beam_width):
    frontier = [(start, [start])]  # (current_node, path_so_far)

    while frontier:
     
        frontier.sort(key=lambda x: heuristics[x[0]])
        
        frontier = frontier[:beam_width]

        new_frontier = []

        for node, path in frontier:
            print(f"Visiting: {node}, Path: {' -> '.join(path)}")
            
            if node == goal:
                print("\nGoal reached!")
                return path
            
            for neighbor in graph.get(node, []):
                new_path = path + [neighbor]
                new_frontier.append((neighbor, new_path))
        
        frontier = new_frontier

    print("Goal not found.")
    return None

# Example graph
graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F', 'G'],
    'D': [],
    'E': [],
    'F': [],
    'G': []
}

# Heuristic values (lower = closer to goal)
heuristics = {
    'A': 6,
    'B': 4,
    'C': 5,
    'D': 1,
    'E': 2,
    'F': 3,
    'G': 4
}

# Run beam search
start_node = 'A'
goal_node = 'D'
beam_width = 2

result_path = beam_search(graph, heuristics, start_node, goal_node, beam_width)
if result_path:
    print("Final Path:", " -> ".join(result_path))
