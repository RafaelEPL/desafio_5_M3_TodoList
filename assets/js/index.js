const listas = document.getElementById("listaTareas");
const hechas = document.getElementById("realizadas");
const total = document.getElementById("total");
const agregar = document.getElementById("agregar");
const tarea = document.getElementById("nuevaTarea");
const nueva = [];

const tareaRender = () => {
  let contador = 0;
  let html = "";
  if (nueva.length > 0) {
    html = `<thead>
						<th>ID</th>
						<th>Tarea</th>
						<th></th>
						<th></th>
					</thead>
					<tbody>`;
    for (task of nueva) {
      if (task.state) {
        contador++;
        html += `<tr><td>${task.id}</td><td class="tachar">${task.description}</td><td><input type="checkbox" class="checkbox" onclick="cambioHecho(${task.id})" id="taskCheck" checked></td><td><img onclick="borrarTarea(${task.id})" src="./assets/img/borrar.png" alt="Eliminar"></td></tr>`;
      } else {
        html += `<tr><td>${task.id}</td><td>${task.description}</td><td><input type="checkbox" class="checkbox" onclick="cambioHecho(${task.id})" id="taskCheck"></td><td><img onclick="borrarTarea(${task.id})" src="./assets/img/borrar.png" alt="Eliminar"></td></tr>`;
      }
    }
    html += `</tbody>`;
  }
  listas.innerHTML = html;
  total.innerHTML = nueva.length;
  hechas.innerHTML = contador;
  tarea.focus();
};



const añadirTarea = (task) => {
  let idRand = Math.floor(Math.random() * 100);
  const ids = nueva.map((task) => task.id);
  while (ids.includes(idRand) === true) {
    idRand = Math.floor(Math.random() * 100);
  }
  nueva.push({ id: idRand, description: task, state: 0 });
};

const borrarTarea = (id) => {
  const indexTask = nueva.findIndex((searchIndex) => searchIndex.id === id);
  nueva.splice(indexTask, 1);
  tareaRender();
};

const cambioHecho = (id) => {
  const indexTask = nueva.findIndex((searchIndex) => searchIndex.id === id);
  if (nueva[indexTask].state === 0) {
    nueva.splice(indexTask, 1, {
      id: nueva[indexTask].id,
      description: nueva[indexTask].description,
      state: 1,
    });
  } else {
    nueva.splice(indexTask, 1, {
      id: nueva[indexTask].id,
      description: nueva[indexTask].description,
      state: 0,
    });
  }
  tareaRender();
};



agregar.addEventListener("click", () => {
  if (tarea.value) {
    añadirTarea(tarea.value);
    tarea.value = "";
    tareaRender();
  } else {
    alert("Por favor, ingrese una quest");
    tarea.focus();
  }
});
