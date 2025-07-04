def dfs ( graph, start , visited):
    visited[start]= True
    print(start, end=' ')

    for neighbor in graph[start]:
        if not visited[neighbor]:
            dfs(graph,neighbor,visited)
def main():
    n =int(input("enter number of nodes: "))
    graph=[[] for _ in range(n)]

    e= int(input("Enter number of edges: "))
    print("Enter each edge in the format 'u v' (0-based index):")      

    for _ in range(e):
        u ,v =map(int, input().split())
        graph[u].append(v)
        graph[v].append(u)
    start = int(input("enter starting node of dfs"))
    visited =[False]*n 
    print("DFS traversal starting from node", start, ":")
    dfs(graph, start, visited)
main()    
