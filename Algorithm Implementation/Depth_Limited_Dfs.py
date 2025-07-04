def depth_limited_dfs(graph, node, visited, depth):
    if depth < 0:
        return
    visited[node] = True
    print(node, end=' ')
    for neighbor in graph[node]:
        if not visited[neighbor]:
            depth_limited_dfs(graph, neighbor, visited, depth - 1)

def iterative_deepening_dfs(graph, start, max_depth):
    for depth in range(max_depth + 1):
        print(f"\nDepth Limit = {depth} =>", end=' ')
        visited = [False] * len(graph)
        depth_limited_dfs(graph, start, visited, depth)

def main():
    n = int(input("Enter number of nodes: "))
    graph = [[] for _ in range(n + 1)]  # +1 because nodes are 1-indexed

    e = int(input("Enter number of edges: "))
    print("Enter each edge in the format 'u v' (1-based index):")

    for _ in range(e):
        u, v = map(int, input().split())
        graph[u].append(v)
        graph[v].append(u)  # If undirected graph

    start = int(input("Enter starting node for IDS: "))
    max_depth = int(input("Enter maximum depth to search: "))

    print("\nIterative Deepening DFS Traversal:")
    iterative_deepening_dfs(graph, start, max_depth)

main()
