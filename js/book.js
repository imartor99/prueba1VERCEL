export class Book {
  /**
   * Crea una instancia de un libro.
   * @param {string} title - El título del libro.
   * @param {string} genre - El género del libro.
   * @param {string} author - El autor del libro.
   */
  constructor(title, genre, author) {
    this.title = title;
    this.genre = genre;
    this.author = author;
    this.read = false;
    this.readDate = null;
  }
}
