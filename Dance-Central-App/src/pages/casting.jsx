import React, { useState } from "react";
import MenuNavbar from "../components/MenuNavbar";
import MediaUploader from "../components/MediaUploader";
import VideoPlayer from "../components/VideoPlayer";
import "../pages/casting.css";

export default function Casting() {
  const [media, setMedia] = useState([]);
  const [selected, setSelected] = useState(null);
  const [tabs, setTabs] = useState([
    { name: "Tab 1", notes: "", pinned: false },
    { name: "Tab 2", notes: "", pinned: false }
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const [renamingTab, setRenamingTab] = useState(null);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, tabIdx: null });

  const addMedia = (items) => {
    setMedia((m) => {
      const newMedia = [...m, ...items];
      // If nothing selected, select the first of the new items
      if (!selected && items.length) setSelected(items[0]);
      return newMedia;
    });
  };

  // Handle notes change for the active tab
  const handleNotesChange = (e) => {
    const newTabs = tabs.slice();
    newTabs[activeTab].notes = e.target.value;
    setTabs(newTabs);
  };

  // Switch tab and save notes
  const handleTabClick = (idx) => {
    setActiveTab(idx);
  };

  // Add new tab
  const handleAddTab = () => {
    setTabs([...tabs, { name: `Tab ${tabs.length + 1}`, notes: "", pinned: false }]);
    setActiveTab(tabs.length);
  };

  // Context menu handlers
  const handleTabContextMenu = (e, idx) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, tabIdx: idx });
  };
  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, tabIdx: null });
  };
  
  // Delete tab
  const handleDeleteTab = () => {
    if (tabs.length === 1) return;
    const idx = contextMenu.tabIdx;
    const newTabs = tabs.slice();
    newTabs.splice(idx, 1);
    setTabs(newTabs);
    setActiveTab((prev) => (prev > idx ? prev - 1 : Math.max(0, prev === idx ? 0 : prev)));
    handleCloseContextMenu();
  };
  // Pin/unpin tab
  const handlePinTab = () => {
    const idx = contextMenu.tabIdx;
    const newTabs = tabs.slice();
    newTabs[idx].pinned = !newTabs[idx].pinned;
    setTabs(newTabs);
    handleCloseContextMenu();
  };

  // Close context menu on click elsewhere
  React.useEffect(() => {
    if (!contextMenu.visible) return;
    const close = () => handleCloseContextMenu();
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [contextMenu.visible]);

  // Handle renaming
  const handleTabDoubleClick = (idx) => {
    setRenamingTab(idx);
  };
  const handleRenameChange = (e, idx) => {
    const newTabs = tabs.slice();
    newTabs[idx].name = e.target.value;
    setTabs(newTabs);
  };
  const handleRenameBlur = () => {
    setRenamingTab(null);
  };
  const handleRenameKeyDown = (e) => {
    if (e.key === "Enter") setRenamingTab(null);
  };

  return (
        <>
      <MenuNavbar open="false" static="false" />

      {/* NEW: top row that pushes the page down */}
      <div className="top-row">
        <div className="top-left">
          <h2 style={{ margin: 0 }}>Project Controls</h2>
        </div>
        <div className="top-right">
          <MediaUploader
            uploadType="video"
            buttonClassName="pink-upload-btn"
            onAdd={(items) => {
              addMedia(items);
              setSelected(items[0]);
            }}
          />
          <button className="pill">Export</button>
          <button className="pill">Share</button>
        </div>
      </div>

    <div className="casting">
      {/* LEFT COLUMN */}
      <section className="left">
        <h2 className="song-title">Song Title</h2>

        <div className="video-panel panel">
          {selected ? (
            <VideoPlayer item={selected} />
          ) : (
            <div className="empty-video">
              <p>No media yet.</p>
              <MediaUploader
                uploadType="video"
                buttonClassName="pink-upload-btn"
                onAdd={(items) => {
                  addMedia(items);
                  setSelected(items[0]);
                }}
              />
            </div>
          )}
        </div>

        <div className="carousel-panel panel">
          {media.length ? (
            <div className="carousel-nav-wrapper" style={{display:'flex',alignItems:'center'}}>
              <button
                className="carousel-arrow"
                aria-label="Previous"
                onClick={() => {
                  if (!media.length) return;
                  const idx = selected ? media.findIndex(m => m.src === selected.src) : 0;
                  setSelected(media[(idx - 1 + media.length) % media.length]);
                }}
                disabled={!media.length}
              >{'<'}
              </button>
              <ul className="carousel" style={{flex:1}}>
                {media.map((m, i) => (
                  <li
                    key={i}
                    className={`thumb ${selected?.src === m.src ? "active" : ""}`}
                    onClick={() => setSelected(m)}
                  >
                    {m.type === "video" ? (
                      <video src={m.src} muted />
                    ) : (
                      <img src={m.src} alt={m.alt} />
                    )}
                  </li>
                ))}
              </ul>
              <button
                className="carousel-arrow"
                aria-label="Next"
                onClick={() => {
                  if (!media.length) return;
                  const idx = selected ? media.findIndex(m => m.src === selected.src) : 0;
                  setSelected(media[(idx + 1) % media.length]);
                }}
                disabled={!media.length}
              >{'>'}
              </button>
            </div>
          ) : (
            <ul className="carousel">
              {[...Array(3)].map((_, i) => (
                <li key={i} className="thumb placeholder-thumb" />
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* RIGHT COLUMN */}
      <aside className="right">
        <div className="tabs">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              className={`tab${activeTab === idx ? " active" : ""}${tab.pinned ? " pinned" : ""}`}
              onClick={() => handleTabClick(idx)}
              onDoubleClick={() => handleTabDoubleClick(idx)}
              onContextMenu={(e) => handleTabContextMenu(e, idx)}
            >
              {renamingTab === idx ? (
                <input
                  type="text"
                  value={tab.name}
                  autoFocus
                  onChange={(e) => handleRenameChange(e, idx)}
                  onBlur={handleRenameBlur}
                  onKeyDown={handleRenameKeyDown}
                  style={{ width: Math.max(4, tab.name.length) + 'ch' }}
                />
              ) : (
                <>
                  {tab.pinned && <span style={{color:'#e67',marginRight:4}}>📌</span>}
                  {tab.name}
                </>
              )}
            </button>
          ))}
          <button className="tab add" onClick={handleAddTab}>+</button>
          {contextMenu.visible && (
            <ul
              className="tab-context-menu"
              style={{ position: 'fixed', top: contextMenu.y, left: contextMenu.x, zIndex: 1000, background: 'white', border: '1px solid #ccc', borderRadius: 6, padding: 0, margin: 0, listStyle: 'none', minWidth: 100 }}
            >
              <li>
                <button
                  className="delete"
                  onClick={handleDeleteTab}
                  disabled={tabs.length === 1 || tabs[contextMenu.tabIdx]?.pinned}
                >Delete</button>
              </li>
              <li>
                <button
                  style={{ width: '100%', padding: '0.5em 1em', border: 'none', background: 'none', textAlign: 'left', color: '#333', cursor: 'pointer' }}
                  onClick={handlePinTab}
                >{tabs[contextMenu.tabIdx]?.pinned ? 'Unpin' : 'Pin'}</button>
              </li>
            </ul>
          )}
        </div>

        <div className="notes panel">
          <textarea
            className="notes-input"
            placeholder="text input"
            value={tabs[activeTab]?.notes || ""}
            onChange={handleNotesChange}
          />
        </div>
      </aside>
    </div>
    </>
  );
}
