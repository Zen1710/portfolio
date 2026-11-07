import type { Experience } from "#lib/content/types.ts";

// Newest first is not required; the site sorts by start date.
// Example entry:
// {
//   title: "Informatics student",
//   org: "Your university",
//   kind: "education",
//   start: "2022-08",
//   summary: "One sentence about what you learned or built there.",
//   draft: true,
// },
export const experience: Experience[] = [
  {
    title: "Web Developer Intern",
    org: "PT. Duta Idaman Property",
    kind: "internship",
    start: "2024-01",
    end: "2024-08",
    summary:
      "Built the company's Real Estate Management Information System and property e-catalog with Laravel and MySQL, with modules for housing data, service portfolios, and cooperative partnerships.",
    stack: ["laravel", "php", "mysql"],
    draft: true,
  },
  {
    title: "IT Helpdesk",
    org: "PT. Telkom Akses",
    kind: "work",
    start: "2026-01",
    end: "2026-07",
    summary:
      "Handled IT incidents through a ticketing system, from logging and prioritizing to tracking each one until resolved, with first-level troubleshooting and escalation to the right support teams.",
    draft: true,
  },
  {
    title: "Web Developer Intern",
    org: "KJA Ahmad Syahfuddin",
    kind: "internship",
    start: "2021-01",
    end: "2021-06",
    summary:
      "Built a client e-ticketing platform with Laravel that puts every service request and incident report in one place, with a structured workflow for prioritizing and tracking them.",
    stack: ["laravel", "php"],
    draft: true,
  },
  {
    title: "Bachelor of Computer Science, Informatics Engineering",
    org: "Universitas Bengkulu",
    kind: "education",
    start: "2018-08",
    end: "2025-08",
    summary: "Final project: detecting whitefly pests on cucurbit crops with YOLOv11.",
    stack: ["python", "ultralytics"],
    draft: true,
  },
  {
    title: "Front-End, Back-End, and Full-Stack Development",
    org: "Mimo",
    kind: "course",
    start: "2026-10",
    end: "2026-11",
    summary:
      "Three certificates covering HTML and CSS, JavaScript, single-page apps with React, backend APIs with Node.js and Express, and SQL databases.",
    stack: ["javascript", "react", "nodejs", "express"],
    draft: true,
  },
  {
    title: "Java & AI Development Bootcamp",
    org: "FGA UNAND with Oracle Academy",
    kind: "course",
    start: "2022-08",
    end: "2022-08",
    summary:
      "Training in AI and machine learning fundamentals implemented in Java, completed with Oracle Academy's course and final exam.",
    draft: true,
  },
];
