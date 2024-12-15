document.addEventListener("DOMContentLoaded", function () {
    const resultSlider = new Swiper('.result-slider', {
        effect: 'fade',
        speed: 800,
        pagination: {
            el: ".result-slider-pagination",
			clickable: true,
        },
    });

    resultSlider.on('slideChange', function () {
        // Получаем индекс активного слайда
        const activeIndex = resultSlider.activeIndex;

        // Находим все элементы .company-card
        const companyNames = document.querySelectorAll('.company-card');

        // Удаляем класс 'active' у всех .company-name
        companyNames.forEach(name => name.classList.remove('active'));

        // Добавляем класс 'active' элементу с текущим индексом
        if (companyNames[activeIndex]) {
			companyNames[activeIndex].classList.add('active');
        }
    });

    // technoSlider
    let technoSlider;
    function toggleSlider() {
        const screenWidth = window.innerWidth;
    
        if (screenWidth < 768) {
            if (!technoSlider) {
                
                technoSlider = new Swiper('.technology-slider', {
                    slidesPerView: 'auto',
                    spaceBetween: 35, // Пример настройки отступов между слайдами
                    grid:{
                        rows: 3
                    },
                    pagination: {
                        el: '.technology-pagination',
                        clickable: true,
                    },
                });
            }
        } else {
            if (technoSlider) {
                // Уничтожаем слайдер, если экран больше 768px
                technoSlider.destroy(true, true);
                technoSlider = null; // Сбрасываем переменную
            }
        }
    }
    
    // Вызываем функцию при загрузке страницы
    toggleSlider();
    
    // Добавляем слушатель для события изменения размера экрана
    window.addEventListener('resize', toggleSlider);
   
     // teamSlider;
    let teamSlider;

    function toggleTeamSlider() {
        const screenWidth = window.innerWidth;
    
        const teamSwiperElement = document.querySelector('.team-swiper'); // Проверяем наличие элемента
    
        
        if (screenWidth < 768) {
            if (!teamSlider) {
                // Инициализация слайдера
                teamSlider = new Swiper('.team-swiper', {
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                    grid:{
                        rows: 2
                    },
                    pagination: {
                        el: '.team-pagination',
                        clickable: true,
                    },
                });
            }
        } else {
            if (teamSlider) {
                // Уничтожение слайдера
                teamSlider.destroy(true, true);
                teamSlider = null;
            }
        }
    }
    
    // Вызываем функцию при загрузке страницы
    document.addEventListener('DOMContentLoaded', toggleTeamSlider);
    
    // Добавляем слушатель для изменения размера экрана
    window.addEventListener('resize', toggleTeamSlider);

    // portfolio slider
    let portfolioSlider = new Swiper('.portfolio-slider', {
        effect: "cards",
        grabCursor: true,
        pagination: {
            el: '.portfolio-pagination',
            clickable: true,
        },
    });



});