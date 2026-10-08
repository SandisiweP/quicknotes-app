let notes = [];

const noteForm = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const noteCategory = document.getElementById("note-category");
const errorMessage = document.getElementById("error-message");
const notesList = document.getElementById("notes-list");
const noteCount = document.getElementById("note-count");
const searchInput = document.getElementById("search-input");

// Load notes from localStorage on startup
function loadNotes() {
    const saved = localStorage.getItem("quicknotes");
    if (saved) {
        notes = JSON.parse(saved);
    }
    renderNotes();
}

// Save notes to localStorage
function saveNotes() {
    localStorage.setItem("quicknotes", JSON.stringify(notes));
}

// Update count text dynamically based on total notes
function updateCountText() {
    const total = notes.length;
    if (total === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (total === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${total} notes.`;
    }
}

// Render notes to DOM with search filtering
function renderNotes() {
    const query = searchInput.value.toLowerCase().trim();
    
    const filtered = notes.filter(note => 
        note.text.toLowerCase().includes(query)
    );

    notesList.innerHTML = "";

    if (filtered.length === 0 && notes.length > 0) {
        notesList.innerHTML = "<li>No notes match your search.</li>";
        updateCountText();
        return;
    }

    filtered.forEach(note => {
        const li = document.createElement("li");
        li.className = `note-card category-${note.category}`;

        li.innerHTML = `
            <p class="note-text">${escapeHtml(note.text)}</p>
            <div class="note-meta">
                <span><strong>Category:</strong> ${note.category} | <em>${note.createdAt}</em></span>
                <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
            </div>
        `;
        notesList.appendChild(li);
    });

    updateCountText();
}

// Basic helper to prevent HTML injection
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

// Form submission handler
noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = noteInput.value;
    const trimmed = text.trim();

    // Validation checks
    if (trimmed === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }
    if (trimmed.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return;
    }

    // Clear error on valid submission
    errorMessage.textContent = "";

    const newNote = {
        id: Date.now(),
        text: trimmed,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };

    notes.unshift(newNote);
    saveNotes();
    renderNotes();

    noteInput.value = "";
});

// Delete individual note
window.deleteNote = function(id) {
    notes = notes.filter(note => note.id !== id);
    saveNotes();
    renderNotes();
};

// Search listener
searchInput.addEventListener("input", () => {
    renderNotes();
});

// Initialize app on load
loadNotes();