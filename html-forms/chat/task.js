// Получаем необходимые элементы DOM
const chatWidget = document.querySelector('.chat-widget');
const inputField = document.getElementById('chat-widget__input');
const messagesContainer = document.querySelector('.chat-widget__messages');

// Список случайных ответов робота
const robotResponses = [
  'Какой грубый вопрос!',
  'У нас все хорошо, а у вас?',
  'Мы не обслуживаем таких клиентов.',
  'Вам повезло, что вы с нами.',
  'Это не ваше дело.',
];

// Функция для получения случайного ответа робота
function getRandomRobotResponse() {
  const randomIndex = Math.floor(Math.random() * robotResponses.length);
  return robotResponses[randomIndex];
}

// Функция для добавления нового сообщения в чат
function addMessageToChat(message, isClientMessage = false) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  if (isClientMessage) {
    messageElement.classList.add('message_client');
  }

  const timeElement = document.createElement('div');
  timeElement.classList.add('message__time');
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  timeElement.textContent = currentTime;

  const textElement = document.createElement('div');
  textElement.classList.add('message__text');
  textElement.textContent = message;

  messageElement.appendChild(timeElement);
  messageElement.appendChild(textElement);
  messagesContainer.appendChild(messageElement);

  // Прокручиваем контейнер с сообщениями до самого нижнего сообщения
  messageElement.scrollIntoView({ behavior: 'smooth' });
}

// Открываем окно чата при клике на бэйдж
chatWidget.addEventListener('click', () => {
  chatWidget.classList.add('chat-widget_active');
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// Отправка сообщения по нажатию Enter
inputField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && inputField.value.trim() !== '') {
    const clientMessage = inputField.value.trim();

    addMessageToChat(clientMessage, true);

    // Очищаем поле ввода
    inputField.value = '';

    // Генерируем и добавляем ответ робота
    const robotResponse = getRandomRobotResponse();
    addMessageToChat(robotResponse);

    // Дополнительный ответ робота через случайное время
    const randomDelay = Math.random() * 3000 + 1000;
    setTimeout(() => {
      const additionalRobotResponse = getRandomRobotResponse();
      addMessageToChat(additionalRobotResponse);
    }, randomDelay);
  }
});

// Скролл контейнера с сообщениями в самый низ при открытии окна чата
chatWidget.addEventListener('click', () => {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

let timerId;

// Функция для проверки активности окна чата и задания вопроса робота
function checkChatActivity() {
  timerId = setTimeout(() => {
    const isActive = chatWidget.classList.contains('chat-widget_active');
    if (isActive) {
      const robotQuestion = 'У вас есть вопросы?';
      addMessageToChat(robotQuestion);
      clearTimeout(timerId);
    }
  }, 30000);
}

// Проверяем активность окна чата при каждом вводе текста
inputField.addEventListener('input', () => {
  clearTimeout(timerId);
  checkChatActivity();
});

// Запускаем проверку активности окна чата
checkChatActivity();
