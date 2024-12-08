document.addEventListener("DOMContentLoaded", () => {
    const formItems = document.querySelectorAll(".form-item");

    if (formItems.length > 0) {
        for (let item of formItems) {
            const itemInput = item.querySelector(".form-input");
            const itemStateIcon = item.querySelector(".form-input-state");

            // Событие потери фокуса для проверки валидности
            itemInput.addEventListener("blur", () => {
                const value = itemInput.value.trim();
				// const isValidPhone = /^[0-9]{10}$/.test(value); 
                // Пример проверки: валидное поле не пустое
                if (value !== "") {
                    item.classList.remove("error");
                    itemStateIcon.classList.add("active");
                } else {
                    item.classList.add("error");
                    itemStateIcon.classList.remove("active");
                }
            });

            // Очистка поля по клику на иконку
            itemStateIcon.addEventListener("click", () => {
                if (item.classList.contains("error") && itemStateIcon.classList.contains("active")) {
                    itemInput.value = "";
                    item.classList.remove("error");
                    itemStateIcon.classList.remove("active");
                }
            });
        }
    }
	/*===PHONE MASK =====*/
	const phoneInputs = document.querySelectorAll(".phone");

    phoneInputs.forEach((input) => {
        input.addEventListener("focus", onPhoneFocus);
        input.addEventListener("input", onPhoneInput);
        input.addEventListener("blur", onPhoneBlur);
    });

    const maskTemplate = "+7(___)___-__-__";

    function onPhoneFocus(event) {
        const input = event.target;

        if (!input.value) {
            input.value = maskTemplate;
        }

        // Установить курсор в позицию 3
        setCursorPosition(input, 3);
    }

    function onPhoneInput(event) {
        const input = event.target;
        const value = input.value.replace(/\D/g, ""); // Оставляем только цифры
        const template = maskTemplate.replace(/\D/g, ""); // Шаблон без символов

        let formattedValue = "+7(";

        // Вставляем введенные цифры в маску
        for (let i = 1, j = 0; i < template.length; i++) {
            if (template[i] === "_") {
                formattedValue += value[j] || "_";
                j++;
            } else {
                formattedValue += template[i];
            }
        }

        input.value = formattedValue;
        setCursorPosition(input, input.value.indexOf("_"));
    }

    function onPhoneBlur(event) {
        const input = event.target;

        // Если пользователь ничего не ввел, очищаем поле
        if (input.value === maskTemplate) {
            input.value = "";
        }
    }

    function setCursorPosition(input, position) {
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(position, position);
        } else if (input.createTextRange) {
            const range = input.createTextRange();
            range.collapse(true);
            range.moveEnd("character", position);
            range.moveStart("character", position);
            range.select();
        }
    }
});