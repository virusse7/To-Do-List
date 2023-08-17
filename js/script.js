{
    const tasks = [];

    const form = document.querySelector(".js-form");

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
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

    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
                <li class="list__item${task.done ? " list__item--done" : ""}">
                    <button class="button js-done"><img width="15" height="15" src="images/checkmark.png"></button>
                    <p class="list__text">${task.content}</p>
                    <button class="button js-remove"><img width="15" height="15" src="images/trash.png"></button>
                </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

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