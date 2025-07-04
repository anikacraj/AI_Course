def dls(graph, current, goal, limit, path):
    if current == goal:
        return path

    if limit <= 0:
        return None

    for neighbor in graph.get(current, []):
        new_path = dls(graph, neighbor, goal, limit - 1, path + [neighbor])
        if new_path:
            return new_path

    return None

def iterative_deepening_search(graph, start, goal):
    depth = 0

    while True:
        print(f"Trying depth limit: {depth}")
        path = dls(graph, start, goal, depth, [start])

        if path:
            print("\nGoal found!")
            return path

        depth += 1

def main():
    graph = {}
    n = int(input("Enter number of nodes: "))

    print("Enter node names:")
    nodes = []
    for _ in range(n):
        node = input().strip()
        nodes.append(node)

    e = int(input("Enter number of edges: "))

    print("Enter edges in the format 'u v' (meaning u connects to v):")
    for _ in range(e):
        u, v = input().split()
        if u not in graph:
            graph[u] = []
        graph[u].append(v)

    start_node = input("Enter start node: ").strip()
    goal_node = input("Enter goal node: ").strip()

    path = iterative_deepening_search(graph, start_node, goal_node)

    if path:
        print("Final Path:", " -> ".join(path))
    else:
        print("Goal not found.")

if __name__ == "__main__":
    main()
