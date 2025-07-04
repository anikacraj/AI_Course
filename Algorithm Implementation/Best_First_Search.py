import heapq

def best_first_search(graph, heuristics, start, goal):
    visited = set()
    priority_queue = []
    heapq.heappush(priority_queue, (heuristics[start], start))  

    while priority_queue:
        _, current = heapq.heappop(priority_queue)

        print(f"Visiting Node {current}")
        if current == goal:
            print(f"Goal node {goal} found!")
            return True

        if current not in visited:
            visited.add(current)

            for neighbor, cost in graph[current]:
                if neighbor not in visited:
                    heapq.heappush(priority_queue, (heuristics[neighbor], neighbor))

    print("Goal node not found.")
    return False

def main():
    # Hardcoded graph
    graph = {
        0: [(1, 2), (2, 4)],
        1: [(0, 2), (3, 7), (4, 6)],
        2: [(0, 4), (4, 5)],
        3: [(1, 7), (5, 1)],
        4: [(1, 6), (2, 5), (5, 2)],
        5: [(3, 1), (4, 2)]
    }

    heuristics = {
        0: 7,
        1: 6,
        2: 5,
        3: 1,
        4: 2,
        5: 0
    }

    start = 0
    goal = 5

    print("Graph structure:")
    for node in graph:
        print(f"{node} --> {graph[node]}")

    print("\nHeuristics:")
    for node in heuristics:
        print(f"Node {node}: {heuristics[node]}")

    print(f"\nBest-First Search (Greedy) from {start} to {goal}:\n")
    best_first_search(graph, heuristics, start, goal)

main()
