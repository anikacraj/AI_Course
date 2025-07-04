# 📂 Algorithm Implementation

This folder contains the implementation of various AI algorithms as part of the Artificial Intelligence course. Each algorithm file is named according to the algorithm it implements.

---

## 📘 Table of Contents

1. [Uninformed Search Algorithms](#uninformed-search-algorithms)
2. [Informed Search Algorithms](#informed-search-algorithms)
3. [Heuristic Search Techniques](#heuristic-search-techniques)
4. [Game Playing Algorithms](#game-playing-algorithms)

---

<img src="./images/a.png"  width="500" height="350"/>
<img src="./images/b.png"  width="500" height="350"/>
<img src="./images/3.png"  width="500" height="350"/>
<img src="./images/d.png"  width="500" height="350"/>
<img src="./images/e.png"  width="500" height="350"/>
<img src="./images/f.png"  width="500" height="350"/>

## 🔍 Uninformed Search Algorithms

### 1️⃣ Breadth-First Search (BFS)

- **How It Works**  
  Explores all nodes at the current depth level before moving to the next level. Uses a queue data structure (FIFO).  

- **Applications**  
  - Finding the shortest path in unweighted graphs.  
  - Web crawling.  
  - GPS navigation.  

- **Complexity**  
  - Time: O(b^d)  
  - Space: O(b^d)  
  _(b = branching factor, d = depth of the shallowest goal)_  

---

### 2️⃣ Depth-First Search (DFS)

- **How It Works**  
  Explores as far as possible along each branch before backtracking. Uses a stack (LIFO) or recursion.  

- **Applications**  
  - Solving puzzles (e.g., mazes).  
  - Topological sorting.  

- **Complexity**  
  - Time: O(b^m)  
  - Space: O(bm)  
  _(m = maximum depth)_  

---

### 3️⃣ Iterative Deepening Search (IDS)

- **How It Works**  
  Combines the space efficiency of DFS and completeness of BFS by repeatedly performing DFS to increasing depth limits.  

- **Applications**  
  - When the search depth is unknown.  
  - AI agents in games.  

- **Complexity**  
  - Time: O(b^d)  
  - Space: O(bd)  

---

### 4️⃣ Bidirectional Search

- **How It Works**  
  Simultaneously searches forward from the start node and backward from the goal node until the two meet.  

- **Applications**  
  - Route finding in maps.  

- **Complexity**  
  - Time: O(b^(d/2))  
  - Space: O(b^(d/2))  

---

### 5️⃣ Depth-Limited Search

- **How It Works**  
  DFS with a predefined depth limit to avoid infinite loops.  

- **Applications**  
  - Solving problems where a maximum depth is known.  

- **Complexity**  
  - Time: O(b^l)  
  - Space: O(bl)  
  _(l = depth limit)_  

---

## 🎯 Informed Search Algorithms

### 6️⃣ Best-First Search

- **How It Works**  
  Uses a heuristic to select the most promising node to explore next.  

- **Applications**  
  - Pathfinding in games.  
  - AI planning.  

- **Complexity**  
  - Time: O(b^m)  
  - Space: O(b^m)  

---

### 7️⃣ A* Search

- **How It Works**  
  Combines cost to reach a node (g) and estimated cost to goal (h): f(n) = g(n) + h(n).  

- **Applications**  
  - Shortest path finding (Google Maps, GPS).  
  - AI agents in robotics.  

- **Complexity**  
  - Time: O(b^d)  
  - Space: O(b^d)  

---

### 8️⃣ AO* Algorithm

- **How It Works**  
  Works on AND-OR graphs, selects most promising nodes using cost and heuristic.  

- **Applications**  
  - Problem-solving in complex graphs.  
  - Planning in robotics and AI.  

- **Complexity**  
  - Time: Depends on graph structure  
  - Space: Depends on graph structure  

---

## 🧠 Heuristic Search Techniques

### 9️⃣ Hill Climbing

- **How It Works**  
  Iteratively moves to the neighbor with higher value until reaching a peak.  

- **Applications**  
  - Function optimization.  
  - Robotics path planning.  

- **Complexity**  
  - Time: O(b^m)  
  - Space: O(b)  

---

### 🔟 Beam Search

- **How It Works**  
  Keeps track of k best nodes at each level instead of all nodes (like BFS).  

- **Applications**  
  - Speech recognition.  
  - Machine translation.  

- **Complexity**  
  - Time: O(kb)  
  - Space: O(kb)  
  _(k = beam width)_  

---

## ♟️ Game Playing Algorithms

### 1️⃣1️⃣ Minimax Algorithm

- **How It Works**  
  Decision rule for minimizing the possible loss in a worst-case scenario (two-player games).  

- **Applications**  
  - Chess, tic-tac-toe AI.  

- **Complexity**  
  - Time: O(b^m)  
  - Space: O(bm)  
  _(m = maximum depth)_  

---

### 1️⃣2️⃣ Alpha-Beta Pruning

- **How It Works**  
  Improves Minimax by cutting branches that won’t affect the outcome.  

- **Applications**  
  - Chess engines.  
  - Game AI optimization.  

- **Complexity**  
  - Time: O(b^(m/2)) (with perfect pruning)  
  - Space: O(bm)  

---



