/* ===================================
   CODEWITHFANI - CORE APPLICATION
   =================================== */

// Initialize app on load
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadTheme();
    initializeProjects();
    initializeFeatures();
});

// ===================================
// THEME SYSTEM
// ===================================

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
}

function loadTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.querySelector('.theme-icon');
    const isDark = document.body.classList.contains('dark-theme');
    icon.textContent = isDark ? '☀️' : '🌙';
}

// ===================================
// NAVIGATION SYSTEM
// ===================================

function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // Show selected page
    const selectedPage = document.getElementById(page);
    if (selectedPage) {
        selectedPage.classList.add('active');
        window.scrollTo(0, 0);
    }
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.querySelector(`[onclick="navigateTo('${page}')"]`)?.classList.add('active');
}

// ===================================
// LOCAL STORAGE DATA MANAGEMENT
// ===================================

class LocalStorage {
    static getProjects() {
        return JSON.parse(localStorage.getItem('projects')) || [];
    }

    static saveProjects(projects) {
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    static getUserData() {
        return JSON.parse(localStorage.getItem('userData')) || {
            name: 'Guest User',
            completedProjects: [],
            startDate: new Date().toISOString(),
            toolsUsed: []
        };
    }

    static saveUserData(data) {
        localStorage.setItem('userData', JSON.stringify(data));
    }

    static getTools() {
        return JSON.parse(localStorage.getItem('tools')) || [];
    }

    static saveTools(tools) {
        localStorage.setItem('tools', JSON.stringify(tools));
    }
}

// ===================================
// APP INITIALIZATION
// ===================================

function initializeApp() {
    console.log('CodeWithFani initialized');
    loadUserProfile();
}

// ===================================
// USER PROFILE SYSTEM
// ===================================

function setUserProfile() {
    const name = prompt('Enter your name:');
    if (name && name.trim()) {
        const userData = LocalStorage.getUserData();
        userData.name = name.trim();
        LocalStorage.saveUserData(userData);
        loadUserProfile();
        alert('Profile updated!');
    }
}

function loadUserProfile() {
    const userData = LocalStorage.getUserData();
    document.getElementById('profile-name').textContent = userData.name;
    document.getElementById('completed-projects').textContent = userData.completedProjects.length;
    document.getElementById('tools-used').textContent = userData.toolsUsed.length;
    document.getElementById('learning-streak').textContent = calculateStreak(userData.startDate) + ' days';
}

function calculateStreak(startDate) {
    const start = new Date(startDate);
    const today = new Date();
    const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
}

function clearUserData() {
    if (confirm('Are you sure? This will clear all your progress.')) {
        localStorage.clear();
        loadUserProfile();
        alert('Progress cleared!');
    }
}

// ===================================
// PROJECT MANAGEMENT
// ===================================

function initializeProjects() {
    const projects = LocalStorage.getProjects();
    
    if (projects.length === 0) {
        // Generate all 80 projects on first load
        generateAllProjects();
    } else {
        displayFeaturedProjects();
    }
}

function generateAllProjects() {
    const projects = [
        // Frontend Projects (1-50)
        { id: 1, title: 'Calculator App', category: 'Tools', difficulty: 'Beginner', description: 'Build a fully functional calculator', icon: '🧮' },
        { id: 2, title: 'Todo App', category: 'Productivity', difficulty: 'Beginner', description: 'Task management application', icon: '✅' },
        { id: 3, title: 'Weather App', category: 'API', difficulty: 'Intermediate', description: 'Real-time weather information', icon: '🌤️' },
        { id: 4, title: 'Portfolio Website', category: 'Website', difficulty: 'Intermediate', description: 'Personal portfolio site', icon: '🎨' },
        { id: 5, title: 'Landing Page', category: 'Website', difficulty: 'Beginner', description: 'Modern landing page', icon: '🚀' },
        { id: 6, title: 'Quiz App', category: 'Educational', difficulty: 'Intermediate', description: 'Interactive quiz application', icon: '📝' },
        { id: 7, title: 'Notes App', category: 'Productivity', difficulty: 'Beginner', description: 'Note-taking application', icon: '📓' },
        { id: 8, title: 'Stopwatch App', category: 'Utility', difficulty: 'Beginner', description: 'Timer and stopwatch', icon: '⏱️' },
        { id: 9, title: 'Digital Clock', category: 'Display', difficulty: 'Beginner', description: 'Real-time digital clock', icon: '🕐' },
        { id: 10, title: 'Expense Tracker', category: 'Finance', difficulty: 'Intermediate', description: 'Personal expense tracking', icon: '💰' },
        { id: 11, title: 'BMI Calculator', category: 'Health', difficulty: 'Beginner', description: 'Body Mass Index calculator', icon: '⚖️' },
        { id: 12, title: 'Age Calculator', category: 'Utility', difficulty: 'Beginner', description: 'Calculate age from birthdate', icon: '🎂' },
        { id: 13, title: 'Counter App', category: 'Utility', difficulty: 'Beginner', description: 'Simple counter application', icon: '1️⃣' },
        { id: 14, title: 'Color Picker', category: 'Tools', difficulty: 'Beginner', description: 'Color selection tool', icon: '🎨' },
        { id: 15, title: 'Random Quote Generator', category: 'Educational', difficulty: 'Beginner', description: 'Generate random quotes', icon: '💭' },
        { id: 16, title: 'Password Generator', category: 'Security', difficulty: 'Intermediate', description: 'Secure password generator', icon: '🔐' },
        { id: 17, title: 'QR Code Generator', category: 'Tools', difficulty: 'Intermediate', description: 'Generate QR codes', icon: '📱' },
        { id: 18, title: 'Currency Converter', category: 'Finance', difficulty: 'Intermediate', description: 'Currency conversion tool', icon: '💵' },
        { id: 19, title: 'Form Validator', category: 'Tools', difficulty: 'Intermediate', description: 'Form validation system', icon: '✔️' },
        { id: 20, title: 'Typing Speed Test', category: 'Games', difficulty: 'Intermediate', description: 'Test typing speed and accuracy', icon: '⌨️' },
        { id: 21, title: 'Music Player', category: 'Media', difficulty: 'Intermediate', description: 'Audio player with controls', icon: '🎵' },
        { id: 22, title: 'Movie Search App', category: 'API', difficulty: 'Intermediate', description: 'Search movies database', icon: '🎬' },
        { id: 23, title: 'Recipe Finder', category: 'Food', difficulty: 'Intermediate', description: 'Search and filter recipes', icon: '🍳' },
        { id: 24, title: 'Meme Generator', category: 'Entertainment', difficulty: 'Advanced', description: 'Create custom memes', icon: '😂' },
        { id: 25, title: 'Chat Application UI', category: 'UI', difficulty: 'Intermediate', description: 'Chat interface design', icon: '💬' },
        { id: 26, title: 'Admin Dashboard', category: 'Dashboard', difficulty: 'Advanced', description: 'Admin control panel', icon: '📊' },
        { id: 27, title: 'Banking Dashboard', category: 'Finance', difficulty: 'Advanced', description: 'Banking interface', icon: '🏦' },
        { id: 28, title: 'Travel Booking UI', category: 'UI', difficulty: 'Advanced', description: 'Travel booking interface', icon: '✈️' },
        { id: 29, title: 'Food Delivery UI', category: 'UI', difficulty: 'Advanced', description: 'Food delivery app UI', icon: '🍕' },
        { id: 30, title: 'E-commerce Website', category: 'Website', difficulty: 'Advanced', description: 'Complete e-commerce site', icon: '🛒' },
        { id: 31, title: 'Education Platform UI', category: 'UI', difficulty: 'Advanced', description: 'Online learning platform', icon: '🎓' },
        { id: 32, title: 'AI Dashboard UI', category: 'Dashboard', difficulty: 'Advanced', description: 'AI analytics dashboard', icon: '🤖' },
        { id: 33, title: 'Crypto Dashboard', category: 'Finance', difficulty: 'Advanced', description: 'Cryptocurrency tracker', icon: '₿' },
        { id: 34, title: 'Fitness Tracker', category: 'Health', difficulty: 'Advanced', description: 'Fitness tracking app', icon: '💪' },
        { id: 35, title: 'Job Portal UI', category: 'UI', difficulty: 'Advanced', description: 'Job listing portal', icon: '💼' },
        { id: 36, title: 'Social Media Dashboard', category: 'Dashboard', difficulty: 'Advanced', description: 'Social media analytics', icon: '📱' },
        { id: 37, title: 'Event Booking UI', category: 'UI', difficulty: 'Advanced', description: 'Event booking interface', icon: '🎟️' },
        { id: 38, title: 'Kanban Task Manager', category: 'Productivity', difficulty: 'Advanced', description: 'Kanban board application', icon: '📋' },
        { id: 39, title: 'Blog Platform UI', category: 'UI', difficulty: 'Advanced', description: 'Blogging platform', icon: '📰' },
        { id: 40, title: 'Video Streaming UI', category: 'Media', difficulty: 'Advanced', description: 'Video streaming interface', icon: '📹' },
        { id: 41, title: 'Netflix Clone', category: 'Clone', difficulty: 'Advanced', description: 'Netflix UI clone', icon: '🎬' },
        { id: 42, title: 'Spotify Clone', category: 'Clone', difficulty: 'Advanced', description: 'Spotify UI clone', icon: '🎵' },
        { id: 43, title: 'YouTube Clone', category: 'Clone', difficulty: 'Advanced', description: 'YouTube UI clone', icon: '📺' },
        { id: 44, title: 'Instagram Clone', category: 'Clone', difficulty: 'Advanced', description: 'Instagram UI clone', icon: '📸' },
        { id: 45, title: 'Amazon Clone', category: 'Clone', difficulty: 'Advanced', description: 'Amazon UI clone', icon: '🛍️' },
        { id: 46, title: 'WhatsApp Clone', category: 'Clone', difficulty: 'Advanced', description: 'WhatsApp UI clone', icon: '💬' },
        { id: 47, title: 'Discord Clone', category: 'Clone', difficulty: 'Advanced', description: 'Discord UI clone', icon: '🎮' },
        { id: 48, title: 'Airbnb Clone', category: 'Clone', difficulty: 'Advanced', description: 'Airbnb UI clone', icon: '🏨' },
        { id: 49, title: 'LinkedIn Clone', category: 'Clone', difficulty: 'Advanced', description: 'LinkedIn UI clone', icon: '💼' },
        { id: 50, title: 'AI Resume Builder', category: 'Tools', difficulty: 'Advanced', description: 'Build resumes with AI', icon: '📄' },
        
        // Advanced Projects (51-80)
        { id: 51, title: 'AI Study Assistant', category: 'Educational', difficulty: 'Advanced', description: 'AI-powered study tool', icon: '🤓' },
        { id: 52, title: 'Resume Builder', category: 'Tools', difficulty: 'Advanced', description: 'Professional resume builder', icon: '📋' },
        { id: 53, title: 'Portfolio Generator', category: 'Tools', difficulty: 'Advanced', description: 'Auto-generate portfolios', icon: '🎨' },
        { id: 54, title: 'Online Coding Practice', category: 'Educational', difficulty: 'Advanced', description: 'Code challenges platform', icon: '💻' },
        { id: 55, title: 'Student Dashboard', category: 'Dashboard', difficulty: 'Advanced', description: 'Student management system', icon: '📚' },
        { id: 56, title: 'Learning Management', category: 'Dashboard', difficulty: 'Advanced', description: 'LMS interface', icon: '🎓' },
        { id: 57, title: 'Digital Library System', category: 'Educational', difficulty: 'Advanced', description: 'Library management system', icon: '📚' },
        { id: 58, title: 'Scholarship Finder', category: 'Educational', difficulty: 'Advanced', description: 'Find scholarships', icon: '🏆' },
        { id: 59, title: 'Career Guidance Portal', category: 'Educational', difficulty: 'Advanced', description: 'Career counseling platform', icon: '🚀' },
        { id: 60, title: 'Internship Tracker', category: 'Educational', difficulty: 'Advanced', description: 'Track internship applications', icon: '📝' },
        { id: 61, title: 'Advanced Admin Dashboard', category: 'Dashboard', difficulty: 'Advanced', description: 'Full-featured admin panel', icon: '⚙️' },
        { id: 62, title: 'SaaS Analytics Dashboard', category: 'Dashboard', difficulty: 'Advanced', description: 'Analytics for SaaS apps', icon: '📈' },
        { id: 63, title: 'CRM Dashboard UI', category: 'Dashboard', difficulty: 'Advanced', description: 'Customer relationship management', icon: '👥' },
        { id: 64, title: 'Project Management Board', category: 'Productivity', difficulty: 'Advanced', description: 'Project tracking board', icon: '📊' },
        { id: 65, title: 'Hospital Management', category: 'Dashboard', difficulty: 'Advanced', description: 'Healthcare management system', icon: '🏥' },
        { id: 66, title: 'Hotel Booking UI', category: 'UI', difficulty: 'Advanced', description: 'Hotel booking interface', icon: '🏨' },
        { id: 67, title: 'Food Delivery Platform', category: 'UI', difficulty: 'Advanced', description: 'Complete delivery platform', icon: '🍔' },
        { id: 68, title: 'Recruitment Portal', category: 'UI', difficulty: 'Advanced', description: 'Job recruitment system', icon: '👔' },
        { id: 69, title: 'Enterprise Analytics', category: 'Dashboard', difficulty: 'Advanced', description: 'Enterprise analytics dashboard', icon: '📊' },
        { id: 70, title: 'Customer Support Dashboard', category: 'Dashboard', difficulty: 'Advanced', description: 'Support ticket system', icon: '🎧' },
        { id: 71, title: 'AI Learning Platform UI', category: 'Educational', difficulty: 'Advanced', description: 'AI-powered learning', icon: '🤖' },
        { id: 72, title: 'Course Marketplace', category: 'Educational', difficulty: 'Advanced', description: 'Online course marketplace', icon: '📚' },
        { id: 73, title: 'Virtual Classroom UI', category: 'Educational', difficulty: 'Advanced', description: 'Virtual classroom interface', icon: '🎥' },
        { id: 74, title: 'AI Resume Analyzer', category: 'Tools', difficulty: 'Advanced', description: 'AI analyzes resumes', icon: '🔍' },
        { id: 75, title: 'AI Mock Interview', category: 'Educational', difficulty: 'Advanced', description: 'AI interview practice', icon: '🎤' },
        { id: 76, title: 'Subscription Billing', category: 'Finance', difficulty: 'Advanced', description: 'Billing management system', icon: '💳' },
        { id: 77, title: 'Startup Collaboration', category: 'Tools', difficulty: 'Advanced', description: 'Team collaboration platform', icon: '🤝' },
        { id: 78, title: 'Investor Portal Dashboard', category: 'Finance', difficulty: 'Advanced', description: 'Investment dashboard', icon: '💼' },
        { id: 79, title: 'Business Analytics', category: 'Dashboard', difficulty: 'Advanced', description: 'Business intelligence dashboard', icon: '📊' },
        { id: 80, title: 'CodeWithFani Academy', category: 'Educational', difficulty: 'Advanced', description: 'Complete learning academy', icon: '🎓' }
    ];

    // Add source code for each project
    projects.forEach(project => {
        project.html = getProjectHTML(project.id);
        project.css = getProjectCSS(project.id);
        project.js = getProjectJS(project.id);
        project.status = 'active';
    });

    LocalStorage.saveProjects(projects);
    displayFeaturedProjects();
}

function displayFeaturedProjects() {
    const projects = LocalStorage.getProjects();
    const featured = projects.slice(0, 6);
    const container = document.getElementById('featured-projects');
    
    if (!container) return;
    
    container.innerHTML = featured.map(project => `
        <div class="project-card" onclick="viewProjectDetail(${project.id})">
            <div class="project-thumbnail">${project.icon}</div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-meta">
                    <span class="project-difficulty difficulty-${project.difficulty.toLowerCase()}">${project.difficulty}</span>
                    <span>View →</span>
                </div>
            </div>
        </div>
    `).join('');
}

function filterProjects() {
    const search = document.getElementById('projects-search').value.toLowerCase();
    const difficulty = document.getElementById('projects-filter').value;
    const projects = LocalStorage.getProjects();
    
    let filtered = projects.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(search) || p.description.toLowerCase().includes(search);
        const matchesDifficulty = !difficulty || p.difficulty.toLowerCase() === difficulty;
        return matchesSearch && matchesDifficulty;
    });
    
    const container = document.getElementById('projects-list');
    container.innerHTML = filtered.map(project => `
        <div class="project-card" onclick="viewProjectDetail(${project.id})">
            <div class="project-thumbnail">${project.icon}</div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-meta">
                    <span class="project-difficulty difficulty-${project.difficulty.toLowerCase()}">${project.difficulty}</span>
                    <span>View →</span>
                </div>
            </div>
        </div>
    `).join('');
}

function viewProjectDetail(projectId) {
    const projects = LocalStorage.getProjects();
    const project = projects.find(p => p.id === projectId);
    
    if (!project) return;
    
    navigateTo('project-detail');
    
    const content = document.getElementById('project-detail-content');
    content.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
            <div style="background: var(--bg-secondary); border-radius: 1rem; padding: 2rem; margin-bottom: 2rem;">
                <div style="display: flex; align-items: center; gap: 2rem; margin-bottom: 2rem;">
                    <div style="font-size: 4rem;">${project.icon}</div>
                    <div>
                        <h1>${project.title}</h1>
                        <p style="font-size: 1.1rem; margin: 0.5rem 0;">${project.description}</p>
                        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                            <span class="project-difficulty difficulty-${project.difficulty.toLowerCase()}">${project.difficulty}</span>
                            <span style="padding: 0.25rem 0.75rem; background: var(--bg-tertiary); border-radius: 2rem; font-size: 0.8rem;">${project.category}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                <button onclick="openCodeViewer(${projectId})" class="btn btn-primary" style="grid-column: 1; padding: 1rem;">📖 View Source Code</button>
                <button onclick="openLiveEditor(${projectId})" class="btn btn-primary" style="grid-column: 2; padding: 1rem;">⚡ Live Editor</button>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div style="background: var(--bg-secondary); border-radius: 1rem; padding: 1.5rem;">
                    <h3>What You'll Learn</h3>
                    <ul style="list-style: none;">
                        <li>✓ HTML structure and semantics</li>
                        <li>✓ CSS styling and animations</li>
                        <li>✓ JavaScript DOM manipulation</li>
                        <li>✓ Event handling and interactivity</li>
                    </ul>
                </div>
                <div style="background: var(--bg-secondary); border-radius: 1rem; padding: 1.5rem;">
                    <h3>Resume Worthy</h3>
                    <p>Add this project to your resume and portfolio. Interviewers will be impressed by the complete implementation and clean code.</p>
                </div>
            </div>
        </div>
    `;
}

// ===================================
// CODE VIEWER MODAL
// ===================================

let currentCodeProject = null;
let currentCodeTab = 'html';

function openCodeViewer(projectId) {
    currentCodeProject = projectId;
    currentCodeTab = 'html';
    const modal = document.getElementById('code-modal');
    modal.classList.add('active');
    displayCode('html');
}

function closeCodeModal() {
    document.getElementById('code-modal').classList.remove('active');
}

function switchCodeTab(tab) {
    currentCodeTab = tab;
    document.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    displayCode(tab);
}

function displayCode(type) {
    const projects = LocalStorage.getProjects();
    const project = projects.find(p => p.id === currentCodeProject);
    
    if (!project) return;
    
    const codeContent = document.getElementById('code-content');
    const code = project[type] || '';
    
    codeContent.textContent = code;
    document.getElementById('code-display').scrollTop = 0;
}

function copyCode() {
    const code = document.getElementById('code-content').textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert('Code copied to clipboard!');
    });
}

// ===================================
// LIVE EDITOR MODAL
// ===================================

let currentEditorProject = null;
let currentEditorTab = 'html';

function openLiveEditor(projectId) {
    currentEditorProject = projectId;
    currentEditorTab = 'html';
    const projects = LocalStorage.getProjects();
    const project = projects.find(p => p.id === projectId);
    
    if (!project) return;
    
    document.getElementById('html-editor').value = project.html || '';
    document.getElementById('css-editor').value = project.css || '';
    document.getElementById('js-editor').value = project.js || '';
    
    document.getElementById('editor-modal').classList.add('active');
    runCode();
}

function closeEditorModal() {
    document.getElementById('editor-modal').classList.remove('active');
}

function switchEditorTab(tab) {
    currentEditorTab = tab;
    document.querySelectorAll('.editor-textarea').forEach(t => t.classList.add('hidden'));
    document.getElementById(tab + '-editor').classList.remove('hidden');
    document.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
}

function runCode() {
    const html = document.getElementById('html-editor').value;
    const css = document.getElementById('css-editor').value;
    const js = document.getElementById('js-editor').value;
    
    const iframe = document.getElementById('preview-frame');
    const doc = iframe.contentDocument;
    
    doc.open();
    doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}<\/script>
        </body>
        </html>
    `);
    doc.close();
}

function resetCode() {
    const projects = LocalStorage.getProjects();
    const project = projects.find(p => p.id === currentEditorProject);
    
    if (project) {
        document.getElementById('html-editor').value = project.html || '';
        document.getElementById('css-editor').value = project.css || '';
        document.getElementById('js-editor').value = project.js || '';
        runCode();
    }
}

function copyEditorCode() {
    const html = document.getElementById('html-editor').value;
    const css = document.getElementById('css-editor').value;
    const js = document.getElementById('js-editor').value;
    
    const allCode = `<!-- HTML -->\n${html}\n\n<!-- CSS -->\n<style>\n${css}\n</style>\n\n<!-- JavaScript -->\n<script>\n${js}\n</script>`;
    
    navigator.clipboard.writeText(allCode).then(() => {
        alert('All code copied to clipboard!');
    });
}

function downloadCode() {
    const html = document.getElementById('html-editor').value;
    const css = document.getElementById('css-editor').value;
    const js = document.getElementById('js-editor').value;
    
    const fullCode = `<!DOCTYPE html>\n<html>\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<style>\n${css}\n</style>\n</head>\n<body>\n${html}\n<script>\n${js}\n</script>\n</body>\n</html>`;
    
    const blob = new Blob([fullCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.html';
    a.click();
}

// ===================================
// SEARCH FUNCTIONALITY
// ===================================

function searchPlatform() {
    const query = document.getElementById('hero-search').value;
    if (query.trim()) {
        document.getElementById('projects-search').value = query;
        navigateTo('projects');
        filterProjects();
    }
}

// ===================================
// INITIALIZE FEATURES
// ===================================

function initializeFeatures() {
    console.log('Features initialized');
}

// ===================================
// PROJECT SOURCE CODE GENERATOR
// ===================================

function getProjectHTML(id) {
    const htmlTemplates = {
        1: `<div class="calculator">
    <input type="text" id="display" readonly>
    <div class="buttons">
        <button onclick="clearDisplay()">C</button>
        <button onclick="deleteLast()">←</button>
        <button onclick="appendOperator('/')">÷</button>
        <button onclick="appendOperator('*')">×</button>
        <button onclick="appendNumber('7')">7</button>
        <button onclick="appendNumber('8')">8</button>
        <button onclick="appendNumber('9')">9</button>
        <button onclick="appendOperator('-')">−</button>
        <button onclick="appendNumber('4')">4</button>
        <button onclick="appendNumber('5')">5</button>
        <button onclick="appendNumber('6')">6</button>
        <button onclick="appendOperator('+')">+</button>
        <button onclick="appendNumber('1')">1</button>
        <button onclick="appendNumber('2')">2</button>
        <button onclick="appendNumber('3')">3</button>
        <button onclick="appendOperator('=')" style="grid-row: span 2;">= </button>
        <button onclick="appendNumber('0')" style="grid-column: span 2;">0</button>
        <button onclick="appendNumber('.')">.</button>
    </div>
</div>`,
        2: `<div class="todo-container">
    <h2>My Tasks</h2>
    <div class="input-section">
        <input type="text" id="taskInput" placeholder="Add a new task...">
        <button onclick="addTask()">Add</button>
    </div>
    <ul id="taskList" class="task-list"></ul>
</div>`,
        // Add more HTML templates for projects 3-80
        3: `<div class="weather-app">
    <div class="search-bar">
        <input type="text" id="cityInput" placeholder="Enter city name...">
        <button onclick="searchWeather()">Search</button>
    </div>
    <div id="weatherInfo" class="weather-info"></div>
</div>`,
        4: `<div class="portfolio">
    <header>
        <h1>My Portfolio</h1>
        <nav><a href="#about">About</a> | <a href="#projects">Projects</a> | <a href="#contact">Contact</a></nav>
    </header>
    <section id="about"><h2>About Me</h2><p>Creative developer passionate about web design.</p></section>
    <section id="projects"><h2>Projects</h2><div class="projects-grid"></div></section>
    <section id="contact"><h2>Contact</h2><p>Email: hello@example.com</p></section>
</div>`,
        5: `<div class="landing">
    <header class="hero">
        <h1>Welcome to Our Service</h1>
        <p>Start your journey today</p>
        <button>Get Started</button>
    </header>
    <section class="features">
        <div class="feature">⚡ Fast</div>
        <div class="feature">🔒 Secure</div>
        <div class="feature">📱 Responsive</div>
    </section>
</div>`,
    };
    
    return htmlTemplates[id] || '<div>Coming Soon...</div>';
}

function getProjectCSS(id) {
    const cssTemplates = {
        1: `.calculator {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 1rem;
    padding: 1.5rem;
    max-width: 400px;
    margin: 2rem auto;
}
#display {
    width: 100%;
    padding: 1rem;
    font-size: 1.5rem;
    border: none;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    background: #fff;
}
.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
}
button {
    padding: 1rem;
    border: none;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
}
button:hover {
    background: rgba(255, 255, 255, 0.3);
}`,
        2: `.todo-container {
    max-width: 500px;
    margin: 2rem auto;
    background: var(--bg-secondary);
    padding: 2rem;
    border-radius: 1rem;
}
.input-section {
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
}
#taskInput {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
}
button {
    padding: 0.75rem 1.5rem;
    background: var(--accent-primary);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
}
.task-list {
    list-style: none;
    margin-top: 1rem;
}
.task-item {
    background: var(--bg-primary);
    padding: 1rem;
    border-radius: 0.5rem;
    margin: 0.5rem 0;
    display: flex;
    justify-content: space-between;
}`,
    };
    
    return cssTemplates[id] || 'body { font-family: Arial; }';
}

function getProjectJS(id) {
    const jsTemplates = {
        1: `let display = document.getElementById('display');
let currentValue = '';

function appendNumber(num) {
    currentValue += num;
    display.value = currentValue;
}

function appendOperator(op) {
    if (op === '=') {
        try {
            currentValue = eval(currentValue);
            display.value = currentValue;
        } catch(e) {
            display.value = 'Error';
            currentValue = '';
        }
    } else {
        currentValue += op;
        display.value = currentValue;
    }
}

function clearDisplay() {
    currentValue = '';
    display.value = '';
}

function deleteLast() {
    currentValue = currentValue.slice(0, -1);
    display.value = currentValue;
}`,
        2: `function addTask() {
    const input = document.getElementById('taskInput');
    const task = input.value.trim();
    if (task) {
        const list = document.getElementById('taskList');
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = \`
            <span>\${task}</span>
            <button onclick="this.parentElement.remove()">✕</button>
        \`;
        list.appendChild(li);
        input.value = '';
    }
}`,
    };
    
    return jsTemplates[id] || '// JavaScript code here';
}
