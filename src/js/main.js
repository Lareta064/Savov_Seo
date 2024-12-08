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
});