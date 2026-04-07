# Faculty Microcredit Calculator

A React-based tool for exploring how many students can be served by how many faculty members for each course. Perfect for microcredit calculations in academic planning.

---

## Features

- Adjust number of faculty members (1–35)
- Set course credits (1–10)
- Adjust number of students per course (0–200) using sliders with fine controls (`<` and `>` buttons)
- See real-time summary:
  - Total points
  - Points per faculty
  - Total students
  - Over-capacity warning

--

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed (v16+ recommended)
- npm (comes with Node.js)
- Recommended: GitHub Codespaces for zero-setup experience

### Launching the app

#### In Github Codespaces

1. Use the green 'open in codespaces' selector in the right hand corner and launch
2. cd supervisor-optimizer
3. npm install
4. npm start

### Usage
1.  Number of Faculty
Set how many faculty members are available. Use the slider at the top right of the main interface.
2. Credit per Course
Set the credit value (1–10) for each course.
3. Number of Students
Adjust the sliders or click the < and > buttons to set how many students are served per course.
4. Summary Panel
Shows total points, points per faculty, and total students served.
Over-capacity warning appears if the points per faculty exceed capacity.

### License

MIT License

### Notes
Capacity is measured per faculty member per year.
Setting faculty to 1 lets you calculate individual microcredits.
Default values: 15 faculty, 5 credits per course, 1 capacity per faculty member per year.

