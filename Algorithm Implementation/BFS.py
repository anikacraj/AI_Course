from collections import deque

def bfs(graph, start):
    visited=[False]*len(graph)
    queue = deque()
    visited[start]=True
    queue.append(start)

    while queue:
        current =queue.popleft()
        print(current, end=' ')


        for neighbor in graph[current]:
            if not visited[neighbor]:
                visited[neighbor]=True
                queue.append(neighbor)

def main():
    n =int(input("enter number of nodes: "))
    graph=[[] for _ in  range(n)]

    e=int(input("Enter number of edges: "))
    print("Enter each edge in the format 'u v' (0-based index):")

    for _ in range(e):
        u, v=map(int,input().split())
        graph[u].append(v)
        graph[v].append(u)

    start = int(input("enter starting node for bfs: "))
    print("BFS traversal starting from node", start,":")
    bfs(graph, start)

main()
