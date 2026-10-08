let notes = [];

const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");

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

// Render notes to DOM using createElement and textContent
function renderNotes() {
    const query = searchInput.value.toLowerCase().trim();
    
    const filtered = notes.filter(note => 
        note.text.toLowerCase().includes(query)
    );

    notesList.innerHTML = "";

    if (filtered.length === 0 && notes.length > 0) {
        const li = document.createElement("li");
        li.textContent = "No notes match your search.";
        notesList.appendChild(li);
        updateCountText();
        return;
    }

    filtered.forEach(note => {
        const li = document.createElement("li");
        li.className = `note-card category-${note.category}`;

        const p = document.createElement("p");
        p.className = "note-text";
        p.textContent = note.text; // Safe text assignment preventing XSS

        const metaDiv = document.createElement("div");
        metaDiv.className = "note-meta";

        const span = document.createElement("span");
        span.textContent = `Category: ${note.category} | ${note.createdAt}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        
        // Bind addEventListener directly instead of inline onclick
        deleteBtn.addEventListener("click", () => {
            deleteNote(note.id);
        });

        metaDiv.appendChild(span);
        metaDiv.appendChild(deleteBtn);

        li.appendChild(p);
        li.appendChild(metaDiv);

        notesList.appendChild(li);
    });

    updateCountText();
}

// Form submission handler
noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = noteInput.value;
    const trimmed = text.trim();

    if (trimmed === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }
    if (trimmed.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return;
    }

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
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    saveNotes();
    renderNotes();
}

// Search listener
searchInput.addEventListener("input", () => {
    renderNotes();
});

// Initialize app on load
loadNotes();