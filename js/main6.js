import { Book } from "./book.js";
import { BookList } from "./booklist.js";

/**
 * Función principal que inicializa la aplicación.
 * Crea la instancia de la lista de libros y configura los eventos del DOM.
 */
const main = () => {
  // Inicializo la lista de libros (Modelo)
  const myBookList = new BookList();

 
  const listElement = document.getElementById("lista-lectura");
  const countElement = document.getElementById("contador-libros");

  /**
   * Función para renderizar la interfaz basada en el estado actual de la lista de libros.
   * Esta función actúa como la "Vista", refrescando el bloque derecho.
   */
  function render() {
    if (!listElement || !countElement) return;

    // Limpio la lista actual
    listElement.innerHTML = "";

    // Recorro los libros y genero el HTML
    myBookList.books.forEach((book) => {
      const li = document.createElement("li");
      li.className = "item-libro";

      let statusHtml = "";
      if (book.read) {
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        // Formato de fecha en español
        const dateStr = book.readDate.toLocaleDateString("es-ES", options);
        statusHtml = `<span class="estado-leido">Leído el ${dateStr}</span>`;
      } else {
        statusHtml = `<span class="estado-no-leido">No leído</span>`;
      }

      li.innerHTML = `
                <div class="info-libro">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                </div>
                <div class="estado-libro">
                    ${statusHtml}
                </div>
            `;

      // Añado botón "Marcar como leído" si es el libro actual y no está leído
      if (book === myBookList.currentBook && !book.read) {
        const btn = document.createElement("button");
        btn.className = "btn-marcar-leido";
        btn.textContent = "Marcar como leído";

        // Evento: Modifico el array y luego refresco cambios
        btn.onclick = () => {
          myBookList.finishCurrentBook();
          render(); // Refrescar la vista
        };

        li.querySelector(".estado-libro").appendChild(btn);
      }

      listElement.appendChild(li);
    });

    // Actualizo contador
    countElement.textContent = `Libros leídos: ${myBookList.readCount} de ${myBookList.books.length}`;
  }

  // Event Listener para el botón "Añadir Libro" (Bloque Izquierdo)
  const btnAnadir = document.getElementById("btn-anadir-libro");
  if (btnAnadir) {
    btnAnadir.addEventListener("click", () => {
      const titleInput = document.getElementById("titulo");
      const authorInput = document.getElementById("autor");
      const genreInput = document.getElementById("genero");

      const title = titleInput.value.trim();
      const author = authorInput.value.trim();
      const genre = genreInput.value.trim();

      if (title && author && genre) {
        // 1. Modificar el array (Modelo)
        const newBook = new Book(title, genre, author);
        myBookList.add(newBook);

        // 2. Refrescar la vista (Bloque Derecho)
        render();

        // Limpiar campos de entrada
        titleInput.value = "";
        authorInput.value = "";
        genreInput.value = "";
      } else {
        alert("Por favor, rellena todos los campos");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", main);
