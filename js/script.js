//Появление фиксированного меню
class FixedHeader {
    constructor() {
        this.lastScroll = window.scrollY;
        this.navbar = document.getElementById('navbar');
        this.burger = document.querySelector('.burger');
        this.init();
    }

    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        this.lastScroll = window.scrollY;
        if (this.lastScroll > 100) {
            this.navbar.classList.add('scrolled');
            this.burger.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
            this.burger.classList.remove('scrolled');
        }
    }
}

//Для плавного перехода по якорям
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick(event) {
        const target = event.target.closest('[href^="#"]');
        
        if (target && target.hash !== '') {
            event.preventDefault();
            const id = target.getAttribute('href');
            const element = document.querySelector(id);
            
            if (element) {
                const top = element.getBoundingClientRect().top + window.pageYOffset - 160;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            } else {
                console.error(`Элемент с идентификатором ${id} не найден.`);
            }
        }
    }
}


// Адаптивное меню ("Бургер-меню")
class BurgerMenu {
    constructor() {
        this.burger = document.querySelector('.burger');
        this.nav = document.querySelector('.nav');
        this.navLinks = document.querySelectorAll('.nav__link');
        this.init();
    }

    init() {
        if (this.burger && this.nav) {
            this.burger.addEventListener('click', this.toggleMenu.bind(this));
            this.navLinks.forEach(link => {
                link.addEventListener('click', this.closeMenu.bind(this));
            });
            document.addEventListener('keydown', this.handleKeyDown.bind(this));
        }
    }

    toggleMenu() {
        this.burger.classList.toggle('active');
        this.nav.classList.toggle('active');
        document.body.style.overflow = this.nav.classList.contains('active') ? 'hidden' : '';
    }

    closeMenu() {
        this.burger.classList.remove('active');
        this.nav.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleKeyDown(event) {
        if (event.key === 'Escape' && this.nav.classList.contains('active')) {
            this.closeMenu();
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new FixedHeader();
    new SmoothScroll();
    new BurgerMenu();
});