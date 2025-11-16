// LocalStorage Keys
const STORAGE_KEY = 'dataMiningProgress';
const THEME_KEY = 'dataMiningTheme';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
    loadProgress();
    updateAllProgress();
});

// Initialize Application
function initializeApp() {
    // Load theme
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Add event listeners to all checkboxes
    const checkboxes = document.querySelectorAll('.topic-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            handleCheckboxChange(this);
        });
    });

    // Calculate total topics
    const totalTopics = checkboxes.length;
    document.getElementById('totalTopics').textContent = totalTopics;
}

// Toggle Unit Dropdown
function toggleUnit(unitId) {
    const content = document.getElementById(`${unitId}-content`);
    const icon = document.getElementById(`${unitId}-icon`);

    content.classList.toggle('expanded');
    icon.classList.toggle('rotated');
}

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Handle Checkbox Change
function handleCheckboxChange(checkbox) {
    saveProgress();
    updateAllProgress();

    // Add animation effect
    const topicItem = checkbox.closest('.topic-item');
    if (checkbox.checked) {
        topicItem.style.opacity = '0.7';
        setTimeout(() => {
            topicItem.style.opacity = '1';
        }, 300);
    }
}

// Save Progress to LocalStorage
function saveProgress() {
    const checkboxes = document.querySelectorAll('.topic-checkbox');
    const progress = {};

    checkboxes.forEach(checkbox => {
        const unit = checkbox.getAttribute('data-unit');
        const topic = checkbox.getAttribute('data-topic');
        const key = `${unit}-${topic}`;
        progress[key] = checkbox.checked;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// Load Progress from LocalStorage
function loadProgress() {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (!savedProgress) return;

    const progress = JSON.parse(savedProgress);
    const checkboxes = document.querySelectorAll('.topic-checkbox');

    checkboxes.forEach(checkbox => {
        const unit = checkbox.getAttribute('data-unit');
        const topic = checkbox.getAttribute('data-topic');
        const key = `${unit}-${topic}`;

        if (progress[key]) {
            checkbox.checked = true;
        }
    });
}

// Update All Progress Indicators
function updateAllProgress() {
    updateOverallProgress();
    updateUnitProgress('unit1');
    updateUnitProgress('unit2');
    updateUnitProgress('unit3');
    updateUnitProgress('unit4');
    updateUnitProgress('unit5');
}

// Update Overall Progress
function updateOverallProgress() {
    const checkboxes = document.querySelectorAll('.topic-checkbox');
    const totalTopics = checkboxes.length;
    const completedTopics = Array.from(checkboxes).filter(cb => cb.checked).length;

    const percentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

    const progressBar = document.getElementById('overallProgress');
    progressBar.style.width = percentage + '%';
    progressBar.setAttribute('aria-valuenow', percentage);
    progressBar.textContent = percentage + '%';

    document.getElementById('completedTopics').textContent = completedTopics;
    document.getElementById('totalTopics').textContent = totalTopics;
}

// Update Unit Progress
function updateUnitProgress(unitId) {
    const unitCheckboxes = document.querySelectorAll(`[data-unit="${unitId}"]`);
    const totalTopics = unitCheckboxes.length;
    const completedTopics = Array.from(unitCheckboxes).filter(cb => cb.checked).length;

    const percentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

    const progressText = document.getElementById(`${unitId}-progress-text`);
    progressText.textContent = percentage + '%';
}

// Open PDF in new tab
function openPDF(event, pdfPath) {
    event.stopPropagation(); // Prevent unit toggle

    // Open PDF in new tab
    window.open(pdfPath, '_blank');
}

// Search YouTube
function searchYouTube(searchQuery) {
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
    window.open(youtubeSearchUrl, '_blank');
}

// Export Progress (Bonus Feature)
function exportProgress() {
    const progress = localStorage.getItem(STORAGE_KEY);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(progress);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "data_mining_progress.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

// Import Progress (Bonus Feature)
function importProgress(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const progress = JSON.parse(e.target.result);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
                loadProgress();
                updateAllProgress();
                alert('✅ Progress imported successfully!');
            } catch (error) {
                alert('❌ Error importing progress. Invalid file format.');
            }
        };
        reader.readAsText(file);
    }
}

// Reset Progress
function resetProgress() {
    if (confirm('⚠️ Are you sure you want to reset all progress? This action cannot be undone.')) {
        localStorage.removeItem(STORAGE_KEY);
        const checkboxes = document.querySelectorAll('.topic-checkbox');
        checkboxes.forEach(cb => cb.checked = false);
        updateAllProgress();
        alert('✅ Progress has been reset!');
    }
}

// Print Progress Report
function printProgress() {
    window.print();
}

// Keyboard Shortcuts
document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + K: Toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('themeToggle').click();
    }

    // Ctrl/Cmd + Shift + R: Reset progress
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        resetProgress();
    }
});

// Service Worker for Offline Support (Optional Enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        // Service worker can be added later for offline functionality
    });
}

// Auto-save notification (subtle feedback)
let saveTimeout;
function showSaveNotification() {
    clearTimeout(saveTimeout);
    // Could add a subtle "Saved" indicator here
    saveTimeout = setTimeout(() => {
        // Hide notification
    }, 2000);
}

// Analytics helper (track study patterns)
function trackStudySession() {
    const now = new Date();
    const sessions = JSON.parse(localStorage.getItem('studySessions') || '[]');
    sessions.push({
        timestamp: now.toISOString(),
        progress: calculateProgress()
    });
    localStorage.setItem('studySessions', JSON.stringify(sessions));
}

function calculateProgress() {
    const checkboxes = document.querySelectorAll('.topic-checkbox');
    const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
    return {
        total: checkboxes.length,
        completed: completed,
        percentage: Math.round((completed / checkboxes.length) * 100)
    };
}

// Track session on page load
trackStudySession();

// Motivational messages based on progress
function getMotivationalMessage(percentage) {
    if (percentage === 0) return "🚀 Let's start your Data Mining journey!";
    if (percentage < 25) return "💪 Great start! Keep going!";
    if (percentage < 50) return "🔥 You're making excellent progress!";
    if (percentage < 75) return "⭐ More than halfway there! You're doing amazing!";
    if (percentage < 100) return "🎯 Almost there! Final push!";
    return "🏆 Congratulations! You've completed everything!";
}

// Update motivational message
setInterval(() => {
    const progressBar = document.getElementById('overallProgress');
    const percentage = parseInt(progressBar.getAttribute('aria-valuenow'));
    // Could display motivational message somewhere
}, 5000);
