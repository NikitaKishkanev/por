// Открытие/закрытие меню на мобильных устройствах
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = this.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
            
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Анимация появления шапки при скролле
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Подсветка активного раздела
        highlightActiveSection();
    });
    
    // Подсветка активного раздела
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Анимация счетчика дней
    const statNumber = document.querySelector('.stat-number[data-count]');
    if (statNumber) {
        const target = parseInt(statNumber.getAttribute('data-count'));
        const startDate = new Date('2020-05-15'); // ЗАМЕНИТЕ НА ДАТУ ВАШЕГО ЗНАКОМСТВА
        const today = new Date();
        const daysTogether = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
        
        statNumber.setAttribute('data-count', daysTogether);
        
        let count = 0;
        const increment = Math.ceil(daysTogether / 100);
        const timer = setInterval(() => {
            count += increment;
            if (count >= daysTogether) {
                count = daysTogether;
                clearInterval(timer);
            }
            statNumber.textContent = count.toLocaleString();
        }, 20);
    }
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Секретный раздел - проверка пароля
    const unlockButton = document.getElementById('unlockButton');
    const secretPassword = document.getElementById('secretPassword');
    const secretContent = document.getElementById('secretContent');
    
    if (unlockButton && secretPassword) {
        unlockButton.addEventListener('click', function() {
            // ЗАМЕНИТЕ '15052020' НА РЕАЛЬНУЮ ДАТУ В ФОРМАТЕ ДДММГГГГ
            const correctPassword = '15052020'; // Пример: 15 мая 2020
            
            if (secretPassword.value === correctPassword) {
                secretContent.classList.remove('hidden');
                secretPassword.value = '';
                secretPassword.placeholder = 'Пароль верный!';
                secretPassword.style.borderColor = '#4CAF50';
                
                // Плавная прокрутка к контенту
                secretContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                secretPassword.style.borderColor = '#f44336';
                secretPassword.value = '';
                secretPassword.placeholder = 'Неверный пароль, попробуй еще';
                
                // Анимация тряски
                secretPassword.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    secretPassword.style.animation = '';
                }, 500);
            }
        });
        
        // Разрешаем нажимать Enter в поле пароля
        secretPassword.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                unlockButton.click();
            }
        });
    }
    
    // Кнопки ответа на предложение
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const yesResponse = document.getElementById('yesResponse');
    
    if (yesBtn) {
        yesBtn.addEventListener('click', function() {
            yesResponse.classList.remove('hidden');
            
            // Анимация конфетти
            createConfetti();
            
            // Прокрутка к ответу
            yesResponse.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
    
    if (noBtn) {
        noBtn.addEventListener('click', function() {
            // Забавная реакция на "Может быть"
            const messages = [
                "Подумай еще раз...",
                "Уверен?",
                "Очень надеюсь, что это шутка!",
                "Пожалуйста, скажи ДА!",
                "Я буду спрашивать каждый день!"
            ];
            
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            noBtn.innerHTML = `<i class="fas fa-heart-broken"></i> ${randomMessage}`;
            
            // Двигаем кнопку при наведении
            noBtn.addEventListener('mouseover', function() {
                const x = Math.random() * 100 - 50;
                const y = Math.random() * 100 - 50;
                this.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
    
    // Функция создания конфетти
    function createConfetti() {
        const colors = ['#ff6b9d', '#4CAF50', '#2196F3', '#FFEB3B', '#9C27B0'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.textContent = ['🎉', '🎊', '💖', '💍', '✨'][Math.floor(Math.random() * 5)];
            confetti.style.position = 'fixed';
            confetti.style.fontSize = Math.random() * 20 + 10 + 'px';
            confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-50px';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            // Анимация падения
            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
            });
            
            animation.onfinish = () => confetti.remove();
        }
    }
    
    // Добавляем CSS для анимации тряски
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});