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
});