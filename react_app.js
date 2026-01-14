import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import WasteReporting from "./pages/WasteReporting";
import Schedule from "./pages/Schedule";
import Education from "./pages/Education";
import IssueTracking from "./pages/IssueTracking";
import Contact from "./pages/Contact";

const linkClass = ({ isActive }) =>
  `hover:underline ${isActive ? "font-bold underline" : ""}`;

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-green-600 p-4 text-white flex items-center justify-between">
          <h1 className="font-bold text-xl">EcoSmart City</h1>

          <div className="space-x-4">
            <NavLink to="/" className={linkClass} end>
              Dashboard
            </NavLink>
            <NavLink to="/report" className={linkClass}>
              Report Issue
            </NavLink>
            <NavLink to="/schedule" className={linkClass}>
              Schedule
            </NavLink>
            <NavLink to="/education" className={linkClass}>
              Education
            </NavLink>
            <NavLink to="/tracking" className={linkClass}>
              Tracking
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </div>
        </nav>

        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/report" element={<WasteReporting />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/education" element={<Education />} />
            <Route path="/tracking" element={<IssueTracking />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

import React from "react";

export default function Dashboard() {
  const stats = [
    { label: "Issues Reported", count: 124, color: "bg-blue-500" },
    { label: "Issues Resolved", count: 89, color: "bg-green-500" },
    { label: "Active Initiatives", count: 5, color: "bg-yellow-500" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">City Cleanliness Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.color} p-6 rounded-lg text-white shadow-lg`}
          >
            <p className="text-lg uppercase opacity-80">{stat.label}</p>
            <p className="text-4xl font-bold">{stat.count}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-white rounded shadow">
        <h3 className="font-bold mb-2">Special Collection Drives</h3>
        <p className="text-gray-600">• Hazardous Waste: Next Saturday, City Center</p>
      </div>
    </div>
  );
}

import React, { useState } from "react";

export default function WasteReporting() {
  const [formData, setFormData] = useState({
    type: "",
    location: "",
    description: "",
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ticket = Math.floor(Math.random() * 1000);
    alert(
      `Report submitted successfully!\nTicket ID: #${ticket}\n\nType: ${formData.type}\nLocation: ${formData.location}`
    );

    setFormData({ type: "", location: "", description: "" });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Report a Waste Issue</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Waste Type</label>
          <select
            required
            className="w-full border p-2 rounded"
            value={formData.type}
            onChange={handleChange("type")}
          >
            <option value="">Select Type</option>
            <option value="overflow">Garbage Overflow</option>
            <option value="plastic">Plastic Waste</option>
            <option value="toxic">Hazardous Waste</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Location</label>
          <input
            required
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Enter address"
            value={formData.location}
            onChange={handleChange("location")}
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            required
            className="w-full border p-2 rounded"
            rows={4}
            value={formData.description}
            onChange={handleChange("description")}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}

import React from "react";

export default function Education() {
  const guides = [
    {
      title: "Recyclable Waste",
      content: "Paper, Cardboard, Glass bottles, Metals.",
      color: "border-blue-500",
    },
    {
      title: "Non-Recyclable",
      content: "Food waste, soiled paper, ceramics, light bulbs.",
      color: "border-red-500",
    },
    {
      title: "Segregation Tips",
      content: "Always rinse containers and flatten cardboard boxes.",
      color: "border-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {guides.map((guide) => (
        <div key={guide.title} className={`border-l-4 ${guide.color} bg-white p-6 shadow-sm`}>
          <h3 className="font-bold text-lg mb-2">{guide.title}</h3>
          <p className="text-gray-600">{guide.content}</p>
        </div>
      ))}
    </div>
  );
}

import React, { useMemo, useState } from "react";

const SCHEDULE_DATA = [
  { id: 1, area: "Downtown", type: "General Waste", date: "2023-10-25", time: "08:00 AM" },
  { id: 2, area: "North District", type: "Recyclables", date: "2023-10-26", time: "09:30 AM" },
  { id: 3, area: "South Park", type: "Hazardous", date: "2023-10-27", time: "07:00 AM" },
  { id: 4, area: "Downtown", type: "Recyclables", date: "2023-10-28", time: "08:00 AM" },
];

export default function Schedule() {
  const [filter, setFilter] = useState("");

  const filteredSchedule = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return SCHEDULE_DATA;
    return SCHEDULE_DATA.filter((item) => item.area.toLowerCase().includes(q));
  }, [filter]);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Waste Collection Schedule</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Filter by area (e.g. Downtown)..."
          className="w-full border p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3">Area</th>
              <th className="p-3">Type</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchedule.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{item.area}</td>
                <td className="p-3">{item.type}</td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.time}</td>
              </tr>
            ))}
            {filteredSchedule.length === 0 && (
              <tr>
                <td className="p-3 text-gray-500" colSpan={4}>
                  No results for “{filter}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React, { useState } from "react";

const INITIAL_ISSUES = [
  { id: "TKT-001", type: "Overflow", status: "Resolved", date: "2023-10-20" },
  { id: "TKT-002", type: "Plastic", status: "In Progress", date: "2023-10-22" },
  { id: "TKT-003", type: "Toxic", status: "Reported", date: "2023-10-24" },
];

export default function IssueTracking() {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredIssues =
    statusFilter === "All"
      ? INITIAL_ISSUES
      : INITIAL_ISSUES.filter((issue) => issue.status === statusFilter);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Track Reported Issues</h2>

      <div className="flex flex-wrap gap-3 mb-6">
        {["All", "Reported", "In Progress", "Resolved"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-full border ${
              statusFilter === status ? "bg-green-600 text-white" : "bg-gray-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            className="flex justify-between items-center p-4 border rounded hover:shadow-md transition"
          >
            <div>
              <p className="font-bold text-green-700">{issue.id}</p>
              <p className="text-sm text-gray-500">
                {issue.type} • {issue.date}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded text-sm font-semibold ${
                issue.status === "Resolved"
                  ? "bg-green-100 text-green-800"
                  : issue.status === "In Progress"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {issue.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from "react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSend = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (message.trim().length < 10) {
      setError("Message must be at least 10 characters long.");
      return;
    }

    setError("");
    alert("Message sent to Municipal Services!");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-2">Contact Municipal Services</h2>
      <p className="text-gray-600 mb-6">Have questions or need support? Send us a message.</p>

      <form onSubmit={handleSend} className="space-y-4">
        {error && <p className="text-red-500 bg-red-50 p-2 rounded">{error}</p>}

        <div>
          <label className="block font-medium mb-1">Email Address *</label>
          <input
            type="email"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Message *</label>
          <textarea
            className="w-full border p-2 rounded h-32"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-2 rounded font-bold hover:bg-green-800"
        >
          Send Message
        </button>
      </form>

      <div className="mt-10 pt-6 border-t grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <p className="font-bold">Hotline:</p>
          <p>1-800-ECO-CITY</p>
        </div>
        <div>
          <p className="font-bold">Office Hours:</p>
          <p>Mon - Fri: 9:00 - 18:00</p>
        </div>
      </div>
    </div>
  );
}

const KEY = "eco_issues_v1";

const seed = [
  { id: "TKT-001", type: "overflow", location: "Downtown", description: "Bin overflowing", status: "Resolved", date: "2023-10-20" },
  { id: "TKT-002", type: "plastic", location: "North District", description: "Plastic dumped near park", status: "In Progress", date: "2023-10-22" },
  { id: "TKT-003", type: "toxic", location: "South Park", description: "Suspicious chemical smell", status: "Reported", date: "2023-10-24" },
];

export function loadIssues() {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(seed));
    return seed;
  }
  try {
    return JSON.parse(raw) || [];
  } catch {
    return [];
  }
}

export function saveIssues(issues) {
  localStorage.setItem(KEY, JSON.stringify(issues));
}

export function createIssue({ type, location, description }) {
  const issues = loadIssues();
  const n = issues.length + 1;
  const id = `TKT-${String(n).padStart(3, "0")}`;
  const date = new Date().toISOString().slice(0, 10);

  const issue = {
    id,
    type,
    location,
    description,
    status: "Reported",
    date,
  };

  const next = [issue, ...issues];
  saveIssues(next);
  return issue;
}

export function updateIssueStatus(id, status) {
  const issues = loadIssues();
  const next = issues.map((i) => (i.id === id ? { ...i, status } : i));
  saveIssues(next);
  return next;
}

import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import WasteReporting from "./pages/WasteReporting";
import Schedule from "./pages/Schedule";
import Education from "./pages/Education";
import IssueTracking from "./pages/IssueTracking";
import Contact from "./pages/Contact";

const NavItem = ({ to, children, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `px-3 py-2 rounded-lg transition font-medium
       ${isActive ? "bg-white/20 text-white" : "text-white/90 hover:bg-white/10 hover:text-white"}`
    }
  >
    {children}
  </NavLink>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
        <header className="sticky top-0 z-10 backdrop-blur bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/15 grid place-items-center font-black">
                E
              </div>
              <div>
                <h1 className="font-extrabold text-xl leading-5">EcoSmart City</h1>
                <p className="text-white/80 text-sm">Smart Waste Management & Awareness</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-2">
              <NavItem to="/" end>Dashboard</NavItem>
              <NavItem to="/report">Report</NavItem>
              <NavItem to="/schedule">Schedule</NavItem>
              <NavItem to="/education">Education</NavItem>
              <NavItem to="/tracking">Tracking</NavItem>
              <NavItem to="/contact">Contact</NavItem>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/report" element={<WasteReporting />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/education" element={<Education />} />
            <Route path="/tracking" element={<IssueTracking />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="border-t bg-white/70">
          <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-600 flex flex-col md:flex-row gap-2 justify-between">
            <p>© {new Date().getFullYear()} EcoSmart City • Keep your city clean.</p>
            <p className="text-slate-500">Tip: report issues and track status updates.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

import React, { useMemo } from "react";
import { loadIssues } from "../lib/issuesStore";

const Card = ({ title, value, gradient }) => (
  <div className={`rounded-2xl p-6 text-white shadow-lg ${gradient}`}>
    <p className="text-white/80 text-sm uppercase tracking-wide">{title}</p>
    <p className="text-4xl font-extrabold mt-2">{value}</p>
  </div>
);

export default function Dashboard() {
  const issues = useMemo(() => loadIssues(), []);

  const total = issues.length;
  const resolved = issues.filter((i) => i.status === "Resolved").length;
  const inProgress = issues.filter((i) => i.status === "In Progress").length;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">City Cleanliness Overview</h2>
          <p className="text-slate-600 mt-1">Track reports, monitor progress, and learn recycling best practices.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Issues Reported" value={total} gradient="bg-gradient-to-br from-blue-600 to-indigo-600" />
        <Card title="In Progress" value={inProgress} gradient="bg-gradient-to-br from-amber-500 to-orange-500" />
        <Card title="Issues Resolved" value={resolved} gradient="bg-gradient-to-br from-emerald-600 to-green-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
          <h3 className="font-bold text-lg text-slate-900">Latest Reports</h3>
          <p className="text-slate-600 text-sm mb-4">Most recent 5 tickets:</p>

          <div className="space-y-3">
            {issues.slice(0, 5).map((i) => (
              <div key={i.id} className="flex items-center justify-between border rounded-xl p-4 hover:shadow-sm transition">
                <div>
                  <p className="font-bold text-emerald-700">{i.id}</p>
                  <p className="text-sm text-slate-600">{i.type} • {i.location} • {i.date}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  i.status === "Resolved" ? "bg-emerald-100 text-emerald-800" :
                  i.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {i.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-bold text-lg text-slate-900">Special Collection Drives</h3>
          <div className="mt-4 space-y-3">
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border">
              <p className="font-semibold">Hazardous Waste</p>
              <p className="text-sm text-slate-600">Next Saturday • City Center</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 border">
              <p className="font-semibold">E-Waste Drop-off</p>
              <p className="text-sm text-slate-600">This Sunday • North District Hall</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


import React, { useState } from "react";
import { createIssue } from "../lib/issuesStore";

export default function WasteReporting() {
  const [formData, setFormData] = useState({ type: "", location: "", description: "" });
  const [success, setSuccess] = useState("");

  const setField = (k) => (e) => setFormData((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const issue = createIssue(formData);
    setSuccess(`✅ Report submitted! Your Ticket ID is ${issue.id}`);
    setFormData({ type: "", location: "", description: "" });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl font-extrabold text-slate-900">Report a Waste Issue</h2>
        <p className="text-slate-600 mt-1">All fields are mandatory. Your report will be tracked by status.</p>

        {success && (
          <div className="mt-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <div>
            <label className="block font-medium mb-1">Waste Type *</label>
            <select
              required
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-emerald-300"
              value={formData.type}
              onChange={setField("type")}
            >
              <option value="">Select Type</option>
              <option value="overflow">Garbage Overflow</option>
              <option value="plastic">Plastic Waste</option>
              <option value="toxic">Hazardous Waste</option>
              <option value="mixed">Mixed Waste</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Location *</label>
            <input
              required
              type="text"
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-emerald-300"
              placeholder="Enter area / address (e.g., Downtown, Street 12)"
              value={formData.location}
              onChange={setField("location")}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description *</label>
            <textarea
              required
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-emerald-300"
              rows={5}
              placeholder="Explain what happened (overflowing bin, illegal dumping, etc.)"
              value={formData.description}
              onChange={setField("description")}
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-xl font-bold hover:opacity-95 active:scale-[0.99] transition"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import { loadIssues, updateIssueStatus } from "../lib/issuesStore";

const typeLabel = (t) =>
  t === "overflow" ? "Overflow" :
  t === "plastic" ? "Plastic" :
  t === "toxic" ? "Hazardous" :
  t === "mixed" ? "Mixed" : t;

export default function IssueTracking() {
  const [issues, setIssues] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    setIssues(loadIssues());
  }, []);

  const filtered = useMemo(() => {
    return issues.filter((i) => {
      const okStatus = statusFilter === "All" ? true : i.status === statusFilter;
      const okType = typeFilter === "All" ? true : i.type === typeFilter;
      return okStatus && okType;
    });
  }, [issues, statusFilter, typeFilter]);

  const setStatus = (id, status) => {
    const next = updateIssueStatus(id, status);
    setIssues(next);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Issue Tracking & Status</h2>
          <p className="text-slate-600">Filter tickets and view status updates (Reported / In Progress / Resolved).</p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <select
            className="border p-2 rounded-xl"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="overflow">Overflow</option>
            <option value="plastic">Plastic</option>
            <option value="toxic">Hazardous</option>
            <option value="mixed">Mixed</option>
          </select>

          <select
            className="border p-2 rounded-xl"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Reported">Reported</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {filtered.map((issue) => (
          <div key={issue.id} className="border rounded-2xl p-5 hover:shadow-sm transition">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="font-extrabold text-emerald-700">{issue.id}</p>
                <p className="text-sm text-slate-600">
                  <span className="font-semibold">{typeLabel(issue.type)}</span> • {issue.location} • {issue.date}
                </p>
                <p className="text-slate-700 mt-2">{issue.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  issue.status === "Resolved" ? "bg-emerald-100 text-emerald-800" :
                  issue.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {issue.status}
                </span>

                <select
                  className="border p-2 rounded-xl"
                  value={issue.status}
                  onChange={(e) => setStatus(issue.id, e.target.value)}
                >
                  <option value="Reported">Reported</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="p-6 rounded-2xl bg-slate-50 text-slate-600 border">
            No issues match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
