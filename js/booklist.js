import { Book } from "./book.js";

export class BookList {
  constructor() {
    this.books = [];
    this.currentBook = null;
    this.nextBook = null;
    this.lastBook = null;
    this.readCount = 0;
    this.notReadCount = 0;
  }

  /**
   * Añade un libro a la lista.
   * Incrementa el contador de libros no leídos y actualiza los punteros
   * de libro actual y siguiente si es necesario.
   * @param {Book} book - El objeto libro a añadir.
   */
  add(book) {
    this.books.push(book);
    this.notReadCount++;

    // Si es el primer libro añadido, establecerlo como actual si no existe ninguno
    if (!this.currentBook) {
      this.currentBook = book;
    } else if (!this.nextBook) {
      // Si tenemos un libro actual pero no siguiente, este se convierte en el siguiente
      this.nextBook = book;
    }
  }

  /**
   * Marca el libro actual como leído.
   * Establece la fecha de lectura, actualiza los contadores, mueve el libro actual
   * a último libro leído, y busca el siguiente libro no leído para establecerlo como actual.
   */
  finishCurrentBook() {
    if (this.currentBook) {
      this.currentBook.read = true;
      this.currentBook.readDate = new Date(Date.now());
      this.lastBook = this.currentBook;
      this.readCount++;
      this.notReadCount--;

      this.currentBook = this.nextBook;

      // Encuentro el primer libro no leído que no sea el nuevo libro actual
      this.nextBook =
        this.books.find((book) => !book.read && book !== this.currentBook) ||
        null;
    }
  }
}
