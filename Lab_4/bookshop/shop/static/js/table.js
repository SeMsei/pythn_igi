
        const table = document.getElementById("myTable");
let maxSelection = 1;
let selectedCells = new Set();

// Генерация случайного числа от 1 до 10
function getRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

// Генерация случайной квадратной таблицы
function generateTable(size) {
  table.innerHTML = "";
  selectedCells.clear();
  for (let i = 0; i < size; i++) {
    const row = table.insertRow(i);
    for (let j = 0; j < size; j++) {
      const cell = row.insertCell(j);
      cell.innerText = getRandomNumber();
      cell.addEventListener("click", () => toggleCellSelection(cell));
    }
  }
}

// Транспонирование таблицы
function transposeTable() {
  const rows = table.rows;
  const columns = [];
  for (let i = 0; i < rows[0].cells.length; i++) {
    columns.push(Array.from({ length: rows.length }, (_, j) => rows[j].cells[i]));
  }
  table.innerHTML = "";
  for (const column of columns) {
    const row = table.insertRow();
    for (const cell of column) {
      row.appendChild(cell.cloneNode(true));
    }
  }

  var rowss = table.getElementsByTagName("tr");
    

  for (let i = 0; i < rowss.length; i++) {
    var _cells = rowss[i].getElementsByTagName("td");
    for (let j = 0; j < _cells.length; j++) {
        table.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].addEventListener("click", () => toggleCellSelection(table.getElementsByTagName("tr")[i].getElementsByTagName("td")[j]));
        
    }
  }
}

// Выделение ячейки
function toggleCellSelection(cell) {
  const value = parseInt(cell.innerText, 10);
  console.log(cell.classList)
  if (!cell.classList.contains("selected") && !cell.classList.contains("selected-even")) {
    if (canSelectCell(cell)) {
        if (value % 2 == 0) {
            cell.classList.add("selected-even");
        } else {
            cell.classList.add("selected");
        }
        selectedCells.add(cell);
    }
  } else if (cell.classList.contains("selected") || cell.classList.contains("selected-even")) {
    console.log("jopa");
    if (value % 2 == 0) {
      cell.classList.remove("selected-even");
    } else {
        cell.classList.remove("selected");
    }
    selectedCells.delete(cell);
  }
}

// Проверка, можно ли выделить ячейку

function canSelectCell(cell) {

  const rowIndex = cell.parentNode.rowIndex;
  const cellIndex = cell.cellIndex;

  const row = cell.parentNode;
  const cellsInRow = row.cells;

  var r = check_row(rowIndex);
  var c = check_collumn(cellIndex);
  var n1 = check_up(rowIndex, cellIndex);
  var n2 = check_down(rowIndex, cellIndex);
  var n3 = check_left(rowIndex, cellIndex);
  var n4 = check_right(rowIndex, cellIndex);

  //console.log(r, c);
  //console.log(n1, n2, n3, n4);

  return r && c && n1 && n2 && n3 && n4;

  for (const selectedCell of selectedCells) {
    const selectedRowIndex = selectedCell.parentNode.rowIndex;
    const selectedCellIndex = selectedCell.cellIndex;

    if (
      selectedRowIndex === rowIndex || // Ограничение по строке
      selectedCellIndex === cellIndex || // Ограничение по столбцу
      Math.abs(selectedRowIndex - rowIndex) <= 1 || // Ограничение по соседним строкам
      Math.abs(selectedCellIndex - cellIndex) <= 1 // Ограничение по соседним столбцам
    ) {
      return false;
    }
  }
  return true;
}

function check_row(i) {
    var t = document.getElementById("myTable");
    var rows = t.getElementsByTagName("tr");
    var row = rows[i];
    var cells = row.getElementsByTagName("td");

    var count = 0;

    for (var i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains("selected") || cells[i].classList.contains("selected-even")) {
            count++;
        }
    }

    return count < maxSelection;
}

function check_collumn(j) {
    var t = document.getElementById("myTable");
    var rows = t.getElementsByTagName("tr");

    var count = 0;

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        if (cells[j].classList.contains("selected") || cells[j].classList.contains("selected-even")) {
            count++;
        }
    }

    return count < maxSelection;
}

function check_up(i, j) {
    if (i == 0)
      return true;

    var t = document.getElementById("myTable");
    var rows = t.getElementsByTagName("tr");
    var row = rows[i-1];
    var cells = rows[i - 1].getElementsByTagName("td");
    var cell = cells[j];

    if (cell.classList.contains("selected") || cell.classList.contains("selected-even")) {
      return false;
    } else {
      return true;
    }
}

function check_down(i, j) {
    if (i + 1 == document.getElementById("myTable").getElementsByTagName("tr").length)
      return true;

    var t = document.getElementById("myTable");
    var rows = t.getElementsByTagName("tr");
    var row = rows[i+1];
    var cells = rows[i + 1].getElementsByTagName("td");
    var cell = cells[j];

    if (cell.classList.contains("selected") || cell.classList.contains("selected-even")) {
      return false;
    } else {
      return true;
    }
}

function check_right(i, j) {
    if (j + 1 == document.getElementById("myTable").getElementsByTagName("tr")[i].getElementsByTagName("td").length)
      return true;  

    var t = document.getElementById("myTable");
    var rows = t.getElementsByTagName("tr");
    var row = rows[i];
    var cells = rows[i].getElementsByTagName("td");
    var cell = cells[j + 1];

    if (cell.classList.contains("selected") || cell.classList.contains("selected-even")) {
      return false;
    } else {
      return true;
    }
}

function check_left(i, j) {
    if (j == 0)
      return true;

    var t = document.getElementById("myTable");
    var rows = t.getElementsByTagName("tr");
    var row = rows[i];
    var cells = rows[i].getElementsByTagName("td");
    var cell = cells[j - 1];

    if (cell.classList.contains("selected") || cell.classList.contains("selected-even")) {
      return false;
    } else {
      return true;
    }
}

// Установить максимальное количество выбранных ячеек
function setMaxSelection() {
  const input = document.getElementById("maxSelection");
  maxSelection = parseInt(input.value, 10);
  resetSelection();
}

// Сбросить выделение
function resetSelection() {
  for (const cell of selectedCells) {
    cell.classList.remove("selected");
    const value = parseInt(cell.innerText, 10);
    if (value % 2 === 0) {
      cell.classList.remove("selected-even");
    }
  }
  selectedCells.clear();
}

// Добавить новый ряд
function addRow() {
  const newRow = table.insertRow(table.rows.length);
  for (let i = 0; i < table.rows[0].cells.length; i++) {
    const cell = newRow.insertCell(i);
    cell.innerText = getRandomNumber();
    cell.addEventListener("click", () => toggleCellSelection(cell));
  }
}

// Добавить новую колонку
function addColumn() {
  for (let i = 0; i < table.rows.length; i++) {
    const cell = table.rows[i].insertCell(table.rows[i].cells.length);
    cell.innerText = getRandomNumber();
    cell.addEventListener("click", () => toggleCellSelection(cell));
  }
}

// Генерировать начальную таблицу при загрузке страницы
generateTable(4);
