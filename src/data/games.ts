export type GameType = 'quiz' | 'match' | 'sort' | 'fill' | 'binary' | 'sequence';

export interface Game {
  id: number;
  title: string;
  description: string;
  topic: string;
  grade: 7 | 8 | 9;
  type: GameType;
  icon: string;
  color: string;
  questions: Question[];
}

export interface Question {
  id: number;
  text: string;
  type: 'single' | 'match' | 'sort' | 'fill' | 'binary';
  options?: string[];
  correct?: number | string | string[];
  pairs?: { left: string; right: string }[];
  items?: string[];
  answer?: string;
}

export const GAMES: Game[] = [
  // 7 КЛАСС — 10 игр
  {
    id: 1,
    title: 'Что такое информация?',
    description: 'Виды информации, свойства и способы представления',
    topic: 'Информация и информационные процессы',
    grade: 7,
    type: 'quiz',
    icon: '📡',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      { id: 1, text: 'Что такое информация?', type: 'single', options: ['Только текст', 'Сведения об окружающем мире', 'Только числа', 'Только изображения'], correct: 1 },
      { id: 2, text: 'Какое свойство информации означает её соответствие реальности?', type: 'single', options: ['Полнота', 'Доступность', 'Достоверность', 'Актуальность'], correct: 2 },
      { id: 3, text: 'Информация, потерявшая свою ценность со временем — это...', type: 'single', options: ['Недостоверная', 'Неактуальная', 'Неполная', 'Недоступная'], correct: 1 },
      { id: 4, text: 'Как называется процесс передачи информации?', type: 'single', options: ['Хранение', 'Обработка', 'Передача', 'Уничтожение'], correct: 2 },
      { id: 5, text: 'Какой вид информации воспринимается через слух?', type: 'single', options: ['Визуальная', 'Тактильная', 'Обонятельная', 'Звуковая'], correct: 3 },
    ]
  },
  {
    id: 2,
    title: 'Двоичная система счисления',
    description: 'Перевод чисел из десятичной в двоичную систему',
    topic: 'Системы счисления',
    grade: 7,
    type: 'quiz',
    icon: '01',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, text: 'Чему равно число 10 в двоичной системе?', type: 'single', options: ['0010', '1010', '1000', '0100'], correct: 1 },
      { id: 2, text: 'Сколько цифр используется в двоичной системе?', type: 'single', options: ['8', '10', '2', '16'], correct: 2 },
      { id: 3, text: 'Чему равно двоичное число 1111 в десятичной?', type: 'single', options: ['7', '15', '11', '13'], correct: 1 },
      { id: 4, text: 'Как записать число 5 в двоичной системе?', type: 'single', options: ['110', '101', '011', '100'], correct: 1 },
      { id: 5, text: 'Чему равно двоичное 1000 в десятичной?', type: 'single', options: ['4', '6', '8', '16'], correct: 2 },
    ]
  },
  {
    id: 3,
    title: 'Устройства компьютера',
    description: 'Основные компоненты ПК и их назначение',
    topic: 'Аппаратное обеспечение',
    grade: 7,
    type: 'match',
    icon: '🖥️',
    color: 'from-purple-500 to-violet-500',
    questions: [
      { id: 1, text: 'Сопоставь устройство с его функцией', type: 'match', pairs: [
        { left: 'Процессор', right: 'Обработка данных' },
        { left: 'ОЗУ', right: 'Временное хранение' },
        { left: 'Жёсткий диск', right: 'Постоянное хранение' },
        { left: 'Монитор', right: 'Вывод информации' },
      ]},
      { id: 2, text: 'Что является мозгом компьютера?', type: 'single', options: ['Монитор', 'Процессор', 'Клавиатура', 'Принтер'], correct: 1 },
      { id: 3, text: 'Какое устройство относится к устройствам ввода?', type: 'single', options: ['Монитор', 'Принтер', 'Мышь', 'Колонки'], correct: 2 },
      { id: 4, text: 'Что такое ОЗУ?', type: 'single', options: ['Постоянная память', 'Оперативная память', 'Внешний диск', 'Процессор'], correct: 1 },
      { id: 5, text: 'Какое устройство является внешним носителем?', type: 'single', options: ['Процессор', 'ОЗУ', 'Флеш-накопитель', 'Монитор'], correct: 2 },
    ]
  },
  {
    id: 4,
    title: 'Файлы и папки',
    description: 'Файловая система, расширения, операции с файлами',
    topic: 'Файловая система',
    grade: 7,
    type: 'quiz',
    icon: '📁',
    color: 'from-yellow-500 to-orange-500',
    questions: [
      { id: 1, text: 'Что определяет расширение файла?', type: 'single', options: ['Размер файла', 'Тип файла', 'Дату создания', 'Автора файла'], correct: 1 },
      { id: 2, text: 'Какое расширение у текстовых документов Word?', type: 'single', options: ['.jpg', '.mp3', '.docx', '.exe'], correct: 2 },
      { id: 3, text: 'Что такое путь к файлу?', type: 'single', options: ['Размер файла', 'Адрес расположения файла', 'Название файла', 'Тип файла'], correct: 1 },
      { id: 4, text: 'Какая операция НЕ выполняется с файлами?', type: 'single', options: ['Копирование', 'Перемещение', 'Зарядка', 'Удаление'], correct: 2 },
      { id: 5, text: 'Что такое корневой каталог?', type: 'single', options: ['Любая папка', 'Главная папка диска', 'Удалённая папка', 'Скрытая папка'], correct: 1 },
    ]
  },
  {
    id: 5,
    title: 'Текстовый редактор',
    description: 'Работа с текстом, форматирование, основные операции',
    topic: 'Прикладное ПО',
    grade: 7,
    type: 'quiz',
    icon: '📝',
    color: 'from-blue-400 to-blue-600',
    questions: [
      { id: 1, text: 'Какая клавиша удаляет символ слева от курсора?', type: 'single', options: ['Delete', 'Backspace', 'Enter', 'Escape'], correct: 1 },
      { id: 2, text: 'Что такое абзац?', type: 'single', options: ['Одно слово', 'Одна буква', 'Часть текста между нажатиями Enter', 'Заголовок'], correct: 2 },
      { id: 3, text: 'Какое сочетание клавиш копирует текст?', type: 'single', options: ['Ctrl+V', 'Ctrl+C', 'Ctrl+X', 'Ctrl+Z'], correct: 1 },
      { id: 4, text: 'Что делает Ctrl+Z?', type: 'single', options: ['Вырезает', 'Вставляет', 'Отменяет действие', 'Сохраняет'], correct: 2 },
      { id: 5, text: 'Как называется размер шрифта?', type: 'single', options: ['Стиль', 'Кегль', 'Гарнитура', 'Интервал'], correct: 1 },
    ]
  },
  {
    id: 6,
    title: 'Интернет и сети',
    description: 'Основы интернета, браузеры, поиск информации',
    topic: 'Компьютерные сети',
    grade: 7,
    type: 'quiz',
    icon: '🌐',
    color: 'from-cyan-500 to-teal-500',
    questions: [
      { id: 1, text: 'Что такое браузер?', type: 'single', options: ['Антивирус', 'Программа для просмотра веб-страниц', 'Поисковый сайт', 'Почтовый клиент'], correct: 1 },
      { id: 2, text: 'Как расшифровывается WWW?', type: 'single', options: ['Wide Web World', 'World Wide Web', 'Web World Wide', 'World Web Wide'], correct: 1 },
      { id: 3, text: 'Что такое URL?', type: 'single', options: ['Язык программирования', 'Адрес веб-страницы', 'Тип файла', 'Протокол'], correct: 1 },
      { id: 4, text: 'Какой протокол используется для безопасной передачи данных?', type: 'single', options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'], correct: 2 },
      { id: 5, text: 'Что такое IP-адрес?', type: 'single', options: ['Имя сайта', 'Уникальный адрес устройства в сети', 'Тип соединения', 'Скорость интернета'], correct: 1 },
    ]
  },
  {
    id: 7,
    title: 'Безопасность в сети',
    description: 'Защита данных, вирусы, правила поведения в интернете',
    topic: 'Информационная безопасность',
    grade: 7,
    type: 'binary',
    icon: '🔒',
    color: 'from-red-500 to-pink-500',
    questions: [
      { id: 1, text: 'Вирус может заразить компьютер через флешку', type: 'binary', answer: 'Верно' },
      { id: 2, text: 'Можно делиться паролем с лучшим другом', type: 'binary', answer: 'Неверно' },
      { id: 3, text: 'Антивирус защищает компьютер от вредоносных программ', type: 'binary', answer: 'Верно' },
      { id: 4, text: 'Безопасно открывать письма от незнакомых отправителей', type: 'binary', answer: 'Неверно' },
      { id: 5, text: 'Надёжный пароль содержит буквы, цифры и символы', type: 'binary', answer: 'Верно' },
    ]
  },
  {
    id: 8,
    title: 'Графический редактор',
    description: 'Работа с растровой и векторной графикой',
    topic: 'Компьютерная графика',
    grade: 7,
    type: 'quiz',
    icon: '🎨',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, text: 'Из чего состоит растровое изображение?', type: 'single', options: ['Векторов', 'Пикселей', 'Символов', 'Фигур'], correct: 1 },
      { id: 2, text: 'Какой формат поддерживает прозрачность?', type: 'single', options: ['JPG', 'BMP', 'PNG', 'TXT'], correct: 2 },
      { id: 3, text: 'Что такое разрешение изображения?', type: 'single', options: ['Размер файла', 'Количество пикселей', 'Количество цветов', 'Яркость'], correct: 1 },
      { id: 4, text: 'Векторная графика хранит изображение как...', type: 'single', options: ['Пиксели', 'Математические формулы', 'Байты', 'Текст'], correct: 1 },
      { id: 5, text: 'Какой формат лучше для фотографий?', type: 'single', options: ['PNG', 'SVG', 'JPG', 'BMP'], correct: 2 },
    ]
  },
  {
    id: 9,
    title: 'Единицы измерения информации',
    description: 'Биты, байты, килобайты и их соотношение',
    topic: 'Кодирование информации',
    grade: 7,
    type: 'quiz',
    icon: '📊',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, text: 'Сколько бит в одном байте?', type: 'single', options: ['4', '16', '8', '2'], correct: 2 },
      { id: 2, text: 'Сколько байт в 1 Килобайте?', type: 'single', options: ['100', '1000', '1024', '512'], correct: 2 },
      { id: 3, text: 'Какая единица больше?', type: 'single', options: ['Байт', 'Килобайт', 'Мегабайт', 'Гигабайт'], correct: 3 },
      { id: 4, text: 'Минимальная единица информации — это...', type: 'single', options: ['Байт', 'Бит', 'Килобайт', 'Нибл'], correct: 1 },
      { id: 5, text: '1 Гигабайт = ?', type: 'single', options: ['1000 МБ', '1024 МБ', '512 МБ', '2048 МБ'], correct: 1 },
    ]
  },
  {
    id: 10,
    title: 'Алгоритмы вокруг нас',
    description: 'Понятие алгоритма, его свойства и виды',
    topic: 'Алгоритмизация',
    grade: 7,
    type: 'sort',
    icon: '🔢',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, text: 'Расставь свойства алгоритма по важности', type: 'sort', items: ['Понятность', 'Точность', 'Конечность', 'Результативность'] },
      { id: 2, text: 'Что такое алгоритм?', type: 'single', options: ['Программа', 'Последовательность чётких инструкций', 'Язык программирования', 'База данных'], correct: 1 },
      { id: 3, text: 'Какое свойство означает, что алгоритм заканчивается?', type: 'single', options: ['Понятность', 'Конечность', 'Массовость', 'Точность'], correct: 1 },
      { id: 4, text: 'Какой алгоритм выполняется по условию?', type: 'single', options: ['Линейный', 'Ветвящийся', 'Циклический', 'Рекурсивный'], correct: 1 },
      { id: 5, text: 'Рецепт приготовления блюда — это пример...', type: 'single', options: ['Программы', 'Алгоритма', 'Языка', 'Компилятора'], correct: 1 },
    ]
  },

  // 8 КЛАСС — 10 игр
  {
    id: 11,
    title: 'Логические операции',
    description: 'AND, OR, NOT — таблицы истинности',
    topic: 'Логика и алгебра Буля',
    grade: 8,
    type: 'quiz',
    icon: '⚡',
    color: 'from-yellow-400 to-yellow-600',
    questions: [
      { id: 1, text: '1 AND 0 = ?', type: 'single', options: ['1', '0', '2', '-1'], correct: 1 },
      { id: 2, text: '1 OR 0 = ?', type: 'single', options: ['0', '1', '2', '-1'], correct: 1 },
      { id: 3, text: 'NOT 1 = ?', type: 'single', options: ['1', '0', '2', '-1'], correct: 1 },
      { id: 4, text: '0 AND 0 = ?', type: 'single', options: ['1', '2', '0', '-1'], correct: 2 },
      { id: 5, text: '1 OR 1 = ?', type: 'single', options: ['2', '0', '1', '3'], correct: 2 },
    ]
  },
  {
    id: 12,
    title: 'Базы данных',
    description: 'Таблицы, записи, поля, ключи',
    topic: 'Базы данных',
    grade: 8,
    type: 'match',
    icon: '🗄️',
    color: 'from-teal-500 to-cyan-600',
    questions: [
      { id: 1, text: 'Сопоставь термин с определением', type: 'match', pairs: [
        { left: 'Таблица', right: 'Набор записей' },
        { left: 'Запись', right: 'Строка таблицы' },
        { left: 'Поле', right: 'Столбец таблицы' },
        { left: 'Ключ', right: 'Уникальный идентификатор' },
      ]},
      { id: 2, text: 'Что такое СУБД?', type: 'single', options: ['Язык программирования', 'Система управления базами данных', 'Тип файла', 'Протокол'], correct: 1 },
      { id: 3, text: 'Сколько первичных ключей может быть в таблице?', type: 'single', options: ['Много', '0', '1', '2'], correct: 2 },
      { id: 4, text: 'Что такое запрос в БД?', type: 'single', options: ['Таблица', 'Обращение за данными', 'Форма', 'Отчёт'], correct: 1 },
      { id: 5, text: 'Какой тип данных хранит текст?', type: 'single', options: ['Число', 'Дата', 'Строка', 'Логический'], correct: 2 },
    ]
  },
  {
    id: 13,
    title: 'Шестнадцатеричная система',
    description: 'Перевод чисел в шестнадцатеричную систему',
    topic: 'Системы счисления',
    grade: 8,
    type: 'quiz',
    icon: 'HEX',
    color: 'from-violet-500 to-purple-600',
    questions: [
      { id: 1, text: 'Сколько цифр в шестнадцатеричной системе?', type: 'single', options: ['8', '10', '16', '12'], correct: 2 },
      { id: 2, text: 'Чему равна буква A в hex?', type: 'single', options: ['9', '10', '11', '12'], correct: 1 },
      { id: 3, text: 'Чему равно hex F в десятичной?', type: 'single', options: ['14', '15', '16', '13'], correct: 1 },
      { id: 4, text: 'Как записать 16 в шестнадцатеричной?', type: 'single', options: ['E', 'F', '10', '11'], correct: 2 },
      { id: 5, text: 'Hex FF в десятичной — это...', type: 'single', options: ['254', '255', '256', '128'], correct: 1 },
    ]
  },
  {
    id: 14,
    title: 'Языки программирования',
    description: 'Виды языков, компиляторы, интерпретаторы',
    topic: 'Программирование',
    grade: 8,
    type: 'quiz',
    icon: '💻',
    color: 'from-green-400 to-green-600',
    questions: [
      { id: 1, text: 'Что такое компилятор?', type: 'single', options: ['Программа-вирус', 'Переводчик кода в машинный язык', 'База данных', 'Браузер'], correct: 1 },
      { id: 2, text: 'Какой язык используется для веб-страниц?', type: 'single', options: ['Python', 'HTML', 'Pascal', 'Basic'], correct: 1 },
      { id: 3, text: 'Что такое синтаксическая ошибка?', type: 'single', options: ['Логическая ошибка', 'Нарушение правил языка', 'Ошибка запуска', 'Ошибка данных'], correct: 1 },
      { id: 4, text: 'Какой язык создан специально для обучения?', type: 'single', options: ['C++', 'Java', 'Python', 'Pascal'], correct: 3 },
      { id: 5, text: 'Что делает интерпретатор?', type: 'single', options: ['Компилирует весь код', 'Выполняет код построчно', 'Хранит данные', 'Рисует интерфейс'], correct: 1 },
    ]
  },
  {
    id: 15,
    title: 'Кодирование текста',
    description: 'ASCII, Unicode, кодировки',
    topic: 'Кодирование информации',
    grade: 8,
    type: 'quiz',
    icon: '🔤',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, text: 'Сколько символов в таблице ASCII?', type: 'single', options: ['128', '256', '512', '64'], correct: 0 },
      { id: 2, text: 'Что такое Unicode?', type: 'single', options: ['Кодировка только для латиницы', 'Универсальная кодировка всех символов', 'Язык программирования', 'Формат файла'], correct: 1 },
      { id: 3, text: 'Сколько бит использует ASCII?', type: 'single', options: ['16', '32', '7-8', '4'], correct: 2 },
      { id: 4, text: 'UTF-8 — это...', type: 'single', options: ['Кодировка Unicode', 'Язык разметки', 'Тип данных', 'Протокол'], correct: 0 },
      { id: 5, text: 'Какой код у пробела в ASCII?', type: 'single', options: ['0', '32', '64', '48'], correct: 1 },
    ]
  },
  {
    id: 16,
    title: 'Циклы в программировании',
    description: 'For, while, do-while — виды и применение',
    topic: 'Программирование',
    grade: 8,
    type: 'quiz',
    icon: '🔄',
    color: 'from-emerald-500 to-teal-500',
    questions: [
      { id: 1, text: 'Что такое цикл в программировании?', type: 'single', options: ['Условие', 'Повторение блока кода', 'Переменная', 'Функция'], correct: 1 },
      { id: 2, text: 'Цикл FOR используется когда...', type: 'single', options: ['Число повторений неизвестно', 'Число повторений известно', 'Нет условия', 'Всегда бесконечно'], correct: 1 },
      { id: 3, text: 'Цикл WHILE повторяется пока...', type: 'single', options: ['Счётчик не достигнет 0', 'Условие истинно', 'Нажата клавиша', 'Программа не закрыта'], correct: 1 },
      { id: 4, text: 'Что такое бесконечный цикл?', type: 'single', options: ['Быстрый цикл', 'Цикл без условия выхода', 'Цикл с паузой', 'Вложенный цикл'], correct: 1 },
      { id: 5, text: 'Переменная для подсчёта итераций называется...', type: 'single', options: ['Флаг', 'Массив', 'Счётчик', 'Стек'], correct: 2 },
    ]
  },
  {
    id: 17,
    title: 'Электронные таблицы',
    description: 'Excel: ячейки, формулы, функции',
    topic: 'Прикладное ПО',
    grade: 8,
    type: 'quiz',
    icon: '📈',
    color: 'from-lime-500 to-green-500',
    questions: [
      { id: 1, text: 'Как называется пересечение строки и столбца?', type: 'single', options: ['Лист', 'Ячейка', 'Диапазон', 'Формула'], correct: 1 },
      { id: 2, text: 'С чего начинается формула в Excel?', type: 'single', options: ['#', '@', '=', '$'], correct: 2 },
      { id: 3, text: 'Как обозначается ячейка в 3-й строке столбца B?', type: 'single', options: ['B3', '3B', 'B-3', '(B,3)'], correct: 0 },
      { id: 4, text: 'Функция СУММ суммирует...', type: 'single', options: ['Текст', 'Диапазон чисел', 'Логические значения', 'Даты'], correct: 1 },
      { id: 5, text: 'Что такое абсолютная ссылка в Excel?', type: 'single', options: ['Ссылка без знака $', 'Ссылка со знаком $', 'Ссылка на другой лист', 'Именованный диапазон'], correct: 1 },
    ]
  },
  {
    id: 18,
    title: 'Компьютерные вирусы',
    description: 'Виды вирусов, способы защиты',
    topic: 'Информационная безопасность',
    grade: 8,
    type: 'binary',
    icon: '🦠',
    color: 'from-red-400 to-red-600',
    questions: [
      { id: 1, text: 'Троян — это разновидность вредоносной программы', type: 'binary', answer: 'Верно' },
      { id: 2, text: 'Антивирус всегда на 100% защищает от всех угроз', type: 'binary', answer: 'Неверно' },
      { id: 3, text: 'Червь распространяется по сети самостоятельно', type: 'binary', answer: 'Верно' },
      { id: 4, text: 'Вирус может замаскироваться под обычный файл', type: 'binary', answer: 'Верно' },
      { id: 5, text: 'Обновление ОС не влияет на безопасность', type: 'binary', answer: 'Неверно' },
    ]
  },
  {
    id: 19,
    title: 'Условный оператор',
    description: 'IF-ELSE: ветвление в программировании',
    topic: 'Программирование',
    grade: 8,
    type: 'quiz',
    icon: '🔀',
    color: 'from-amber-500 to-orange-500',
    questions: [
      { id: 1, text: 'Что проверяет оператор IF?', type: 'single', options: ['Значение переменной', 'Условие (истина/ложь)', 'Тип данных', 'Размер памяти'], correct: 1 },
      { id: 2, text: 'Блок ELSE выполняется когда условие...', type: 'single', options: ['Истинно', 'Ложно', 'Равно нулю', 'Не задано'], correct: 1 },
      { id: 3, text: 'Можно ли вложить IF внутрь другого IF?', type: 'single', options: ['Нет', 'Только один раз', 'Да, неограниченно', 'Только в Python'], correct: 2 },
      { id: 4, text: 'Какой оператор сравнивает два значения на равенство?', type: 'single', options: ['=', '!=', '==', '>='], correct: 2 },
      { id: 5, text: 'ELIF (else if) используется для...', type: 'single', options: ['Одного условия', 'Нескольких условий подряд', 'Цикла', 'Функции'], correct: 1 },
    ]
  },
  {
    id: 20,
    title: 'Моделирование',
    description: 'Виды моделей, компьютерное моделирование',
    topic: 'Моделирование',
    grade: 8,
    type: 'quiz',
    icon: '🧩',
    color: 'from-sky-500 to-blue-500',
    questions: [
      { id: 1, text: 'Что такое информационная модель?', type: 'single', options: ['Физический макет', 'Описание объекта в виде данных', 'Компьютерная игра', 'Чертёж'], correct: 1 },
      { id: 2, text: 'Глобус — это пример какой модели?', type: 'single', options: ['Математической', 'Информационной', 'Материальной', 'Логической'], correct: 2 },
      { id: 3, text: 'Что НЕ является целью моделирования?', type: 'single', options: ['Предсказание', 'Изучение', 'Уничтожение объекта', 'Управление'], correct: 2 },
      { id: 4, text: 'Таблица данных — это...', type: 'single', options: ['Вещественная модель', 'Информационная табличная модель', 'Схема', 'Алгоритм'], correct: 1 },
      { id: 5, text: 'Компьютерная модель позволяет...', type: 'single', options: ['Только рисовать', 'Имитировать процессы без риска', 'Только печатать', 'Только считать'], correct: 1 },
    ]
  },

  // 9 КЛАСС — 10 игр
  {
    id: 21,
    title: 'Python: основы',
    description: 'Переменные, типы данных, ввод/вывод',
    topic: 'Python',
    grade: 9,
    type: 'quiz',
    icon: '🐍',
    color: 'from-blue-600 to-yellow-500',
    questions: [
      { id: 1, text: 'Как вывести текст на экран в Python?', type: 'single', options: ['console.log()', 'echo()', 'print()', 'write()'], correct: 2 },
      { id: 2, text: 'Как считать данные с клавиатуры?', type: 'single', options: ['get()', 'read()', 'scan()', 'input()'], correct: 3 },
      { id: 3, text: 'Какой тип данных у значения 3.14?', type: 'single', options: ['int', 'str', 'float', 'bool'], correct: 2 },
      { id: 4, text: 'Как создать переменную в Python?', type: 'single', options: ['var x = 5', 'int x = 5', 'x = 5', 'x := 5'], correct: 2 },
      { id: 5, text: 'Что выведет print(type(5))?', type: 'single', options: ["<class 'str'>", "<class 'float'>", "<class 'int'>", "<class 'num'>"], correct: 2 },
    ]
  },
  {
    id: 22,
    title: 'Python: списки',
    description: 'Создание, индексы, методы списков',
    topic: 'Python',
    grade: 9,
    type: 'quiz',
    icon: '📋',
    color: 'from-green-600 to-emerald-600',
    questions: [
      { id: 1, text: 'Как создать пустой список?', type: 'single', options: ['list = {}', 'list = []', 'list = ()', 'list = ""'], correct: 1 },
      { id: 2, text: 'Какой индекс у первого элемента списка?', type: 'single', options: ['1', '-1', '0', 'first'], correct: 2 },
      { id: 3, text: 'Метод append() делает...', type: 'single', options: ['Удаляет элемент', 'Добавляет в конец', 'Сортирует', 'Очищает список'], correct: 1 },
      { id: 4, text: 'Как получить длину списка?', type: 'single', options: ['list.size()', 'len(list)', 'list.length', 'count(list)'], correct: 1 },
      { id: 5, text: 'list[-1] возвращает...', type: 'single', options: ['Ошибку', 'Первый элемент', 'Последний элемент', 'Ноль'], correct: 2 },
    ]
  },
  {
    id: 23,
    title: 'Python: функции',
    description: 'def, return, аргументы, область видимости',
    topic: 'Python',
    grade: 9,
    type: 'quiz',
    icon: '⚙️',
    color: 'from-purple-600 to-indigo-600',
    questions: [
      { id: 1, text: 'Как объявить функцию в Python?', type: 'single', options: ['function f():', 'func f():', 'def f():', 'define f():'], correct: 2 },
      { id: 2, text: 'Что делает return?', type: 'single', options: ['Останавливает программу', 'Возвращает значение из функции', 'Создаёт переменную', 'Вызывает функцию'], correct: 1 },
      { id: 3, text: 'Можно ли передать несколько аргументов в функцию?', type: 'single', options: ['Нет', 'Только один', 'Да', 'Только два'], correct: 2 },
      { id: 4, text: 'Что такое локальная переменная?', type: 'single', options: ['Переменная везде', 'Переменная внутри функции', 'Глобальная', 'Константа'], correct: 1 },
      { id: 5, text: 'Функция без return возвращает...', type: 'single', options: ['0', 'False', 'None', 'Error'], correct: 2 },
    ]
  },
  {
    id: 24,
    title: 'Сортировка массивов',
    description: 'Алгоритмы пузырьковой и линейной сортировки',
    topic: 'Алгоритмы',
    grade: 9,
    type: 'sort',
    icon: '🔃',
    color: 'from-orange-600 to-red-600',
    questions: [
      { id: 1, text: 'Расставь числа по возрастанию', type: 'sort', items: ['8', '3', '1', '6', '4'] },
      { id: 2, text: 'Сколько проходов нужно пузырьковой сортировке для 5 элементов?', type: 'single', options: ['3', '4', '5', '6'], correct: 1 },
      { id: 3, text: 'Что делает сортировка?', type: 'single', options: ['Удаляет элементы', 'Упорядочивает элементы', 'Копирует массив', 'Находит элемент'], correct: 1 },
      { id: 4, text: 'В пузырьковой сортировке соседние элементы...', type: 'single', options: ['Удаляются', 'Сравниваются и меняются местами', 'Складываются', 'Делятся'], correct: 1 },
      { id: 5, text: 'Какая сортировка проще для понимания?', type: 'single', options: ['Быстрая', 'Слиянием', 'Пузырьковая', 'Heapsort'], correct: 2 },
    ]
  },
  {
    id: 25,
    title: 'Поиск в массиве',
    description: 'Линейный и бинарный поиск',
    topic: 'Алгоритмы',
    grade: 9,
    type: 'quiz',
    icon: '🔍',
    color: 'from-cyan-600 to-blue-600',
    questions: [
      { id: 1, text: 'Линейный поиск проверяет элементы...', type: 'single', options: ['Случайно', 'По порядку один за одним', 'Двоичным делением', 'Сразу все'], correct: 1 },
      { id: 2, text: 'Для бинарного поиска массив должен быть...', type: 'single', options: ['Отсортированным', 'Любым', 'Обратным', 'Пустым'], correct: 0 },
      { id: 3, text: 'Бинарный поиск делит массив...', type: 'single', options: ['На три части', 'Пополам', 'На части по 3', 'Произвольно'], correct: 1 },
      { id: 4, text: 'В худшем случае линейный поиск в 100 элементах требует...', type: 'single', options: ['7 шагов', '50 шагов', '100 шагов', '10 шагов'], correct: 2 },
      { id: 5, text: 'Бинарный поиск эффективнее линейного при...', type: 'single', options: ['Малом массиве', 'Большом отсортированном массиве', 'Неотсортированном массиве', 'Всегда одинаково'], correct: 1 },
    ]
  },
  {
    id: 26,
    title: 'Компьютерные сети',
    description: 'Топологии, протоколы TCP/IP, OSI модель',
    topic: 'Компьютерные сети',
    grade: 9,
    type: 'match',
    icon: '🔗',
    color: 'from-teal-600 to-green-600',
    questions: [
      { id: 1, text: 'Сопоставь топологию с описанием', type: 'match', pairs: [
        { left: 'Звезда', right: 'Все к центру' },
        { left: 'Шина', right: 'Все на одном кабеле' },
        { left: 'Кольцо', right: 'Последовательная цепь' },
        { left: 'Ячеистая', right: 'Каждый с каждым' },
      ]},
      { id: 2, text: 'Протокол TCP обеспечивает...', type: 'single', options: ['Шифрование', 'Надёжную доставку пакетов', 'Маршрутизацию', 'Адресацию'], correct: 1 },
      { id: 3, text: 'Сколько уровней в модели OSI?', type: 'single', options: ['5', '6', '7', '4'], correct: 2 },
      { id: 4, text: 'MAC-адрес — это...', type: 'single', options: ['IP-адрес', 'Адрес сайта', 'Физический адрес сетевой карты', 'Доменное имя'], correct: 2 },
      { id: 5, text: 'DNS нужен для...', type: 'single', options: ['Шифрования', 'Перевода доменов в IP-адреса', 'Маршрутизации', 'Авторизации'], correct: 1 },
    ]
  },
  {
    id: 27,
    title: 'Шифрование данных',
    description: 'Симметричное, асимметричное шифрование',
    topic: 'Информационная безопасность',
    grade: 9,
    type: 'quiz',
    icon: '🔐',
    color: 'from-red-600 to-pink-600',
    questions: [
      { id: 1, text: 'Что такое шифрование?', type: 'single', options: ['Удаление данных', 'Преобразование данных для защиты', 'Копирование данных', 'Сжатие данных'], correct: 1 },
      { id: 2, text: 'При симметричном шифровании ключ...', type: 'single', options: ['Разный для шифрования и дешифрования', 'Один и тот же', 'Не нужен', 'Генерируется случайно каждый раз'], correct: 1 },
      { id: 3, text: 'HTTPS использует...', type: 'single', options: ['Симметричное', 'Асимметричное', 'Оба вида шифрования', 'Не шифрует'], correct: 2 },
      { id: 4, text: 'Что такое хэш-функция?', type: 'single', options: ['Алгоритм шифрования', 'Функция создания уникального отпечатка данных', 'Пароль', 'Сертификат'], correct: 1 },
      { id: 5, text: 'Открытый ключ используется для...', type: 'single', options: ['Дешифрования', 'Шифрования данных', 'Хранения паролей', 'Сжатия'], correct: 1 },
    ]
  },
  {
    id: 28,
    title: 'Объектно-ориентированное программирование',
    description: 'Классы, объекты, методы, наследование',
    topic: 'ООП',
    grade: 9,
    type: 'match',
    icon: '🏛️',
    color: 'from-indigo-600 to-purple-600',
    questions: [
      { id: 1, text: 'Сопоставь термин ООП с определением', type: 'match', pairs: [
        { left: 'Класс', right: 'Шаблон объекта' },
        { left: 'Объект', right: 'Экземпляр класса' },
        { left: 'Метод', right: 'Функция класса' },
        { left: 'Атрибут', right: 'Переменная класса' },
      ]},
      { id: 2, text: 'Наследование позволяет...', type: 'single', options: ['Копировать объекты', 'Создавать классы на основе других', 'Удалять методы', 'Шифровать данные'], correct: 1 },
      { id: 3, text: 'Что такое инкапсуляция?', type: 'single', options: ['Наследование', 'Скрытие данных внутри класса', 'Создание объекта', 'Вызов метода'], correct: 1 },
      { id: 4, text: 'В Python класс создаётся с помощью...', type: 'single', options: ['class', 'object', 'def', 'type'], correct: 0 },
      { id: 5, text: '__init__ в Python — это...', type: 'single', options: ['Главная функция', 'Конструктор класса', 'Деструктор', 'Метод вывода'], correct: 1 },
    ]
  },
  {
    id: 29,
    title: 'Искусственный интеллект',
    description: 'Основы ИИ, машинное обучение, нейросети',
    topic: 'Современные технологии',
    grade: 9,
    type: 'quiz',
    icon: '🤖',
    color: 'from-slate-500 to-blue-600',
    questions: [
      { id: 1, text: 'ИИ — это...', type: 'single', options: ['Вирус', 'Способность машин выполнять задачи, требующие интеллекта', 'Операционная система', 'База данных'], correct: 1 },
      { id: 2, text: 'Машинное обучение — это...', type: 'single', options: ['Программирование вручную', 'Обучение компьютеров на данных', 'Антивирус', 'Шифрование'], correct: 1 },
      { id: 3, text: 'Нейронная сеть имитирует...', type: 'single', options: ['Компьютерные сети', 'Работу мозга', 'Интернет', 'Базы данных'], correct: 1 },
      { id: 4, text: 'ChatGPT — пример...', type: 'single', options: ['Антивируса', 'Языковой модели ИИ', 'Операционной системы', 'Браузера'], correct: 1 },
      { id: 5, text: 'Что НЕ является применением ИИ?', type: 'single', options: ['Распознавание лиц', 'Перевод текста', 'Хранение файлов', 'Генерация изображений'], correct: 2 },
    ]
  },
  {
    id: 30,
    title: 'Итоговое испытание',
    description: 'Все темы курса: 7, 8 и 9 класс',
    topic: 'Все темы',
    grade: 9,
    type: 'quiz',
    icon: '🏆',
    color: 'from-yellow-500 to-amber-600',
    questions: [
      { id: 1, text: 'Минимальная единица информации?', type: 'single', options: ['Байт', 'Бит', 'Слово', 'Пиксель'], correct: 1 },
      { id: 2, text: 'Что такое алгоритм?', type: 'single', options: ['Программа', 'Точная инструкция для решения задачи', 'База данных', 'Сеть'], correct: 1 },
      { id: 3, text: '1 AND 0 = ?', type: 'single', options: ['1', '0', '2', 'True'], correct: 1 },
      { id: 4, text: 'print() в Python выводит...', type: 'single', options: ['Ошибку', 'Данные на экран', 'Файл', 'Ничего'], correct: 1 },
      { id: 5, text: 'Наследование относится к...', type: 'single', options: ['Алгоритмам', 'Базам данных', 'ООП', 'Сетям'], correct: 2 },
    ]
  },
];

export const getGamesByGrade = (grade: 7 | 8 | 9) => GAMES.filter(g => g.grade === grade);
export const getGameById = (id: number) => GAMES.find(g => g.id === id);
