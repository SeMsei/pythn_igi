// Базовый класс "Книжный магазин"
function Bookstore1(name, location) {
    this.name = name;
    this.location = location;
    this.inventory = [];
  }
  
  // Метод для получения инвентаря магазина
  Bookstore1.prototype.getInventory = function () {
    return this.inventory;
  };

  Bookstore1.prototype.setInventory = function (inventory) {
    this.inventory = inventory;
  };
  
  // Метод для добавления книги в инвентарь
  Bookstore1.prototype.addBook = function (book) {
    this.inventory.push(book);
  };
  
  // Метод для поиска книги по названию
  Bookstore1.prototype.findBook = function (title) {
    return this.inventory.find(book => book.title === title);
  };
  
  // Метод для продажи книги
  Bookstore1.prototype.sellBook = function (title) {
    const bookIndex = this.inventory.findIndex(book => book.title === title);
    if (bookIndex !== -1) {
      const soldBook = this.inventory.splice(bookIndex, 1)[0];
      console.log(`Продана книга "${title}" из магазина "${this.name}"`);
      return soldBook;
    } else {
      console.log(`Книга "${title}" не найдена в магазине "${this.name}"`);
    }
  };
  
  // Наследник класса "Книжный магазин"
  function SpecializedBookstore1(name, location, specialization) {
    Bookstore1.call(this, name, location);
    this.specialization = specialization;
  }
  
  // Устанавливаем прототип наследника на базовый класс
  SpecializedBookstore1.prototype = Object.create(Bookstore1.prototype);
  SpecializedBookstore1.prototype.constructor = SpecializedBookstore1;
  
  // Метод для получения специализации магазина
  SpecializedBookstore1.prototype.getSpecialization = function () {
    return this.specialization;
  };
  
  // Метод для изменения специализации магазина
  SpecializedBookstore1.prototype.setSpecialization = function (newSpecialization) {
    this.specialization = newSpecialization;
  };
  
  // Декоратор для метода продажи книги, добавляющий логирование
  SpecializedBookstore1.prototype.decorateSellBook1 = function (originalSellBook) {
    return function (title) {
      console.log(`Продажа книги "${title}" в специализированном магазине "${this.name}"`);
      return originalSellBook.call(this, title);
    };
  };
  
  // Создаем экземпляры классов
  const genericBookstore1 = new Bookstore1("Общий книжный магазин", "Город");
  const specializedBookstore1 = new SpecializedBookstore1("Детский книжный магазин", "Парк", "Детская литература");
  
  // Добавляем книги в инвентарь
  genericBookstore1.addBook({ title: "Война и мир", author: "Лев Толстой" });
  specializedBookstore1.addBook({ title: "Гарри Поттер", author: "Джоан Роулинг" });
  
  // Демонстрация декоратора
  const decoratedSellBook1 = specializedBookstore1.decorateSellBook1(specializedBookstore1.sellBook);
  decoratedSellBook1.call(specializedBookstore1, "Гарри Поттер");
  
  // Используем геттеры и сеттеры
  console.log(`Специализация магазина: ${specializedBookstore1.getSpecialization()}`);
  specializedBookstore1.setSpecialization("Юношеская литература");
  console.log(`Новая специализация магазина: ${specializedBookstore1.getSpecialization()}`);