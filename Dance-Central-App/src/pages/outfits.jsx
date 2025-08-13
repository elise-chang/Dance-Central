import React, { useMemo, useState } from "react";
import "../pages/outfits.css";

import Button from "../components/button";
import Dropdown from "../components/Dropdown";
import MenuNavbar from "../components/MenuNavbar";
import Textbox from "../components/Textbox";
import MediaUploader from "../components/MediaUploader";

const seedImg =
  "https://i.pinimg.com/736x/19/45/2d/19452d14eca923a236d6e51deae86c79.jpg";
const mkItem = (i) => ({ id: `p-${i}`, type: "image", src: seedImg });

const Outfits = () => {
  // ----- Pending / Approved -----
  const [pending, setPending] = useState([
    mkItem(1),
    mkItem(2),
    mkItem(3),
    mkItem(4),
    mkItem(5),
    mkItem(6),
  ]);
  const [approved, setApproved] = useState([mkItem(7), mkItem(8), mkItem(9)]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [approvedEdit, setApprovedEdit] = useState(false);

  const pendingCount = pending.length;
  const approvedCount = approved.length;

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelectedIds(new Set(pending.map((x) => x.id)));
  const clearSelection = () => setSelectedIds(new Set());

  const approveSelected = () => {
    if (selectedIds.size === 0) return;
    const toApprove = pending.filter((p) => selectedIds.has(p.id));
    const remain = pending.filter((p) => !selectedIds.has(p.id));
    setPending(remain);
    setApproved((prev) => [...toApprove, ...prev]);
    clearSelection();
  };

  const declineSelected = () => {
    if (selectedIds.size === 0) return;
    const remain = pending.filter((p) => !selectedIds.has(p.id));
    setPending(remain);
    clearSelection();
  };

  const removeApproved = (id) => {
    if (!approvedEdit) return;
    setApproved((prev) => prev.filter((x) => x.id !== id));
  };

  // ----- Inspiration -----
  const [inspiration, setInspiration] = useState([]);
  const [inspEdit, setInspEdit] = useState(false);

  const addToInspiration = (items) =>
    setInspiration((prev) => [...items, ...prev]);

  const removeInspiration = (idOrSrc) =>
    setInspiration((prev) =>
      prev.filter((x) => (x.id || x.src) !== idOrSrc)
    );

  // Pinterest state
  const [showPinInput, setShowPinInput] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinterestLinks, setPinterestLinks] = useState([]);

  const isValidPinterestUrl = (url) => {
    try {
      const u = new URL(url);
      return /(^|\.)pinterest\./i.test(u.hostname);
    } catch {
      return false;
    }
  };

  const handleSavePinterest = () => {
    const trimmed = pinInput.trim();
    if (!isValidPinterestUrl(trimmed)) {
      alert("Please paste a valid Pinterest link (board, pin, or profile).");
      return;
    }
    if (!pinterestLinks.includes(trimmed)) {
      setPinterestLinks((prev) => [trimmed, ...prev]);
    }
    setPinInput("");
    setShowPinInput(false);
  };

  const openPinterest = () => {
    const url = pinterestLinks[0];
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  // quick generator for demo
  const generateInspiration = () => {
    const sample = Array.from({ length: 6 }, (_, i) => ({
      id: `gen-${Date.now()}-${i}`,
      type: "image",
      src: seedImg,
    }));
    addToInspiration(sample);
  };

  const allPendingSelected = useMemo(
    () => pending.length > 0 && pending.every((p) => selectedIds.has(p.id)),
    [pending, selectedIds]
  );

  return (
    <div id="outfit-container">
      <MenuNavbar />

      {/* Page Header */}
      <div className="page-heading outfits-heading">
        <h1>Outfits</h1>

        {/* Center block: Song Title on top, then Theme : Concepts [textbox] */}
        <div className="heading-center">
          <Dropdown className="song-dropdown" text="Song Title" />
          <div className="concepts-row">
            <h2 className="concepts-label">Concepts:</h2>
            <div className="concepts-input">
              <Textbox />
            </div>
          </div>
        </div>

        <div className="page-heading-right">
          <Button
            className="help-button"
            icon="?"
            onClick={() => alert("Help coming soon")}
          />
          <Dropdown className="team-dropdown" text="TeamName" />
        </div>
      </div>

      {/* Color Palette Row
      <div className="palette-row">
        <Button text="Color Palette" onClick={() => alert("Open color palette")} />
        <Button className="add-btn" icon="+" onClick={() => alert("Add a new palette")} />
      </div> */}

      {/* Three Columns */}
      <div className="outfit-photos">
        {/* Pending */}
        <section className="pending background-div">
          <header className="panel-header">
            <div className="title-row">
              <h2>Pending Outfits ({pendingCount}/# ppl)</h2>
              <div className="pending-actions">
                <Button
                  text={allPendingSelected ? "Clear All" : "Select All"}
                  onClick={() =>
                    allPendingSelected ? clearSelection() : selectAll()
                  }
                />
              </div>
            </div>
          </header>

          <div className="panel-scroll">
            <div className="thumb-grid tall">
              {pending.map((item) => {
                const isSel = selectedIds.has(item.id);
                return (
                  <button
                    key={item.id}
                    className={`thumb ${isSel ? "selected" : ""}`}
                    onClick={() => toggleSelect(item.id)}
                    aria-pressed={isSel}
                  >
                    <img src={item.src} alt="" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="action-row">
            <Button text="Approve" onClick={approveSelected} />
            <Button text="Decline" onClick={declineSelected} />
            <Button text="Cancel" onClick={clearSelection} />
          </div>
        </section>

        {/* Inspiration */}
        <section className="inspiration background-div">
          <header className="panel-header">
            <h2>Inspiration</h2>
          </header>

          <div className="insp-controls">
            <Button text="Generate Inspiration" onClick={generateInspiration} />
            <MediaUploader
              onAdd={addToInspiration}
              uploadType="image"
              buttonClassName="pink-upload-btn"
            />
            {pinterestLinks.length === 0 ? (
              <Button
                text="Link Pinterest"
                onClick={() => setShowPinInput((s) => !s)}
              />
            ) : (
              <Button text="Open Pinterest" onClick={openPinterest} />
            )}
          </div>

          {showPinInput && (
            <div className="pinterest-input-row">
              <input
                className="pinterest-input"
                type="url"
                placeholder="Paste a Pinterest URL…"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
              />
              <div className="pinterest-actions">
                <Button text="Save" onClick={handleSavePinterest} />
                <Button
                  text="Cancel"
                  onClick={() => {
                    setPinInput("");
                    setShowPinInput(false);
                  }}
                />
              </div>
            </div>
          )}

          <div className="panel-scroll">
            <div className="thumb-grid tall">
              {inspiration.map((p) => {
                const key = p.id || p.src;
                return (
                  <div key={key} className="thumb">
                    <img src={p.thumb || p.src} alt={p.alt || ""} />
                    {inspEdit && (
                      <button
                        className="x-btn"
                        onClick={() => removeInspiration(p.id || p.src)}
                        aria-label="Remove inspiration"
                      >
                        ×
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="action-row">
            <Button
              text={inspEdit ? "Done" : "Edit"}
              onClick={() => setInspEdit((s) => !s)}
            />
          </div>
        </section>

        {/* Approved */}
        <section className="approved background-div">
          <header className="panel-header">
            <div className="title-row">
              <h2>Approved Outfits ({approvedCount}/# ppl)</h2>
              <Button
                text={approvedEdit ? "Done" : "Edit"}
                onClick={() => setApprovedEdit((s) => !s)}
              />
            </div>
          </header>

          <div className="panel-scroll">
            <div className="thumb-grid tall">
              {approved.map((item) => (
                <div key={item.id} className="thumb">
                  <img src={item.src} alt="" />
                  {approvedEdit && (
                    <button
                      className="x-btn"
                      onClick={() => removeApproved(item.id)}
                      aria-label="Remove approved outfit"
                    >
                      ×
                    </button>
                  )}
                    <MediaUploader
                    onAdd={addToInspiration}
                    uploadType="image"
                    buttonClassName="btn"  
                    buttonText="Upload Images" 
                    // id = "inspo-upload-button"
                    />

                    <Button text="Link Pinterest" />
                    
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="page-bottom-spacer" />
    </div>
  );
};

export default Outfits;
