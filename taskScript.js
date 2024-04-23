class TaskScript extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" type="text/css" href="style.css" media="screen">
            <link href="https://fonts.googleapis.com/css2?family=Platypi:ital,wght@0,300..800;1,300..800" rel="stylesheet"> 
            <section class="taskContainer"></section>
            <form id="taskForm" action="https://httpbin.org/post" method="POST">
                <input type="text" id="newTaskInput" placeholder="New Task">
                <button type="submit">Add Task</button>
            </form>
            <div id="modal" class="modal">
                <span class="close-modal">&times;</span>
                <div class="modal-content">
                    <form id="modalForm">
                        <label for="taskDescription">Task Description:</label>
                        <input type="text" id="taskDescription" name="taskDescription">
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        `;
        this.taskContainer = this.shadowRoot.querySelector('.taskContainer');
        this.newTaskInput = this.shadowRoot.getElementById('newTaskInput');

        // Event listener for opening modal when submitting task form
        this.shadowRoot.getElementById('taskForm').addEventListener('submit', (event) => {
            event.preventDefault();
            this.openModal();
        });

        // Event listener for closing modal
        this.shadowRoot.querySelector('.close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        // Event listener for submitting modal form
        this.shadowRoot.getElementById('modalForm').addEventListener('submit', (event) => {
            event.preventDefault();
            this.submitModal();
        });
    }

    openModal() {
        const modal = this.shadowRoot.getElementById('modal');
        modal.style.display = 'block';
    }

    closeModal() {
        const modal = this.shadowRoot.getElementById('modal');
        modal.style.display = 'none';
    }

    submitModal() {
        const modalForm = this.shadowRoot.getElementById('modalForm');
        const taskDescriptionInput = modalForm.querySelector('#taskDescription');
        const newTaskText = taskDescriptionInput.value.trim();

        if (newTaskText === '') return;

        const taskId = `task${this.taskContainer.children.length + 1}`;
        const newTask = document.createElement('section');
        newTask.classList.add('taskItem');
        newTask.innerHTML = `
            <input type="checkbox" id="${taskId}">
            <label for="${taskId}">${newTaskText}</label>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        `;

        const editBtn = newTask.querySelector('.editBtn');
        const deleteBtn = newTask.querySelector('.deleteBtn');
        editBtn.addEventListener('click', () => this.editTask(taskId, newTaskText));
        deleteBtn.addEventListener('click', () => this.deleteTask(newTask));

        this.taskContainer.appendChild(newTask);
        taskDescriptionInput.value = '';
        this.closeModal();
    }

    editTask(taskId, taskText) {
        // Implement edit task functionality here
    }

    deleteTask(taskElement) {
        // Implement delete task functionality here
    }
}

window.customElements.define('task-widget', TaskScript);