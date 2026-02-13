//document.addEventListener('DOMContentLoaded', function () {
//    // ========== MENU MOBILE ==========
//    const mobileMenuButton = document.querySelector('.ws-mobile-menu-button');
//    const navList = document.querySelector('.ws-nav-list');
//    const navOverlay = document.querySelector('.ws-nav-overlay');
//    const nav = document.querySelector('.ws-nav');

//    // Debug inicial
//    console.log('Elementos do menu:', {
//        button: mobileMenuButton,
//        menu: navList,
//        overlay: navOverlay,
//        nav: nav
//    });

//    if (!mobileMenuButton || !navList) {
//        console.error('Elementos essenciais não encontrados! Verifique:');
//        console.error('- Botão: .ws-mobile-menu-button');
//        console.error('- Menu: .ws-nav-list');
//    } else {
//        // Função para abrir/fechar menu
//        function toggleMenu() {
//            const isOpening = !mobileMenuButton.classList.contains('active');

//            // Alterna classes
//            mobileMenuButton.classList.toggle('active');
//            nav.classList.toggle('active');
//            navList.classList.toggle('active');

//            // Controle de scroll
//            document.body.style.overflow = isOpening ? 'hidden' : 'auto';

//            // Debug
//            console.log('Menu:', isOpening ? 'ABERTO' : 'FECHADO');
//        }

//        // Evento do botão
//        mobileMenuButton.addEventListener('click', function (e) {
//            e.stopPropagation();
//            toggleMenu();
//        });

//        // Fechar ao clicar nos links
//        document.querySelectorAll('.ws-nav-list a').forEach(link => {
//            link.addEventListener('click', function () {
//                if (nav.classList.contains('active')) {
//                    toggleMenu();
//                }
//            });
//        });

//        // Fechar ao clicar fora (no overlay)
//        if (navOverlay) {
//            navOverlay.addEventListener('click', toggleMenu);
//        } else {
//            document.addEventListener('click', function (e) {
//                if (!nav.contains(e.target) && !mobileMenuButton.contains(e.target)) {
//                    nav.classList.remove('active');
//                    mobileMenuButton.classList.remove('active');
//                    navList.classList.remove('active');
//                    document.body.style.overflow = 'auto';
//                }
//            });
//        }
//    }

//    // ========== COUNTDOWN ==========
//    function startCountdown() {
//        const daysElement = document.getElementById("days");
//        const hoursElement = document.getElementById("hours");
//        const minutesElement = document.getElementById("minutes");
//        const secondsElement = document.getElementById("seconds");
//        const countdownElement = document.querySelector(".ws-countdown");

//        if (!daysElement || !hoursElement || !minutesElement || !secondsElement || !countdownElement) {
//            console.error("Elementos do countdown não encontrados!");
//            return;
//        }

//        const countdownDate = new Date("April 15, 2025 00:00:00").getTime();

//        function updateCountdown() {
//            const now = new Date().getTime();
//            const distance = countdownDate - now;

//            const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
//            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
//            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
//            const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');

//            daysElement.textContent = days;
//            hoursElement.textContent = hours;
//            minutesElement.textContent = minutes;
//            secondsElement.textContent = seconds;

//            if (distance < 0) {
//                clearInterval(countdownInterval);
//                countdownElement.innerHTML = "<div style='color:white;padding:10px;'>O Wella App já está disponível!</div>";
//            }
//        }

//        // Atualização inicial para evitar delay
//        updateCountdown();
//        const countdownInterval = setInterval(updateCountdown, 1000);
//    }

//    // Iniciando o countdown
//    startCountdown();

//    // ========== TABS ==========
//    // Tabs da seção Wella
//    const wellaButtons = document.querySelectorAll('.tab-button-wella');
//    if (wellaButtons.length) {
//        wellaButtons.forEach(button => {
//            button.addEventListener('click', () => {
//                wellaButtons.forEach(btn => btn.classList.remove('selected'));
//                button.classList.add('selected');

//                document.querySelectorAll('.tab-panel-wella').forEach(panel => panel.classList.remove('active'));

//                const tabpanel = document.getElementById(button.getAttribute('aria-controls'));
//                if (tabpanel) tabpanel.classList.add('active');
//            });
//        });
//    }

//    // Tabs da seção Instalações
//    const instalacoesButtons = document.querySelectorAll('.tab-button-instalacoes');
//    if (instalacoesButtons.length) {
//        instalacoesButtons.forEach(button => {
//            button.addEventListener('click', () => {
//                instalacoesButtons.forEach(btn => btn.classList.remove('selected'));
//                button.classList.add('selected');

//                document.querySelectorAll('.tab-panel-instalacoes').forEach(panel => panel.classList.remove('active'));

//                const tabpanel = document.getElementById(button.getAttribute('aria-controls'));
//                if (tabpanel) tabpanel.classList.add('active');
//            });
//        });
//    }
//});

document.addEventListener('DOMContentLoaded', function () {
    // ========== MENU MOBILE ==========
    function initMobileMenu() {
        const mobileMenuButton = document.querySelector('.ws-mobile-menu-button');
        const nav = document.querySelector('.ws-nav');
        const dropdownToggles = document.querySelectorAll('.ws-dropdown-toggle');

        if (!mobileMenuButton || !nav) return;

        // Abrir/fechar menu principal
        mobileMenuButton.addEventListener('click', function (e) {
            e.stopPropagation();
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Manipulação dos dropdowns no mobile
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', handleDropdownClick);
        });

        // Fechar dropdowns ao clicar fora
        document.addEventListener('click', handleClickOutside);
    }

    function handleDropdownClick(e) {
        if (window.innerWidth > 992) return;

        e.preventDefault();
        e.stopPropagation();

        const dropdown = this.closest('.ws-dropdown');
        const isOpen = dropdown.classList.contains('active');

        // Fecha todos os outros dropdowns
        closeAllDropdowns(dropdown);

        // Abre/fecha o dropdown atual
        dropdown.classList.toggle('active', !isOpen);
    }

    function handleClickOutside(e) {
        if (window.innerWidth > 992) return;

        if (!e.target.closest('.ws-dropdown') && !e.target.closest('.ws-mobile-menu-button')) {
            closeAllDropdowns();
        }
    }

    function closeAllDropdowns(excludeDropdown = null) {
        document.querySelectorAll('.ws-dropdown').forEach(item => {
            if (item !== excludeDropdown) {
                item.classList.remove('active');
            }
        });
    }

    // ========== COUNTUP ==========
    function initCountup() {
        const daysElement = document.getElementById("days");
        const hoursElement = document.getElementById("hours");
        const minutesElement = document.getElementById("minutes");
        const secondsElement = document.getElementById("seconds");
        const countupElement = document.querySelector(".ws-countdown");
        const hourglassImg = document.querySelector(".ws-hour-img"); // Nova linha para pegar a ampulheta

        if (!validateCountupElements(daysElement, hoursElement, minutesElement, secondsElement, countupElement, hourglassImg)) {
            return;
        }

        const startDate = new Date("April 18, 2025 00:00:00").getTime();

        // Configuração inicial da animação
        hourglassImg.style.transition = "transform 1s ease-out";
        hourglassImg.style.transformOrigin = "center center";

        const countupInterval = setInterval(() => {
            updateCountup(startDate, daysElement, hoursElement, minutesElement, secondsElement, countupElement, hourglassImg);
        }, 1000);

        // Atualização inicial para evitar delay
        updateCountup(startDate, daysElement, hoursElement, minutesElement, secondsElement, countupElement, hourglassImg);
    }

    function validateCountupElements(...elements) {
        const isValid = elements.every(el => el !== null);
        if (!isValid) {
            console.error("Elementos do countup não encontrados!");
        }
        return isValid;
    }

    function updateCountup(startDate, daysEl, hoursEl, minutesEl, secondsEl, containerEl, hourglassImg) {
        const now = new Date().getTime();
        const distance = now - startDate;

        // Se a data inicial ainda não chegou, mostrar zeros
        if (distance < 0) {
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            hourglassImg.style.transform = "rotate(0deg)"; // Reseta a rotação
            return;
        }

        daysEl.textContent = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        hoursEl.textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        minutesEl.textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        secondsEl.textContent = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');

        // Animação de rotação baseada no tempo
        const rotation = (now / 100) % 360; // Rotação completa a cada 6 segundos (ajuste conforme necessário)
        hourglassImg.style.transform = `rotate(${rotation}deg)`;
    }

    // ========== TABS ==========
    function initTabs() {
        initWellaTabs();
        initInstalacoesTabs();
    }

    function initWellaTabs() {
        const wellaButtons = document.querySelectorAll('.tab-button-wella');
        if (!wellaButtons.length) return;

        wellaButtons.forEach(button => {
            button.addEventListener('click', () => handleTabClick(button, wellaButtons, 'tab-panel-wella'));
        });
    }

    function initInstalacoesTabs() {
        const instalacoesButtons = document.querySelectorAll('.tab-button-instalacoes');
        if (!instalacoesButtons.length) return;

        instalacoesButtons.forEach(button => {
            button.addEventListener('click', () => handleTabClick(button, instalacoesButtons, 'tab-panel-instalacoes'));
        });
    }

    function handleTabClick(clickedButton, allButtons, panelClass) {
        // Desmarca todos os botões
        allButtons.forEach(btn => btn.classList.remove('selected'));
        // Marca o botão clicado
        clickedButton.classList.add('selected');

        // Esconde todos os painéis
        document.querySelectorAll(`.${panelClass}`).forEach(panel => panel.classList.remove('active'));

        // Mostra o painel correspondente
        const tabpanel = document.getElementById(clickedButton.getAttribute('aria-controls'));
        if (tabpanel) tabpanel.classList.add('active');
    }

    // ========== INICIALIZAÇÃO ==========
    initMobileMenu();
    initCountup();
    initTabs();
});
