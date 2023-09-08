{
    let tasks = [];
    let hideDoneTasks = false;

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



    const renderTasks = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
                <li class="list__item ${task.done && hideDoneTasks ? "list__button--hidden" : ""}">
                    <button class="list__button list__button--done js-done">${task.done ? "✓" : ""}</button>
                    <span class="list__text${task.done ? " list__item--done" : ""}">${task.content}</span>
                    <button class="list__button list__button--remove js-remove">🗑</button>
                </li>
            `;
        };
        document.querySelector(".js-tasks").innerHTML = htmlString;
    }

    const renderButtons = () => {
        let htmlButtons = "";

        for (const task of tasks) {
            htmlButtons = `
                <button class="renderButtons js-hideDone">${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone zadania</button>
                <button class="renderButtons js-allDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>Oznacz zadania jako ukończone</button>
             `;
        };
        document.querySelector(".js-taskButtons").innerHTML = htmlButtons;
    };

    const doneTasks = () => {
        tasks = tasks.map((task) =>
            ({ ...task, done: true })
        );
        render();
    };
    const hideTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }
    const bindButtonsEvents = () => {
        const toggleHideButton = document.querySelectorAll(".js-hideDone");

        toggleHideButton.forEach((toggleHideButton) => {
            toggleHideButton.addEventListener("click", hideTasks);
        });

        const allDoneButton = document.querySelectorAll(".js-allDone");

        allDoneButton.forEach((allDoneButton) => {
            allDoneButton.addEventListener("click", doneTasks);
        });
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

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();
        addTaskButton = document.querySelector(".js-button");

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }
        newTaskElement.focus();
    };

    const init = () => {
        console.log("Hello! \nVisit my github profile: https://github.com/virusse7/To-Do-List")
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}