// app.js (vanilla JS)
// This is used by index.html. If you were trying to run the React app instead,
// your previous React code is saved as: react_app.js

// --- Optional: connect to Flask API (app.py) ---
// If you run: python app.py
// then set API_BASE to "http://127.0.0.1:5000" and the Tracking/Report pages
// will use real API calls.
// Auto-enable API if you open the site from Flask (http://127.0.0.1:5000).
// If you open index.html directly (file://), API is disabled (avoids CORS issues).
const API_BASE = window.location.protocol.startsWith("http") ? "" : null;

function $(id) {
  return document.getElementById(id);
}

function showAlert(message, type = "success") {
  const el = $("alert");
  if (!el) return;
  el.className = `alert show ${type}`;
  el.textContent = message;
  window.clearTimeout(showAlert._t);
  showAlert._t = window.setTimeout(() => {
    el.className = "alert";
    el.textContent = "";
  }, 3500);
}

function drawInitiativeChart() {
  const canvas = document.getElementById("initiativeChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Illustrative "diversion effort index" per initiative (0-100).
  const data = [
    { label: "Rwanda", value: 92 },
    { label: "Sweden", value: 80 },
    { label: "Germany", value: 76 },
    { label: "Japan", value: 74 },
    { label: "Korea", value: 82 },
    { label: "Singapore", value: 70 },
    { label: "India", value: 66 },
    { label: "SF", value: 78 },
  ];

  // Clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Layout
  const padding = 28;
  const w = canvas.width - padding * 2;
  const h = canvas.height - padding * 2;

  // Axes
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#CBD5E0";
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, padding + h);
  ctx.lineTo(padding + w, padding + h);
  ctx.stroke();

  const max = 100;
  const barGap = 10;
  const barW = (w - barGap * (data.length - 1)) / data.length;

  ctx.fillStyle = "#2B6CB0";

  // Bars + labels (use default canvas fillStyle, no custom palette)
  data.forEach((d, i) => {
    const barH = (d.value / max) * (h - 24);
    const x = padding + i * (barW + barGap);
    const y = padding + h - barH;

    ctx.fillRect(x, y, barW, barH);

    // Value
    ctx.fillStyle = "#1A202C";
    ctx.font = "12px system-ui, -apple-system, Segoe UI, Roboto, Arial";
    ctx.textAlign = "center";
    ctx.fillText(String(d.value), x + barW / 2, y - 6);

    // Label
    ctx.save();
    ctx.fillText(d.label, x + barW / 2, padding + h + 16);
    ctx.restore();

    // Reset fillStyle back to default (so bars are visible)
    ctx.fillStyle = "#2B6CB0";
  });

  // Title
  ctx.fillStyle = "#1A202C";
  ctx.font = "bold 14px system-ui, -apple-system, Segoe UI, Roboto, Arial";
  ctx.textAlign = "left";
  ctx.fillText("Initiatives diagram (illustrative)", padding, 18);
  // Set bar fill again
  ctx.fillStyle = "#2B6CB0";
}

function setActiveNav(pageId) {
  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.classList.toggle("active-link", a.dataset.page === pageId);
  });
}

function showPage(pageId) {
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  const target = document.getElementById(pageId);
  if (target) target.classList.add("active");
  setActiveNav(pageId);
}

function filterScheduleTable() {
  const input = $("searchArea");
  const table = $("schedTable");
  if (!input || !table) return;

  const q = input.value.trim().toUpperCase();
  const rows = table.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    const txt = row.innerText.toUpperCase();
    row.style.display = txt.includes(q) ? "" : "none";
  });
}

async function refreshIssuesFromApi() {
  if (!API_BASE) return;
  try {
    const res = await fetch(`${API_BASE}/api/issues`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const issues = await res.json();
    const tbody = $("trackingBody");
    if (!tbody) return;

    tbody.innerHTML = issues
      .map((i) => {
        const status = String(i.status || "Reported").toLowerCase();
        const cls = status.includes("resolve")
          ? "resolved"
          : status.includes("progress")
          ? "progress"
          : "reported";

        return `
          <tr>
            <td>${i.id}</td>
            <td>${i.type}</td>
            <td><span class="status ${cls}">${i.status}</span></td>
          </tr>
        `;
      })
      .join("");
  } catch (e) {
    showAlert(`API error: ${e.message}`, "error");
  }
}

async function submitReportToApi(payload) {
  const res = await fetch(`${API_BASE}/api/report`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function init() {
  // SPA navigation
  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.addEventListener("click", () => showPage(a.dataset.page));
  });

  // Schedule filter
  const searchArea = $("searchArea");
  if (searchArea) searchArea.addEventListener("keyup", filterScheduleTable);

  // Report form
  const reportForm = $("reportForm");
  if (reportForm) {
    reportForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const payload = {
        type: $("wType")?.value,
        location: $("wLoc")?.value,
        description: $("wDesc")?.value,
      };

      // If API_BASE is set, post to Flask; otherwise just show a local success message
      try {
        if (API_BASE) {
          const r = await submitReportToApi(payload);
          showAlert(`Report submitted! Ticket ID: #${r.id}`, "success");
          await refreshIssuesFromApi();
        } else {
          const ticket = Math.floor(Math.random() * 1000);
          showAlert(`Success! Thank you for reporting. Ticket ID: #${ticket}`, "success");
        }
        reportForm.reset();
      } catch (err) {
        showAlert(`Could not submit report: ${err.message}`, "error");
      }
    });
  }

  // Dashboard chart
  drawInitiativeChart();

  // Initial data load if API enabled
  refreshIssuesFromApi();
}

document.addEventListener("DOMContentLoaded", init);
