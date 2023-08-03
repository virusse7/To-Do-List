{
    const tasks = [
        {
            content: "zrobić pranie",
            done: true,

        },
        {
            content: "posprzątać",
            done: false,
        },
    ];


    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
                <li>
                    ${task.content}
                </li>
                `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const init = () => {
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
        });
        render();
    };

    init();
}