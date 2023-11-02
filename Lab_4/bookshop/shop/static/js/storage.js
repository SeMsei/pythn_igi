
          
            var out_price = 0;
            var storage = {'Монитор':{'Цена': 1000, 'Количество': 5},
            'Мышка':{'Цена': 400, 'Количество': 25},
            'Клавиатура':{'Цена': 500, 'Количество': 35},
            'Видеокарта':{'Цена': 10000, 'Количество': 3},
            'Процессор':{'Цена': 8000, 'Количество': 2},
            'Материнская плата':{'Цена': 7000, 'Количество': 2},
            'Оперативная память':{'Цена': 1000, 'Количество': 6},
            'Память':{'Цена': 1000, 'Количество': 7}};

            var txt = "";
            for (var key in storage) {
              txt += "Деталь: " + key + ", количество: " + storage[key]["Количество"] + ", цена: " + storage[key]["Цена"] + "\r\n";
            }

            document.getElementById("stock").innerText = txt;

            function checkAvailability() {
                var full_order = document.getElementById("orderInput").value;
                console.log(full_order);
                orders = full_order.split('\n');
                console.log(orders);

                let is_ok = true;
                let error_message;

                orders.forEach(
                    order => {
                        if (is_ok) {
                            var tmp = order.split(', ');

                        if (tmp == null) {
                            is_ok = false;
                            error_message = "Неверный ввод";
                        } 

                        item = order.split(', ')[0];
                        num = order.split(', ')[1];
                        let n = parseInt(num.replace(';', ''));

                        if (storage[item] == null) {
                            is_ok = false;
                            error_message = "Нет предмета " + item;
                            //return;
                        }

                        if (isNaN(n)) {
                            is_ok = false;
                            if (storage[item] != null)  
                              error_message = "Неверное количество предмета " + item;
                            //return;
                        }
                        
                        console.log(item, n, parseInt("d"));

                        if (storage[item]['Количество'] >= n) {
                            out_price += storage[item]['Цена']*n;
                            console.log(storage[item]['Цена']*n);
                        } else {
                            if (is_ok) {
                              is_ok = false;
                              error_message = "Не хватает " + (n - storage[item]['Количество']) + " " + item;
                            }

                        }
                        }
                    }
                );

                span = document.getElementById('output');
                console.log(span);

                if (is_ok) {
                    span.textContent = "Price: " + out_price;
                } else {
                    span.textContent = error_message;
                }

                console.log(storage);
            }