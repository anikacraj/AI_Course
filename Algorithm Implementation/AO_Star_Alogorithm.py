class Graph:
    def __init__(self):
        self.graph = {}  # Node -> list of child sets (each set can have one or more children)
        self.heuristic = {}  # Node -> heuristic value

    def add_node(self, node, heuristic_value):
        self.heuristic[node] = heuristic_value
        if node not in self.graph:
            self.graph[node] = []

    def add_edge(self, parent, children_set):
        self.graph[parent].append(children_set)

    def get_neighbors(self, node):
        return self.graph.get(node, [])

class AOStar:
    def __init__(self, graph, start_node):
        self.graph = graph
        self.start_node = start_node
        self.solution = {}

    def ao_star(self, node):
        if node not in self.graph.graph or not self.graph.graph[node]:
            return self.graph.heuristic[node]

        min_cost = float('inf')
        best_children = None

        for children in self.graph.get_neighbors(node):
            cost = 0
            for child, edge_cost in children:
                cost += edge_cost + self.graph.heuristic[child]
            if cost < min_cost:
                min_cost = cost
                best_children = children

        self.solution[node] = [child for child, _ in best_children]

        for child, _ in best_children:
            self.ao_star(child)

        self.graph.heuristic[node] = min_cost
        return self.graph.heuristic[node]

    def print_solution(self, node=None, level=0):
        if node is None:
            node = self.start_node
        print("  " * level + node)
        if node in self.solution:
            for child in self.solution[node]:
                self.print_solution(child, level + 1)

def main():
    graph = Graph()

    # Add nodes and heuristic values (from image)
    graph.add_node('A', 999)  # initial large heuristic
    graph.add_node('B', 999)
    graph.add_node('C', 999)
    graph.add_node('D', 999)
    graph.add_node('E', 7)
    graph.add_node('F', 9)
    graph.add_node('G', 3)
    graph.add_node('H', 0)
    graph.add_node('I', 0)
    graph.add_node('J', 0)

    # Add edges (parent -> [(child, cost)])
    graph.add_edge('A', [('B', 9)])
    graph.add_edge('A', [('C', 2)])
    graph.add_edge('A', [('D', 8)])
    graph.add_edge('B', [('E', 8)])
    graph.add_edge('B', [('F', 9)])
    graph.add_edge('C', [('G', 3)])
    graph.add_edge('C', [('H', 2), ('I', 2)])
    graph.add_edge('D', [('J', 1)])

    start_node = 'A'

    ao_star_solver = AOStar(graph, start_node)
    ao_star_solver.ao_star(start_node)

    print("\nFinal Solution Graph:")
    ao_star_solver.print_solution()

if __name__ == "__main__":
    main()
