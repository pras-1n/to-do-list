const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const themeToggle = document.getElementById("theme-toggle");
const errorMsg = document.getElementById("error-msg");

function addTask(text = null, isCompleted = false) {
	const taskText = text || input.value.trim();
	if (taskText === "") {
		errorMsg.textContent = "タスクを入力してください！";
		return;
	} else {
		errorMsg.textContent = "";
	}

	const template = document.getElementById("task-template");

	const clone = template.content.cloneNode(true);

	const li = clone.querySelector("li");
	const span = clone.querySelector("span");
	const btn = clone.querySelector(".delete-btn");

	span.textContent = taskText;

	if (isCompleted) {
		li.classList.add("completed");
	}

	span.addEventListener("click", () => {
		li.classList.toggle("completed");
		saveTasks();
	});

	btn.addEventListener("click", () => {
		li.remove();
		saveTasks();
	});

	todoList.appendChild(li);

	if (!text) {
		input.value = "";
		input.focus();
		saveTasks();
	}

	// const li = document.createElement("li");
	// if (isCompleted) li.classList.add("completed"); //if loaded from memory and was previously

	// li.innerHTML = `
	// 		<span>${taskText}</span>
	// 		<button class="delete-btn">削除</button>
	// 	`;

	// li.querySelector("span").addEventListener("click", () => {
	// 	li.classList.toggle("completed");
	// 	saveTasks();
	// });

	// li.querySelector(".delete-btn").addEventListener("click", () => {
	// 	li.remove();
	// 	saveTasks();
	// });

	// // li.textContent = taskText; //replace this with the above line
	// todoList.appendChild(li);
	// if (!text) {
	// 	input.value = "";
	// 	input.focus();
	// 	saveTasks();
	// }

	// } else {
	// 	alert("新しいタスクを追加してください！");
	// }

	span.addEventListener("dblclick", () => {
		const editInput = document.createElement("input");
		editInput.type = "text";
		editInput.value = span.textContent;
		editInput.classList.add("edit-input");

		span.replaceWith(editInput);
		editInput.focus();

		const saveEdit = () => {
			const newText = editInput.value.trim();
			if (newText !== "") {
				span.textContent = newText;
				saveTasks();
			}

			editInput.replaceWith(span);
		};

		editInput.addEventListener("keypress", (e) => {
			if (e.key === "Enter") saveEdit();
		});

		editInput.addEventListener("blur", saveEdit);
	});
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
