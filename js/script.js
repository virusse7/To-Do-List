{
    let tasks = [];
    let hideDoneTasks = false

    const form = document.querySelector(".js-form");

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };


    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) => {
            if (index === taskIndex) {
                return { ...task, done: !task.done };
            };
            return task;
        });
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
                <li class="list__item">
                    <button class="list__button list__button--done js-done">${task.done ? "✓" : ""}</button>
                    <span class="list__text${task.done ? " list__item--done" : ""}">${task.content}</span>
                    <button class="list__button list__button--remove js-remove">🗑</button>
                </li>
            `;
        };
        document.querySelector(".js-tasks").innerHTML = htmlString;
    }

    const render = () => {
        renderTasks();

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();
        addTaskButton = document.querySelector(".js-button");

        if (newTaskContent === "") {
            newTaskElement.focus();
            return;
        } else {
            addNewTask(newTaskContent);
            newTaskElement.focus();
            form.reset();
        };
    };

    const init = () => {
        render();

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}