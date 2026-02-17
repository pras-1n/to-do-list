const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const themeToggle = document.getElementById("theme-toggle");

function addTask(text = null, isCompleted = false) {
	const taskText = text || input.value.trim();
	if (taskText === "") return;

	const li = document.createElement("li");
	if (isCompleted) li.classList.add("completed"); //if loaded from memory and was previously

	li.innerHTML = `
			<span>${taskText}</span>
			<button class="delete-btn">削除</button>
		`;

	li.querySelector("span").addEventListener("click", () => {
		li.classList.toggle("completed");
		saveTasks();
	});

	li.querySelector(".delete-btn").addEventListener("click", () => {
		li.remove();
		saveTasks();
	});

	// li.textContent = taskText; //replace this with the above line
	todoList.appendChild(li);
	if (!text) {
		input.value = "";
		input.focus();
		saveTasks();
	}

	// } else {
	// 	alert("新しいタスクを追加してください！");
	// }
}

function saveTasks() {
	const tasks = [];
	document.querySelectorAll("#todo-list li").forEach((li) => {
		tasks.push({
			text: li.querySelector("span").textContent,
			completed: li.classList.contains("completed"),
		});
	});
	localStorage.setItem("todos", JSON.stringify(tasks));
}

const savedTasks = JSON.parse(localStorage.getItem("todos") || "[]");
savedTasks.forEach((task) => addTask(task.text, task.completed));

addBtn.addEventListener("click", () => addTask());

input.addEventListener("keypress", function (e) {
	if (e.key === "Enter") {
		addTask();
	}
});

themeToggle.addEventListener("click", () => {
	document.body.classList.toggle("light-mode");
});
