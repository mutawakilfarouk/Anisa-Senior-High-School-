# 🦅 Anisa Senior High School - School Management System (SMS / SIS)

> **Motto**: *Excellence • Leadership • Integrity*  
> **Head of School / Director**: Mr. Abdul Nasir Musah (`anisa2009@gmail.com`)  
> **Accreditation**: Western Association of Schools and Colleges (WASC) & Ministry of National Education

---

## 🌟 Overview

The **Anisa Senior High School Management System** is a unified senior secondary institutional platform designed to manage school operations, track student academics across the three core programmes (**Business**, **General Arts**, and **Home Economics**), manage faculty and course curricula, log daily attendance, enter gradebook scores, and provide role-based portals for Administrators, Faculty, Scholars, and Guardians.

---

## 🚀 Key Features & Modules

### 1. 🏛️ Administrator Command Center
- **Executive KPI Dashboard**: Live tracking of total student enrollment, active faculty across departments, daily attendance rates, and academy cumulative GPA.
- **Academic Analytics**: Interactive bar chart displaying student distribution across Grade 9 through Grade 12.
- **Campus Activity Feed**: Real-time event log for class certifications, grade postings, and announcements.
- **Quick SIS Actions**: 1-click modal to enroll new scholars with instant ID generation (`ADA-2026-XXX`), medical notes, and guardian contact registry.

### 2. 📋 Student Information System (SIS)
- **Search & Multi-Filters**: Instant search by student name, student ID, or email, with filters by Grade Level (9–12) and Academic Standing (Honors List, Active).
- **Student Profile Drawer**: Comprehensive profile view showing demographics, guardian info, emergency contacts, medical alerts, extracurricular honors, and course enrollments.
- **Data Export**: Export student records directly to a JSON backup.

### 3. 👩‍🏫 Faculty & Staff Directory
- **Department Categorization**: Natural & Physical Sciences, STEM & Computer Science, Advanced Mathematics, Humanities & Social Sciences, and Fine Arts.
- **Faculty Profiles**: Credentials, Stanford/MIT/Columbia alma maters, office locations, assigned courses, and office hours.
- **Add Faculty**: Streamlined onboarding modal to register new instructors.

### 4. 📚 Courses & Curriculum Management
- **Course Catalog**: Course codes (`PHYS-401`, `CS-301`, `MATH-502`, `ENG-201`, `ROB-101`), credit allocations, room numbers, class periods, and syllabus summaries.
- **Capacity Tracking**: Visual capacity bars showing current enrollments vs. maximum classroom limits.

### 5. ⏱️ Daily Attendance Tracker
- **Class & Date Selection**: Pick any course section and date to view or record attendance.
- **Fast Bulk Marking**: One-click **"Mark All Present"** and **"Mark All Absent"** buttons.
- **Individual Status Toggles**: `Present` (Emerald), `Late` (Amber), `Absent` (Red), and `Excused` (Blue) with custom teacher remarks.
- **Real-Time Persistence**: Saves directly to the database and local storage.

### 6. 📊 Faculty Gradebook & Assessments
- **Dynamic Assessment Matrix**: Live calculation of assignments across Exams, Projects, Quizzes, Lab Reports, and Problem Sets.
- **Automated GPA & Letter Grades**: Live updates of term percentages, grade badges (`A+`, `A`, `B+`, etc.), and GPA weights upon entering scores.
- **New Assessment Creator**: Add unit exams or assignments with custom maximum points.

### 7. 🎓 Student & Parent Self-Service Portal
- **Scholar Profile**: Displays student avatar, honors badges, cumulative GPA (e.g., 3.92), and academic advisor.
- **Daily Timetable**: Chronological class schedule with room locations and teacher links.
- **Live Course Grades**: Real-time progress bars, letter grades, and personalized faculty feedback.
- **Attendance Gauge**: Overall compliance rate (e.g., 98.2%).
- **Official Report Card & Academic Transcript**: Institutional document formatted with Academy Seal, Principal's signature line, course credit matrix, and 1-click **"Print / Save as PDF"** layout with `@media print` CSS.

### 8. 🌐 Institutional Public Homepage
- **Academy Mission & Pillars**: Advanced STEM & AI, Classical Humanities, Performing Arts, Championship Athletics.
- **Principal's Welcome Address**: Letter from Head of School Dr. Eleanor Vance.
- **Admissions Inquiry Form**: Interactive prospective student inquiry with automatic confirmation.
- **Campus Bulletin**: Categorized notices (Academic, Examinations, Athletics).

---

## 🛠️ How to Run & Access

### Option A: Launch with Local Web Server
Double-click `start.bat` or run:
```powershell
& "C:\Users\bmd\AppData\Roaming\Antigravity\bin\agy-node.cmd" server.js
```
Then open your web browser at:
👉 **`http://localhost:3000`**

### Option B: Direct Browser Open (Offline-Ready)
You can directly open `index.html` in Chrome, Edge, or Firefox. The application includes complete local storage persistence and works immediately without any dependencies!

---

## 📁 Directory Structure

```text
american-dara-academy/
├── index.html        # Main single-page web app with all views, modals & print layout
├── app.js            # State manager, role routing, CRUD handlers & Chart.js integration
├── styles.css        # School branding, custom typography, and print media rules
├── server.js         # Pure Node.js HTTP & REST API server with persistence
├── start.bat         # Windows batch launcher
├── README.md         # Documentation and user guide
└── data/             # Persistent JSON database storage
```
