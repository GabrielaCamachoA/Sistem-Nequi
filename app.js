class Item{
  constructor(id,clave,valor){
    this.id = id;
    this.clave = clave;
    this.valor= valor;
  }
}

class TABLA{
  constructor(){
    this.form = document.getElementById("form");
    this.claveInput = document.getElementById("clave");
    this.valorInput = document.getElementById("valor");
    this.idInput = document.getElementById('id');
    this.tablebody = document.getElementById("tbody");
    this.loadItems();
    this.form.addEventListener("submit", (event) => this.saveItem(event));
  }
  
  loadItems() {
    const itemsJSON = localStorage.getItem("items"); 
    let arr = [];
    if (itemsJSON) {
        try {                        
            arr = JSON.parse(itemsJSON); 
        } catch (error) {
            console.error(error);
            arr = [];
        }
    }
    this.tablebody.innerHTML = '';

    arr.forEach((item) => { 
      const { id, clave, valor } = item;
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${clave}</td>
          <td>${valor}</td>
          <td>
              <button class="update" onclick="tabla.editItem(${id})">Actualizar</button>
              <button class="delete" onclick="tabla.deleteItem(${id})">Eliminar</button>
          </td>
      `;
      this.tablebody.appendChild(row);
    });
}

saveItems(items) {
    localStorage.setItem('items', JSON.stringify(items)); 
    this.loadItems();
}

saveItem(event) {
    event.preventDefault();
    const clave = this.claveInput.value.trim();
    const valor = this.valorInput.value.trim();
    const id = this.idInput.value;
    const items = JSON.parse(localStorage.getItem("items")) || [];
    if (id === '') {
        const newItem = new Item( Date.now(), clave, valor);
        items.push(newItem);
    } else {
        const index = items.findIndex(item => item.id == id);
        items[index].clave = clave;
        items[index].valor = valor;
    }
    this.saveItems(items);
    this.form.reset();
}
editItem(id) {
  const items = JSON.parse(localStorage.getItem('items')) || [];
  const item = items.find(item => item.id == id); 
  this.claveInput.value = item.clave;
  this.valorInput.value = item.valor;  
  this.idInput.value = item.id;
}
deleteItem(id) {
  let items = JSON.parse(localStorage.getItem('items')) || [];
  items = items.filter(item => item.id != id); 
  this.saveItems(items);
}
}
const tabla = new TABLA();
