// ======== TASK DRAG & DROP =========

// store currently dragged element
let draggedTask = null;

document.addEventListener("DOMContentLoaded", () => {
    const tasks = document.querySelectorAll(".task-box");
    const columns = document.querySelectorAll(".column-box");

    // Enable drag for each task
    tasks.forEach(task => {
        task.addEventListener("dragstart", handleDragStart);
        task.addEventListener("dragend", handleDragEnd);
    });

    // Allow dropping into each column
    columns.forEach(column => {
        column.addEventListener("dragover", handleDragOver);
        column.addEventListener("drop", handleDrop);
    });
});


// --- Start dragging ---
function handleDragStart(e) {
    draggedTask = this;
    this.classList.add("dragging");

    // required for Firefox
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", this.dataset.taskId);
}


// --- End dragging ---
function handleDragEnd(e) {
    this.classList.remove("dragging");
    draggedTask = null;
}


// --- Allow dropping ---
function handleDragOver(e) {
    e.preventDefault(); // REQUIRED
}


// --- Drop into column ---
function handleDrop(e) {
    e.preventDefault();

    if (!draggedTask) return;

    this.appendChild(draggedTask);

    console.log(
        "Moved task",
        draggedTask.dataset.taskId,
        "to column",
        this.dataset.columnId
    );

}

document.addEventListener("DOMContentLoaded", () => {
    const taskModal = document.getElementById("taskModal");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const closeBtn = document.querySelector(".modal .close");

    // OPEN MODAL
    addTaskBtn.addEventListener("click", () => {
        taskModal.classList.remove("hidden");
    });

    // CLOSE MODAL
    closeBtn.addEventListener("click", () => {
        taskModal.classList.add("hidden");
    });

    // CLOSE WHEN CLICKING OUTSIDE BOX
    window.addEventListener("click", (e) => {
        if (e.target === taskModal) {
            taskModal.classList.add("hidden");
        }
    });
});

