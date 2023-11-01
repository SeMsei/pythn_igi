// Базовый класс "Книжный магазин"
class Bookstore {
    constructor(name, location) {
      this.name = name;
      this.location = location;
      this.inventory = [];
    }
  
    // Геттер для получения инвентаря магазина
    getInventory() {
      return this.inventory;
    }
  
    // Сеттер для добавления книг в инвентарь
    addBook(book) {
      this.inventory.push(book);
    }
  
    // Метод для поиска книги по названию
    findBook(title) {
      return this.inventory.find(book => book.title === title);
    }
  
    // Метод для продажи книги
    sellBook(title) {
      const bookIndex = this.inventory.findIndex(book => book.title === title);
      if (bookIndex !== -1) {
        const soldBook = this.inventory.splice(bookIndex, 1)[0];
        console.log(`Продана книга \"${title}\" из магазина \"${this.name}\"`);
        return soldBook;
      } else {
        console.log(`Книга \"${title}\" не найдена в магазине \"${this.name}\"`);
      }
    }
  }
  
  // Наследник класса "Книжный магазин" с дополнительными функциями
  class SpecializedBookstore extends Bookstore {
    constructor(name, location, specialization) {
      super(name, location);
      this.specialization = specialization;
    }
  
    // Геттер для получения специализации магазина
    getSpecialization() {
      return this.specialization;
    }
  
    // Сеттер для изменения специализации магазина
    setSpecialization(newSpecialization) {
      this.specialization = newSpecialization;
    }
  
    // Декоратор для метода продажи книги, добавляющий логирование
    decorateSellBook(originalSellBook) {
      return function (title) {
        console.log(`Продажа книги \"${title}\" в специализированном магазине \"${this.name}\"`);
        return originalSellBook.call(this, title);
      };
    }
  }
  
  // Создаем экземпляры классов
  const genericBookstore = new Bookstore("Общий книжный магазин", "Город");
  const specializedBookstore = new SpecializedBookstore("Детский книжный магазин", "Парк", "Детская литература");
  
  // Добавляем книги в инвентарь
  genericBookstore.addBook({ title: "Война и мир", author: "Лев Толстой" });
  specializedBookstore.addBook({ title: "Гарри Поттер", author: "Джоан Роулинг" });
  
  // Демонстрация декоратора
  const decoratedSellBook = specializedBookstore.decorateSellBook(specializedBookstore.sellBook);
  decoratedSellBook.call(specializedBookstore, "Гарри Поттер");
  
  // Используем геттеры и сеттеры
  console.log(`Специализация магазина: ${specializedBookstore.getSpecialization()}`);
  specializedBookstore.setSpecialization("Юношеская литература");
  console.log(`Новая специализация магазина: ${specializedBookstore.getSpecialization()}`);