import heapq

def greedy_best_first_search(graph, heuristics, start, goal):
    visited = set()
    priority_queue = []
    heapq.heappush(priority_queue, (heuristics[start], start))

    came_from = {start: None}

    while priority_queue:
        _, current = heapq.heappop(priority_queue)

        print(f"Visiting Node: {current}")
        if current == goal:
            print("\nGoal reached!")
            break

        visited.add(current)

        for neighbor in graph[current]:
            if neighbor not in visited:
                visited.add(neighbor)
                came_from[neighbor] = current
                heapq.heappush(priority_queue, (heuristics[neighbor], neighbor))

    # Reconstruct path
    path = []
    node = goal
    while node is not None:
        path.append(node)
        node = came_from.get(node)
    path.reverse()

    print("\nPath from", start, "to", goal, ":", " -> ".join(map(str, path)))

def main():
    n = int(input("Enter number of nodes: "))
    graph = [[] for _ in range(n)]

    e = int(input("Enter number of edges: "))
    print("Enter each edge as 'u v':")
    for _ in range(e):
        u, v = map(int, input().split())
        graph[u].append(v)
        graph[v].append(u)  # remove this if the graph is directed

    heuristics = []
    print("Enter heuristic value for each node:")
    for i in range(n):
        h = int(input(f"Heuristic for node {i}: "))
        heuristics.append(h)

    start = int(input("Enter start node: "))
    goal = int(input("Enter goal node: "))

    print("\nStarting Greedy Best-First Search:\n")
    greedy_best_first_search(graph, heuristics, start, goal)


main()
