from collections import deque

def bfs_bidirectional(graph, start, goal):
    if start == goal:
        print(f"Start and goal are the same: {start}")
        return

    n = len(graph)
    visited_start = [False] * n
    visited_goal = [False] * n

    parent_start = [-1] * n
    parent_goal = [-1] * n

    queue_start = deque([start])
    queue_goal = deque([goal])

    visited_start[start] = True
    visited_goal[goal] = True

    while queue_start and queue_goal:
        # Step from start side
        if bfs_step(graph, queue_start, visited_start, visited_goal, parent_start, direction="Start"):
            meeting_node = find_meeting_node(visited_start, visited_goal)
            print_path(parent_start, parent_goal, meeting_node, start, goal)
            return

        # Step from goal side
        if bfs_step(graph, queue_goal, visited_goal, visited_start, parent_goal, direction="Goal"):
            meeting_node = find_meeting_node(visited_start, visited_goal)
            print_path(parent_start, parent_goal, meeting_node, start, goal)
            return

    print("No path found between start and goal.")

def bfs_step(graph, queue, visited_this, visited_other, parent, direction):
    current = queue.popleft()
    for neighbor in graph[current]:
        if not visited_this[neighbor]:
            visited_this[neighbor] = True
            parent[neighbor] = current
            queue.append(neighbor)

            if visited_other[neighbor]:
                return True
    return False

def find_meeting_node(visited_start, visited_goal):
    for i in range(len(visited_start)):
        if visited_start[i] and visited_goal[i]:
            return i
    return -1

def print_path(parent_start, parent_goal, meeting_node, start, goal):
    path = []

    node = meeting_node
    while node != -1:
        path.append(node)
        node = parent_start[node]
    path.reverse()

    node = parent_goal[meeting_node]
    while node != -1:
        path.append(node)
        node = parent_goal[node]

    print("Path from", start, "to", goal, ": ", end='')
    print(" -> ".join(map(str, path)))

def main():
    n = int(input("Enter number of nodes: "))
    graph = [[] for _ in range(n)]

    e = int(input("Enter number of edges: "))
    print("Enter each edge in the format 'u v' (0-based index):")
    for _ in range(e):
        u, v = map(int, input().split())
        graph[u].append(v)
        graph[v].append(u)  # undirected

    start = int(input("Enter starting node: "))
    goal = int(input("Enter goal node: "))

    bfs_bidirectional(graph, start, goal)


main()
