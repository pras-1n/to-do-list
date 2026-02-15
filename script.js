const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const themeToggle = document.getElementById("theme-toggle");

function addTask() {
	const taskText = input.value.trim();

	if (taskText !== "") {
		const li = document.createElement("li");
		li.textContent = taskText;
		todoList.appendChild(li);
		input.value = "";
		input.focus();
	} else {
		alert("新しいタスクを追加してください！");
	}
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keypress", function (e) {
	if (e.key === "Enter") {
		addTask();
	}
});

themeToggle.addEventListener("click", () => {
	document.body.classList.toggle("light-mode");
});
