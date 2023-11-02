var endTime;
    console.log(window.is_auth);
        if (window.is_auth == "False") {
            localStorage.clear();
        } else {
    
        function displayCountdown(endTime) {
          const countdownElement = document.getElementById('countdown');
    
          function updateCountdown() {
            const currentTime = new Date().getTime();
            const timeLeft = endTime - currentTime;
    
            if (timeLeft <= 0) {
              countdownElement.textContent = 'Обратный отсчет завершен';
            } else {
              const hours = Math.floor(timeLeft / 3600000);
              const minutes = Math.floor((timeLeft % 3600000) / 60000);
              const seconds = Math.floor((timeLeft % 60000) / 1000);
    
              countdownElement.textContent = `Осталось ${hours}:${minutes}:${seconds}`;
            }
          }
    
          updateCountdown();
          const intervalId = setInterval(updateCountdown, 1000);
    
          // Сохраняем конечное время в Local Storage
          localStorage.setItem('countdownEndTime', endTime);
    
          // Очищаем интервал при обновлении страницы
          window.onbeforeunload = () => {
            clearInterval(intervalId);
          };
        }
    
        // Проверяем, есть ли сохраненное время в Local Storage
        var savedEndTime = localStorage.getItem('countdownEndTime');
    
        if (savedEndTime) {
            displayCountdown(Number(savedEndTime));
        } else {
          // Если времени нет, создаем новый обратный отсчет на 1 час
          endTime = new Date().getTime() + 3600000; // 1 час в миллисекундах
          displayCountdown(endTime);
        }
    }