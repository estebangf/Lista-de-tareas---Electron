const tasks = []
for (let index = 0; index < 10; index++) {
  tasks.push({
    _id: index,
    title: `Task n°${index + 1}`,
    description: "This tasks is a example of one task created in the past.",
    completed: index % 3 == 1
  })
}

let tasksList = document.getElementById("tareas")
tasksList.innerHTML = ""
tasks.forEach(task => {
  tasksList.innerHTML += `
    <div class="tarea">
      <input type="checkbox" ${task.completed && "checked"} name="" id="${task._id}">
      <div class="text">
        <h2>${task.title}</h2>
        <p>${task.description}</p>
      </div>
      <div class="actions">
        <button class="danger" onclick="deleteTask(${task._id})">Eliminar</button>
        <button class="default" onclick="editTask(${task._id})">Editar</button>
      </div>
    </div>
  `
});


function saveTask() {
  event.preventDefault()
  alert("save!!!")
}


function deleteTask(id) {
  event.preventDefault()
  alert("delete n°"+id+"!!!")
}


function editTask(id) {
  event.preventDefault()
  alert("edit n°"+id+"!!!")
}
