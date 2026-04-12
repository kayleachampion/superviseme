import React, { useState, useMemo } from "react";

const COURSES = [
  { id: "CSS199", label: "CSS199", ppc: 1 / 50 },
  { id: "CSS499", label: "CSS499", ppc: 1 / 50 },
  { id: "497UGR", label: "CSS497UGR", ppc: 1 / 50 },
  { id: "CSS198", label: "CSS198", ppc: 1 / 100 },
  { id: "CSS498", label: "CSS498", ppc: 1 / 100 },
  { id: "497PRJ", label: "CSS497PRJ", ppc: 1 / 100 },
  { id: "CSS397", label: "CSS397", ppc: 1 / 150 },
  { id: "CSS495", label: "CSS495", ppc: 1 / 150 },
  { id: "497INT", label: "CSS497INT", ppc: 1 / 150 },
  { id: "CSS595", label: "CSS595", ppc: 1/50},
  { id: "CSS601", label: "CSS601", ppc: 1/150},
  { id: "CSS600", label: "CSS600", ppc: 1/100},
  { id: "CSS700", label: "CSS700", ppc: 1/50}
];

export default function App() {
  const [courses, setCourses] = useState(
    Object.fromEntries(COURSES.map(c => [c.id, { credits: 5, students: 10 }]))
  );

  const [supervisors, setSupervisors] = useState(15);
  const [capacityPerSup, setCapacityPerSup] = useState(1);

  const computed = useMemo(() => {
    const rows = COURSES.map(c => {
      const d = courses[c.id];
      const points = d.credits * d.students * c.ppc;
      return { ...c, ...d, points };
    });

    const totalPoints = rows.reduce((s, r) => s + r.points, 0);
    const totalStudents = rows.reduce((s, r) => s + r.students, 0);
    return { rows, totalPoints, totalStudents, perSup: totalPoints / supervisors };
  }, [courses, supervisors]);

  const updateStudents = (id, value) => {
    const v = Math.max(0, Math.min(200, value));
    setCourses(prev => ({ ...prev, [id]: { ...prev[id], students: v } }));
  };

  const panelStyle = {
    background: "#f8f9fa",
    border: "1px solid #c0c0c0",
    borderRadius: 10,
    padding: 12
  };

  const inputStyle = {
    width: "100%",
    fontSize: 11,
    padding: 2
  };

  const instructionsStyle = {
    background: "#f0f4f7",
    border: "1px solid #c0c0c0",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", padding: 12, fontFamily: "sans-serif", background: "#ffffff", color: "#1f2933" }}>

      {/* INSTRUCTIONS */}
      <div style={instructionsStyle}>
        <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 6 }}>Faculty Microcredit Calculator</div>
        <div style={{ fontSize: 14, textAlign: "left" }}>
          This calculator allows you to explore how many students can be served by how many faculty, for each of our courses. Set number of faculty to 1 if you want to calculate your personal microcredits. A capacity of 1 is equivalent to 1 course release.
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, gap: 12 }}>

        {/* LEFT */}
        <div style={{ width: "22%", ...panelStyle }}>
          <h3>Summary</h3>
          <div>Total Points: {computed.totalPoints.toFixed(3)}</div>
          <div>Per Faculty: {computed.perSup.toFixed(3)}</div>
          {computed.perSup > capacityPerSup && <div style={{ color: "#b00020" }}>Over capacity</div>}

          <h4>Capacity per Faculty Member per Year</h4>
          <input type="number" step="0.1" value={capacityPerSup} onChange={e => setCapacityPerSup(Number(e.target.value))} style={{ width: "80px" }} />
        </div>

        {/* MIDDLE */}
        <div style={{ width: "38%", ...panelStyle, display: "flex", flexDirection: "column" }}>
          <h3>Number of Students</h3>
          {computed.rows.map(r => (
            <div key={r.id} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 120, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}><b>{r.label}</b></div>
                <button onClick={() => updateStudents(r.id, r.students - 1)}>{"<"}</button>
                <input type="range" min="0" max="200" value={r.students} onChange={e => updateStudents(r.id, Number(e.target.value))} style={{ flex: 1 }} />
                <button onClick={() => updateStudents(r.id, r.students + 1)}>{">"}</button>
                <div style={{ width: 35, textAlign: "right" }}>{r.students}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 12, fontWeight: "bold" }}>Total Students: {computed.totalStudents}</div>
        </div>

        {/* RIGHT */}
        <div style={{ width: "40%", ...panelStyle }}>
          <div style={{ fontSize: 16, marginBottom: 4 }}>Number of Faculty: {supervisors}</div>
          <input type="range" min="1" max="35" value={supervisors} onChange={e => setSupervisors(Number(e.target.value))} />

          <div style={{ marginTop: 12, fontSize: 14 }}>Credit per course</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginTop: 6 }}>
            {COURSES.map(c => (
              <div key={c.id} style={{ padding: 4, border: "1px solid #c0c0c0", borderRadius: 6 }}>
                <div style={{ fontSize: 11, width: "100%", overflow: "hidden", textOverflow: "ellipsis" }}>{c.label}</div>
                <input type="number" max="10" value={courses[c.id].credits} onChange={e => setCourses(prev => ({ ...prev, [c.id]: { ...prev[c.id], credits: Math.min(10, Number(e.target.value)) } }))} style={inputStyle} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
