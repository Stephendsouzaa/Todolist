document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const descriptionInput = document.getElementById("description");
    const deadlineInput = document.getElementById("deadline");
    const priorityInput = document.getElementById("priority");
    const statusInput = document.getElementById("status");
    const projectInput = document.getElementById("project");
    const addTaskButton = document.getElementById("addTask");
    const filterPriority = document.getElementById("filterPriority");
    const taskList = document.getElementById("taskList");
    const clearTasksButton = document.getElementById("clearTasks");
    const taskNotesInput = document.getElementById("taskNotes");

    addTaskButton.addEventListener("click", addTask);
    clearTasksButton.addEventListener("click", clearAllTasks);
    filterPriority.addEventListener("change", filterTasks);

    // Load tasks from localStorage when the page loads
    loadTasks();

    function addTask() {
        const taskText = taskInput.value;
        const descriptionText = descriptionInput.value;
        const deadlineValue = deadlineInput.value;
        const priorityValue = priorityInput.value;
        const statusValue = statusInput.value;
        const projectText = projectInput.value;
        const taskNotesText = taskNotesInput.value;

        if (!taskText) {
            alert("Please enter a task.");
            return;
        }

        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <strong>${taskText}</strong><br>
            Description: ${descriptionText}<br>
            Deadline: ${deadlineValue}<br>
            Priority: ${priorityValue}<br>
            Status: ${statusValue}<br>
            Project: ${projectText}<br>
            Notes: ${taskNotesText}
        `;

        taskList.appendChild(taskItem);

        // Save the task to localStorage
        saveTaskToLocalStorage(taskItem);

        // Clear input fields
        taskInput.value = "";
        descriptionInput.value = "";
        deadlineInput.value = "";
        priorityInput.value = "low";
        statusInput.value = "not-started";
        projectInput.value = "";
        taskNotesInput.value = "";
    }

    function clearAllTasks() {
        taskList.innerHTML = "";
        // Clear all tasks from localStorage
        localStorage.clear();
    }

    function filterTasks() {
        const selectedPriority = filterPriority.value;
        const taskItems = taskList.querySelectorAll("li");

        taskItems.forEach((taskItem) => {
            const priority = taskItem.querySelector("Priority:").innerText;
            if (selectedPriority === "all" || priority === selectedPriority) {
                taskItem.style.display = "block";
            } else {
                taskItem.style.display = "none";
            }
        });
    }

    function saveTaskToLocalStorage(taskItem) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskItem.innerHTML);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        tasks.forEach((taskHtml) => {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = taskHtml;
            taskList.appendChild(taskItem);
        });
    }
});
