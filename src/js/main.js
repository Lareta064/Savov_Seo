document.addEventListener("DOMContentLoaded", function () {
	/* ======  menu icon click ====== */
	const menuToggle = document.querySelector('#menu-toggle');
	const mobileMenu = document.querySelector('#header-menu');
	const bodyEl = document.body;
	

	if (menuToggle) {

		/*   клик поиконке гамбургер*/  
		menuToggle.addEventListener('click', ()=> {
			
			if (menuToggle.classList.contains('active')) {

				menuToggle.classList.remove('active');
				mobileMenu.classList.remove('active');
				bodyEl.classList.remove('lock');
			
			} else {
				menuToggle.classList.add('active');
			    mobileMenu.classList.add('active');
				bodyEl.classList.add('lock');
			}
		});

       /*   клик по мобильному меню*/  
		mobileMenu.addEventListener('click', () => {
			menuToggle.classList.remove('active');
			mobileMenu.classList.remove('active');
			bodyEl.classList.remove('lock');
		});
	}
	/*======переключение активного класса ====*/ 
	function toggleActiveClass(parentClass, childClass) {
		const parents = document.querySelectorAll('.' + parentClass);
		parents.forEach(parent => {
			parent.addEventListener('click', function (e) {

				if (e.target.classList.contains(childClass)) {
					
					parent.querySelectorAll('.' + childClass).forEach(child => {
						child.classList.remove('active');
					});
					
					e.target.classList.add('active');
				}
			});
		});
	}
	/*==================FORM ===================*/
	const formItems = document.querySelectorAll(".form-item");

    if (formItems.length > 0) {
        for (let item of formItems) {
            const itemInput = item.querySelector(".form-input");
            const itemStateIcon = item.querySelector(".form-input-state");

            // Событие потери фокуса для проверки валидности
            itemInput.addEventListener("blur", () => {
                const value = itemInput.value.trim();
				
                // Проверка, что валидное поле не пустое
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
	const phoneInputs = document.querySelectorAll(".phone");

    phoneInputs.forEach((input) => {
        input.addEventListener("focus", onPhoneFocus);
        input.addEventListener("input", onPhoneInput);
        input.addEventListener("blur", onPhoneBlur);
    });

    const maskTemplate = "+7(";

    function onPhoneFocus(event) {
        const input = event.target;

        // Если поле пустое, добавляем начальную маску
        if (!input.value) {
            input.value = maskTemplate;
        }

        // Устанавливаем курсор после `+7(`
        setCursorPosition(input, maskTemplate.length);
    }

    function onPhoneInput(event) {
        const input = event.target;
        let value = input.value.replace(/\D/g, ""); // Удаляем все символы, кроме цифр

        // Убираем первую цифру (добавляем её через маску)
        if (value.startsWith("7")) {
            value = value.slice(1);
        }

        // Формируем маску
        let formattedValue = "+7(";
        formattedValue += value.slice(0, 3); // Первые три цифры внутри скобок

        // Закрываем скобку, если введено три цифры
        if (value.length > 3) {
            formattedValue += ")" + value.slice(3, 6); // Добавляем следующие три цифры
        } else {
            formattedValue += ")";
        }

        // Добавляем оставшиеся цифры
        if (value.length > 6) {
            formattedValue += "-" + value.slice(6, 8);
        }
        if (value.length > 8) {
            formattedValue += "-" + value.slice(8, 10);
        }

        input.value = formattedValue;

        // Устанавливаем курсор на первое пустое место
        const cursorPosition = input.value.length;
        setCursorPosition(input, cursorPosition);
    }

    function onPhoneBlur(event) {
        const input = event.target;

        // Если пользователь ничего не ввел, очищаем поле
        if (input.value === "+7(" || input.value === "+7()") {
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