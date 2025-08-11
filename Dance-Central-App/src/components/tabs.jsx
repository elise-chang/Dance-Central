import React, { useState } from "react"; 

export default function Tabs() {
  const [tabs, setTabs] = useState([{ id: 1, name: "Tab 1", text: "" }]);
  const [active, setActive] = useState(1);

  const add = () => {
    const id = Date.now();
    setTabs([...tabs, { id, name: `Tab ${tabs.length+1}`, text: "" }]);
    setActive(id);
  };

  const updateText = (id, value) =>
    setTabs(tabs.map(t => t.id === id ? { ...t, text: value } : t));

  const current = tabs.find(t => t.id === active);

  return (
    <div className="notes">
      <div className="tabbar">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`tab ${t.id===active ? "active":""}`}
            onClick={()=>setActive(t.id)}
          >
            {t.name}
          </button>
        ))}
        <button className="tab add" onClick={add}>＋</button>
      </div>

      <textarea
        className="textbox"
        placeholder="text input"
        value={current?.text || ""}
        onChange={(e)=>updateText(current.id, e.target.value)}
      />
    </div>
  );
}
