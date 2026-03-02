const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const themeToggle = document.getElementById("theme-toggle");
const errorMsg = document.getElementById("error-msg");

const translations = {
	ja: {
		title: "やることリスト",
		heading: "やることリスト",
		placeholder: "新しいタスクを追加してください",
		addBtn: "追加",
		deleteBtn: "削除",
		errorMsg: "タスクを入力してください！",
		langToggleBtn: "English"
	},
	en: {
		title: "To-Do List",
		heading: "To-Do List",
		placeholder: "Add a new task",
		addBtn: "Add",
		deleteBtn: "Delete",
		errorMsg: "Please enter a task!",
		langToggleBtn: "日本語"
	}
};

let currentLang = localStorage.getItem("lang") || "ja";

function updateLanguage() {
	const t = translations[currentLang];

	document.title = t.title;
	document.querySelector(".heading").textContent = t.heading;
	input.placeholder = t.placeholder;
	addBtn.textContent = t.addBtn;
	langToggle.textContent = t.langToggleBtn;

	if (errorMsg.textContent !== "") {
		errorMsg.textContent = t.errorMsg;
	}

	const template = document.getElementById("task-template");
	template.content.querySelector(".delete-btn").textContent = t.deleteBtn;

	document.querySelectorAll(".delete-btn").forEach(btn => {
		btn.textContent = t.deleteBtn;
	});
}

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

	span.addEventListener("dblclick", () => {
		const editInput = document.createElement("input");
		editInput.type = "text";
		editInput.value = span.textContent;
		editInput.classList.add("edit-input");

		span.replaceWith(editInput);
		editInput.focus();

		const saveEdit = () => {
			if (!editInput.isConnected) return;

			const newText = editInput.value.trim();

			if (newText !== "") {
				span.textContent = newText;
			}

			editInput.replaceWith(span);

			if (newText !== "") {
				saveTasks();
			}
		};

		editInput.addEventListener("keypress", (e) => {
			if (e.key === "Enter") {
				editInput.blur();
			}
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

	const icon = themeToggle.querySelector("i");

	if (document.body.classList.contains("light-mode")) {
		icon.classList.replace("fa-sun", "fa-moon");
	} else {
		icon.classList.replace("fa-moon", "fa-sun");
	}
});
