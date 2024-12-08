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

	//SWOW SUCCESS MESSAGE
	const modalFramesContent = document.querySelectorAll(".modal-frame-content");

	modalFramesContent.forEach((modalFrame) => {
		
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
	/* =============== modal с атрибутом [data-modal] ===============*/ 
	const modalOpen = document.querySelectorAll('[data-btn]');
	const modalFrames = document.querySelectorAll('[data-modal]');
	if( modalFrames.length > 0){
	//  const modalFramesClose = document.querySelectorAll('[data-close]');

	for(let item of modalOpen){
		item.addEventListener('click', function(e){
			for(let item of  modalFrames){
				item.classList.remove('visible');
				bodyEl.classList.remove('lock');
			}
			e.preventDefault();
			const itemAttr = item.getAttribute('data-btn');

			for(let frame of modalFrames){
				const frameAttr =frame.getAttribute('data-modal');	
				if(frameAttr == itemAttr){
				frame.classList.add('visible');
				bodyEl.classList.add('lock');
				}
			}
		});
	}
	
	/*==  закрыть модалки  frame-modal по клику на крестик ======*/
	// if(modalFramesClose){
	// 	for(let item of modalFramesClose){
	// 		item.addEventListener('click', function(e){
	// 		e.preventDefault();
	// 		item.closest('[data-modal]').classList.remove('visible');
	// 		bodyEl.classList.remove('lock');
	// 		});
	// 	}
	// }
	
	/*=============== закрыть модалки по клику вне ===============*/
		for(let frame of modalFrames){
			frame.addEventListener('click', function(e){
				if(e.target === e.currentTarget){
					this.classList.remove(`visible`);
					bodyEl.classList.remove('lock');
				}
			});
		}
	}
	const fileInputs = document.querySelectorAll(".fileUploadInput");

    fileInputs.forEach((input) => {
        input.addEventListener("change", (event) => {
            const label = input.closest(".fileUpload-label");
            const labelTxt = label.querySelector(".label-txt");
			const  stateIcon = label.querySelector(".form-input-state");
            const fileName = input.files[0]?.name || "Добавить файл"; // Название файла или текст по умолчанию

            labelTxt.textContent = fileName; // Обновляем текст в span.label-txt
			if (input.files.length > 0) {
                stateIcon.classList.add("active"); // Файл выбран
            } else {
                stateIcon.classList.remove("active"); // Файл удален
            }
        });
    });
});