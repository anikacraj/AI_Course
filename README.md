# 🧠 Artificial Intelligence Course - Final Report

> A comprehensive summary of everything we learned in our AI course.

---

## 📄 Course Information

- **📚 Course Title:** Artificial Intelligence  
- **👨‍🏫 Instructor:** Rajorshi Projojal  
- **📆 Duration:** January 2025 – June 2025  
- **🧾 Submitted by:** Anik Chowdhury  

---

## 📌 Purpose of the Course

The purpose of this course is to introduce the foundational concepts of **Artificial Intelligence**, including how intelligent agents operate, search algorithms, logic-based reasoning, and machine learning. The course prepares students to:

- Understand real-world AI applications  
- Implement classical search and optimization algorithms  
- Apply game-theory and logical reasoning techniques  
- Work with constraint-based models  
- Explore the basics of reinforcement learning and robotics  

---

## 📘 What We Learned From This Course

---

### 🧠 1. Introduction to AI

#### 🤖 How AI Helps Us
Artificial Intelligence improves daily life by automating processes, predicting outcomes, and learning patterns from data.  
It is used in:

- ✅ Healthcare: Diagnostic tools, patient monitoring  
- ✅ Finance: Fraud detection, loan predictions  
- ✅ Education: Adaptive learning systems  
- ✅ Transport: Autonomous vehicles  
- ✅ Entertainment: Personalized recommendations  

#### 🧪 Examples of AI in Daily Life

- **📍 Google Maps:** Route optimization using real-time data  
- **🎙️ Voice Assistants:** Siri, Alexa using NLP  
- **🎥 Netflix, YouTube:** Content recommendations  
- **📧 Gmail:** Spam detection using classification algorithms  

#### 🧮 Types of AI Algorithms

- Search & Optimization (BFS, A*, Hill Climbing)  
- Game Theory (Minimax, Alpha-Beta)  
- Logic & Reasoning (Propositional, Predicate)  
- Machine Learning (Reinforcement Learning)  

---

### 🔍 2. Search Algorithms

#### 🔸 Uninformed Search

| Algorithm         | Features                                              | Complete | Optimal | Time Complexity | Space Complexity |
|------------------|--------------------------------------------------------|----------|---------|------------------|-------------------|
| **BFS**          | Explores level by level                                | ✔️       | ✔️      | O(b^d)           | O(b^d)            |
| **DFS**          | Explores deepest branch first                          | ✔️       | ❌      | O(b^m)           | O(bm)             |
| **DLS**          | DFS with depth limit                                   | ✔️       | ❌      | O(b^l)           | O(bl)             |
| **IDS**          | DFS + BFS hybrid, optimal with less memory             | ✔️       | ✔️      | O(b^d)           | O(bd)             |
| **Bidirectional**| Two BFS from start and goal                            | ✔️       | ✔️      | O(b^(d/2))       | O(b^(d/2))        |

> b = branching factor, d = depth of solution

#### 🔸 Informed Search (Heuristic-Based)

- **Best-First Search:** Uses a heuristic to choose the most promising path  
- **A\* Search:** f(n) = g(n) + h(n) — optimal with admissible heuristics  
- **AO\* Algorithm:** Handles AND-OR graphs, useful for complex problem solving  

---

### 🔧 3. Heuristic Search Techniques

- **Hill Climbing:** Greedy ascent toward goal, may get stuck in local maxima  
- **Beam Search:** Keeps top-k best candidates at each level for efficiency

---

### ♟️ 4. Game Playing Algorithms

- **Minimax:** Two-player, zero-sum games (e.g., chess, tic-tac-toe)  
- **Alpha-Beta Pruning:** Cuts unnecessary branches from Minimax tree, improves efficiency  


Minimax evaluates all → Alpha-beta skips irrelevant paths!
## 🧩 5. Constraint Satisfaction Problems (CSP)

### 🧱 Components:
- **Variables:** e.g., X, Y, Z  
- **Domains:** e.g., {Red, Green, Blue}  
- **Constraints:** e.g., X ≠ Y  

---

### 📊 Cryptarithmetic Example

**Problem:** `SEND + MORE = MONEY`  
Each letter represents a unique digit.  
Solved using:

- ✅ Backtracking  
- ✅ Forward Checking  
- ✅ Constraint Propagation  

---

### 🔍 Local Consistency Techniques

| Type              | Description                                   |
|-------------------|-----------------------------------------------|
| **Arc Consistency**   | Each value in X has a supporting value in Y   |
| **Path Consistency**  | Ensures consistency over 3-variable paths     |
| **Global Consistency**| All constraints satisfied across all variables|

---

### 🎯 Advanced Techniques

- **MRV Heuristic:** Choose variable with the fewest legal values  
- **Degree Heuristic:** Choose variable involved in most constraints  
- **Forward Checking & Backtracking:** Reduce invalid paths early  

---

## 🔗 6. Logic and Reasoning

### 🧠 Propositional Logic
Deals with statements that are either **true or false**.  
**Example:**  
If it rains → The ground is wet → `P → Q`

---

### 🔄 Inference Types

| Term              | Logic Form   | Example                      |
|-------------------|--------------|------------------------------|
| **Inverse**       | ¬P → ¬Q      | Not raining → Not wet        |
| **Converse**      | Q → P        | Wet ground → It rained       |
| **Contrapositive**| ¬Q → ¬P      | Not wet → Not raining        |

---

### 🧾 Normal Forms

- **CNF (Conjunctive Normal Form):** AND of ORs  
- **DNF (Disjunctive Normal Form):** OR of ANDs  

---

### 🔢 Predicate Logic

Uses variables and quantifiers: `∀x`, `∃y`  
**Example:** ∀x (Student(x) → Studies(x))

---

## 🧮 7. Optimization Algorithms

### ⛓️ Branch and Bound
- Explore all possible solutions but **prune paths** that exceed known bounds  
- Used in **TSP**, **job scheduling**, and **knapsack** problems

---

### 🎒 Knapsack Problem

Choose items that **maximize value** under a weight limit.  
**Solving Approaches:**

- ⚡ Greedy Method  
- 🧠 Dynamic Programming  
- ⛓️ Branch & Bound  

---

## 🕹️ 8. Reinforcement Learning (RL)

An agent learns optimal behavior through **trial-and-error** using **rewards and penalties**.

### 🔁 Core Elements:
- Agent  
- Environment  
- Actions  
- Rewards  
- Policy & Q-Values  

---

### 🧮 Q-learning Formula

> Where:  
> `α` = Learning rate  
> `γ` = Discount factor  

---

## 📂 9. Information Retrieval (IR)

### 📋 Process Involves:
- Document Indexing  
- Query Processing  
- Ranking Results  

### 📊 Evaluation Metrics

| Metric     | Description                                   |
|------------|-----------------------------------------------|
| **Precision**  | Relevant documents retrieved / Retrieved           |
| **Recall**     | Relevant documents retrieved / All relevant docs  |
| **F1-Score**   | Harmonic mean of Precision & Recall               |
| **MAP**        | Mean Average Precision                            |

---

## 🤖 10. Robotics

### 💡 What is a Robot?

A **robot** is an intelligent machine capable of performing tasks **autonomously** or **semi-autonomously**.

---

### 🔧 Hardware Components:
- Sensors  
- Actuators  
- Motors  
- Microcontrollers  

### 💻 Software Components:
- ROS (Robot Operating System)  
- Pathfinding algorithms  
- AI logic modules  

---

### 🚀 Applications of Robotics:

- 🏭 Industrial Automation  
- 🩺 Medical Surgery  
- 🪖 Military Operations  
- 🏠 Domestic/Home Cleaning  
- 🚀 Space Exploration  

---

### 🧱 Categories of Robots:

- Wheeled Robots  
- Humanoid Robots  
- Swarm Robots  
- Aerial Drones  


