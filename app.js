function init() {
    const actions ={
        "añadir" : añadir,
        "eliminar" : eliminar,
        "limpiar" : limpiar,
    };

    // El metodo object devuelve un array
    //Object.keys Devuelve el array con las claves de un objecto

    Object.keys(actions).forEach(action => {
        document.getElementById(action).addEventListener("click", actions[action]);
    });
};


// Funcion añadir
function añadir() {
    const clave = document.getElementById("clave").value;
    const valor = document.getElementById("valor").value;

    if (clave) { // si trae un valor = true
        // Mostrar mensaje de confirmacion
        const message = localStorage.getItem(clave) ? " Se añadio el registro " : " Se edito el registro ";
       
        // Añadir el valor al local storage
        localStorage.setItem(clave, valor);
    }else{
        alert("No hay clave"); // false
    };
    tablaIngresos();
};

function eliminar() {
    const clave = document.getElementById("clave").value;
    if (!clave) {
        alert("La clave es requerida");
        return;
    }
    localStorage.removeItem(clave);
    alert("Listo");
    limpiar();
}

function limpiar() {
    document.getElementById("clave").value = "";
    document.getElementById("valor").value = "";
}
// Inicia el local.storage, con la funcion init, cuando se inicie la pag
window.onload = init;
// Tarea = Una tabla en el cual al momento de dar añadir aparezca una tabla con los regsitros ingresados y que tenga dos botones, eliminiar y editar.

function tablaIngresos() {
    tbody.innerHTML = "";
    for (let index = 0; index < localStorage.length; index++) {
    const clave = localStorage.key(index);
    const valor = localStorage.getItem(clave);
    const fila = document.createElement("tr");
    const casillaClave = document.createElement("td");
    casillaClave.textContent= clave;
    const casillaValor = document.createElement("td");
    casillaValor.textContent= valor;
    const acciones = document.createElement("td");
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", function(){
        localStorage.removeItem(clave,valor);
    });
    const botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";
    botonEditar.addEventListener("click", function (){
        localStorage.setItem(clave, valor);
    });

    tbody.appendChild(fila);  
    fila.appendChild(casillaClave);  
    fila.appendChild(casillaValor);  
    fila.appendChild(acciones);  
    acciones.appendChild(botonEliminar);  
    acciones.appendChild(botonEditar);  
    }
}
tablaIngresos();


