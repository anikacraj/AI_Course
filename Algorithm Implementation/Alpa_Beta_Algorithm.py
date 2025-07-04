# Alpha-Beta Pruning Implementation

def alpha_beta_pruning(depth, node_index, is_maximizing_player, values, alpha, beta, max_depth):
    if depth == max_depth:
        return values[node_index]

    if is_maximizing_player:
        best = float('-inf')
        # Check left and right child
        for i in range(2):
            val = alpha_beta_pruning(depth + 1, node_index * 2 + i, False, values, alpha, beta, max_depth)
            best = max(best, val)
            alpha = max(alpha, best)

            # Alpha Beta Pruning
            if beta <= alpha:
                break
        return best

    else:
        best = float('inf')
        # Check left and right child
        for i in range(2):
            val = alpha_beta_pruning(depth + 1, node_index * 2 + i, True, values, alpha, beta, max_depth)
            best = min(best, val)
            beta = min(beta, best)

            # Alpha Beta Pruning
            if beta <= alpha:
                break
        return best

def main():
    print("Welcome to Alpha-Beta Pruning (Minimax with Pruning)!")
    
    depth = int(input("Enter the maximum depth of the game tree (example: 2): "))
    leaf_nodes = 2 ** depth  # Total number of leaf nodes

    print(f"\nEnter {leaf_nodes} leaf node values (space separated):")
    values = list(map(int, input().split()))
    
    if len(values) != leaf_nodes:
        print(f"Error: You must enter exactly {leaf_nodes} values!")
        return
    
    print("\nStarting Alpha-Beta Pruning calculation...\n")
    
    result = alpha_beta_pruning(0, 0, True, values, float('-inf'), float('inf'), depth)
    
    print(f"\nThe optimal value for the Maximizer is: {result}")

if __name__ == "__main__":
    main()
