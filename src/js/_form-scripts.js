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
	//SWOW SUCCESS MESSAGE
	const modalFrames = document.querySelectorAll(".modal-frame-content");

	modalFrames.forEach((modalFrame) => {
		
		const formBlock = modalFrame.querySelector(".modal-frame-form");
		const successBlock = modalFrame.querySelector(".modal-success");
		const submitButton = formBlock?.querySelector("[type='submit']");

		if (submitButton) {
			submitButton.addEventListener("click", (event) => {
				event.preventDefault(); // Отключаем стандартное поведение кнопки submit
				console.log('555');
				
				if (successBlock) {
					successBlock.classList.add("show-block");
				}
				if (formBlock) {
					formBlock.classList.add("hide-block");
				}
			});
		}
	});
});