import heapq

def a_star(graph, start, goal, heuristic):
    open_list = []
    heapq.heappush(open_list, (0 + heuristic[start], 0, start, [start]))  # (f_score, g_score, current_node, path)

    closed_set = set()

    while open_list:
        f_score, g_score, current, path = heapq.heappop(open_list)

        if current == goal:
            print("\nGoal found!")
            return path

        closed_set.add(current)

        for neighbor, cost in graph.get(current, []):
            if neighbor not in closed_set:
                new_g_score = g_score + cost
                new_f_score = new_g_score + heuristic[neighbor]
                heapq.heappush(open_list, (new_f_score, new_g_score, neighbor, path + [neighbor]))

    return None

def main():
    graph = {}
    heuristic = {}

    n = int(input("Enter number of nodes: "))
    print("Enter node names:")

    nodes = []
    for _ in range(n):
        node = input().strip()
        nodes.append(node)

    e = int(input("Enter number of edges: "))
    print("Enter edges in format 'u v cost' (e.g., A B 4):")

    for _ in range(e):
        u, v, cost = input().split()
        cost = int(cost)
        if u not in graph:
            graph[u] = []
        graph[u].append((v, cost))
        # If the graph is undirected, also add:
        # if v not in graph:
        #     graph[v] = []
        # graph[v].append((u, cost))

    print("Enter heuristic values for each node (estimated cost to goal):")
    for node in nodes:
        h = int(input(f"Heuristic value for {node}: "))
        heuristic[node] = h

    start = input("Enter start node: ").strip()
    goal = input("Enter goal node: ").strip()

    path = a_star(graph, start, goal, heuristic)

    if path:
        print("Final Path:", " -> ".join(path))
    else:
        print("Goal not reachable.")

if __name__ == "__main__":
    main()
