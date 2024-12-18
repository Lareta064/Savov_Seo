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
	if(modalFramesContent.length>0){
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
	}
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
	
	//======= INPUT TYPE="FILE"=====
	const fileInputs = document.querySelectorAll(".fileUploadInput");
	if(fileInputs){
		fileInputs.forEach((input) => {
			input.addEventListener("change", (event) => {
				const label = input.closest(".fileUpload-label");
				const labelTxt = label.querySelector(".fileUpload-name");
				const stateIcon = label.querySelector(".form-input-state");

				// Получаем файл и его размер
				const file = input.files[0];
				const fileName = file?.name || "Добавить файл";

				if (file) {
					const fileSizeMB = file.size / (1024 * 1024); // Размер файла в МБ

					if (fileSizeMB > 10) {
						// Если файл больше 10 МБ, добавляем класс error
						label.classList.add("error");
						labelTxt.textContent = "Файл больше 10Мб!";
						stateIcon.classList.add("active");
					} else {
						// Если файл соответствует требованиям
						label.classList.remove("error");
						labelTxt.textContent = fileName; // Отображаем имя файла
						stateIcon.classList.add("active");
						label.classList.add("round-btn--change");
					}
				} else {
					// Если файл удален или не выбран
					clearFile(label, labelTxt, stateIcon, input);
				}
			});

			// Обработчик клика на иконку внутри label с ошибкой
			const label = input.closest(".fileUpload-label");
			const stateIcon = label.querySelector(".form-input-state");

			stateIcon.addEventListener("click", () => {
				if (label.classList.contains("error")) {
					clearFile(label, label.querySelector(".fileUpload-name"), stateIcon, input);
				}
			});
		});

		// Функция очистки файла
		function clearFile(label, labelTxt, stateIcon, input) {
			input.value = ""; // Очищаем input
			label.classList.remove("error", "round-btn--change"); // Удаляем классы
			stateIcon.classList.remove("active"); // Удаляем active у иконки
			labelTxt.textContent = "Добавить файл"; // Возвращаем текст по умолчанию
		}
	}
	//======= CUSTOM TABS=====
	const customTabs = document.querySelectorAll('.custom-tab-item');
	const breakpoint = 1200; // Ширина экрана для переключения логики

	// Функция для управления поведением на экранах больше 1200px (ховер)
	function enableHoverBehavior() {
		customTabs.forEach((tab) => {
			const btn = tab.querySelector('.custom-tab-btn');
			btn.addEventListener('mouseenter', () => handleHover(tab));
			tab.addEventListener('mouseleave', () => resetHover(tab));
		});

		// Проверяем, если ни один таб не активен, делаем активным первый
		ensureFirstTabActive();
	}

	// Функция для управления поведением на экранах меньше 1200px (клик)
	function enableClickBehavior() {
		customTabs.forEach((tab) => {
			const btn = tab.querySelector('.custom-tab-btn');
			btn.addEventListener('click', () => handleClick(tab));
		});

		// Сбрасываем активные состояния при загрузке или ресайзе
		customTabs.forEach((tab) => {
			const hiddenContent = tab.querySelector('.custom-tab-hidden');
			tab.classList.remove('active');
			hiddenContent.style.maxHeight = 0;
		});
	}

	// Функция для обработки ховера
	function handleHover(tab) {
		const hiddenContent = tab.querySelector('.custom-tab-hidden');

		// Удаляем active у всех других табов
		customTabs.forEach((item) => {
			item.classList.remove('active');
			item.querySelector('.custom-tab-hidden').style.maxHeight = 0;
		});

		// Добавляем active к текущему табу
		tab.classList.add('active');
		hiddenContent.style.maxHeight = `100%`;
	}

	// Функция для сброса ховера
	function resetHover(tab) {
		const hiddenContent = tab.querySelector('.custom-tab-hidden');

		tab.classList.remove('active');
		hiddenContent.style.maxHeight = 0;

		// После сброса проверяем, нужно ли активировать первый таб
		ensureFirstTabActive();
	}

	// Функция для обработки клика
	function handleClick(tab) {
		const hiddenContent = tab.querySelector('.custom-tab-hidden');
		const isActive = tab.classList.contains('active');

		// Сбрасываем активные состояния у всех табов
		customTabs.forEach((item) => {
			item.classList.remove('active');
			item.querySelector('.custom-tab-hidden').style.maxHeight = 0;
		});

		if (!isActive) {
			// Добавляем active и устанавливаем max-height для текущего таба
			tab.classList.add('active');
			hiddenContent.style.maxHeight = `${hiddenContent.scrollHeight}px`;
		}
	}

	// Функция для активации первого таба, если все остальные не активны
	function ensureFirstTabActive() {
		const screenWidth = window.innerWidth;

		if (screenWidth >= breakpoint) {
			const firstTab = customTabs[0];
			const otherTabsActive = Array.from(customTabs).some((tab) => tab.classList.contains('active'));

			if (!otherTabsActive && firstTab) {
				const hiddenContent = firstTab.querySelector('.custom-tab-hidden');
				firstTab.classList.add('active');
				hiddenContent.style.maxHeight = `100%`;
			}
		}
	}

	// Переключение поведения в зависимости от ширины экрана
	function toggleBehavior() {
		const screenWidth = window.innerWidth;

		// Убираем старые обработчики перед включением новой логики
		customTabs.forEach((tab) => {
			const btn = tab.querySelector('.custom-tab-btn');
			btn.replaceWith(btn.cloneNode(true)); // Удаляем все события через замену элемента
		});

		// Включаем нужную логику
		if (screenWidth >= breakpoint) {
			enableHoverBehavior();
		} else {
			enableClickBehavior();
		}
	}

	// Инициализация при загрузке страницы
	toggleBehavior();

	// Слушатель на изменение размера экрана
	window.addEventListener('resize', toggleBehavior);


});

/**********блок what-seo-wrapper************* */
document.addEventListener("DOMContentLoaded", () => {
	gsap.registerPlugin(ScrollTrigger);
    const scrollWrapper = document.querySelector(".scroll-wrapper");
    const seoWrapper = document.querySelector(".what-seo-wrapper");
	if(seoWrapper){
    // Убедимся, что блок шире, чем контейнер
		if (seoWrapper.scrollWidth > scrollWrapper.clientWidth) {
			gsap.registerPlugin(ScrollTrigger);

			// Создаем ScrollTrigger
			ScrollTrigger.create({
				trigger: scrollWrapper,
				start: "top center", // Начало эффекта, когда блок в зоне видимости
				end: () => `+=${seoWrapper.scrollWidth - scrollWrapper.clientWidth}`, // Длина горизонтального скролла
				scrub: true, // Скролл синхронизирован с колесиком мыши
				pin: scrollWrapper, // Закрепляем блок на месте
				anticipatePin: 1, // Сглаживание
				onUpdate: (self) => {
					// Горизонтальная прокрутка блока
					const progress = self.progress; // От 0 до 1
					const maxScroll = seoWrapper.scrollWidth - scrollWrapper.clientWidth;
					gsap.to(seoWrapper, {
						x: -maxScroll * progress,
						ease: "none",
						overwrite: "auto",
					});
				},
			});

			// Настраиваем плавный выход
			ScrollTrigger.create({
				trigger: scrollWrapper,
				start: () => `bottom top`, // Когда блок заканчивается
				end: () => `bottom+=1 top`,
				onLeaveBack: () => ScrollTrigger.refresh(true),
			});
		}
	}
	/*******вариант для what-seo-wrapper, когда он просто проезжает впрао / влево, когда в зоне видимости******** */
	//- const scrollWrapper = document.querySelector('.scroll-wrapper');
	//- const whatSeoWrapper = document.querySelector('.what-seo-wrapper');

	//- let timeline; // Объявляем переменную для хранения анимации

	//- // Функция для инициализации анимации
	//- function initAnimation() {
	//- 	const scrollWrapperWidth = scrollWrapper.offsetWidth;
	//- 	const whatSeoWrapperWidth = whatSeoWrapper.scrollWidth;

	//- 	// Если экран больше 1880px или блок полностью помещается, убираем анимацию
	//- 	if (window.innerWidth > 1880 || whatSeoWrapperWidth <= scrollWrapperWidth) {
	//- 		// Если анимация уже запущена, останавливаем её
	//- 		if (timeline) {
	//- 			timeline.kill(); // Останавливаем анимацию
	//- 			timeline = null; // Сбрасываем переменную
	//- 			gsap.set(whatSeoWrapper, { x: 0 }); // Возвращаем блок в начальное положение
	//- 		}
	//- 		return;
	//- 	}

	//- 	// Инициализируем GSAP анимацию, если её нет
	//- 	if (!timeline) {
	//- 		timeline = gsap.timeline({
	//- 			repeat: -1, // Бесконечная анимация
	//- 			yoyo: true, // Движение туда и обратно
	//- 			defaults: { duration: 10, ease: "linear" } // Длительность и плавность
	//- 		});

	//- 		timeline.to(whatSeoWrapper, {
	//- 			x: `-${whatSeoWrapperWidth - scrollWrapperWidth}px` // Движение влево
	//- 		});
	//- 	}
	//- }

	//- // Инициализация при загрузке страницы
	//- initAnimation();

	//- // Обработка ресайза
	//- window.addEventListener('resize', () => {
	//- 	initAnimation();
	//- });	

	function changeImage(itemClass) {
		const items = document.querySelectorAll(itemClass);
	
		items.forEach((item) => {
			const img = item.querySelector('img'); // Берем img внутри .client-card
			if (!img) return; // Если img нет, выходим
	
			const itemHoverImg = img.getAttribute('data-src'); // Берем data-src
			const itemDefaultImg = img.getAttribute('src'); // Берем src
			
			// Вешаем события на родительский элемент (блок)
			item.addEventListener('mouseenter', () => {
				img.setAttribute('src', itemHoverImg); // Меняем src на hover
			});
			item.addEventListener('mouseleave', () => {
				img.setAttribute('src', itemDefaultImg); // Возвращаем src
			});
		});
	}
	changeImage('.client-card');
	
	lightbox.option({
		'resizeDuration': 200,
		'alwaysShowNavOnTouchDevices': true,
		'showImageNumberLabel': false,
		'disableScrolling':true,
	  })
});