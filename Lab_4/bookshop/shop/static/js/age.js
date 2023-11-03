document.body.style.overflow = 'hidden';
    document.addEventListener("DOMContentLoaded", function() {
    const ageModal = document.getElementById("ageModal");
    const birthdateInput = document.getElementById("birthdateInput");
    const checkAgeButton = document.getElementById("checkAgeButton");

    // Отобразить модальное окно при загрузке страницы
    ageModal.style.display = "block";

    checkAgeButton.addEventListener("click", function() {
        const birthdate = new Date(birthdateInput.value);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthdate.getFullYear();

        if (birthdate > currentDate) {
            alert("Дата рождения не может быть в будущем.");
        } else if (age >= 18) {
            alert(`Вы совершеннолетний и можете продолжить использование сайта. День недели вашей даты рождения: ${birthdate.toLocaleString('ru-RU', { weekday: 'long' })}`);
            ageModal.style.display = "none";
            document.body.style.overflow = 'auto';
        } else {
            alert("Для использования сайта несовершеннолетним необходимо разрешение родителей.");
            //ageModal.style.display = "none";
        }
    });
});