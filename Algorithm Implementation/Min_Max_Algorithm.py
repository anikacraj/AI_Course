

def minimax(depth, node_index, is_maximizing_player, scores, target_depth):
    if depth == target_depth:
        return scores[node_index]

    if is_maximizing_player:
        return max(
            minimax(depth + 1, node_index * 2, False, scores, target_depth),
            minimax(depth + 1, node_index * 2 + 1, False, scores, target_depth)
        )
    else:
        return min(
            minimax(depth + 1, node_index * 2, True, scores, target_depth),
            minimax(depth + 1, node_index * 2 + 1, True, scores, target_depth)
        )

def main():
    print("Welcome to Minimax Algorithm!")

    # Get depth of tree from user
    target_depth = int(input("Enter the depth of the game tree (e.g., 2): "))
    number_of_leaves = 2 ** target_depth

    print(f"\nEnter {number_of_leaves} leaf node values (space separated):")
    scores = list(map(int, input().split()))

    if len(scores) != number_of_leaves:
        print(f"Error: You must enter exactly {number_of_leaves} values.")
        return

    print("\nStarting Minimax calculation...\n")

    best_value = minimax(0, 0, True, scores, target_depth)

    print(f"\nThe optimal value for the Maximizer is: {best_value}")

if __name__ == "__main__":
    main()
