// ===== КОНФИГУРАЦИЯ И УТИЛИТЫ =====
const CONFIG = {
    APP_VERSION: '2.1',
    ENCRYPTION_KEY: 'mypet-plus-secure-2024',
    STORAGE_KEYS: {
        USER: 'mypet_user_v3',
        PETS: 'mypet_pets_v3',
        EVENTS: 'mypet_events_v3',
        NOTIFICATIONS: 'mypet_notifications_v3',
        SETTINGS: 'mypet_settings_v3',
        USERS: 'mypet_all_users_v3',
        VACCINATIONS: 'mypet_vaccinations_v3',
        MEDICATIONS: 'mypet_medications_v3',
        WATER_REMINDERS: 'mypet_water_reminders_v3'
    }
};

// ===== FONT AWESOME ИКОНКИ =====
function getEventIconFA(type) {
    const icons = {
        'feeding': 'fas fa-bowl-food',
        'water': 'fas fa-tint',
        'medication': 'fas fa-pills',
        'vet': 'fas fa-stethoscope',
        'walk': 'fas fa-walking',
        'grooming': 'fas fa-bath',
        'training': 'fas fa-dumbbell',
        'other': 'fas fa-info-circle'
    };
    return icons[type] || 'fas fa-info-circle';
}

function getPetIconFA(type) {
    const icons = {
        'dog': 'fas fa-dog',
        'cat': 'fas fa-cat',
        'rabbit': 'fas fa-paw',
        'bird': 'fas fa-dove',
        'other': 'fas fa-paw'
    };
    return icons[type] || 'fas fa-paw';
}

function getNotificationIconFA(type) {
    const icons = {
        'feeding': 'fas fa-bowl-food',
        'water': 'fas fa-tint',
        'medication': 'fas fa-pills',
        'vet': 'fas fa-stethoscope',
        'walk': 'fas fa-walking',
        'system': 'fas fa-bell',
        'training': 'fas fa-dumbbell'
    };
    return icons[type] || 'fas fa-bell';
}

// База кормов с калорийностью (ккал/100г)
const FOOD_DATABASE = {
    dog: {
        dry: [
            { id: 'dog_dry_1', name: 'Royal Canin Mini Adult', brand: 'Royal Canin', calories: 365, type: 'dry' },
            { id: 'dog_dry_2', name: 'Purina Pro Plan', brand: 'Purina', calories: 380, type: 'dry' },
            { id: 'dog_dry_3', name: 'Acana Heritage', brand: 'Acana', calories: 390, type: 'dry' },
            { id: 'dog_dry_4', name: 'Brit Care', brand: 'Brit', calories: 370, type: 'dry' },
            { id: 'dog_dry_5', name: 'Grandorf', brand: 'Grandorf', calories: 385, type: 'dry' }
        ],
        wet: [
            { id: 'dog_wet_1', name: 'Royal Canin консервы', brand: 'Royal Canin', calories: 95, type: 'wet' },
            { id: 'dog_wet_2', name: 'Purina Pro Plan консервы', brand: 'Purina', calories: 85, type: 'wet' }
        ],
        natural: [
            { id: 'dog_nat_1', name: 'Курица отварная', calories: 165, type: 'natural' },
            { id: 'dog_nat_2', name: 'Говядина отварная', calories: 175, type: 'natural' },
            { id: 'dog_nat_3', name: 'Рис отварной', calories: 130, type: 'natural' },
            { id: 'dog_nat_4', name: 'Гречка отварная', calories: 110, type: 'natural' }
        ]
    },
    cat: {
        dry: [
            { id: 'cat_dry_1', name: 'Royal Canin Sterilised', brand: 'Royal Canin', calories: 375, type: 'dry' },
            { id: 'cat_dry_2', name: 'Purina One Sterilised', brand: 'Purina', calories: 385, type: 'dry' },
            { id: 'cat_dry_3', name: 'Acana Wild Prairie', brand: 'Acana', calories: 395, type: 'dry' },
            { id: 'cat_dry_4', name: 'Brit Care Sterilised', brand: 'Brit', calories: 380, type: 'dry' }
        ],
        wet: [
            { id: 'cat_wet_1', name: 'Royal Canin пауч', brand: 'Royal Canin', calories: 85, type: 'wet' },
            { id: 'cat_wet_2', name: 'Purina Felix', brand: 'Purina', calories: 78, type: 'wet' },
            { id: 'cat_wet_3', name: 'Whiskas', brand: 'Whiskas', calories: 82, type: 'wet' }
        ],
        natural: [
            { id: 'cat_nat_1', name: 'Курица отварная', calories: 165, type: 'natural' },
            { id: 'cat_nat_2', name: 'Индейка отварная', calories: 155, type: 'natural' },
            { id: 'cat_nat_3', name: 'Говядина отварная', calories: 175, type: 'natural' },
            { id: 'cat_nat_4', name: 'Рыба отварная', calories: 145, type: 'natural' }
        ]
    }
};

// База видео для обучения
const LEARNING_VIDEOS = {
    training: [
        { id: 'train_1', title: 'Базовые команды для собак', duration: '8:15', category: 'training', description: 'Обучение командам "сидеть", "лежать", "ко мне"' },
        { id: 'train_2', title: 'Приучение к туалету', duration: '10:30', category: 'training', description: 'Как приучить щенка к пеленке или лотку' },
        { id: 'train_3', title: 'Поводок и ошейник', duration: '6:45', category: 'training', description: 'Приучение к амуниции для прогулок' }
    ],
    grooming: [
        { id: 'groom_1', title: 'Стрижка когтей', duration: '7:20', category: 'grooming', description: 'Безопасная стрижка когтей в домашних условиях' },
        { id: 'groom_2', title: 'Чистка ушей', duration: '5:10', category: 'grooming', description: 'Правильный уход за ушами питомца' },
        { id: 'groom_3', title: 'Расчесывание шерсти', duration: '9:05', category: 'grooming', description: 'Техники расчесывания для разных типов шерсти' }
    ],
    health: [
        { id: 'health_1', title: 'Первая помощь питомцу', duration: '12:45', category: 'health', description: 'Что делать в экстренных ситуациях' },
        { id: 'health_2', title: 'Прививки и вакцинация', duration: '11:20', category: 'health', description: 'Календарь прививок и важность вакцинации' },
        { id: 'health_3', title: 'Профилактика паразитов', duration: '8:30', category: 'health', description: 'Защита от блох, клещей и глистов' }
    ],
    nutrition: [
        { id: 'nutr_1', title: 'Правильное кормление', duration: '9:15', category: 'nutrition', description: 'Режим и нормы кормления' },
        { id: 'nutr_2', title: 'Натуральное питание', duration: '14:20', category: 'nutrition', description: 'Сбалансированный рацион из натуральных продуктов' },
        { id: 'nutr_3', title: 'Пищевая аллергия', duration: '7:45', category: 'nutrition', description: 'Признаки и лечение пищевой аллергии' }
    ]
};

// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let currentUser = null;
let currentPets = [];
let currentEvents = [];
let currentNotifications = [];
let allUsers = [];
let currentSettings = {};
let vaccinations = [];
let medications = [];
let waterReminders = [];
let currentScreen = 'loading';
let selectedDate = new Date();
let selectedPetId = null;
let calendarYear = new Date().getFullYear();
let calendarMonth = new Date().getMonth();
let selectedFood = null;
let selectedCoefficient = null;
let calculatorStep = 1;

// ===== ШИФРОВАНИЕ И ХРАНЕНИЕ =====
class SimpleEncryption {
    static encrypt(text) {
        try {
            return text; // Временно без шифрования
        } catch (error) {
            console.error('Ошибка шифрования:', error);
            return text;
        }
    }

    static decrypt(encryptedText) {
        try {
            return encryptedText; // Временно без расшифровки
        } catch (error) {
            console.error('Ошибка дешифрования:', error);
            return encryptedText;
        }
    }

    static hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16);
    }
}

class StorageManager {
    static save(key, data) {
        try {
            const encrypted = SimpleEncryption.encrypt(JSON.stringify(data));
            localStorage.setItem(key, encrypted);
            return true;
        } catch (error) {
            console.error(`Ошибка сохранения ${key}:`, error);
            return false;
        }
    }

    static load(key) {
        try {
            const encrypted = localStorage.getItem(key);
            if (!encrypted) return null;
            const decrypted = SimpleEncryption.decrypt(encrypted);
            return JSON.parse(decrypted);
        } catch (error) {
            console.error(`Ошибка загрузки ${key}:`, error);
            return null;
        }
    }

    static remove(key) {
        localStorage.removeItem(key);
    }

    static clearUserData() {
        const keys = [
            CONFIG.STORAGE_KEYS.PETS,
            CONFIG.STORAGE_KEYS.EVENTS,
            CONFIG.STORAGE_KEYS.NOTIFICATIONS,
            CONFIG.STORAGE_KEYS.VACCINATIONS,
            CONFIG.STORAGE_KEYS.MEDICATIONS,
            CONFIG.STORAGE_KEYS.WATER_REMINDERS
        ];
        
        keys.forEach(key => localStorage.removeItem(key));
    }
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('MyPet+ v2.1 загружается...');
    
    // Загружаем данные
    loadAllData();
    
    // Показываем экран загрузки
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = '100%';
    }
    
    // Инициализация приложения
    setTimeout(initApp, 1500);
});

function loadAllData() {
    allUsers = StorageManager.load(CONFIG.STORAGE_KEYS.USERS) || [];
    currentSettings = StorageManager.load(CONFIG.STORAGE_KEYS.SETTINGS) || {
        theme: 'light',
        notifications: true,
        reminders: true,
        waterReminders: true
    };
    
    // Если есть сохраненный пользователь, загружаем его данные
    const lastUserId = localStorage.getItem('last_user_id');
    if (lastUserId) {
        loadUserData(lastUserId);
    }
}

function loadUserData(userId) {
    const user = allUsers.find(u => u.id === userId);
    if (!user) return false;
    
    currentUser = user;
    currentPets = StorageManager.load(`${CONFIG.STORAGE_KEYS.PETS}_${userId}`) || [];
    currentEvents = StorageManager.load(`${CONFIG.STORAGE_KEYS.EVENTS}_${userId}`) || [];
    currentNotifications = StorageManager.load(`${CONFIG.STORAGE_KEYS.NOTIFICATIONS}_${userId}`) || [];
    vaccinations = StorageManager.load(`${CONFIG.STORAGE_KEYS.VACCINATIONS}_${userId}`) || [];
    medications = StorageManager.load(`${CONFIG.STORAGE_KEYS.MEDICATIONS}_${userId}`) || [];
    waterReminders = StorageManager.load(`${CONFIG.STORAGE_KEYS.WATER_REMINDERS}_${userId}`) || [];
    
    localStorage.setItem('last_user_id', userId);
    return true;
}

function saveUserData() {
    if (!currentUser) return;
    
    // Сохраняем пользователя в общий список
    const userIndex = allUsers.findIndex(u => u.id === currentUser.id);
    if (userIndex === -1) {
        allUsers.push(currentUser);
    } else {
        allUsers[userIndex] = currentUser;
    }
    
    StorageManager.save(CONFIG.STORAGE_KEYS.USERS, allUsers);
    
    // Сохраняем данные пользователя
    StorageManager.save(`${CONFIG.STORAGE_KEYS.PETS}_${currentUser.id}`, currentPets);
    StorageManager.save(`${CONFIG.STORAGE_KEYS.EVENTS}_${currentUser.id}`, currentEvents);
    StorageManager.save(`${CONFIG.STORAGE_KEYS.NOTIFICATIONS}_${currentUser.id}`, currentNotifications);
    StorageManager.save(`${CONFIG.STORAGE_KEYS.VACCINATIONS}_${currentUser.id}`, vaccinations);
    StorageManager.save(`${CONFIG.STORAGE_KEYS.MEDICATIONS}_${currentUser.id}`, medications);
    StorageManager.save(`${CONFIG.STORAGE_KEYS.WATER_REMINDERS}_${currentUser.id}`, waterReminders);
    
    // Сохраняем настройки
    StorageManager.save(CONFIG.STORAGE_KEYS.SETTINGS, currentSettings);
    
    localStorage.setItem('last_user_id', currentUser.id);
}

function initApp() {
    console.log('MyPet+ v2.1 загружается...');
    
    // Загружаем данные
    loadAllData();
    
    // Показываем экран загрузки
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = '100%';
    }
    
    // Инициализация приложения
    setTimeout(() => {
        // Инициализируем все обработчики
        initEventListeners();
        
        // ИНИЦИАЛИЗИРУЕМ ТЕМУ ПРИ ЗАГРУЗКЕ
        initTheme();
        
        updateNotificationCount();
        
        // Проверяем наличие пользователей
        if (allUsers.length === 0) {
            showScreen('register');
        } else {
            // Если нет текущего пользователя, показываем экран выбора
            if (!currentUser) {
                showScreen('login');
            } else {
                showScreen('main');
                loadScreenContent('calendar');
                updateUserInfo();
            }
        }
        
        console.log('MyPet+ инициализирован');
    }, 1500);
}

// ===== УПРАВЛЕНИЕ ЭКРАНАМИ =====
function showScreen(screenName) {
    console.log('Показываем экран:', screenName);
    
    // Скрыть все экраны
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Показать выбранный экран
    const screenElement = document.getElementById(`${screenName}-screen`);
    if (screenElement) {
        screenElement.classList.add('active');
        currentScreen = screenName;
    }
    
    // Обновляем навигацию
    updateNavigation();
    
    // Обновляем информацию пользователя
    if (screenName === 'main' && currentUser) {
        updateUserInfo();
    }
    
    // Если это экран входа, обновляем список пользователей
    if (screenName === 'login') {
        updateUsersList();
    }
}

function updateNavigation() {
    // Обновляем боковое меню
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.screen === currentScreen) {
            item.classList.add('active');
        }
    });
    
    // Обновляем нижнюю навигацию
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.screen === currentScreen) {
            btn.classList.add('active');
        }
    });
}

// ===== ЭКРАН ВХОДА =====
function updateUsersList() {
    const usersList = document.getElementById('users-list');
    if (!usersList) return;
    
    if (allUsers.length === 0) {
        usersList.innerHTML = `
            <div class="text-center" style="padding: 2rem; color: var(--text-muted);">
                <p>Нет сохраненных аккаунтов</p>
            </div>
        `;
        return;
    }
    
    usersList.innerHTML = allUsers.map(user => `
        <div class="user-item ${currentUser?.id === user.id ? 'active' : ''}" 
             onclick="selectUser('${user.id}')">
            <div class="user-item-avatar">
                ${user.photo ? 
                    `<img src="${user.photo}" alt="${user.fullName}">` :
                    `<i class="fas fa-user icon"></i>`
                }
            </div>
            <div class="user-item-info">
                <div class="user-item-name">${user.fullName}</div>
                <div class="user-item-email">${user.emailPhone}</div>
            </div>
        </div>
    `).join('');
}

function selectUser(userId) {
    const success = loadUserData(userId);
    if (success) {
        showScreen('main');
        loadScreenContent('calendar');
        updateUserInfo();
        showNotification('Вход выполнен', `Добро пожаловать, ${currentUser.firstName}!`);
    }
}

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
function initEventListeners() {
    console.log('Инициализация обработчиков...');
    
    // Навигация между экранами
    document.getElementById('back-to-loading-from-login')?.addEventListener('click', () => {
        showScreen('loading');
        setTimeout(() => showScreen('login'), 500);
    });
    
    document.getElementById('back-to-login')?.addEventListener('click', () => {
        showScreen('login');
    });
    
    document.getElementById('goto-register')?.addEventListener('click', () => {
        showScreen('register');
    });
    
    document.getElementById('goto-login')?.addEventListener('click', (e) => {
        e.preventDefault();
        showScreen('login');
    });
    
    // НОВЫЕ КНОПКИ НАЗАД ДЛЯ НОВЫХ ЭКРАНОВ
    document.getElementById('back-from-chat')?.addEventListener('click', () => {
        showScreen('main');
        loadScreenContent('chat');
    });
    
    document.getElementById('back-from-social')?.addEventListener('click', () => {
        showScreen('main');
        loadScreenContent('social');
    });
    
    document.getElementById('back-from-marketplace')?.addEventListener('click', () => {
        showScreen('main');
        loadScreenContent('marketplace');
    });
    
    document.getElementById('back-from-profile')?.addEventListener('click', () => {
        showScreen('main');
        loadScreenContent('profile');
    });
    
    // ИСПРАВЛЕННАЯ СТРОКА: Назад из настроек возвращает в профиль
    document.getElementById('back-from-settings')?.addEventListener('click', () => {
        showScreen('main');
        loadScreenContent('profile');
    });
    
    document.getElementById('back-from-backup')?.addEventListener('click', () => {
        showScreen('settings');
    });
    
    document.getElementById('back-from-learning')?.addEventListener('click', () => {
        showScreen('main');
        loadScreenContent('learning');
    });
    
    // Кнопка открытия настроек из профиля
    document.getElementById('open-settings-btn')?.addEventListener('click', () => {
        showScreen('settings');
    });
    
    // Кнопка резервного копирования из профиля
    document.getElementById('backup-btn')?.addEventListener('click', () => {
        showScreen('backup');
    });
    
    // ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Установить начальное состояние из настроек
        themeToggle.checked = currentSettings.theme === 'dark';
        
        // Добавить обработчик изменения
        themeToggle.addEventListener('change', toggleTheme);
    }
    
    // "О приложении" (раскрытие/скрытие)
    document.getElementById('about-app')?.addEventListener('click', function() {
        const aboutInfo = document.getElementById('about-app-info');
        if (aboutInfo) {
            aboutInfo.style.display = aboutInfo.style.display === 'none' ? 'block' : 'none';
        }
    });
    
    // Переключение видимости пароля
    initPasswordToggles();
    
    // Форма регистрации
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            registerUser();
        });
    }
    
    // Форма быстрого входа
    const loginForm = document.getElementById('quick-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            quickLogin();
        });
    }
    
    // Боковое меню
    initSidebar();
    
    // Навигация
    initNavigation();
    
    // Модальные окна
    initModals();
    
    // Уведомления
    initNotifications();
    
    // Настройки
    initSettings();

    // Закрытие калькулятора корма по крестику
    document.getElementById('close-food-calculator')?.addEventListener('click', closeFoodCalculator);
    
    // Кнопка закрытия окна выбора корма
    document.getElementById('close-food-selector')?.addEventListener('click', closeFoodSelector);
    
    // ===== УДАЛЕНИЕ АККАУНТА =====
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    const deleteAccountModal = document.getElementById('delete-account-modal');
    const closeDeleteAccountModal = document.getElementById('close-delete-account-modal');
    const cancelDeleteAccount = document.getElementById('cancel-delete-account');
    const confirmDeleteText = document.getElementById('confirm-delete-text');
    const confirmDeleteAccount = document.getElementById('confirm-delete-account');

    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            openDeleteAccountModal();
        });
    }

    if (closeDeleteAccountModal) {
        closeDeleteAccountModal.addEventListener('click', function() {
            closeDeleteAccountModalFunc();
        });
    }

    if (cancelDeleteAccount) {
        cancelDeleteAccount.addEventListener('click', function() {
            closeDeleteAccountModalFunc();
        });
    }

    if (confirmDeleteText) {
        confirmDeleteText.addEventListener('input', function() {
            validateDeleteConfirmation();
        });
    }

    if (confirmDeleteAccount) {
        confirmDeleteAccount.addEventListener('click', function() {
            deleteUserAccount();
        });
    }

    // Закрытие по клику на overlay
    if (deleteAccountModal) {
        deleteAccountModal.addEventListener('click', function(e) {
            if (e.target === this || e.target.classList.contains('modal-overlay')) {
                closeDeleteAccountModalFunc();
            }
        });
    }
}

function initPasswordToggles() {
    // Регистрация
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            this.innerHTML = type === 'password' ? 
                '<i class="fas fa-eye icon"></i>' : 
                '<i class="fas fa-eye-slash icon"></i>';
        });
        
        // Валидация пароля
        passwordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }
    
    // Логин
    const toggleLoginPassword = document.getElementById('toggle-login-password');
    const loginPasswordInput = document.getElementById('login-password');
    
    if (toggleLoginPassword && loginPasswordInput) {
        toggleLoginPassword.addEventListener('click', function() {
            const type = loginPasswordInput.type === 'password' ? 'text' : 'password';
            loginPasswordInput.type = type;
            this.innerHTML = type === 'password' ? 
                '<i class="fas fa-eye icon"></i>' : 
                '<i class="fas fa-eye-slash icon"></i>';
        });
    }
}

// ===== РЕГИСТРАЦИЯ И АВТОРИЗАЦИЯ =====
function checkPasswordStrength(password) {
    const strengthLevel = document.getElementById('strength-level');
    const strengthText = document.getElementById('strength-text');
    const strengthScore = document.getElementById('strength-score');
    
    if (!strengthLevel || !strengthText || !strengthScore) return;
    
    let score = 0;
    let text = 'Очень слабый';
    let color = '#EF4444';
    let width = 25;
    
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score === 0) {
        text = 'Очень слабый';
        color = '#EF4444';
        width = 25;
    } else if (score === 1) {
        text = 'Слабый';
        color = '#F59E0B';
        width = 40;
    } else if (score === 2) {
        text = 'Средний';
        color = '#10B981';
        width = 60;
    } else if (score === 3) {
        text = 'Хороший';
        color = '#3B82F6';
        width = 80;
    } else if (score === 4) {
        text = 'Отличный';
        color = '#7FB5B5';
        width = 100;
    }
    
    strengthLevel.style.width = `${width}%`;
    strengthLevel.style.backgroundColor = color;
    strengthText.textContent = text;
    strengthText.style.color = color;
    strengthScore.textContent = `${score}/4`;
    strengthScore.style.color = color;
}

function registerUser() {
    const emailPhone = document.getElementById('email-phone').value.trim();
    const password = document.getElementById('password').value;
    const lastName = document.getElementById('lastname').value.trim();
    const firstName = document.getElementById('firstname').value.trim();
    const middleName = document.getElementById('middlename').value.trim();
    const birthdate = document.getElementById('birthdate').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value || 'male';
    const city = document.getElementById('city').value;
    
    // ВАЛИДАЦИЯ
    if (!validateEmailPhone(emailPhone)) {
        showError('email-phone-error', 'Введите корректный email или телефон');
        return;
    }
    
    if (password.length < 8) {
        showError('email-phone-error', 'Пароль должен содержать минимум 8 символов');
        return;
    }
    
    // Проверяем, нет ли уже такого пользователя
    if (allUsers.some(user => user.emailPhone === emailPhone)) {
        showError('email-phone-error', 'Пользователь с таким email/телефоном уже существует');
        return;
    }
    
    // ОПРЕДЕЛЯЕМ, ЧТО ВВЕЛ ПОЛЬЗОВАТЕЛЬ: EMAIL ИЛИ ТЕЛЕФОН
    const isEmail = emailPhone.includes('@');
    
    // СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ С ОБНОВЛЕННОЙ СТРУКТУРОЙ
    currentUser = {
        id: generateId(),
        emailPhone: emailPhone,                    // для обратной совместимости
        email: isEmail ? emailPhone : null,        // новое: отдельно email
        phone: !isEmail ? emailPhone : null,       // новое: отдельно телефон
        passwordHash: SimpleEncryption.hashPassword(password),
        lastName: lastName,
        firstName: firstName,
        middleName: middleName,
        fullName: `${lastName} ${firstName} ${middleName || ''}`.trim(),
        birthdate: birthdate,
        gender: gender,
        city: city,
        registeredAt: new Date().toISOString(),
        photo: null,
        emailVerified: false,                      // новый флаг
        phoneVerified: false,                      // новый флаг
        // Дополнительные поля для будущего
        lastLogin: null,
        preferences: {
            notifications: true,
            theme: 'light',
            language: 'ru'
        }
    };
    
    // ИНИЦИАЛИЗИРУЕМ ПУСТЫЕ ДАННЫЕ ДЛЯ НОВОГО ПОЛЬЗОВАТЕЛЯ
    currentPets = [];
    currentEvents = [];
    currentNotifications = [];
    vaccinations = [];
    medications = [];
    waterReminders = [];
    
    // ДОБАВЛЯЕМ ПРИВЕТСТВЕННОЕ УВЕДОМЛЕНИЕ
    createNotification(
        '🎉 Добро пожаловать в MyPet+!',
        'Начните с добавления вашего первого питомца.',
        'system'
    );
    
    // СОХРАНЯЕМ ДАННЫЕ
    saveUserData();
    
    // УВЕДОМЛЕНИЕ
    showNotification('🎉 Успешная регистрация!', 'Добро пожаловать в MyPet+!');
    
    // ПЕРЕХОД НА ГЛАВНЫЙ ЭКРАН
    setTimeout(() => {
        showScreen('main');
        loadScreenContent('calendar');
        updateUserInfo();
    }, 1500);
}

function quickLogin() {
    const emailPhone = document.getElementById('login-email-phone').value.trim();
    const password = document.getElementById('login-password').value;
    
    // ПРОВЕРКА ПУСТЫХ ПОЛЕЙ
    if (!emailPhone || !password) {
        showNotification('Ошибка', 'Введите email/телефон и пароль');
        return;
    }
    
    // ИЩЕМ ПОЛЬЗОВАТЕЛЯ ПО emailPhone, email ИЛИ phone
    const user = allUsers.find(u => 
        u.emailPhone === emailPhone || 
        u.email === emailPhone || 
        u.phone === emailPhone
    );
    
    if (!user) {
        showNotification('Ошибка', 'Пользователь не найден');
        return;
    }
    
    // ПРОВЕРЯЕМ ПАРОЛЬ (СРАВНИВАЕМ ХЕШИ)
    const passwordHash = SimpleEncryption.hashPassword(password);
    if (user.passwordHash !== passwordHash) {
        showNotification('Ошибка', 'Неверный пароль');
        return;
    }
    
    // ОБНОВЛЯЕМ ПОСЛЕДНИЙ ВХОД
    user.lastLogin = new Date().toISOString();
    
    // ЗАГРУЖАЕМ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
    const success = loadUserData(user.id);
    if (success) {
        showScreen('main');
        loadScreenContent('calendar');
        updateUserInfo();
        
        // СОЗДАЕМ УВЕДОМЛЕНИЕ О ВХОДЕ
        createNotification(
            '👋 С возвращением!',
            `Рады видеть вас снова, ${user.firstName}!`,
            'system'
        );
        
        showNotification('Вход выполнен', `Добро пожаловать, ${user.firstName}!`);
    } else {
        showNotification('Ошибка', 'Не удалось загрузить данные пользователя');
    }
}

function validateEmailPhone(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{10,14}$/;
    
    return emailRegex.test(value) || phoneRegex.test(value.replace(/\s/g, ''));
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

// ===== БОКОВОЕ МЕНЮ =====
function initSidebar() {
    const menuBtn = document.getElementById('menu-btn');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
    }
    
    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }
    
    // Навигация в боковом меню
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const screen = this.dataset.screen;
            
            sidebar.classList.remove('active');
            
            if (screen === 'settings') {
                showScreen('settings');
            } else {
                loadScreenContent(screen);
                showScreen('main');
            }
        });
    });
    
    // Кнопка выхода/смены аккаунта
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            showScreen('login');
            sidebar.classList.remove('active');
        });
    }
}

function updateUserInfo() {
    if (!currentUser) return;
    
    // Обновление в боковом меню
    const userNameElement = document.getElementById('sidebar-user-name');
    const userEmailElement = document.getElementById('sidebar-user-email');
    const sidebarAvatar = document.getElementById('sidebar-user-avatar');
    const headerAvatar = document.getElementById('user-avatar');
    
    if (userNameElement) {
        userNameElement.textContent = currentUser.fullName;
    }
    
    if (userEmailElement) {
        userEmailElement.textContent = "Настройки и профиль";
    }
    
    // Обновление аватаров
    updateAvatar(sidebarAvatar, currentUser.photo);
    updateAvatar(headerAvatar, currentUser.photo);
    
    // Обновление заголовка
    const screenTitle = document.getElementById('screen-title');
    if (screenTitle) {
        screenTitle.textContent = getScreenTitle(currentScreen);
    }
    
    // Обновление даты
    const subtitle = document.getElementById('screen-subtitle');
    if (subtitle) {
        const today = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        subtitle.textContent = today.toLocaleDateString('ru-RU', options);
    }
}

function updateAvatar(element, photo) {
    if (!element) return;
    
    if (photo) {
        element.innerHTML = `<img src="${photo}" alt="Аватар">`;
        element.classList.add('has-photo');
    } else {
        element.innerHTML = '<i class="fas fa-user icon"></i>';
        element.classList.remove('has-photo');
    }
}

function getScreenTitle(screen) {
    const titles = {
        'calendar': 'Календарь',
        'pets': 'Питомцы',
        'calculator': 'Корм',
        'health': 'Здоровье',
        'learning': 'Обучение',
        // НОВЫЕ РАЗДЕЛЫ
        'chat': 'Чат-помощник',
        'social': 'Соцсеть',
        'marketplace': 'Маркетплейс',
        'profile': 'Профиль',
        'settings': 'Настройки'
    };
    return titles[screen] || 'MyPet+';
}

// ===== ЗАГРУЗКА КОНТЕНТА =====
function loadScreenContent(screenName) {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;
    
    console.log('Загрузка контента:', screenName);
    
    // Обновляем заголовок
    const screenTitle = document.getElementById('screen-title');
    if (screenTitle) {
        screenTitle.textContent = getScreenTitle(screenName);
    }
    
    // Загрузка контента
    switch(screenName) {
        case 'calendar':
            loadCalendarContent();
            break;
        case 'pets':
            loadPetsContent();
            break;
        case 'learning':
            loadLearningContent();
            break;
        // НОВЫЕ РАЗДЕЛЫ
        case 'chat':
            loadChatContent();
            break;
        case 'social':
            loadSocialContent();
            break;
        case 'marketplace':
            loadMarketplaceContent();
            break;
        case 'profile':
            loadProfileContent();
            break;
        default:
            loadCalendarContent();
    }
}

// ===== КАЛЕНДАРЬ =====
function loadCalendarContent() {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;
    
    const today = new Date();
    const month = calendarMonth;
    const year = calendarYear;
    
    // Генерируем календарь
    const calendarHTML = generateCalendarHTML(year, month);
    
    contentArea.innerHTML = `
        <div class="calendar-content">
            <div class="calendar-header">
                <div class="calendar-nav">
                    <button class="calendar-nav-btn" id="prev-month">
                        <i class="fas fa-chevron-left icon"></i>
                    </button>
                    <h2 class="calendar-title" id="calendar-title">${getMonthName(month)} ${year}</h2>
                    <button class="calendar-nav-btn" id="next-month">
                        <i class="fas fa-chevron-right icon"></i>
                    </button>
                </div>
                <button class="add-event-btn" onclick="openAddEventModal()">
                    <i class="fas fa-plus icon"></i>
                    Добавить событие
                </button>
            </div>
            
            <div class="calendar-grid">
                <div class="calendar-weekdays">
                    ${['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => 
                        `<div class="weekday">${day}</div>`
                    ).join('')}
                </div>
                <div class="calendar-days" id="calendar-days">
                    ${calendarHTML}
                </div>
            </div>
            
            <div class="day-events-list" id="day-events-list">
                <h4>События на ${formatDate(selectedDate)}</h4>
                <div id="selected-day-events">
                    ${getDayEventsHTML(selectedDate)}
                </div>
            </div>
        </div>
    `;
    
    // Инициализация навигации по месяцам
    document.getElementById('prev-month')?.addEventListener('click', () => {
        calendarMonth--;
        if (calendarMonth < 0) {
            calendarMonth = 11;
            calendarYear--;
        }
        loadCalendarContent();
    });
    
    document.getElementById('next-month')?.addEventListener('click', () => {
        calendarMonth++;
        if (calendarMonth > 11) {
            calendarMonth = 0;
            calendarYear++;
        }
        loadCalendarContent();
    });
    
    // Обработчики кликов по дням
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.addEventListener('click', function() {
            const dateStr = this.dataset.date;
            if (dateStr) {
                selectedDate = new Date(dateStr);
                loadCalendarContent();
            }
        });
    });
}

function generateCalendarHTML(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    // Корректировка для начала недели с понедельника
    const startOffset = startDay === 0 ? 6 : startDay - 1;
    
    let html = '';
    const today = new Date();
    
    // Дни предыдущего месяца
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startOffset - 1; i >= 0; i--) {
        const date = new Date(year, month - 1, prevMonthLastDay - i);
        html += generateDayHTML(date, true);
    }
    
    // Дни текущего месяца
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isToday = date.toDateString() === today.toDateString();
        const isSelected = date.toDateString() === selectedDate.toDateString();
        
        let dayClasses = 'calendar-day';
        if (isToday) dayClasses += ' today';
        if (isSelected) dayClasses += ' selected';
        
        html += `
            <div class="${dayClasses}" data-date="${date.toISOString()}">
                <div class="day-number">${day}</div>
                <div class="event-dots">
                    ${getDayEventDotsHTML(date)}
                </div>
            </div>
        `;
    }
    
    // Дни следующего месяца
    const totalCells = 42; // 6 недель
    const nextMonthDays = totalCells - (startOffset + daysInMonth);
    for (let day = 1; day <= nextMonthDays; day++) {
        const date = new Date(year, month + 1, day);
        html += generateDayHTML(date, true);
    }
    
    return html;
}

function generateDayHTML(date, isOtherMonth = false) {
    let dayClasses = 'calendar-day';
    if (isOtherMonth) dayClasses += ' other-month';
    
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const isSelected = date.toDateString() === selectedDate.toDateString();
    
    if (isToday) dayClasses += ' today';
    if (isSelected) dayClasses += ' selected';
    
    return `
        <div class="${dayClasses}" data-date="${date.toISOString()}">
            <div class="day-number">${date.getDate()}</div>
            <div class="event-dots">
                ${getDayEventDotsHTML(date)}
            </div>
        </div>
    `;
}

function getMonthName(month) {
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    return months[month];
}

function getDayEventDotsHTML(date) {
    const events = getEventsForDate(date);
    const eventTypes = [...new Set(events.map(e => e.type))];
    
    return eventTypes.slice(0, 4).map(type => 
        `<div class="event-dot ${type}"></div>`
    ).join('');
}

function getDayEventsHTML(date) {
    const events = getEventsForDate(date);
    
    if (events.length === 0) {
        return '<p class="text-center" style="color: var(--text-muted); padding: 2rem;">Нет событий на этот день</p>';
    }
    
    return events.map(event => createEventHTML(event)).join('');
}

function getEventsForDate(date) {
    const dateStr = formatDateForInput(date);
    
    return currentEvents.filter(event => {
        // ФИКС: Сравниваем строки дат, а не объекты Date
        return event.date === dateStr;
    }).sort((a, b) => {
        // Сортируем по времени
        const timeA = a.time || '00:00';
        const timeB = b.time || '00:00';
        return timeA.localeCompare(timeB);
    });
}

// ===== УПРАВЛЕНИЕ СОБЫТИЯМИ =====
function initModals() {
    // Модальное окно добавления события
    const addEventModal = document.getElementById('add-event-modal');
    const closeEventModal = document.getElementById('close-event-modal');
    const cancelEventForm = document.getElementById('cancel-event-form');
    const eventOverlay = document.getElementById('event-modal-overlay');
    
    function closeAddEventModal() {
        if (addEventModal) {
            addEventModal.classList.remove('active');
        }
        if (eventOverlay) {
            eventOverlay.style.display = 'none';
        }
        const form = document.getElementById('add-event-form');
        if (form) form.reset();
        const repeatEndSection = document.getElementById('repeat-end-section');
        if (repeatEndSection) repeatEndSection.style.display = 'none';
    }
    
    if (closeEventModal) {
        closeEventModal.addEventListener('click', closeAddEventModal);
    }
    
    if (cancelEventForm) {
        cancelEventForm.addEventListener('click', closeAddEventModal);
    }
    
    if (eventOverlay) {
        eventOverlay.addEventListener('click', closeAddEventModal);
    }
    
    // Форма добавления события
    const eventForm = document.getElementById('add-event-form');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveEvent();
        });
    }
    
    // Показ/скрытие даты окончания повторения
    const repeatSelect = document.getElementById('event-repeat');
    if (repeatSelect) {
        repeatSelect.addEventListener('change', function() {
            const repeatEndSection = document.getElementById('repeat-end-section');
            if (this.value !== 'none') {
                repeatEndSection.style.display = 'block';
            } else {
                repeatEndSection.style.display = 'none';
            }
        });
    }
    
    // Модальное окно добавления питомца
    initPetModal();
    
    // Модальное окно редактирования профиля
    initProfileModal();
    
    // Модальные окна здоровья
    initHealthModals();
}

function openAddEventModal(date = null) {
    const modal = document.getElementById('add-event-modal');
    const overlay = document.getElementById('event-modal-overlay');
    
    if (date) {
        selectedDate = new Date(date);
        document.getElementById('event-date').value = formatDateForInput(selectedDate);
    } else {
        // ФИКС: Устанавливаем текущую дату правильно
        const today = new Date();
        document.getElementById('event-date').value = formatDateForInput(today);
    }
    
    // Заполняем список питомцев
    const petSelect = document.getElementById('event-pet');
    if (petSelect) {
        petSelect.innerHTML = '<option value="" disabled selected>Выберите питомца</option>' +
            currentPets.map(pet => 
                `<option value="${pet.id}">${pet.name}</option>`
            ).join('');
        
        if (selectedPetId) {
            petSelect.value = selectedPetId;
        }
    }
    
    // Обновляем время по умолчанию
    const now = new Date();
    document.getElementById('event-time').value = 
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    modal.classList.add('active');
    overlay.style.display = 'block';
}

function saveEvent() {
    const petId = document.getElementById('event-pet').value;
    const type = document.getElementById('event-type').value;
    const title = document.getElementById('event-title').value.trim();
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const repeat = document.getElementById('event-repeat').value;
    const repeatEnd = document.getElementById('repeat-end-date').value;
    const notes = document.getElementById('event-notes').value.trim();
    const foodAmount = document.getElementById('event-food-amount')?.value || null;
    
    // Создаем основное событие
    const mainEvent = {
        id: generateId(),
        petId: petId,
        type: type,
        title: title,
        date: date,
        time: time,
        repeat: repeat,
        repeatEnd: repeatEnd || null,
        foodAmount: foodAmount,
        reminders: [],
        notes: notes,
        completed: false,
        isRepeating: repeat !== 'none',
        createdAt: new Date().toISOString()
    };
    
    // Собираем напоминания
    document.querySelectorAll('input[name="reminder"]:checked').forEach(cb => {
        mainEvent.reminders.push(parseInt(cb.value));
    });
    
    // Обрабатываем повторения
    if (repeat !== 'none') {
        createRepeatedEvents(mainEvent);
        showNotification('Повторяющееся событие создано', `${title} будет повторяться ${getRepeatText(repeat)}`);
    } else {
        currentEvents.push(mainEvent);
        showNotification('Событие добавлено', `${title} добавлено в календарь`);
    }
    
    saveUserData();
    
    // Закрываем модальное окно
    document.getElementById('add-event-modal').classList.remove('active');
    document.getElementById('event-modal-overlay').style.display = 'none';
    
    // Очищаем форму
    document.getElementById('add-event-form').reset();
    document.getElementById('repeat-end-section').style.display = 'none';
    document.getElementById('food-amount-section').style.display = 'none';
    
    // Обновляем календарь
    loadCalendarContent();
    
    // Создаем напоминания
    createReminders(mainEvent);
}

// Вспомогательная функция для текста повторения
function getRepeatText(repeat) {
    const texts = {
        'daily': 'ежедневно',
        'weekly': 'еженедельно',
        'monthly': 'ежемесячно',
        'weekdays': 'по будням',
        'weekends': 'по выходным'
    };
    return texts[repeat] || 'с повторением';
}

// ===== ФИКС: СОЗДАНИЕ ПОВТОРЯЮЩИХСЯ СОБЫТИЙ =====
function createRepeatedEvents(mainEvent) {
    if (!mainEvent.isRepeating || mainEvent.repeat === 'none') {
        currentEvents.push(mainEvent);
        return;
    }
    
    const [startYear, startMonth, startDay] = mainEvent.date.split('-');
    let startDate = new Date(startYear, startMonth - 1, startDay);
    let endDate = mainEvent.repeatEnd ? new Date(mainEvent.repeatEnd) : null;
    
    // Если нет даты окончания, ставим +90 дней
    if (!endDate) {
        endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 90);
    }
    
    let currentDate = new Date(startDate);
    let eventCounter = 0;
    const maxEvents = 365; // Максимум 365 событий для защиты
    
    // Добавляем основное событие
    const mainEventWithRepeat = {
        ...mainEvent,
        isMainEvent: true,
        repeatSeriesId: mainEvent.id
    };
    currentEvents.push(mainEventWithRepeat);
    eventCounter++;
    
    // Создаем повторяющиеся события
    while (currentDate <= endDate && eventCounter < maxEvents) {
        // Пропускаем дату начала (уже добавили)
        if (currentDate.getTime() !== startDate.getTime()) {
            // Проверяем, нужно ли добавлять событие в этот день
            let shouldAdd = true;
            
            switch(mainEvent.repeat) {
                case 'weekdays':
                    // Только понедельник-пятница
                    const day = currentDate.getDay();
                    shouldAdd = day >= 1 && day <= 5;
                    break;
                case 'weekends':
                    // Только суббота-воскресенье
                    const weekendDay = currentDate.getDay();
                    shouldAdd = weekendDay === 0 || weekendDay === 6;
                    break;
            }
            
            if (shouldAdd) {
                const formattedDate = formatDateForInput(currentDate);
                
                const repeatedEvent = {
                    ...mainEvent,
                    id: generateId(),
                    date: formattedDate,
                    isMainEvent: false,
                    repeatSeriesId: mainEvent.id,
                    originalEventId: mainEvent.id
                };
                
                currentEvents.push(repeatedEvent);
                eventCounter++;
            }
        }
        
        // Переходим к следующему дню в зависимости от типа повторения
        const nextDate = new Date(currentDate);
        
        switch(mainEvent.repeat) {
            case 'daily':
                nextDate.setDate(nextDate.getDate() + 1);
                break;
            case 'weekly':
                nextDate.setDate(nextDate.getDate() + 7);
                break;
            case 'monthly':
                nextDate.setMonth(nextDate.getMonth() + 1);
                break;
            case 'weekdays':
                // Пропускаем выходные
                let nextWeekday = new Date(currentDate);
                do {
                    nextWeekday.setDate(nextWeekday.getDate() + 1);
                } while (nextWeekday.getDay() === 0 || nextWeekday.getDay() === 6);
                nextDate.setTime(nextWeekday.getTime());
                break;
            case 'weekends':
                // Пропускаем будни
                let nextWeekend = new Date(currentDate);
                do {
                    nextWeekend.setDate(nextWeekend.getDate() + 1);
                } while (nextWeekend.getDay() !== 0 && nextWeekend.getDay() !== 6);
                nextDate.setTime(nextWeekend.getTime());
                break;
        }
        
        currentDate = nextDate;
    }
}

function toggleEventCompletion(eventId) {
    const eventIndex = currentEvents.findIndex(e => e.id === eventId);
    if (eventIndex !== -1) {
        currentEvents[eventIndex].completed = !currentEvents[eventIndex].completed;
        saveUserData();
        loadCalendarContent();
        
        showNotification(
            currentEvents[eventIndex].completed ? 'Событие выполнено' : 'Событие возобновлено',
            currentEvents[eventIndex].title
        );
    }
}

function deleteEvent(eventId) {
    const event = currentEvents.find(e => e.id === eventId);
    if (!event) return;
    
    if (event.isRepeating && event.isMainEvent) {
        // Удаляем всю серию повторяющихся событий
        if (confirm('Это повторяющееся событие. Удалить всю серию событий?')) {
            currentEvents = currentEvents.filter(e => 
                !(e.repeatSeriesId === event.id || e.id === event.id)
            );
            saveUserData();
            loadCalendarContent();
            showNotification('Серию событий удалена', 'Все повторяющиеся события удалены');
        }
    } else if (event.isRepeating && event.repeatSeriesId) {
        // Удаляем только это событие из серии
        if (confirm('Это событие из повторяющейся серии. Удалить только это событие или всю серию?')) {
            const choice = prompt('Введите "1" - удалить только это событие\n"2" - удалить всю серию');
            if (choice === '1') {
                currentEvents = currentEvents.filter(e => e.id !== eventId);
                showNotification('Событие удалено', 'Событие удалено из календаря');
            } else if (choice === '2') {
                currentEvents = currentEvents.filter(e => 
                    !(e.repeatSeriesId === event.repeatSeriesId || e.id === event.repeatSeriesId)
                );
                showNotification('Серию событий удалена', 'Все повторяющиеся события удалены');
            }
            saveUserData();
            loadCalendarContent();
        }
    } else {
        // Обычное событие
        if (confirm('Удалить это событие?')) {
            currentEvents = currentEvents.filter(e => e.id !== eventId);
            saveUserData();
            loadCalendarContent();
            showNotification('Событие удалено', 'Событие удалено из календаря');
        }
    }
}

function createEventHTML(event) {
    const pet = currentPets.find(p => p.id === event.petId);
    const time = event.time || '00:00';
    
    // Добавляем значок для повторяющихся событий
    const repeatIcon = event.isRepeating ? 
        `<i class="fas fa-redo icon small" style="margin-left: 0.5rem; color: var(--primary);"></i>` : '';
    
    return `
        <div class="event-item ${event.completed ? 'completed' : ''}" data-event-id="${event.id}">
            <div class="event-icon ${event.type}">
                <i class="${getEventIconFA(event.type)} icon"></i>
            </div>
            <div class="event-content">
                <div class="event-header">
                    <div class="event-title">
                        ${event.title}
                        ${repeatIcon}
                        ${event.isMainEvent ? ' <span style="font-size: 0.75rem; color: var(--primary);">(основное)</span>' : ''}
                    </div>
                    <div class="event-time">${time}</div>
                </div>
                <div class="event-pet">
                    <i class="fas fa-paw icon"></i>
                    ${pet ? pet.name : 'Неизвестный питомец'}
                    ${event.isRepeating ? ` • ${getRepeatText(event.repeat)}` : ''}
                </div>
                ${event.foodAmount ? `
                    <div class="event-food" style="margin-top: 0.25rem; font-size: 0.875rem; color: var(--secondary);">
                        <i class="fas fa-weight-hanging icon"></i>
                        ${event.foodAmount} г корма
                    </div>
                ` : ''}
                ${event.notes ? `<p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--text-secondary);">${event.notes}</p>` : ''}
                <div class="event-actions">
                    <button class="event-btn complete" onclick="toggleEventCompletion('${event.id}')">
                        ${event.completed ? 'Возобновить' : 'Выполнено'}
                    </button>
                    <button class="event-btn delete" onclick="deleteEvent('${event.id}')">
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    `;
}

function createReminders(event) {
    if (!event.reminders || event.reminders.length === 0) return;
    
    event.reminders.forEach(minutes => {
        createNotification(
            '⏰ Напоминание',
            `${event.title} через ${getReminderText(minutes)}`,
            'system'
        );
    });
}

function getReminderText(minutes) {
    if (minutes < 60) return `${minutes} мин`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} ч`;
    return `${Math.floor(minutes / 1440)} дн`;
}

// ===== ПИТОМЦЫ =====
function initPetModal() {
    const addPetModal = document.getElementById('add-pet-modal');
    const closePetModal = document.getElementById('close-pet-modal');
    const cancelPetForm = document.getElementById('cancel-pet-form');
    const petOverlay = document.getElementById('modal-overlay');
    
    function closeAddPetModal() {
        if (addPetModal) {
            addPetModal.classList.remove('active');
        }
        if (petOverlay) {
            petOverlay.style.display = 'none';
        }
        const form = document.getElementById('add-pet-form');
        if (form) form.reset();
        const preview = document.getElementById('pet-photo-preview');
        if (preview) preview.innerHTML = '';
    }
    
    if (closePetModal) {
        closePetModal.addEventListener('click', closeAddPetModal);
    }
    
    if (cancelPetForm) {
        cancelPetForm.addEventListener('click', closeAddPetModal);
    }
    
    if (petOverlay) {
        petOverlay.addEventListener('click', closeAddPetModal);
    }
    
    // Форма добавления питомца
    const petForm = document.getElementById('add-pet-form');
    if (petForm) {
        petForm.addEventListener('submit', function(e) {
            e.preventDefault();
            savePet();
        });
        
        // Загрузка фото питомца
        const photoInput = document.getElementById('pet-photo');
        if (photoInput) {
            photoInput.addEventListener('change', function(e) {
                handlePhotoUpload(e, 'pet-photo-preview');
            });
        }
    }
}

function loadPetsContent() {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;
    
    // Рассчитываем статистику
    const petsCount = currentPets.length;
    const avgWeight = petsCount > 0 
        ? (currentPets.reduce((sum, pet) => sum + (pet.weight || 0), 0) / petsCount).toFixed(1)
        : 0;
    const upcomingVet = currentEvents.filter(e => 
        e.type === 'vet' && 
        new Date(e.date) >= new Date() &&
        !e.completed
    ).length;
    
    const activeMeds = medications.filter(m => m.isActive).length;
    const waterRemindersCount = waterReminders.filter(w => w.isActive).length;
    
    contentArea.innerHTML = `
        <div class="pets-screen">
            <!-- Заголовок и кнопка -->
            <div class="pets-header">
                <h2>Мои питомцы</h2>
                <button class="add-event-btn" onclick="openAddPetModal()">
                    <i class="fas fa-plus icon"></i>
                    Добавить питомца
                </button>
            </div>
            
            <!-- Быстрые действия -->
            <div class="quick-actions mt-4">
                <div class="actions-grid">
                    <button class="action-card" onclick="openFoodCalculator()">
                        <div class="action-icon">
                            <i class="fas fa-calculator icon"></i>
                        </div>
                        <h4>Калькулятор корма</h4>
                        <p>Рассчитать норму питания</p>
                    </button>
                    
                    <button class="action-card" onclick="openHealthModal()">
                        <div class="action-icon">
                            <i class="fas fa-heart icon"></i>
                        </div>
                        <h4>Здоровье</h4>
                        <p>Вакцинация, лекарства</p>
                    </button>
                    
                    <button class="action-card" onclick="openAddEventModal()">
                        <div class="action-icon">
                            <i class="fas fa-calendar-plus icon"></i>
                        </div>
                        <h4>Добавить событие</h4>
                        <p>Кормление, прогулка</p>
                    </button>
                </div>
            </div>
            
            <!-- Статистика -->
            <div class="health-stats mt-4">
                <h3 class="section-title">Статистика здоровья</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-weight-hanging icon"></i>
                        </div>
                        <div class="stat-info">
                            <h4>${petsCount === 1 ? 'Вес питомца' : 'Средний вес'}</h4>
                            <p class="stat-value">${avgWeight} кг</p>
                            ${petsCount > 1 ? `<p style="font-size: 0.75rem; color: var(--text-muted);">из ${petsCount} питомцев</p>` : ''}
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-calendar-alt icon"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Визиты к ветеринару</h4>
                            <p class="stat-value">${upcomingVet}</p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-medkit icon"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Активные лекарства</h4>
                            <p class="stat-value">${activeMeds}</p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-tint icon"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Напоминания о воде</h4>
                            <p class="stat-value">${waterRemindersCount}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Список питомцев -->
            <div class="pets-list-section mt-4">
                <h3 class="section-title">Список питомцев</h3>
                
                ${currentPets.length > 0 ? `
                    <div class="pets-list">
                        ${currentPets.map(pet => createEnhancedPetCardHTML(pet)).join('')}
                    </div>
                ` : `
                    <div class="no-pets">
                        <i class="fas fa-paw icon"></i>
                        <p>У вас еще нет добавленных питомцев</p>
                        <button class="btn btn-primary mt-4" onclick="openAddPetModal()">
                            <i class="fas fa-plus icon"></i>
                            Добавить первого питомца
                        </button>
                    </div>
                `}
            </div>
        </div>
    `;
}

// ===== УЛУЧШЕННАЯ КАРТОЧКА ПИТОМЦА =====
function createEnhancedPetCardHTML(pet) {
    const age = pet.birthdate ? calculateAge(pet.birthdate) : 'Возраст не указан';
    const todayEvents = getEventsForPetToday(pet.id);
    const healthItems = getPetHealthItems(pet.id);
    
    return `
        <div class="pet-card-enhanced" data-pet-id="${pet.id}">
            <div class="pet-card-header">
                <div class="pet-type">
                    <i class="${getPetIconFA(pet.type)} icon"></i>
                    <span>${getPetTypeName(pet.type)}</span>
                </div>
                <span class="pet-gender-badge">${pet.gender === 'male' ? '♂' : '♀'}</span>
            </div>
            
            <div class="pet-name">${pet.name}</div>
            
            <div class="pet-details">
                <div class="pet-detail">
                    <i class="fas fa-weight icon"></i>
                    <span>${pet.weight} кг</span>
                </div>
                <div class="pet-detail">
                    <i class="fas fa-birthday-cake icon"></i>
                    <span>${age}</span>
                </div>
                ${pet.breed ? `
                <div class="pet-detail">
                    <i class="fas fa-paw icon"></i>
                    <span>${pet.breed}</span>
                </div>
                ` : ''}
            </div>
            
            ${pet.photo ? `
                <div class="pet-photo-preview">
                    <img src="${pet.photo}" alt="${pet.name}">
                </div>
            ` : ''}
            
            <!-- Информация о корме -->
            ${pet.lastFoodCalculation ? `
                <div class="pet-food-info">
                    <h4><i class="fas fa-bowl-food icon"></i> Рацион</h4>
                    <p>${pet.lastFoodCalculation.food.name} - ${Math.round(pet.lastFoodCalculation.dailyGrams)} г/день</p>
                </div>
            ` : ''}
            
            <!-- Здоровье -->
            ${healthItems.length > 0 ? `
                <div class="pet-health-info">
                    <h4><i class="fas fa-heart icon"></i> Здоровье</h4>
                    <div class="health-items">
                        ${healthItems.slice(0, 3).map(item => `
                            <span class="health-tag">${item}</span>
                        `).join('')}
                        ${healthItems.length > 3 ? `<span class="health-tag">+${healthItems.length - 3}</span>` : ''}
                    </div>
                </div>
            ` : ''}
            
            <div class="pet-actions">
                <button class="btn btn-secondary" onclick="editPet('${pet.id}')">
                    <i class="fas fa-edit icon"></i>
                    Редактировать
                </button>
                <button class="btn btn-primary" onclick="openFoodCalculator('${pet.id}')">
                    <i class="fas fa-calculator icon"></i>
                    Рассчитать корм
                </button>
                <button class="btn btn-error" onclick="deletePet('${pet.id}')">
                    <i class="fas fa-trash icon"></i>
                </button>
            </div>
        </div>
    `;
}

// Вспомогательные функции для карточки питомца
function getEventsForPetToday(petId) {
    const today = new Date().toISOString().split('T')[0];
    return currentEvents.filter(event => 
        event.petId === petId && 
        event.date === today &&
        !event.completed
    );
}

function getPetHealthItems(petId) {
    const items = [];
    
    // Вакцинации
    const petVaccinations = vaccinations.filter(v => v.petId === petId);
    if (petVaccinations.length > 0) {
        items.push(`💉 ${petVaccinations.length} вакц.`);
    }
    
    // Лекарства
    const petMeds = medications.filter(m => m.petId === petId && m.isActive);
    if (petMeds.length > 0) {
        items.push(`💊 ${petMeds.length} лек.`);
    }
    
    return items;
}

function createPetCardHTML(pet) {
    const age = pet.birthdate ? calculateAge(pet.birthdate) : 'Возраст не указан';
    
    return `
        <div class="pet-card" data-pet-id="${pet.id}">
            <div class="pet-card-header">
                <div class="pet-type">
                    <i class="${getPetIconFA(pet.type)} icon"></i>
                    <span>${getPetTypeName(pet.type)}</span>
                </div>
                <span class="pet-gender-badge">${pet.gender === 'male' ? '♂' : '♀'}</span>
            </div>
            
            <div class="pet-name">${pet.name}</div>
            
            <div class="pet-details">
                <div class="pet-detail">
                    <i class="fas fa-weight icon"></i>
                    <span>${pet.weight} кг</span>
                </div>
                <div class="pet-detail">
                    <i class="fas fa-birthday-cake icon"></i>
                    <span>${age}</span>
                </div>
                ${pet.breed ? `
                <div class="pet-detail">
                    <i class="fas fa-paw icon"></i>
                    <span>${pet.breed}</span>
                </div>
                ` : ''}
            </div>
            
            ${pet.photo ? `
                <div class="pet-photo-preview">
                    <img src="${pet.photo}" alt="${pet.name}">
                </div>
            ` : ''}
            
            <div class="pet-actions">
                <button class="btn btn-secondary" onclick="editPet('${pet.id}')">
                    <i class="fas fa-edit icon"></i>
                    Редактировать
                </button>
                <button class="btn btn-error" onclick="deletePet('${pet.id}')">
                    <i class="fas fa-trash icon"></i>
                    Удалить
                </button>
            </div>
        </div>
    `;
}

function savePet() {
    const type = document.getElementById('pet-type').value;
    const name = document.getElementById('pet-name').value.trim();
    const gender = document.querySelector('input[name="pet-gender"]:checked')?.value || 'male';
    const weight = parseFloat(document.getElementById('pet-weight').value);
    const birthdate = document.getElementById('pet-birthdate').value;
    const breed = document.getElementById('pet-breed')?.value.trim() || '';
    
    // Получаем фото
    const photoPreview = document.getElementById('pet-photo-preview');
    const photo = photoPreview.querySelector('img')?.src || null;
    
    if (!name || !type || !weight) {
        showNotification('Ошибка', 'Заполните обязательные поля');
        return;
    }
    
    const pet = {
        id: generateId(),
        type: type,
        name: name,
        gender: gender,
        breed: breed,
        weight: weight,
        birthdate: birthdate || null,
        photo: photo,
        physicalState: '1.4', // По умолчанию для взрослого животного
        addedAt: new Date().toISOString()
    };
    
    currentPets.push(pet);
    selectedPetId = pet.id;
    saveUserData();
    
    // Закрываем модальное окно
    document.getElementById('add-pet-modal').classList.remove('active');
    document.getElementById('modal-overlay').style.display = 'none';
    
    // Очищаем форму
    document.getElementById('add-pet-form').reset();
    const preview = document.getElementById('pet-photo-preview');
    if (preview) preview.innerHTML = '';
    
    // Обновляем экран питомцев
    loadScreenContent('pets');
    
    // Уведомление
    createNotification(
        'Новый питомец добавлен!',
        `${name} теперь в вашем профиле.`,
        'system'
    );
    
    showNotification('Питомец добавлен', `${name} теперь в вашем профиле!`);
}

function handlePhotoUpload(event, previewId) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        showNotification('Ошибка', 'Пожалуйста, выберите изображение');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showNotification('Ошибка', 'Размер файла не должен превышать 5MB');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById(previewId);
        if (preview) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        }
    };
    reader.onerror = function() {
        showNotification('Ошибка', 'Не удалось загрузить изображение');
    };
    reader.readAsDataURL(file);
}

function getPetTypeName(type) {
    const types = {
        'dog': 'Собака',
        'cat': 'Кошка',
        'rabbit': 'Кролик',
        'bird': 'Птица',
        'other': 'Другое'
    };
    return types[type] || 'Питомец';
}

function editPet(petId) {
    const pet = currentPets.find(p => p.id === petId);
    if (!pet) return;
    
    // Заполнение формы
    document.getElementById('pet-type').value = pet.type;
    document.getElementById('pet-name').value = pet.name;
    const genderRadio = document.querySelector(`input[name="pet-gender"][value="${pet.gender}"]`);
    if (genderRadio) genderRadio.checked = true;
    document.getElementById('pet-weight').value = pet.weight;
    document.getElementById('pet-birthdate').value = pet.birthdate || '';
    if (document.getElementById('pet-breed')) {
        document.getElementById('pet-breed').value = pet.breed || '';
    }
    
    // Загрузка фото
    const preview = document.getElementById('pet-photo-preview');
    if (pet.photo) {
        preview.innerHTML = `<img src="${pet.photo}" alt="${pet.name}">`;
    } else {
        preview.innerHTML = '';
    }
    
    // Открытие модального окна
    openAddPetModal();
}

function deletePet(petId) {
    if (confirm('Вы уверены, что хотите удалить питомца?')) {
        currentPets = currentPets.filter(p => p.id !== petId);
        // Удаляем связанные события
        currentEvents = currentEvents.filter(e => e.petId !== petId);
        
        if (selectedPetId === petId) {
            selectedPetId = currentPets.length > 0 ? currentPets[0].id : null;
        }
        
        saveUserData();
        loadScreenContent('pets');
        
        createNotification(
            'Питомец удален',
            'Данные питомца удалены из профиля',
            'system'
        );
        
        showNotification('Питомец удален', 'Данные питомца удалены из профиля');
    }
}

function openAddPetModal() {
    const modal = document.getElementById('add-pet-modal');
    const overlay = document.getElementById('modal-overlay');
    
    if (modal) {
        modal.classList.add('active');
    }
    if (overlay) {
        overlay.style.display = 'block';
    }
}

// ===== КАЛЬКУЛЯТОР КОРМА =====
function loadCalculatorScreen() {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;
    
    contentArea.innerHTML = `
        <div class="calculator-content">
            <div class="calculator-header">
                <h2>Расчет корма</h2>
                <p>Рассчитайте суточную норму корма для вашего питомца</p>
            </div>
            
            ${currentPets.length > 0 ? `
                <div class="calculator-pets">
                    <h3 class="section-title">Выберите питомца</h3>
                    <div class="pets-selection">
                        ${currentPets.map(pet => `
                            <div class="pet-selection-card ${selectedPetId === pet.id ? 'selected' : ''}" 
                                 onclick="selectPetForCalculator('${pet.id}')">
                                <div class="pet-selection-avatar">
                                    ${pet.photo ? 
                                        `<img src="${pet.photo}" alt="${pet.name}">` :
                                        `<i class="${getPetIconFA(pet.type)} icon"></i>`
                                    }
                                </div>
                                <div class="pet-selection-info">
                                    <h4>${pet.name}</h4>
                                    <p>${pet.weight} кг • ${getPetTypeName(pet.type)}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    ${selectedPetId ? `
                        <div class="calculator-actions">
                            <button class="btn btn-primary btn-large" onclick="openFoodCalculator('${selectedPetId}')">
                                <i class="fas fa-calculator icon"></i>
                                Рассчитать корм для ${currentPets.find(p => p.id === selectedPetId)?.name || 'питомца'}
                            </button>
                        </div>
                    ` : ''}
                </div>
            ` : `
                <div class="no-pets">
                    <i class="fas fa-paw icon"></i>
                    <p>Добавьте питомца, чтобы рассчитать норму корма</p>
                    <button class="btn btn-primary mt-4" onclick="openAddPetModal()">
                        <i class="fas fa-plus icon"></i>
                        Добавить питомца
                    </button>
                </div>
            `}
            
            <div class="food-database mt-6">
                <h3 class="section-title">База кормов</h3>
                <div class="food-types">
                    <div class="food-type-card" onclick="showFoodSelector('dog', 'dry')">
                        <div class="food-type-icon">
                            <i class="fas fa-dog icon"></i>
                        </div>
                        <h4>Сухой корм для собак</h4>
                        <p>${FOOD_DATABASE.dog.dry.length} вариантов</p>
                    </div>
                    <div class="food-type-card" onclick="showFoodSelector('cat', 'dry')">
                        <div class="food-type-icon">
                            <i class="fas fa-cat icon"></i>
                        </div>
                        <h4>Сухой корм для кошек</h4>
                        <p>${FOOD_DATABASE.cat.dry.length} вариантов</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function selectPetForCalculator(petId) {
    selectedPetId = petId;
    loadCalculatorScreen();
}

function openFoodCalculator(petId = null) {
    const modal = document.getElementById('food-calculator-modal');
    const overlay = document.getElementById('food-calculator-overlay');
    
    if (modal) {
        loadCalculatorStep1(petId);
        modal.classList.add('active');
        if (overlay) overlay.style.display = 'block';
    }
}

// ФУНКЦИЯ ЗАКРЫТИЯ КАЛЬКУЛЯТОРА КОРМА
function closeFoodCalculator() {
    const modal = document.getElementById('food-calculator-modal');
    const overlay = document.getElementById('food-calculator-overlay');
    
    if (modal) {
        modal.classList.remove('active');
    }
    if (overlay) {
        overlay.style.display = 'none';
    }
    
    // СБРАСЫВАЕМ КАЛЬКУЛЯТОР
    resetCalculator();
}

function loadCalculatorStep1(petId = null) {
    const calculatorContent = document.getElementById('calculator-content');
    if (!calculatorContent) return;
    
    let pet = null;
    if (petId) {
        pet = currentPets.find(p => p.id === petId);
        selectedPetId = petId;
    } else if (currentPets.length > 0 && selectedPetId) {
        pet = currentPets.find(p => p.id === selectedPetId);
    } else if (currentPets.length > 0) {
        pet = currentPets[0];
        selectedPetId = pet.id;
    }
    
    if (!pet) {
        calculatorContent.innerHTML = `
            <div class="text-center">
                <i class="fas fa-paw icon large" style="margin-bottom: 1rem; font-size: 3rem;"></i>
                <p style="margin-bottom: 1rem; color: var(--text-secondary);">Добавьте питомца, чтобы рассчитать норму корма</p>
                <button class="btn btn-primary" onclick="openAddPetModal()">
                    <i class="fas fa-plus icon"></i>
                    Добавить питомца
                </button>
            </div>
        `;
        return;
    }
    
    calculatorStep = 1;
    selectedCoefficient = pet.physicalState;
    
    calculatorContent.innerHTML = `
        <div class="calculator-step active" id="calculator-step-1">
            <h3 class="calculator-question">Рассчет суточной нормы калорий для ${pet.name}</h3>
            
            <div class="calculator-info">
                <p style="margin-bottom: 1rem; color: var(--text-secondary);">
                    Формула: ккал/день = K × (30 × вес(кг) + 70)
                </p>
                
                <div style="background: var(--light-gray); padding: 1rem; border-radius: var(--border-radius); margin-bottom: 1.5rem;">
                    <p style="font-weight: 600; margin-bottom: 0.5rem;">Данные питомца:</p>
                    <p>Вес: <strong>${pet.weight} кг</strong></p>
                    <p>Текущий коэффициент K: <strong>${pet.physicalState}</strong></p>
                </div>
            </div>
            
            <div class="calculator-options">
                <div class="calculator-option ${pet.physicalState === '0.8' ? 'selected' : ''}" onclick="selectCoefficient('0.8')">
                    <span>Ожирение</span>
                    <span class="coefficient">K = 0.8</span>
                </div>
                <div class="calculator-option ${pet.physicalState === '1.0' ? 'selected' : ''}" onclick="selectCoefficient('1.0')">
                    <span>Склонность к перееданию / Болезнь</span>
                    <span class="coefficient">K = 1.0</span>
                </div>
                <div class="calculator-option ${pet.physicalState === '1.1' ? 'selected' : ''}" onclick="selectCoefficient('1.1')">
                    <span>Старше 7 лет</span>
                    <span class="coefficient">K = 1.1</span>
                </div>
                <div class="calculator-option ${pet.physicalState === '1.2' ? 'selected' : ''}" onclick="selectCoefficient('1.2')">
                    <span>Кастрированное животное / Недобор веса</span>
                    <span class="coefficient">K = 1.2</span>
                </div>
                <div class="calculator-option ${pet.physicalState === '1.4' ? 'selected' : ''}" onclick="selectCoefficient('1.4')">
                    <span>Взрослое животное / Активная фаза роста</span>
                    <span class="coefficient">K = 1.4</span>
                </div>
                <div class="calculator-option ${pet.physicalState === '1.6' ? 'selected' : ''}" onclick="selectCoefficient('1.6')">
                    <span>Высокая активность / Беременность</span>
                    <span class="coefficient">K = 1.6</span>
                </div>
                <div class="calculator-option ${pet.physicalState === '2.0' ? 'selected' : ''}" onclick="selectCoefficient('2.0')">
                    <span>Лактация</span>
                    <span class="coefficient">K = 2.0</span>
                </div>
            </div>
            
            <div class="calculator-navigation">
                <button class="btn btn-secondary" onclick="useCurrentCoefficient()">
                    Использовать текущий (${pet.physicalState})
                </button>
                <button class="btn btn-primary" onclick="showCalculatorStep2()" id="calculate-btn">
                    Далее: Выбор корма
                </button>
            </div>
        </div>
    `;
}

function selectCoefficient(k) {
    document.querySelectorAll('.calculator-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    event.target.closest('.calculator-option').classList.add('selected');
    selectedCoefficient = k;
}

function useCurrentCoefficient() {
    const pet = currentPets.find(p => p.id === selectedPetId);
    if (pet) {
        selectedCoefficient = pet.physicalState;
        document.querySelectorAll('.calculator-option').forEach(opt => {
            opt.classList.remove('selected');
            if (opt.querySelector('.coefficient')?.textContent.includes(pet.physicalState)) {
                opt.classList.add('selected');
            }
        });
    }
}

function showCalculatorStep2() {
    const pet = currentPets.find(p => p.id === selectedPetId);
    if (!pet || !selectedCoefficient) {
        showNotification('Ошибка', 'Выберите коэффициент');
        return;
    }
    
    calculatorStep = 2;
    const k = parseFloat(selectedCoefficient);
    const weight = pet.weight;
    const dailyCalories = k * (30 * weight + 70);
    
    const calculatorContent = document.getElementById('calculator-content');
    if (!calculatorContent) return;
    
    calculatorContent.innerHTML = `
        <div class="calculator-step active" id="calculator-step-2">
            <div class="calculator-result">
                <h4>Результат расчета калорий</h4>
                <div class="result-value" id="result-value">${dailyCalories.toFixed(0)} ккал/день</div>
                <div class="result-details" id="result-details">
                    <p>Вес: <strong>${weight} кг</strong></p>
                    <p>Коэффициент K: <strong>${k}</strong></p>
                    <p>Формула: ${k} × (30 × ${weight} + 70) = ${dailyCalories.toFixed(0)} ккал/день</p>
                </div>
                
                <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                    <h4 style="margin-bottom: 1rem;">Выбор корма</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                        Выберите тип корма для расчета граммов
                    </p>
                    
                    <div class="food-categories">
                        <div class="food-category" onclick="showFoodSelector('${pet.type}', 'dry')">
                            <i class="fas fa-bowl-food icon"></i>
                            <h5>Сухой корм</h5>
                        </div>
                        <div class="food-category" onclick="showFoodSelector('${pet.type}', 'wet')">
                            <i class="fas fa-bowl-food icon"></i>
                            <h5>Влажный корм</h5>
                        </div>
                        <div class="food-category" onclick="showFoodSelector('${pet.type}', 'natural')">
                            <i class="fas fa-bowl-food icon"></i>
                            <h5>Натуральное питание</h5>
                        </div>
                    </div>
                    
                    ${selectedFood ? `
                        <div class="gram-calculation" id="gram-calculation">
                            <h4>Результат расчета</h4>
                            <div class="gram-amount" id="gram-amount">${calculateGrams(dailyCalories, selectedFood.calories).toFixed(0)} г/день</div>
                            <div class="result-details">
                                <p>Корм: <strong>${selectedFood.name}</strong></p>
                                <p>Калорийность: <strong>${selectedFood.calories} ккал/100г</strong></p>
                                <p>Расчет: ${dailyCalories.toFixed(0)} ккал ÷ ${selectedFood.calories} ккал × 100 = ${calculateGrams(dailyCalories, selectedFood.calories).toFixed(0)} г</p>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <div class="calculator-navigation">
                <button class="btn btn-secondary" onclick="backToStep1()">
                    Назад
                </button>
                <button class="btn btn-primary" onclick="saveCoefficientAndFood()" ${!selectedFood ? 'disabled' : ''}>
                    Сохранить результаты
                </button>
            </div>
        </div>
    `;
    
    if (selectedFood) {
        updateGramCalculation(dailyCalories);
    }
}

function backToStep1() {
    calculatorStep = 1;
    loadCalculatorStep1(selectedPetId);
}

function showFoodSelector(petType, foodType) {
    const modal = document.getElementById('food-selector-modal');
    const overlay = document.getElementById('food-selector-overlay');
    
    if (!modal || !overlay) return;
    
    const foods = FOOD_DATABASE[petType]?.[foodType] || [];
    
    const selectorContent = document.getElementById('food-selector-content');
    if (selectorContent) {
        selectorContent.innerHTML = `
            <div class="food-selector">
                <h4>Выберите корм</h4>
                <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
                    ${petType === 'dog' ? 'Для собак' : 'Для кошек'} • ${getFoodTypeName(foodType)}
                </p>
                
                <div class="food-list">
                    ${foods.map(food => `
                        <div class="food-item ${selectedFood?.id === food.id ? 'selected' : ''}" 
                             onclick="selectFood(${JSON.stringify(food).replace(/"/g, '&quot;')})">
                            <div class="food-info">
                                <h4>${food.name}</h4>
                                <p class="food-calories">${food.brand ? food.brand + ' • ' : ''}${food.calories} ккал/100г</p>
                            </div>
                            ${selectedFood?.id === food.id ? '<i class="fas fa-check icon"></i>' : ''}
                        </div>
                    `).join('')}
                </div>
                
                <div class="calculator-navigation" style="margin-top: 2rem;">
                    <button class="btn btn-secondary" onclick="closeFoodSelector()">
                        Отмена
                    </button>
                    <button class="btn btn-primary" onclick="confirmFoodSelection()" ${!selectedFood ? 'disabled' : ''}>
                        Выбрать
                    </button>
                </div>
            </div>
        `;
    }
    
    modal.classList.add('active');
    overlay.style.display = 'block';
}

function getFoodTypeName(type) {
    const names = {
        'dry': 'Сухой корм',
        'wet': 'Влажный корм',
        'natural': 'Натуральное питание'
    };
    return names[type] || type;
}

function selectFood(food) {
    selectedFood = food;
    
    // Обновляем выделение
    document.querySelectorAll('.food-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    event.target.closest('.food-item').classList.add('selected');
    
    // Активируем кнопку выбора
    const selectBtn = document.querySelector('.food-selector .btn-primary');
    if (selectBtn) {
        selectBtn.disabled = false;
    }
}

function confirmFoodSelection() {
    if (!selectedFood) return;
    
    closeFoodSelector();
    
    // Обновляем расчет граммов
    const pet = currentPets.find(p => p.id === selectedPetId);
    if (pet) {
        const k = parseFloat(selectedCoefficient);
        const weight = pet.weight;
        const dailyCalories = k * (30 * weight + 70);
        
        showCalculatorStep2();
        updateGramCalculation(dailyCalories);
    }
}

function closeFoodSelector() {
    const modal = document.getElementById('food-selector-modal');
    const overlay = document.getElementById('food-selector-overlay');
    
    if (modal) {
        modal.classList.remove('active');
    }
    if (overlay) {
        overlay.style.display = 'none';
    }
}

function updateGramCalculation(dailyCalories) {
    if (!selectedFood) return;
    
    const gramsPerDay = calculateGrams(dailyCalories, selectedFood.calories);
    
    const gramCalculation = document.getElementById('gram-calculation');
    if (gramCalculation) {
        gramCalculation.innerHTML = `
            <h4>Результат расчета</h4>
            <div class="gram-amount">${gramsPerDay.toFixed(0)} г/день</div>
            <div class="result-details">
                <p>Корм: <strong>${selectedFood.name}</strong></p>
                <p>Калорийность: <strong>${selectedFood.calories} ккал/100г</strong></p>
                <p>Расчет: ${dailyCalories.toFixed(0)} ккал ÷ ${selectedFood.calories} ккал × 100 = ${gramsPerDay.toFixed(0)} г</p>
                
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-primary);">
                        Количество приемов пищи в день:
                    </label>
                    <div class="checkboxes-group" style="margin-bottom: 1rem;">
                        <label class="checkbox-option">
                            <input type="radio" name="meals" value="2" checked onchange="updateMealCalculation(${gramsPerDay})">
                            <span>2 раза</span>
                        </label>
                        <label class="checkbox-option">
                            <input type="radio" name="meals" value="3" onchange="updateMealCalculation(${gramsPerDay})">
                            <span>3 раза</span>
                        </label>
                        <label class="checkbox-option">
                            <input type="radio" name="meals" value="4" onchange="updateMealCalculation(${gramsPerDay})">
                            <span>4 раза</span>
                        </label>
                    </div>
                    
                    <div id="meal-calculation" style="color: var(--text-secondary); font-size: 0.875rem;">
                        ${updateMealCalculationHTML(gramsPerDay, 2)}
                    </div>
                </div>
            </div>
        `;
        
        // Активируем кнопку сохранения
        const saveBtn = document.querySelector('#calculator-step-2 .btn-primary');
        if (saveBtn) {
            saveBtn.disabled = false;
        }
    }
}

function updateMealCalculation(gramsPerDay) {
    const meals = document.querySelector('input[name="meals"]:checked')?.value || '2';
    const mealsCount = parseInt(meals);
    
    const mealCalculation = document.getElementById('meal-calculation');
    if (mealCalculation) {
        mealCalculation.innerHTML = updateMealCalculationHTML(gramsPerDay, mealsCount);
    }
}

function updateMealCalculationHTML(gramsPerDay, mealsCount) {
    const perMeal = gramsPerDay / mealsCount;
    return `
        <p>При ${mealsCount} приемах пищи в день:</p>
        <p><strong>${perMeal.toFixed(0)} г</strong> на один прием</p>
    `;
}

function calculateGrams(calories, caloriesPer100g) {
    return (calories / caloriesPer100g) * 100;
}

function saveCoefficientAndFood() {
    const pet = currentPets.find(p => p.id === selectedPetId);
    if (pet && selectedCoefficient) {
        pet.physicalState = selectedCoefficient;
        
        // Сохраняем информацию о выбранном корме
        if (selectedFood) {
            pet.selectedFood = selectedFood;
            pet.lastFoodCalculation = {
                date: new Date().toISOString(),
                dailyCalories: parseFloat(selectedCoefficient) * (30 * pet.weight + 70),
                dailyGrams: calculateGrams(parseFloat(selectedCoefficient) * (30 * pet.weight + 70), selectedFood.calories),
                food: selectedFood
            };
        }
        
        saveUserData();
        
        // Закрываем модальное окно
        const modal = document.getElementById('food-calculator-modal');
        const overlay = modal?.querySelector('.modal-overlay');
        
        if (modal) {
            modal.classList.remove('active');
            if (overlay) overlay.style.display = 'none';
        }
        
        // Обновляем экраны
        loadCalculatorScreen();
        loadScreenContent('pets');
        
        showNotification('Результаты сохранены', 'Данные обновлены в профиле питомца');
        
        // Сбрасываем калькулятор
        resetCalculator();
    }
}

function resetCalculator() {
    selectedFood = null;
    selectedCoefficient = null;
    calculatorStep = 1;
}

// ===== ИСПРАВЛЕНИЕ МОДАЛЬНЫХ ОКОН ЗДОРОВЬЯ =====

// Функция закрытия основного окна здоровья (ИСПРАВЛЕННАЯ)
function closeHealthModal() {
    const modal = document.getElementById('health-modal');
    if (modal) {
        modal.remove(); // Удаляем из DOM
    }
}

function loadHealthContent() {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;
    
    // Рассчитываем статистику
    const petsCount = currentPets.length;
    const upcomingVet = currentEvents.filter(e => 
        e.type === 'vet' && 
        new Date(e.date) >= new Date() &&
        !e.completed
    ).length;
    
    const activeMeds = medications.filter(m => m.isActive).length;
    const waterRemindersCount = waterReminders.filter(w => w.isActive).length;
    
    contentArea.innerHTML = `
        <div class="health-content">
            <div class="health-overview">
                <div class="health-stats">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-paw icon"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Питомцы</h4>
                            <p class="stat-value" id="pets-count">${petsCount}</p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-calendar-alt icon"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Предстоящие визиты</h4>
                            <p class="stat-value" id="upcoming-vet">${upcomingVet}</p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-medkit icon"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Лекарства</h4>
                            <p class="stat-value" id="active-meds">${activeMeds}</p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-tint icon"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Напоминания о воде</h4>
                            <p class="stat-value" id="water-reminders">${waterRemindersCount}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="health-sections">
                <div class="section-card" id="vaccinations-section">
                    <div class="section-header">
                        <h3>Вакцинация</h3>
                        <button class="btn btn-small" onclick="addVaccination()">
                            <i class="fas fa-plus icon"></i>
                        </button>
                    </div>
                    <div class="vaccination-list" id="vaccination-list">
                        ${vaccinations.map(v => createVaccinationHTML(v)).join('')}
                    </div>
                </div>

                <div class="section-card" id="medications-section">
                    <div class="section-header">
                        <h3>Лекарства</h3>
                        <button class="btn btn-small" onclick="addMedication()">
                            <i class="fas fa-plus icon"></i>
                        </button>
                    </div>
                    <div class="medication-list" id="medication-list">
                        ${medications.map(m => createMedicationHTML(m)).join('')}
                    </div>
                </div>

                <div class="section-card" id="water-section">
                    <div class="section-header">
                        <h3>Вода</h3>
                        <button class="btn btn-small" onclick="addWaterReminder()">
                            <i class="fas fa-plus icon"></i>
                        </button>
                    </div>
                    <div class="water-reminders" id="water-reminders-list">
                        ${waterReminders.map(w => createWaterReminderHTML(w)).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===== МОДАЛЬНОЕ ОКНО ЗДОРОВЬЯ =====
function openHealthModal() {
    console.log("Открываем окно здоровья...");
    
    // Удаляем старое окно если есть
    const oldModal = document.getElementById('health-modal');
    if (oldModal) oldModal.remove();
    
    // Закрываем другие модалки здоровья
    const modals = ['vaccination-modal', 'medication-modal'];
    modals.forEach(id => {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('active');
    });
    
    // Создаем красивое окно здоровья
    const modalHTML = `
        <div class="modal active" id="health-modal" style="z-index: 10050;">
            <div class="modal-overlay" onclick="closeHealthModal()" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5);"></div>
            <div class="modal-container" style="position: relative; background: white; border-radius: 20px; padding: 0; max-width: 500px; margin: 20px auto;">
                <div class="modal-header" style="background: #7FB5B5; color: white; padding: 1.5rem; border-radius: 20px 20px 0 0;">
                    <div class="modal-title" style="display: flex; align-items: center; gap: 0.75rem;">
                        <i class="fas fa-heart icon" style="color: white; font-size: 1.5rem;"></i>
                        <h3 style="margin: 0; color: white;">Здоровье питомцев</h3>
                    </div>
                    <button class="close-modal" onclick="closeHealthModal()" style="width: 36px; height: 36px; border-radius: 50%; border: none; background: rgba(255,255,255,0.1); color: white; cursor: pointer;">
                        <i class="fas fa-times icon"></i>
                    </button>
                </div>
                
                <div class="modal-body" style="padding: 1.5rem;">
                    <div class="health-actions">
                        <div class="health-action-btn" onclick="addVaccination()">
                            <i class="fas fa-syringe icon"></i>
                            <span>Вакцинация</span>
                        </div>
                        <div class="health-action-btn" onclick="addMedication()">
                            <i class="fas fa-pills icon"></i>
                            <span>Лекарства</span>
                        </div>
                        <div class="health-action-btn" onclick="addWaterReminder()">
                            <i class="fas fa-tint icon"></i>
                            <span>Вода</span>
                        </div>
                    </div>
                    
                    <div class="coming-soon-notice">
                        <i class="fas fa-heartbeat icon"></i>
                        <p>Управляйте здоровьем ваших питомцев</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Добавляем окно на страницу
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeHealthModal() {
    const modal = document.getElementById('health-modal');
    if (modal) modal.remove();
}

function closeVaccinationModal() {
    const modal = document.getElementById('vaccination-modal');
    const overlay = modal?.querySelector('.modal-overlay');
    
    if (modal) {
        modal.style.display = 'none';
        if (overlay) overlay.style.display = 'none';
        document.getElementById('add-vaccination-form').reset();
    }
}

function addMedication() {
    // 1. Закрываем ВСЕ открытые модалки здоровья
    closeAllHealthModals();
    
    // 2. Получаем модальное окно
    const modal = document.getElementById('medication-modal');
    if (!modal) return;
    
    // 3. Заполняем список питомцев
    const petSelect = document.getElementById('medication-pet');
    if (petSelect) {
        petSelect.innerHTML = '<option value="" disabled selected>Выберите питомца</option>' +
            currentPets.map(pet => 
                `<option value="${pet.id}">${pet.name}</option>`
            ).join('');
    }
    
    // 4. Устанавливаем текущую дату
    const today = formatDateForInput(new Date());
    document.getElementById('medication-start').value = today;
    
    // 5. Показываем модальное окно
    modal.classList.add('active');
}

function closeMedicationModal() {
    const modal = document.getElementById('medication-modal');
    const overlay = modal?.querySelector('.modal-overlay');
    
    if (modal) {
        modal.style.display = 'none';
        if (overlay) overlay.style.display = 'none';
        document.getElementById('add-medication-form').reset();
    }
}

function addWaterReminder() {
    // ЗАКРЫВАЕМ ОКНО ЗДОРОВЬЯ
    closeHealthModal();
    
    const pet = currentPets.length > 0 ? currentPets[0] : null;
    if (!pet) {
        showNotification('Ошибка', 'Добавьте сначала питомца');
        return;
    }
    
    // Закрываем другие модальные окна
    closeVaccinationModal();
    closeMedicationModal();
    
    // Создаем напоминание о воде по умолчанию
    const reminder = {
        id: generateId(),
        petId: pet.id,
        frequency: 'every_3_hours',
        isActive: true,
        createdAt: new Date().toISOString()
    };
    
    waterReminders.push(reminder);
    saveUserData();
    
    // Создаем напоминания
    createWaterReminders(reminder);
    
    // Обновляем интерфейс
    loadHealthContent();
    
    // Показываем toast-уведомление
    showNotification('Напоминание о воде добавлено', 'Питомец будет получать напоминания каждые 3 часа');
}

function closeVaccinationModal() {
    const modal = document.getElementById('vaccination-modal');
    const overlay = modal?.querySelector('.modal-overlay');
    
    if (modal) {
        modal.style.display = 'none';
        if (overlay) overlay.style.display = 'none';
        document.getElementById('add-vaccination-form').reset();
    }
}

function saveVaccination() {
    const petId = document.getElementById('vaccination-pet').value;
    const type = document.getElementById('vaccination-type').value.trim();
    const date = document.getElementById('vaccination-date').value;
    const nextDate = document.getElementById('next-vaccination').value;
    const notes = document.getElementById('vaccination-notes').value.trim();
    
    if (!petId || !type || !date) {
        showNotification('Ошибка', 'Заполните обязательные поля');
        return;
    }
    
    const vaccination = {
        id: generateId(),
        petId: petId,
        type: type,
        date: date,
        nextDate: nextDate || null,
        notes: notes,
        createdAt: new Date().toISOString()
    };
    
    vaccinations.push(vaccination);
    saveUserData();
    
    // Закрываем модальное окно (ИСПРАВЛЕННАЯ СТРОКА)
    closeVaccinationModal();
    
    // Обновляем интерфейс
    loadHealthContent();
    
    // Создаем напоминание
    if (nextDate) {
        createNotification(
            '💉 Напоминание о вакцинации',
            `Пора запланировать вакцинацию для питомца`,
            'system'
        );
    }
    
    showNotification('Вакцинация добавлена', 'Запись сохранена');
}

function createVaccinationHTML(vaccination) {
    const pet = currentPets.find(p => p.id === vaccination.petId);
    
    return `
        <div class="vaccination-item">
            <div class="vaccination-info">
                <h4>${vaccination.type}</h4>
                <p class="vaccination-date">
                    ${pet ? pet.name + ' • ' : ''}${formatDate(new Date(vaccination.date))}
                    ${vaccination.nextDate ? `<br><small>Следующая: ${formatDate(new Date(vaccination.nextDate))}</small>` : ''}
                </p>
            </div>
            <div class="vaccination-actions">
                <button class="btn-icon small" onclick="deleteVaccination('${vaccination.id}')">
                    <i class="fas fa-trash icon"></i>
                </button>
            </div>
        </div>
    `;
}

function deleteVaccination(vaccinationId) {
    if (confirm('Удалить запись о вакцинации?')) {
        vaccinations = vaccinations.filter(v => v.id !== vaccinationId);
        saveUserData();
        loadHealthContent();
        showNotification('Запись удалена', 'Запись о вакцинации удалена');
    }
}

function closeMedicationModal() {
    const modal = document.getElementById('medication-modal');
    const overlay = modal?.querySelector('.modal-overlay');
    
    if (modal) {
        modal.style.display = 'none';
        if (overlay) overlay.style.display = 'none';
        document.getElementById('add-medication-form').reset();
    }
}

function saveMedication() {
    const petId = document.getElementById('medication-pet').value;
    const name = document.getElementById('medication-name').value.trim();
    const dosage = document.getElementById('medication-dosage').value.trim();
    const frequency = document.getElementById('medication-frequency').value.trim();
    const startDate = document.getElementById('medication-start').value;
    const endDate = document.getElementById('medication-end').value;
    const notes = document.getElementById('medication-notes').value.trim();
    
    if (!petId || !name || !dosage || !frequency || !startDate) {
        showNotification('Ошибка', 'Заполните обязательные поля');
        return;
    }
    
    const medication = {
        id: generateId(),
        petId: petId,
        name: name,
        dosage: dosage,
        frequency: frequency,
        startDate: startDate,
        endDate: endDate || null,
        notes: notes,
        isActive: true,
        createdAt: new Date().toISOString()
    };
    
    medications.push(medication);
    saveUserData();
    
    // Закрываем модальное окно (ИСПРАВЛЕННАЯ СТРОКА)
    closeMedicationModal();
    
    // Обновляем интерфейс
    loadHealthContent();
    
    // Создаем напоминания
    createMedicationReminders(medication);
    
    showNotification('Лекарство добавлено', 'Напоминания настроены');
}

function createMedicationReminders(medication) {
    // Создаем ежедневные напоминания
    createNotification(
        '💊 Прием лекарства',
        `${medication.name}, ${medication.dosage} для питомца`,
        'medication'
    );
}

function createMedicationHTML(medication) {
    const pet = currentPets.find(p => p.id === medication.petId);
    
    return `
        <div class="medication-item">
            <div class="medication-info">
                <h4>${medication.name}</h4>
                <p class="medication-dates">
                    ${pet ? pet.name + ' • ' : ''}${medication.dosage}<br>
                    <small>${medication.frequency} • До: ${medication.endDate ? formatDate(new Date(medication.endDate)) : 'не указано'}</small>
                </p>
            </div>
            <div class="medication-actions">
                <button class="btn-icon small" onclick="toggleMedication('${medication.id}')">
                    <i class="fas fa-${medication.isActive ? 'check' : 'times'} icon"></i>
                </button>
                <button class="btn-icon small" onclick="deleteMedication('${medication.id}')">
                    <i class="fas fa-trash icon"></i>
                </button>
            </div>
        </div>
    `;
}

function toggleMedication(medicationId) {
    const medication = medications.find(m => m.id === medicationId);
    if (medication) {
        medication.isActive = !medication.isActive;
        saveUserData();
        loadHealthContent();
        
        showNotification(
            medication.isActive ? 'Лекарство активировано' : 'Лекарство отключено',
            medication.name
        );
    }
}

function deleteMedication(medicationId) {
    if (confirm('Удалить запись о лекарстве?')) {
        medications = medications.filter(m => m.id !== medicationId);
        saveUserData();
        loadHealthContent();
        showNotification('Лекарство удалено', 'Запись о лекарстве удалена');
    }
}

function addWaterReminder() {
    // ЗАКРЫВАЕМ ОКНО ЗДОРОВЬЯ при нажатии на кнопку "Вода"
    closeHealthModal();
    
    const pet = currentPets.length > 0 ? currentPets[0] : null;
    if (!pet) {
        showNotification('Ошибка', 'Добавьте сначала питомца');
        return;
    }
    
    // Закрываем другие модальные окна (вакцинацию и лекарства)
    closeVaccinationModal();
    closeMedicationModal();
    
    // Создаем напоминание о воде по умолчанию
    const reminder = {
        id: generateId(),
        petId: pet.id,
        frequency: 'every_3_hours',
        isActive: true,
        createdAt: new Date().toISOString()
    };
    
    waterReminders.push(reminder);
    saveUserData();
    
    // Создаем напоминания
    createWaterReminders(reminder);
    
    // Обновляем интерфейс раздела здоровья
    loadHealthContent();
    
    // Показываем toast-уведомление
    showNotification('Напоминание о воде добавлено', 'Питомец будет получать напоминания каждые 3 часа');
}

function createWaterReminders(reminder) {
    if (!reminder.isActive) return;
    
    const pet = currentPets.find(p => p.id === reminder.petId);
    if (!pet) return;
    
    createNotification(
        '💧 Пора пить воду',
        `Не забудьте напоить ${pet.name}`,
        'water'
    );
}

function createWaterReminderHTML(reminder) {
    const pet = currentPets.find(p => p.id === reminder.petId);
    
    return `
        <div class="water-item">
            <div class="water-info">
                <h4>Напоминание о воде</h4>
                <p class="water-time">
                    ${pet ? pet.name : 'Питомец'} • Каждые 3 часа
                </p>
            </div>
            <div class="water-actions">
                <button class="btn-icon small" onclick="toggleWaterReminder('${reminder.id}')">
                    <i class="fas fa-${reminder.isActive ? 'bell' : 'bell-slash'} icon"></i>
                </button>
                <button class="btn-icon small" onclick="deleteWaterReminder('${reminder.id}')">
                    <i class="fas fa-trash icon"></i>
                </button>
            </div>
        </div>
    `;
}

function toggleWaterReminder(reminderId) {
    const reminder = waterReminders.find(w => w.id === reminderId);
    if (reminder) {
        reminder.isActive = !reminder.isActive;
        saveUserData();
        
        if (reminder.isActive) {
            createWaterReminders(reminder);
        }
        
        loadHealthContent();
        
        showNotification(
            reminder.isActive ? 'Напоминания включены' : 'Напоминания отключены',
            'Напоминания о воде ' + (reminder.isActive ? 'включены' : 'отключены')
        );
    }
}

function deleteWaterReminder(reminderId) {
    if (confirm('Удалить напоминание о воде?')) {
        waterReminders = waterReminders.filter(w => w.id !== reminderId);
        saveUserData();
        loadHealthContent();
        showNotification('Напоминание удалено', 'Напоминание о воде удалено');
    }
}

// ===== ОБУЧЕНИЕ =====
function loadLearningContent() {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;
    
    contentArea.innerHTML = `
        <div class="learning-content">
            <div class="learning-categories">
                <div class="category-card" onclick="showLearningCategory('training')">
                    <div class="category-icon">
                        <i class="fas fa-dumbbell icon"></i>
                    </div>
                    <h3>Дрессировка</h3>
                    <p>Базовые команды и обучение</p>
                </div>
                
                <div class="category-card" onclick="showLearningCategory('grooming')">
                    <div class="category-icon">
                        <i class="fas fa-bath icon"></i>
                    </div>
                    <h3>Уход</h3>
                    <p>Гигиена и груминг</p>
                </div>
                
                <div class="category-card" onclick="showLearningCategory('health')">
                    <div class="category-icon">
                        <i class="fas fa-heart icon"></i>
                    </div>
                    <h3>Здоровье</h3>
                    <p>Профилактика и лечение</p>
                </div>
                
                <div class="category-card" onclick="showLearningCategory('nutrition')">
                    <div class="category-icon">
                        <i class="fas fa-bowl-food icon"></i>
                    </div>
                    <h3>Питание</h3>
                    <p>Рацион и кормление</p>
                </div>
                
                <div class="category-card" onclick="showLearningCategory('behavior')">
                    <div class="category-icon">
                        <i class="fas fa-paw icon"></i>
                    </div>
                    <h3>Поведение</h3>
                    <p>Понимание питомца</p>
                </div>
                
                <div class="category-card" onclick="showLearningCategory('safety')">
                    <div class="category-icon">
                        <i class="fas fa-shield-alt icon"></i>
                    </div>
                    <h3>Безопасность</h3>
                    <p>Опасности и защита</p>
                </div>
            </div>
            
            <div class="learning-videos" id="learning-videos">
                <h3 class="section-title">Популярные видео</h3>
                <div class="videos-grid">
                    ${createVideoCardsHTML()}
                </div>
            </div>
        </div>
    `;
}

// ===== ЧАТ-ПОМОЩНИК =====
function loadChatContent() {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;
    
    contentArea.innerHTML = `
        <div class="chat-content">
            <div class="coming-soon-notice">
                <i class="fas fa-comments icon"></i>
                <p>Скоро тут появится чат‑помощник</p>
            </div>
        </div>
    `;
}

// ===== СОЦСЕТЬ =====
function loadSocialContent() {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;
    
    contentArea.innerHTML = `
        <div class="social-content">
            <div class="coming-soon-notice">
                <i class="fas fa-users icon"></i>
                <p>Скоро тут появится соцсеть</p>
            </div>
        </div>
    `;
}

// ===== МАРКЕТПЛЕЙС =====
function loadMarketplaceContent() {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;
    
    contentArea.innerHTML = `
        <div class="marketplace-content">
            <div class="coming-soon-notice">
                <i class="fas fa-store icon"></i>
                <p>Скоро тут появится маркетплейс зоотоваров</p>
            </div>
        </div>
    `;
}

function showLearningCategory(category) {
    const videos = LEARNING_VIDEOS[category] || [];
    
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;
    
    contentArea.innerHTML = `
        <div class="learning-content">
            <div class="learning-header">
                <button class="back-btn" onclick="loadLearningContent()">
                    <i class="fas fa-arrow-left icon"></i>
                </button>
                <h2>${getCategoryName(category)}</h2>
            </div>
            
            <div class="category-videos">
                <h3 class="section-title">Видео по теме</h3>
                <div class="videos-grid">
                    ${videos.map(video => createVideoCardHTML(video)).join('')}
                </div>
            </div>
        </div>
    `;
}

function getCategoryName(category) {
    const names = {
        'training': 'Дрессировка',
        'grooming': 'Уход',
        'health': 'Здоровье',
        'nutrition': 'Питание',
        'behavior': 'Поведение',
        'safety': 'Безопасность'
    };
    return names[category] || category;
}

function createVideoCardsHTML() {
    let allVideos = [];
    Object.values(LEARNING_VIDEOS).forEach(categoryVideos => {
        allVideos = allVideos.concat(categoryVideos);
    });
    
    // Берем первые 6 видео
    return allVideos.slice(0, 6).map(video => createVideoCardHTML(video)).join('');
}

function createVideoCardHTML(video) {
    return `
        <div class="video-card">
            <div class="video-thumbnail">
                <i class="fas fa-play-circle icon"></i>
                <div class="video-play">
                    <i class="fas fa-play icon"></i>
                </div>
            </div>
            <div class="video-info">
                <h4 class="video-title">${video.title}</h4>
                <p class="video-description">${video.description}</p>
                <div class="video-meta">
                    <span>${getCategoryName(video.category)}</span>
                    <span>${video.duration}</span>
                </div>
            </div>
        </div>
    `;
}

// ===== ПРОФИЛЬ =====
function initProfileModal() {
    const editProfileModal = document.getElementById('edit-profile-modal');
    
    if (editProfileModal) {
        editProfileModal.addEventListener('click', function(e) {
            if (e.target === this || e.target.classList.contains('modal-overlay')) {
                closeEditProfileModal();
            }
        });
        
        document.getElementById('close-edit-profile-modal')?.addEventListener('click', closeEditProfileModal);
        document.getElementById('cancel-edit-profile')?.addEventListener('click', closeEditProfileModal);
        
        // Загрузка фото профиля
        const profilePhotoInput = document.getElementById('edit-profile-photo');
        if (profilePhotoInput) {
            profilePhotoInput.addEventListener('change', function(e) {
                handlePhotoUpload(e, 'edit-profile-photo-preview');
            });
        }
        
        // Форма редактирования профиля
        const editForm = document.getElementById('edit-profile-form');
        if (editForm) {
            editForm.addEventListener('submit', function(e) {
                e.preventDefault();
                saveProfileChanges();
            });
        } // ЗАКРЫВАЕМ if (editForm) ЗДЕСЬ!
        
        // Кнопка подтверждения email (ВНЕ блока editForm)
        document.getElementById('verify-email')?.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification(
                'Демо-версия',
                'В полной версии мы отправим код подтверждения на ваш email. Сейчас это демо-режим.',
                'info'
            );
        });
        
        // Кнопка подтверждения телефона (ВНЕ блока editForm)
        document.getElementById('verify-phone')?.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification(
                'Демо-версия', 
                'В полной версии мы отправим SMS с код подтверждения. Сейчас это демо-режим.',
                'info'
            );
        });
    } // закрываем if (editProfileModal)
}

function loadProfileContent() {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;
    
    contentArea.innerHTML = `
        <div class="profile-content">
            <div class="user-card">
                <div class="user-avatar-large" id="profile-user-avatar">
                    ${currentUser?.photo ? 
                        `<img src="${currentUser.photo}" alt="${currentUser.fullName}">` :
                        '<i class="fas fa-user icon"></i>'
                    }
                </div>
                <h2 class="user-name">${currentUser?.fullName || 'Пользователь'}</h2>
                <p class="user-detail">${currentUser?.emailPhone || ''}</p>
                <p class="user-detail">${currentUser?.phone ? `Телефон: ${currentUser.phone}` : ''}</p>
                <p class="user-detail">Зарегистрирован: ${currentUser?.registeredAt ? formatDate(new Date(currentUser.registeredAt)) : 'сегодня'}</p>
                
                <!-- ДВЕ КНОПКИ: -->
                <button class="btn btn-primary mt-4" id="edit-profile-btn">
                    <i class="fas fa-edit icon"></i>
                    Редактировать профиль
                </button>
                
                <button class="btn btn-secondary mt-4" id="open-settings-btn">
                    <i class="fas fa-cog icon"></i>
                    Настройки
                </button>
            </div>
            
            <div class="stats-section">
                <h3 class="section-title">Статистика</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-icon">
                            <i class="fas fa-paw icon"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Питомцы</h4>
                            <p class="stat-value">${currentPets.length}</p>
                        </div>
                    </div>
                    
                    <div class="stat-item">
                        <div class="stat-icon">
                            <i class="fas fa-calendar-alt icon"></i>
                        </div>
                        <div class="stat-info">
                            <h4>События</h4>
                            <p class="stat-value">${currentEvents.length}</p>
                        </div>
                    </div>
                    
                    <div class="stat-item">
                        <div class="stat-icon">
                            <i class="fas fa-medkit icon"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Вакцинации</h4>
                            <p class="stat-value">${vaccinations.length}</p>
                        </div>
                    </div>
                    
                    <div class="stat-item">
                        <div class="stat-icon">
                            <i class="fas fa-graduation-cap icon"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Видео просмотрено</h4>
                            <p class="stat-value">0</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="pets-section">
                <div class="section-header">
                    <h3>Мои питомцы</h3>
                    <button class="add-pet-btn" onclick="openAddPetModal()">
                        <i class="fas fa-plus icon"></i>
                        Добавить питомца
                    </button>
                </div>
                
                ${currentPets.length > 0 ? `
                    <div class="pets-list">
                        ${currentPets.map(pet => createPetCardHTML(pet)).join('')}
                    </div>
                ` : `
                    <div class="no-pets">
                        <i class="fas fa-paw icon"></i>
                        <p>У вас еще нет добавленных питомцев</p>
                        <button class="btn btn-primary mt-4" onclick="openAddPetModal()">
                            <i class="fas fa-plus icon"></i>
                            Добавить первого питомца
                        </button>
                    </div>
                `}
            </div>
        </div>
    `;
    
    // Обновляем аватар профиля
    const profileAvatar = document.getElementById('profile-user-avatar');
    if (profileAvatar && currentUser?.photo) {
        profileAvatar.classList.add('has-photo');
    }
    
    // Обработчик кнопки редактирования профиля
    document.getElementById('edit-profile-btn')?.addEventListener('click', () => {
        openEditProfileModal();
    });
    
    // Обработчик кнопки настроек
    document.getElementById('open-settings-btn')?.addEventListener('click', () => {
        showScreen('settings');
    });
}

function openEditProfileModal() {
    if (!currentUser) return;
    
    const modal = document.getElementById('edit-profile-modal');
    const overlay = document.getElementById('edit-profile-overlay');
    
    if (!modal) return;
    
    // Заполняем форму
    document.getElementById('edit-lastname').value = currentUser.lastName || '';
    document.getElementById('edit-firstname').value = currentUser.firstName || '';
    document.getElementById('edit-email').value = currentUser.emailPhone || '';
    
    // ЗАПОЛНЯЕМ ПОЛЕ ТЕЛЕФОНА
    const phoneInput = document.getElementById('edit-phone');
    if (phoneInput) {
        phoneInput.value = currentUser.phone || '';
    }
    
    // Загружаем фото профиля
    const preview = document.getElementById('edit-profile-photo-preview');
    if (currentUser.photo) {
        preview.innerHTML = `<img src="${currentUser.photo}" alt="Аватар">`;
    } else {
        preview.innerHTML = '';
    }
    
    modal.style.display = 'flex';
    if (overlay) overlay.style.display = 'block';
}

function closeEditProfileModal() {
    const modal = document.getElementById('edit-profile-modal');
    const overlay = document.getElementById('edit-profile-overlay');
    
    if (modal) {
        modal.style.display = 'none';
        if (overlay) overlay.style.display = 'none';
        document.getElementById('edit-profile-form').reset();
        const preview = document.getElementById('edit-profile-photo-preview');
        if (preview) preview.innerHTML = '';
    }
}

function saveProfileChanges() {
    const lastName = document.getElementById('edit-lastname').value.trim();
    const firstName = document.getElementById('edit-firstname').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    const phone = document.getElementById('edit-phone')?.value.trim() || '';
    const newPassword = document.getElementById('edit-password')?.value.trim() || '';
    const photo = document.getElementById('edit-profile-photo-preview').querySelector('img')?.src || currentUser.photo;
    
    // ВАЛИДАЦИЯ: проверяем обязательные поля
    if (!lastName || !firstName || !email) {
        showNotification('Ошибка', 'Заполните обязательные поля: Фамилия, Имя, Email');
        return;
    }
    
    // ПРОВЕРКА EMAIL НА УНИКАЛЬНОСТЬ (если изменился)
    if (email !== currentUser.email) {
        const emailExists = allUsers.some(user => 
            user.id !== currentUser.id && 
            (user.email === email || user.emailPhone === email)
        );
        if (emailExists) {
            showNotification('Ошибка', 'Этот email уже используется другим пользователем');
            return;
        }
    }
    
    // ПРОВЕРКА ТЕЛЕФОНА НА УНИКАЛЬНОСТЬ (если изменился и не пустой)
    if (phone && phone !== currentUser.phone) {
        const phoneExists = allUsers.some(user => 
            user.id !== currentUser.id && 
            (user.phone === phone || user.emailPhone === phone)
        );
        if (phoneExists) {
            showNotification('Ошибка', 'Этот телефон уже используется другим пользователем');
            return;
        }
    }
    
    // ОБНОВЛЯЕМ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
    currentUser.lastName = lastName;
    currentUser.firstName = firstName;
    currentUser.fullName = `${lastName} ${firstName} ${currentUser.middleName || ''}`.trim();
    
    // ОБНОВЛЯЕМ КОНТАКТНЫЕ ДАННЫЕ
    currentUser.email = email;
    currentUser.phone = phone; // ← ВАЖНО! Сохраняем телефон
    
    // ДЛЯ ОБРАТНОЙ СОВМЕСТИМОСТИ: emailPhone будет email
    currentUser.emailPhone = email;
    
    // СМЕНА ПАРОЛЯ (если введен новый)
    if (newPassword) {
        if (newPassword.length < 8) {
            showNotification('Ошибка', 'Пароль должен содержать минимум 8 символов');
            return;
        }
        currentUser.passwordHash = SimpleEncryption.hashPassword(newPassword);
        showNotification('Успешно', 'Пароль изменен');
    }
    
    currentUser.photo = photo;
    
    // СОХРАНЯЕМ ДАННЫЕ
    saveUserData();
    
    // ОБНОВЛЯЕМ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ (чтобы изменения были в allUsers)
    const userIndex = allUsers.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        allUsers[userIndex] = currentUser;
        StorageManager.save(CONFIG.STORAGE_KEYS.USERS, allUsers);
    }
    
    // ОБНОВЛЯЕМ UI
    updateUserInfo();
    loadProfileContent();
    
    // ЗАКРЫВАЕМ МОДАЛЬНОЕ ОКНО
    closeEditProfileModal();
    
    // УВЕДОМЛЕНИЕ
    showNotification('Профиль обновлен', 'Изменения сохранены успешно');
}

// ===== НАВИГАЦИЯ =====
function initNavigation() {
    // Нижняя навигация
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const screen = this.dataset.screen;
            loadScreenContent(screen);
            showScreen('main');
        });
    });
    
    // Кнопки в хедере
    const notificationsBtn = document.getElementById('notifications-btn');
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', function() {
            document.getElementById('notifications-panel').classList.add('active');
            markAllNotificationsAsRead();
        });
    }
    
    const profileBtn = document.getElementById('profile-btn');
    if (profileBtn) {
        profileBtn.addEventListener('click', function() {
            loadScreenContent('profile');
            showScreen('main');
        });
    }
}

// ===== УВЕДОМЛЕНИЯ =====
function initNotifications() {
    // Кнопка открытия панели уведомлений
    const fabBtn = document.getElementById('show-notifications');
    if (fabBtn) {
        fabBtn.addEventListener('click', () => {
            document.getElementById('notifications-panel').classList.add('active');
            markAllNotificationsAsRead();
        });
    }
    
    // Кнопка закрытия панели
    const closeBtn = document.getElementById('close-notifications-panel');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.getElementById('notifications-panel').classList.remove('active');
        });
    }
    
    // Кнопка "Прочитать все"
    const markAllReadBtn = document.getElementById('mark-all-read');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', markAllNotificationsAsRead);
    }
    
    // Кнопка "Очистить"
    const clearBtn = document.getElementById('clear-notifications');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearAllNotifications);
    }
}

function createNotification(title, message, type = 'system', scheduledTime = null) {
    if (!currentSettings.notifications) return null;
    
    const notification = {
        id: generateId(),
        title,
        message,
        type,
        read: false,
        createdAt: new Date().toISOString(),
        scheduledTime: scheduledTime ? scheduledTime.toISOString() : null
    };
    
    currentNotifications.unshift(notification);
    saveUserData();
    
    // Обновляем UI
    updateNotificationsList();
    updateNotificationCount();
    
    // Показываем toast для немедленных уведомлений
    if (!scheduledTime) {
        showNotification(title, message);
    }
    
    return notification;
}

function updateNotificationCount() {
    const unreadCount = currentNotifications.filter(n => !n.read).length;
    const countElement = document.getElementById('notification-count');
    const badgeElement = document.querySelector('.notification-badge');
    
    if (countElement) {
        countElement.textContent = unreadCount > 99 ? '99+' : unreadCount;
        countElement.style.display = unreadCount > 0 ? 'block' : 'none';
    }
    
    if (badgeElement) {
        badgeElement.textContent = unreadCount > 99 ? '99+' : unreadCount;
        badgeElement.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
}

function updateNotificationsList() {
    const listElement = document.getElementById('notifications-list');
    if (!listElement) return;
    
    if (currentNotifications.length === 0) {
        listElement.innerHTML = `
            <div class="empty-notifications">
                <i class="fas fa-bell icon"></i>
                <p>Нет новых уведомлений</p>
            </div>
        `;
        return;
    }
    
    listElement.innerHTML = currentNotifications.slice(0, 10).map(notification => `
        <div class="notification-item ${notification.read ? '' : 'unread'}" 
             onclick="markNotificationAsRead('${notification.id}')">
            <div class="notification-header">
                <div style="display: flex; align-items: flex-start; gap: 0.75rem; width: 100%;">
                    <div class="notification-type-icon">
                        <i class="${getNotificationIconFA(notification.type)} icon"></i>
                    </div>
                    <div style="flex: 1;">
                        <h4 class="notification-title">${notification.title}</h4>
                        <p class="notification-message">${notification.message}</p>
                        <span class="notification-time">${formatTimeAgo(notification.createdAt)}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function markNotificationAsRead(notificationId) {
    const notification = currentNotifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
        saveUserData();
        updateNotificationsList();
        updateNotificationCount();
    }
}

function markAllNotificationsAsRead() {
    currentNotifications.forEach(notification => {
        notification.read = true;
    });
    saveUserData();
    updateNotificationsList();
    updateNotificationCount();
}

function clearAllNotifications() {
    if (confirm('Очистить все уведомления?')) {
        currentNotifications = [];
        saveUserData();
        updateNotificationsList();
        updateNotificationCount();
    }
}

// ===== НАСТРОЙКИ =====
function initSettings() {
    // Кнопка "Назад" в резервном копировании
    document.getElementById('back-from-backup')?.addEventListener('click', () => {
        showScreen('settings');
    });
    
    // Экспорт данных
    document.getElementById('export-data')?.addEventListener('click', exportUserData);
    
    // Импорт данных
    document.getElementById('import-file')?.addEventListener('change', handleImportFileSelect);
    document.getElementById('import-data')?.addEventListener('click', importUserData);
    
    // Очистка данных
    document.getElementById('clear-user-data')?.addEventListener('click', clearCurrentUserData);
    
    // ДОБАВЬТЕ ЭТУ СТРОКУ:
    // Кнопка резервного копирования в настройках
    document.getElementById('backup-settings-btn')?.addEventListener('click', () => {
        showScreen('backup');
    });
}

// ===== ТЁМНАЯ ТЕМА =====
function initTheme() {
    const savedTheme = currentSettings.theme || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.checked = savedTheme === 'dark';
        themeToggle.addEventListener('change', toggleTheme);
    }
}

function toggleTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const theme = themeToggle.checked ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', theme);
    currentSettings.theme = theme;
    saveUserData();
    
    showNotification(
        theme === 'dark' ? 'Тёмная тема включена' : 'Светлая тема включена', 
        'Внешний вид приложения изменен'
    );
}

// ===== РЕЗЕРВНОЕ КОПИРОВАНИЕ =====
function exportUserData() {
    const userData = {
        user: currentUser,
        pets: currentPets,
        events: currentEvents,
        notifications: currentNotifications,
        vaccinations: vaccinations,
        medications: medications,
        waterReminders: waterReminders,
        settings: currentSettings,
        exportDate: new Date().toISOString(),
        version: CONFIG.APP_VERSION
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `mypet-backup-${formatDateForInput(new Date())}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification('Экспорт завершен', 'Данные сохранены в файл');
}

function handleImportFileSelect(event) {
    const file = event.target.files[0];
    const importBtn = document.getElementById('import-data');
    
    if (file && file.type === 'application/json') {
        importBtn.disabled = false;
    } else {
        importBtn.disabled = true;
        showNotification('Ошибка', 'Выберите файл в формате JSON');
    }
}

function importUserData() {
    const fileInput = document.getElementById('import-file');
    const file = fileInput.files[0];
    
    if (!file) {
        showNotification('Ошибка', 'Выберите файл для импорта');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            // Проверяем версию и структуру
            if (!importedData.user || !importedData.pets) {
                throw new Error('Неверный формат файла');
            }
            
            if (confirm('Заменить текущие данные импортированными? Существующие данные будут утеряны.')) {
                // Обновляем данные
                currentUser = importedData.user;
                currentPets = importedData.pets || [];
                currentEvents = importedData.events || [];
                currentNotifications = importedData.notifications || [];
                vaccinations = importedData.vaccinations || [];
                medications = importedData.medications || [];
                waterReminders = importedData.waterReminders || [];
                currentSettings = importedData.settings || currentSettings;
                
                // Сохраняем
                saveUserData();
                
                // Обновляем UI
                updateUserInfo();
                loadScreenContent('calendar');
                
                showNotification('Импорт завершен', 'Данные успешно загружены');
            }
        } catch (error) {
            console.error('Ошибка импорта:', error);
            showNotification('Ошибка', 'Не удалось загрузить файл. Проверьте формат.');
        }
    };
    
    reader.readAsText(file);
}

function clearCurrentUserData() {
    if (confirm('Вы уверены, что хотите удалить ВСЕ данные текущего пользователя? Это действие нельзя отменить.')) {
        StorageManager.clearUserData();
        
        // Сбрасываем данные в памяти
        currentPets = [];
        currentEvents = [];
        currentNotifications = [];
        vaccinations = [];
        medications = [];
        waterReminders = [];
        
        // Обновляем UI
        loadScreenContent('calendar');
        
        showNotification('Данные очищены', 'Все данные пользователя удалены');
    }
}

// ===== УДАЛЕНИЕ АККАУНТА =====
function openDeleteAccountModal() {
    const modal = document.getElementById('delete-account-modal');
    const overlay = modal?.querySelector('.modal-overlay');
    
    if (modal) {
        modal.style.display = 'flex';
        if (overlay) overlay.style.display = 'block';
        
        // Сбрасываем поле подтверждения
        document.getElementById('confirm-delete-text').value = '';
        document.getElementById('confirm-delete-account').disabled = true;
    }
}

function closeDeleteAccountModalFunc() {
    const modal = document.getElementById('delete-account-modal');
    const overlay = modal?.querySelector('.modal-overlay');
    
    if (modal) {
        modal.style.display = 'none';
        if (overlay) overlay.style.display = 'none';
        document.getElementById('confirm-delete-text').value = '';
        document.getElementById('confirm-delete-account').disabled = true;
    }
}

function validateDeleteConfirmation() {
    const input = document.getElementById('confirm-delete-text');
    const confirmBtn = document.getElementById('confirm-delete-account');
    
    if (input && confirmBtn) {
        const isCorrect = input.value.trim() === 'УДАЛИТЬ МОЙ АККАУНТ';
        confirmBtn.disabled = !isCorrect;
        
        if (isCorrect) {
            input.style.borderColor = 'var(--success)';
            input.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
        } else {
            input.style.borderColor = 'var(--border-color)';
            input.style.backgroundColor = 'var(--bg-primary)';
        }
    }
}

function deleteUserAccount() {
    if (!currentUser) {
        showNotification('Ошибка', 'Пользователь не найден');
        return;
    }
    
    // Получаем подтверждающий текст
    const confirmText = document.getElementById('confirm-delete-text').value.trim();
    if (confirmText !== 'УДАЛИТЬ МОЙ АККАУНТ') {
        showNotification('Ошибка', 'Текст подтверждения неверен');
        return;
    }
    
    // Удаляем пользователя из списка
    allUsers = allUsers.filter(user => user.id !== currentUser.id);
    StorageManager.save(CONFIG.STORAGE_KEYS.USERS, allUsers);
    
    // Удаляем все данные пользователя
    StorageManager.remove(`${CONFIG.STORAGE_KEYS.PETS}_${currentUser.id}`);
    StorageManager.remove(`${CONFIG.STORAGE_KEYS.EVENTS}_${currentUser.id}`);
    StorageManager.remove(`${CONFIG.STORAGE_KEYS.NOTIFICATIONS}_${currentUser.id}`);
    StorageManager.remove(`${CONFIG.STORAGE_KEYS.VACCINATIONS}_${currentUser.id}`);
    StorageManager.remove(`${CONFIG.STORAGE_KEYS.MEDICATIONS}_${currentUser.id}`);
    StorageManager.remove(`${CONFIG.STORAGE_KEYS.WATER_REMINDERS}_${currentUser.id}`);
    
    // Удаляем последний ID пользователя
    localStorage.removeItem('last_user_id');
    
    // Сбрасываем текущие данные
    currentUser = null;
    currentPets = [];
    currentEvents = [];
    currentNotifications = [];
    vaccinations = [];
    medications = [];
    waterReminders = [];
    
    // Закрываем модальное окно
    closeDeleteAccountModalFunc();
    
    // Показываем экран входа
    setTimeout(() => {
        showScreen('login');
        updateUsersList();
        showNotification('Аккаунт удален', 'Все данные успешно удалены');
    }, 1000);
}

// ===== ИСПРАВЛЕННЫЕ МОДАЛЬНЫЕ ОКНА ЗДОРОВЬЯ =====

// Функция открытия окна вакцинации
function addVaccination() {
    // Закрываем основное окно здоровья если оно открыто
    closeHealthModal();
    
    // Открываем окно вакцинации
    const modal = document.getElementById('vaccination-modal');
    if (!modal) return;
    
    // Заполняем список питомцев
    const petSelect = document.getElementById('vaccination-pet');
    if (petSelect) {
        petSelect.innerHTML = '<option value="" disabled selected>Выберите питомца</option>' +
            currentPets.map(pet => 
                `<option value="${pet.id}">${pet.name}</option>`
            ).join('');
    }
    
    // Устанавливаем сегодняшнюю дату
    document.getElementById('vaccination-date').value = formatDateForInput(new Date());
    
    // ПОКАЗЫВАЕМ ОКНО (главное исправление!)
    modal.classList.add('active');
    
    // Показываем overlay
    const overlay = modal.querySelector('.modal-overlay');
    if (overlay) {
        overlay.style.display = 'block';
    }
}

// Функция закрытия окна вакцинации
function closeVaccinationModal() {
    const modal = document.getElementById('vaccination-modal');
    if (modal) {
        modal.classList.remove('active');
    }
    
    // Скрываем overlay
    const overlay = document.querySelector('#vaccination-modal .modal-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
    
    // Очищаем форму
    const form = document.getElementById('add-vaccination-form');
    if (form) form.reset();
}

// Функция сохранения вакцинации
function saveVaccination() {
    const petId = document.getElementById('vaccination-pet').value;
    const type = document.getElementById('vaccination-type').value.trim();
    const date = document.getElementById('vaccination-date').value;
    const nextDate = document.getElementById('next-vaccination').value;
    const notes = document.getElementById('vaccination-notes').value.trim();
    
    if (!petId || !type || !date) {
        showNotification('Ошибка', 'Заполните обязательные поля');
        return;
    }
    
    const vaccination = {
        id: generateId(),
        petId: petId,
        type: type,
        date: date,
        nextDate: nextDate || null,
        notes: notes,
        createdAt: new Date().toISOString()
    };
    
    vaccinations.push(vaccination);
    saveUserData();
    
    // Закрываем окно
    closeVaccinationModal();
    
    // Обновляем интерфейс
    loadHealthContent();
    
    showNotification('Вакцинация добавлена', 'Запись сохранена');
}

// Функция открытия окна лекарств
function addMedication() {
    // Закрываем основное окно здоровья если оно открыто
    closeHealthModal();
    
    // Открываем окно лекарств
    const modal = document.getElementById('medication-modal');
    if (!modal) return;
    
    // Заполняем список питомцев
    const petSelect = document.getElementById('medication-pet');
    if (petSelect) {
        petSelect.innerHTML = '<option value="" disabled selected>Выберите питомца</option>' +
            currentPets.map(pet => 
                `<option value="${pet.id}">${pet.name}</option>`
            ).join('');
    }
    
    // Устанавливаем сегодняшнюю дату
    const today = formatDateForInput(new Date());
    document.getElementById('medication-start').value = today;
    
    // ПОКАЗЫВАЕМ ОКНО (главное исправление!)
    modal.classList.add('active');
    
    // Показываем overlay
    const overlay = modal.querySelector('.modal-overlay');
    if (overlay) {
        overlay.style.display = 'block';
    }
}

// Функция закрытия окна лекарств
function closeMedicationModal() {
    const modal = document.getElementById('medication-modal');
    if (modal) {
        modal.classList.remove('active');
    }
    
    // Скрываем overlay
    const overlay = document.querySelector('#medication-modal .modal-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
    
    // Очищаем форму
    const form = document.getElementById('add-medication-form');
    if (form) form.reset();
}

// Функция сохранения лекарства
function saveMedication() {
    const petId = document.getElementById('medication-pet').value;
    const name = document.getElementById('medication-name').value.trim();
    const dosage = document.getElementById('medication-dosage').value.trim();
    const frequency = document.getElementById('medication-frequency').value.trim();
    const startDate = document.getElementById('medication-start').value;
    const endDate = document.getElementById('medication-end').value;
    const notes = document.getElementById('medication-notes').value.trim();
    
    if (!petId || !name || !dosage || !frequency || !startDate) {
        showNotification('Ошибка', 'Заполните обязательные поля');
        return;
    }
    
    const medication = {
        id: generateId(),
        petId: petId,
        name: name,
        dosage: dosage,
        frequency: frequency,
        startDate: startDate,
        endDate: endDate || null,
        notes: notes,
        isActive: true,
        createdAt: new Date().toISOString()
    };
    
    medications.push(medication);
    saveUserData();
    
    // Закрываем окно
    closeMedicationModal();
    
    // Обновляем интерфейс
    loadHealthContent();
    
    showNotification('Лекарство добавлено', 'Напоминания настроены');
}

// Функция закрытия основного окна здоровья
function closeHealthModal() {
    const modal = document.getElementById('health-modal');
    if (modal) {
        modal.remove();
    }
}

// Инициализация обработчиков для модальных окон
function initHealthModals() {
    // НИЧЕГО НЕ ДЕЛАЕМ - обработчики уже в HTML
    // Кнопки закрытия уже привязаны в HTML через onclick
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(date) {
    if (!date) return '';
    
    const d = date instanceof Date ? date : new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    return `${day}.${month}.${year}`;
}

function formatDateForInput(date) {
    if (!date) return '';
    
    const d = date instanceof Date ? date : new Date(date);
    
    // ФИКС: Используем локальные методы для правильного формата
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'только что';
    if (diffMins < 60) return `${diffMins} мин назад`;
    if (diffHours < 24) return `${diffHours} ч назад`;
    if (diffDays === 1) return 'вчера';
    if (diffDays < 7) return `${diffDays} дн назад`;
    
    return formatDate(date);
}

function calculateAge(birthdate) {
    if (!birthdate) return '';
    
    const birth = new Date(birthdate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    if (years === 0) {
        return `${months} месяц${months === 1 ? '' : months < 5 ? 'а' : 'ев'}`;
    } else {
        const yearWord = years === 1 ? 'год' : years < 5 ? 'года' : 'лет';
        if (months > 0) {
            const monthWord = months === 1 ? 'месяц' : months < 5 ? 'месяца' : 'месяцев';
            return `${years} ${yearWord} ${months} ${monthWord}`;
        }
        return `${years} ${yearWord}`;
    }
}

function showNotification(title, message, type = 'success') {
    const toast = document.getElementById('notification-toast');
    if (!toast) {
        // Создаем toast если его нет
        const toastHTML = `
            <div id="notification-toast" class="notification-toast" style="z-index: 10050;">
                <div class="toast-content">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} icon toast-icon"></i>
                    <div class="toast-message">
                        <strong class="toast-title">${title}</strong>
                        <p class="toast-text">${message}</p>
                    </div>
                    <button class="toast-close" onclick="this.parentElement.parentElement.classList.remove('active')">
                        <i class="fas fa-times icon"></i>
                    </button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', toastHTML);
    }
    
    const toastElement = document.getElementById('notification-toast');
    const toastTitle = toastElement.querySelector('.toast-title');
    const toastText = toastElement.querySelector('.toast-text');
    const toastIcon = toastElement.querySelector('.toast-icon');
    
    if (toastTitle && toastText && toastIcon) {
        toastTitle.textContent = title;
        toastText.textContent = message;
        
        // Устанавливаем иконку в зависимости от типа
        const iconMap = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        
        toastIcon.className = `fas fa-${iconMap[type] || 'check-circle'} icon toast-icon`;
        
        // Показ уведомления
        toastElement.classList.add('active');
        
        // Автоматическое скрытие
        setTimeout(() => {
            toastElement.classList.remove('active');
        }, 3000);
    }
}

// ===== ОТКРЫТИЕ ОКНА ЗДОРОВЬЯ ИЗ РАЗДЕЛА ПИТОМЦЫ =====
function openHealthModal() {
    // Закрываем все другие модалки
    const existingModal = document.getElementById('health-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Создаем новое модальное окно здоровья
    const modalHTML = `
        <div class="modal active" id="health-modal">
            <div class="modal-overlay" onclick="closeHealthModal()"></div>
            <div class="modal-container">
                <div class="modal-header">
                    <div class="modal-title">
                        <i class="fas fa-heart icon modal-icon"></i>
                        <h3>Здоровье питомцев</h3>
                    </div>
                    <button class="close-modal" onclick="closeHealthModal()">
                        <i class="fas fa-times-circle icon"></i>
                    </button>
                </div>
                
                <div class="modal-body">
                    <div class="health-modal-content">
                        <div class="health-actions">
                            <button class="health-action-btn" onclick="addVaccination()">
                                <i class="fas fa-syringe icon"></i>
                                <span>Вакцинация</span>
                            </button>
                            <button class="health-action-btn" onclick="addMedication()">
                                <i class="fas fa-pills icon"></i>
                                <span>Лекарства</span>
                            </button>
                            <button class="health-action-btn" onclick="addWaterReminder()">
                                <i class="fas fa-tint icon"></i>
                                <span>Вода</span>
                            </button>
                        </div>
                        
                        <div class="health-list" id="health-list">
                            ${vaccinations.map(v => createVaccinationHTML(v)).join('')}
                            ${medications.map(m => createMedicationHTML(m)).join('')}
                            ${waterReminders.map(w => createWaterReminderHTML(w)).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Добавляем модальное окно в документ
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Функция закрытия основного окна здоровья
function closeHealthModal() {
    const modal = document.getElementById('health-modal');
    if (modal) {
        modal.remove();
    }
}

// ===== РАСЧЕТ КОРМА ДЛЯ СОБЫТИЯ =====
function calculateFoodForEvent() {
    const petSelect = document.getElementById('event-pet');
    const petId = petSelect.value;
    
    if (!petId) {
        showNotification('Ошибка', 'Сначала выберите питомца');
        return;
    }
    
    const pet = currentPets.find(p => p.id === petId);
    if (!pet || !pet.lastFoodCalculation) {
        showNotification('Информация', 'Сначала рассчитайте норму корма для питомца в разделе "Питомцы"');
        return;
    }
    
    // Берем последний расчет
    const calculation = pet.lastFoodCalculation;
    const foodAmount = Math.round(calculation.dailyGrams);
    
    // Заполняем поле
    document.getElementById('event-food-amount').value = foodAmount;
    document.getElementById('food-calculation-info').innerHTML = 
        `На основе расчета: ${foodAmount} г/день (${calculation.food.name})`;
}

// Показываем поле корма только для событий типа "feeding"
document.addEventListener('DOMContentLoaded', function() {
    const eventTypeSelect = document.getElementById('event-type');
    if (eventTypeSelect) {
        eventTypeSelect.addEventListener('change', function() {
            const foodSection = document.getElementById('food-amount-section');
            if (foodSection) {
                if (this.value === 'feeding') {
                    foodSection.style.display = 'block';
                } else {
                    foodSection.style.display = 'none';
                }
            }
        });
    }
});

// ===== ГЛОБАЛЬНЫЕ ЭКСПОРТЫ =====
window.selectUser = selectUser;
window.markNotificationAsRead = markNotificationAsRead;
window.toggleEventCompletion = toggleEventCompletion;
window.deleteEvent = deleteEvent;
window.editPet = editPet;
window.deletePet = deletePet;
window.openAddPetModal = openAddPetModal;
window.openEditProfileModal = openEditProfileModal;
window.openAddEventModal = openAddEventModal;
window.openFoodCalculator = openFoodCalculator;
window.selectCoefficient = selectCoefficient;
window.useCurrentCoefficient = useCurrentCoefficient;
window.showCalculatorStep2 = showCalculatorStep2;
window.backToStep1 = backToStep1;
window.saveCoefficientAndFood = saveCoefficientAndFood;
window.selectFood = selectFood;
window.confirmFoodSelection = confirmFoodSelection;
window.closeFoodSelector = closeFoodSelector;
window.updateMealCalculation = updateMealCalculation;
window.showFoodSelector = showFoodSelector;
window.selectPetForCalculator = selectPetForCalculator;
window.addVaccination = addVaccination;
window.addMedication = addMedication;
window.addWaterReminder = addWaterReminder;
window.toggleMedication = toggleMedication;
window.deleteMedication = deleteMedication;
window.toggleWaterReminder = toggleWaterReminder;
window.deleteWaterReminder = deleteWaterReminder;
window.deleteVaccination = deleteVaccination;
window.showLearningCategory = showLearningCategory;
window.calculateFoodForEvent = calculateFoodForEvent;
window.openHealthModal = openHealthModal;
window.closeHealthModal = closeHealthModal;
window.deleteUserAccount = deleteUserAccount;
window.closeDeleteAccountModalFunc = closeDeleteAccountModalFunc;
window.validateDeleteConfirmation = validateDeleteConfirmation;
window.openDeleteAccountModal = openDeleteAccountModal;
// НОВЫЕ ФУНКЦИИ ДЛЯ НАВИГАЦИИ
window.loadChatContent = loadChatContent;
window.loadSocialContent = loadSocialContent;
window.loadMarketplaceContent = loadMarketplaceContent;
window.toggleTheme = toggleTheme;

// ===== ФИКС ОКНА ЗДОРОВЬЯ =====
function openHealthModal() {
    alert("Окно здоровья открывается!");
    
    // Создаем простое окно
    const html = `
    <div class="modal active" id="health-modal">
        <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
        <div class="modal-container">
            <div class="modal-header">
                <h3>Здоровье питомцев</h3>
                <button onclick="this.closest('.modal').remove()">✕</button>
            </div>
            <div class="modal-body">
                <p>Тестируем окно здоровья...</p>
                <button onclick="addVaccination()">Вакцинация</button>
                <button onclick="addMedication()">Лекарства</button>
                <button onclick="addWaterReminder()">Вода</button>
            </div>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', html);
}

console.log("Функция openHealthModal добавлена!");

// ===== ЭКСТРЕННЫЙ ФИКС ОКНА ЗДОРОВЬЯ =====
window.openHealthModal = function() {
    // Простое окно для теста
    const html = `
    <div style="
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5); z-index: 10000; display: flex;
        align-items: center; justify-content: center;
    ">
        <div style="
            background: white; border-radius: 20px; padding: 0;
            max-width: 500px; width: 90%;
        ">
            <div style="
                background: #7FB5B5; color: white; padding: 1.5rem;
                border-radius: 20px 20px 0 0; display: flex;
                justify-content: space-between; align-items: center;
            ">
                <h3 style="margin: 0;">Здоровье питомцев</h3>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                        style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">
                    ✕
                </button>
            </div>
            <div style="padding: 2rem;">
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
                    <button onclick="addVaccination()" style="
                        padding: 1.5rem; background: #f1f5f9; border: 2px solid #e2e8f0;
                        border-radius: 12px; cursor: pointer; display: flex; flex-direction: column;
                        align-items: center; gap: 0.5rem;
                    ">
                        <i class="fas fa-syringe" style="font-size: 2rem; color: #7FB5B5;"></i>
                        <span>Вакцинация</span>
                    </button>
                    <button onclick="addMedication()" style="
                        padding: 1.5rem; background: #f1f5f9; border: 2px solid #e2e8f0;
                        border-radius: 12px; cursor: pointer; display: flex; flex-direction: column;
                        align-items: center; gap: 0.5rem;
                    ">
                        <i class="fas fa-pills" style="font-size: 2rem; color: #7FB5B5;"></i>
                        <span>Лекарства</span>
                    </button>
                    <button onclick="addWaterReminder()" style="
                        padding: 1.5rem; background: #f1f5f9; border: 2px solid #e2e8f0;
                        border-radius: 12px; cursor: pointer; display: flex; flex-direction: column;
                        align-items: center; gap: 0.5rem;
                    ">
                        <i class="fas fa-tint" style="font-size: 2rem; color: #7FB5B5;"></i>
                        <span>Вода</span>
                    </button>
                </div>
                <p style="text-align: center; color: #64748B;">
                    Управляйте здоровьем ваших питомцев
                </p>
            </div>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', html);
};

// ===== ФИКС РАЗМЫТИЯ ПРИ РЕДАКТИРОВАНИИ ПРОФИЛЯ =====

// Переопределяем функцию открытия редактирования профиля
const originalOpenEditProfileModal = window.openEditProfileModal;
window.openEditProfileModal = function() {
    if (!currentUser) return;
    
    // Вызываем оригинальную функцию
    if (originalOpenEditProfileModal) {
        originalOpenEditProfileModal();
    }
    
    // Добавляем высокий z-index через JavaScript
    setTimeout(() => {
        const modal = document.getElementById('edit-profile-modal');
        const overlay = modal?.querySelector('.modal-overlay');
        
        if (modal) {
            modal.style.zIndex = '10050';
            if (overlay) {
                overlay.style.zIndex = '10049';
            }
        }
    }, 10); // Даём время на открытие окна
};

// ИЛИ если функции нет, создаём свою
if (!window.openEditProfileModal) {
    window.openEditProfileModal = function() {
        const modal = document.getElementById('edit-profile-modal');
        const overlay = document.getElementById('edit-profile-overlay');
        
        if (!modal) return;
        
        // Заполняем форму (если нужно)
        if (currentUser) {
            document.getElementById('edit-lastname').value = currentUser.lastName || '';
            document.getElementById('edit-firstname').value = currentUser.firstName || '';
            document.getElementById('edit-email').value = currentUser.emailPhone || '';
            
            const phoneInput = document.getElementById('edit-phone');
            if (phoneInput) {
                phoneInput.value = currentUser.phone || '';
            }
        }
        
        // Показываем окно
        modal.classList.add('active');
        if (overlay) overlay.style.display = 'block';
        
        // Фиксим z-index
        modal.style.zIndex = '10050';
        if (overlay) {
            overlay.style.zIndex = '10049';
        }
    };
}

console.log('MyPet+ v2.1 загружен и готов к работе!');