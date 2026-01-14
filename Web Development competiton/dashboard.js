// Get issues from localStorage or create empty array
const issues = JSON.parse(localStorage.getItem("issues")) || [];

// Count total issues
const totalIssues = issues.length;

// Count resolved issues
const resolvedIssues = issues.filter(issue => issue.status === "Resolved").length;

// Display values
document.getElementById("totalIssues").textContent = totalIssues;
document.getElementById("resolvedIssues").textContent = resolvedIssues;
