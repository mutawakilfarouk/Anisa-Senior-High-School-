const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const os = require('os');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'school_database.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Automatic Tunnel & Network State
let activePublicUrl = 'https://anisa-senior-high-school-1.onrender.com';
let tunnelProcess = null;

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

const LOCAL_LAN_IP = getLocalIpAddress();

// Prevent any unhandled crash from stopping the server
process.on('uncaughtException', (err) => {
  console.error('[SERVER LOG] Notice:', err.message);
});
process.on('unhandledRejection', (reason) => {
  console.error('[SERVER LOG] Rejection:', reason);
});

// Self-Healing Background Worldwide Tunnel (for local laptop development only)
function startWorldwideTunnel() {
  // If running in Cloud (Render, Vercel, Railway, Heroku, or Linux container), skip SSH
  if (process.env.RENDER || process.env.PORT || process.env.NODE_ENV === 'production') {
    console.log(`[CLOUD] Anisa Senior High School is running 24/7 on Cloud Port ${PORT}!`);
    return;
  }

  try {
    if (tunnelProcess) {
      try { tunnelProcess.kill(); } catch (e) {}
    }

    console.log('[TUNNEL] Initializing automatic worldwide public tunnel for remote staff & teachers...');
    tunnelProcess = spawn('ssh', [
      '-o', 'ServerAliveInterval=15',
      '-o', 'ServerAliveCountMax=6',
      '-o', 'StrictHostKeyChecking=no',
      '-R', `80:localhost:${PORT}`,
      'nokey@localhost.run'
    ]);

    tunnelProcess.stdout.on('data', (data) => {
      const output = data.toString();
      const match = output.match(/https:\/\/[a-zA-Z0-9.-]+\.lhr\.life/);
      if (match) {
        activePublicUrl = match[0];
        console.log(`[TUNNEL] 🌐 LIVE WORLDWIDE PORTAL LINK: ${activePublicUrl}`);
      }
    });

    tunnelProcess.stderr.on('data', (data) => {
      const output = data.toString();
      const match = output.match(/https:\/\/[a-zA-Z0-9.-]+\.lhr\.life/);
      if (match) {
        activePublicUrl = match[0];
        console.log(`[TUNNEL] 🌐 LIVE WORLDWIDE PORTAL LINK: ${activePublicUrl}`);
      }
    });

    tunnelProcess.on('close', (code) => {
      if (!process.env.RENDER) {
        setTimeout(startWorldwideTunnel, 5000);
      }
    });

    tunnelProcess.on('error', (err) => {
      console.log('[TUNNEL] Local SSH tunnel skipped in cloud environment.');
    });
  } catch (err) {
    console.log('[TUNNEL] Local SSH tunnel skipped.');
  }
}

// Start tunnel if local
startWorldwideTunnel();

// The Three Main Academic Courses in Anisa Senior High School:
// 1. Business
// 2. General Arts
// 3. Home Economics
// Plus Core Subjects mandatory for all students (Mathematics, English Language, Social Studies, Integrated Science)
const STANDARD_HIGH_SCHOOL_COURSES = [
  // --- CORE MANDATORY SUBJECTS (ALL COURSES) ---
  { id: "CRS-CORE-MATH", name: "Mathematics (Core)", code: "MATH-C", category: "Core Subject", track: "All Courses", division: "Senior High School" },
  { id: "CRS-CORE-ENG", name: "English Language", code: "ENG-C", category: "Core Subject", track: "All Courses", division: "Senior High School" },
  { id: "CRS-CORE-SOC", name: "Social Studies", code: "SOC-C", category: "Core Subject", track: "All Courses", division: "Senior High School" },
  { id: "CRS-CORE-SCI", name: "Integrated Science", code: "SCI-C", category: "Core Subject", track: "All Courses", division: "Senior High School" },

  // --- 1. BUSINESS ELECTIVES ---
  { id: "CRS-BUS-ACC", name: "Financial Accounting", code: "ACC-101", category: "Elective", track: "Business", division: "Senior High School" },
  { id: "CRS-BUS-BM", name: "Business Management", code: "BM-101", category: "Elective", track: "Business", division: "Senior High School" },
  { id: "CRS-BUS-COST", name: "Cost Accounting", code: "COST-101", category: "Elective", track: "Business", division: "Senior High School" },
  { id: "CRS-BUS-ECON", name: "Economics", code: "ECON-101", category: "Elective", track: "Business", division: "Senior High School" },
  { id: "CRS-BUS-EMATH", name: "Elective Mathematics", code: "EMATH-101", category: "Elective", track: "Business", division: "Senior High School" },

  // --- 2. GENERAL ARTS ELECTIVES ---
  { id: "CRS-ART-LIT", name: "Literature in English", code: "LIT-101", category: "Elective", track: "General Arts", division: "Senior High School" },
  { id: "CRS-ART-GOV", name: "Government", code: "GOV-101", category: "Elective", track: "General Arts", division: "Senior High School" },
  { id: "CRS-ART-HIST", name: "History", code: "HIST-101", category: "Elective", track: "General Arts", division: "Senior High School" },
  { id: "CRS-ART-GEOG", name: "Geography", code: "GEOG-101", category: "Elective", track: "General Arts", division: "Senior High School" },
  { id: "CRS-ART-IRS", name: "Islamic Religious Studies (IRS)", code: "IRS-101", category: "Elective", track: "General Arts", division: "Senior High School" },
  { id: "CRS-ART-CRS", name: "Christian Religious Studies (CRS)", code: "CRS-101", category: "Elective", track: "General Arts", division: "Senior High School" },
  { id: "CRS-ART-FREN", name: "French Language", code: "FREN-101", category: "Elective", track: "General Arts", division: "Senior High School" },

  // --- 3. HOME ECONOMICS ELECTIVES ---
  { id: "CRS-HE-FN", name: "Food and Nutrition", code: "FN-101", category: "Elective", track: "Home Economics", division: "Senior High School" },
  { id: "CRS-HE-CT", name: "Clothing and Textiles", code: "CT-101", category: "Elective", track: "Home Economics", division: "Senior High School" },
  { id: "CRS-HE-ML", name: "Management in Living", code: "ML-101", category: "Elective", track: "Home Economics", division: "Senior High School" },
  { id: "CRS-HE-GKA", name: "General Knowledge in Art (GKA)", code: "GKA-101", category: "Elective", track: "Home Economics", division: "Senior High School" },
  { id: "CRS-HE-BIO", name: "Biology", code: "BIO-101", category: "Elective", track: "Home Economics", division: "Senior High School" }
];

// Clean Production Database: Zero Demo Data
const CLEAN_SCHOOL_DATA = {
  schoolInfo: {
    name: "Anisa Senior High School",
    motto: "Excellence • Leadership • Integrity",
    address: "Route des Almadies Campus, Dakar",
    phone: "+19174788477",
    email: "anisa2009@gmail.com",
    website: "anisa-senior-high-school-1.onrender.com",
    logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&auto=format&fit=crop&q=80",
    letterhead: {
      useImageLetterhead: false,
      letterheadImageUrl: "",
      headerTitle: "ANISA SENIOR HIGH SCHOOL",
      subHeader: "SENIOR HIGH SCHOOL • GRADES 10 - 12",
      accreditation: "Accredited by WASC & Ministry of National Education",
      address: "Route des Almadies Campus, Dakar",
      contact: "Tel/WhatsApp: +19174788477 | Email: anisa2009@gmail.com",
      watermarkEnabled: false,
      watermarkOpacity: 0,
      dashboardLogoOpacity: 0
    },
    gradingScale: [
      { min: 93, grade: "A", gpa: 4.0 },
      { min: 90, grade: "A-", gpa: 3.7 },
      { min: 87, grade: "B+", gpa: 3.3 },
      { min: 83, grade: "B", gpa: 3.0 },
      { min: 80, grade: "B-", gpa: 2.7 },
      { min: 77, grade: "C+", gpa: 2.3 },
      { min: 73, grade: "C", gpa: 2.0 },
      { min: 70, grade: "C-", gpa: 1.7 },
      { min: 65, grade: "D", gpa: 1.0 },
      { min: 0, grade: "F", gpa: 0.0 }
    ]
  },
  // Primary Director Account for Initial Setup
  staff: [
    {
      id: "DIR-001",
      name: "Mr. Abdul Nasir Musah",
      role: "DIRECTOR",
      division: "Senior High School (Grades 10-12)",
      title: "Head of School / Principal",
      email: "anisa2009@gmail.com",
      password: "admin",
      phone: "+19174788477",
      avatar: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&auto=format&fit=crop&q=80"
    }
  ],
  courses: STANDARD_HIGH_SCHOOL_COURSES,
  assignments: [],
  students: [],
  gradebook: [],
  attendance: []
};

function loadDatabase() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(CLEAN_SCHOOL_DATA, null, 2), 'utf-8');
      return CLEAN_SCHOOL_DATA;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const data = JSON.parse(raw);
    if (!data.courses || data.courses.length === 0) {
      data.courses = JSON.parse(JSON.stringify(STANDARD_HIGH_SCHOOL_COURSES));
      saveDatabase(data);
    }
    return data;
  } catch (err) {
    console.error('Error reading database:', err);
    return CLEAN_SCHOOL_DATA;
  }
}

function saveDatabase(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving database:', err);
    return false;
  }
}

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  if (pathname.startsWith('/api/')) {
    const db = loadDatabase();

    if (pathname === '/api/public-url' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        publicUrl: activePublicUrl,
        lanUrl: `http://${LOCAL_LAN_IP}:${PORT}`,
        localUrl: `http://localhost:${PORT}`,
        isOnline: Boolean(activePublicUrl)
      }));
      return;
    }

    if (pathname === '/api/data' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(db));
      return;
    }

    if (pathname === '/api/reset' && req.method === 'POST') {
      saveDatabase(CLEAN_SCHOOL_DATA);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: "Database reset to clean state." }));
      return;
    }

    // POST /api/school-info
    if (pathname === '/api/school-info' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const update = JSON.parse(body);
          db.schoolInfo = { ...db.schoolInfo, ...update };
          saveDatabase(db);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, schoolInfo: db.schoolInfo }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
        }
      });
      return;
    }

    // POST /api/assignments
    if (pathname === '/api/assignments' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const assignment = JSON.parse(body);
          if (!assignment.id) assignment.id = `ASN-${Date.now().toString().slice(-4)}`;
          if (!db.assignments) db.assignments = [];
          const idx = db.assignments.findIndex(a => a.id === assignment.id);
          if (idx >= 0) db.assignments[idx] = { ...db.assignments[idx], ...assignment };
          else db.assignments.unshift(assignment);
          saveDatabase(db);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, assignment }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
        }
      });
      return;
    }

    // POST /api/gradebook
    if (pathname === '/api/gradebook' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const gradeEntry = JSON.parse(body);
          if (!gradeEntry.id) gradeEntry.id = `GRD-${Date.now()}`;
          const index = db.gradebook.findIndex(g => g.id === gradeEntry.id || (g.studentId === gradeEntry.studentId && g.classId === gradeEntry.classId));
          if (index >= 0) db.gradebook[index] = { ...db.gradebook[index], ...gradeEntry };
          else db.gradebook.push(gradeEntry);
          saveDatabase(db);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, gradeEntry }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
        }
      });
      return;
    }

    // POST /api/students
    if (pathname === '/api/students' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const student = JSON.parse(body);
          if (!student.id) {
            student.id = `ASHS-${student.grade || 'HS'}${String(db.students.length + 1).padStart(2, '0')}`;
          }
          const index = db.students.findIndex(s => s.id === student.id);
          if (index >= 0) db.students[index] = { ...db.students[index], ...student };
          else db.students.unshift(student);
          saveDatabase(db);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, student }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
        }
      });
      return;
    }

    // POST /api/courses
    if (pathname === '/api/courses' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const course = JSON.parse(body);
          if (!course.id) course.id = `SUBJ-${Date.now().toString().slice(-4)}`;
          if (!db.courses) db.courses = [];
          db.courses.push(course);
          saveDatabase(db);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, course }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
        }
      });
      return;
    }

    // POST /api/staff
    if (pathname === '/api/staff' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const staffMember = JSON.parse(body);
          if (!staffMember.id) staffMember.id = `${staffMember.role || 'STF'}-${Date.now().toString().slice(-4)}`;
          if (!db.staff) db.staff = [];
          db.staff.unshift(staffMember);
          saveDatabase(db);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, staffMember }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
        }
      });
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'API endpoint not found' }));
    return;
  }

  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(__dirname, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Server Error: ${err.code}`);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(`🦅 Anisa Senior High School - Server Online on All Interfaces!`);
  console.log(`📍 Local PC Access: http://localhost:${PORT}`);
  console.log(`📶 Local Wi-Fi Access: http://${LOCAL_LAN_IP}:${PORT}`);
  console.log(`🌐 Worldwide Public Link: ${activePublicUrl}`);
  console.log(`======================================================\n`);
});
