import React, { useState } from "react";

const COURSES = [
  { id: "CSS199", label: "CSS199", pointsPerCredit: 1/52 },
  { id: "CSS499", label: "CSS499", pointsPerCredit: 1/52 },
  { id: "CSS497UGR", label: "CSS497 UGR", pointsPerCredit: 1/52 },
  { id: "CSS198", label: "CSS198", pointsPerCredit: 1/87 },
  { id: "CSS498", label: "CSS498", pointsPerCredit: 1/87 },
  { id: "CSS497PRJ", label: "CSS497 PRJ", pointsPerCredit: 1/100 },
  { id: "CSS397", label: "CSS397", pointsPerCredit: 1/150 },
  { id: "CSS495", label: "CSS495", pointsPerCredit: 1/150 },
  { id: "CSS497INT", label: "CSS497 INT", pointsPerCredit: 1/150 },
];

export default function App() {
  const [courseData, setCourseData] = useState(
    Object.fromEntries(
      COURSES.map(c => [c.id, { credits: 1, students: 0 }])
    )
  );

  const [numSupervisors, setNumSupervisors] = useState(1);

  const updateCourse = (id, field, value) => {
    setCourseData(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: Number(value)
      }
    }));
  };

  const coursePoints = COURSES.map(c => {
    const data = courseData[c.id];
    const pts = data.credits * data.students * c.pointsPerCredit;
    return { ...c, ...data, points: pts };
  });

  const totalPoints = coursePoints.reduce((sum, c) => sum + c.points, 0);
  const pointsPerSupervisor =
    numSupervisors > 0 ? totalPoints / numSupervisors : 0;

  return (
    <div style={{ display: "flex", padding: 20, gap: 20 }}>
      
      {/* LEFT: Summary */}
      <div style={{ width: "25%" }}>
        <h2>Summary</h2>
        <p><b>Total Points:</b> {totalPoints.toFixed(3)}</p>
        <p><b>Supervisors:</b> {numSupervisors}</p>
        <p><b>Points / Supervisor:</b> {pointsPerSupervisor.toFixed(3)}</p>

        <h3>By Course</h3>
        {coursePoints.map(c => (
          <div key={c.id}>
            {c.label}: {c.points.toFixed(3)}
          </div>
        ))}
      </div>

      {/* MIDDLE: Controls */}
      <div style={{ width: "35%" }}>
        <h2>Optimizer Controls</h2>

        <label>
          Supervisors: {numSupervisors}
          <input
            type="range"
            min="1"
            max="20"
            value={numSupervisors}
            onChange={e => setNumSupervisors(Number(e.target.value))}
          />
        </label>

        <p style={{ marginTop: 20 }}>
          (You can extend this section with drag-and-drop or auto-optimization)
        </p>
      </div>

      {/* RIGHT: Inputs */}
      <div style={{ width: "40%" }}>
        <h2>Course Inputs</h2>

        {COURSES.map(c => {
          const data = courseData[c.id];
          return (
            <div
              key={c.id}
              style={{
                border: "1px solid #ccc",
                padding: 10,
                marginBottom: 10,
                borderRadius: 8
              }}
            >
              <b>{c.label}</b>
              <div>Points/credit: {c.pointsPerCredit.toFixed(4)}</div>

              <label>
                Credits:
                <input
                  type="number"
                  value={data.credits}
                  onChange={e =>
                    updateCourse(c.id, "credits", e.target.value)
                  }
                />
              </label>

              <label style={{ marginLeft: 10 }}>
                Students:
                <input
                  type="number"
                  value={data.students}
                  onChange={e =>
                    updateCourse(c.id, "students", e.target.value)
                  }
                />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
