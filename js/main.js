'use strict';
/* {
    "author": {
        "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
    },
    "offer": {
        "title": строка, заголовок предложения
        "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
        "price": число, стоимость
        "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
        "rooms": число, количество комнат
        "guests": число, количество гостей, которое можно разместить
        "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
        "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
        "description": строка с описанием,
        "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    },
    "location": {
        "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
        "y": случайное число, координата y метки на карте от 130 до 630.
    }
}
*/
var OBJECTS_AMOUNT = 8;
var blockMaxWidth = 900;

var getRandomLengthArr = function (arr) {
  return arr.filter(function () {
    return Math.random() < 0.5;
  });
};

var getRandomNumber = function (max, min) {
  if (min === undefined) {
    min = 0;
  }
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

var apartmentTypes = ['palace', 'flat', 'house', 'bungalo'];
var timestamps = ['12:00', '13:00', '14:00'];
var options = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var imagesArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var generateApartmentType = function () {
  return apartmentTypes[getRandomNumber(apartmentTypes.length - 1, 0)];
};


var generateAvatar = function (position) {
  return 'img/avatars/user0' + position + '.png';
};

var generateAuthor = function (position) {
  return {
    avatar: generateAvatar(position)
  };
};


var generateOffer = function () {
  return {
    title: 'Уютное гнездышко',
    adress: '600, 300',
    price: 20000,
    type: generateApartmentType(),
    rooms: 5,
    guests: 12,
    checkin: timestamps[getRandomNumber(timestamps.length - 1, 0)],
    checkout: timestamps[getRandomNumber(timestamps.length - 1, 0)],
    features: getRandomLengthArr(options),
    description: 'Очень уютный и недорогой номер',
    photos: getRandomLengthArr(imagesArr),

  };
};

var generateLocation = function () {
  return {
    x: getRandomNumber(blockMaxWidth, 0),
    y: getRandomNumber(630, 130)
  };
};

var generateObject = function (position) {
  return {
    'author': generateAuthor(position),
    'offer': generateOffer(),
    'location': generateLocation()
  };
};


var getMock = function () {
  return new Array(OBJECTS_AMOUNT).fill({}).map(function (element, index) {
    return generateObject(index + 1);
  });
};

// удаляю класс .map--faded

var activateMap = function () {
  var map = document.querySelector('.map');
  if (map) {
    map.classList.remove('map--faded');
  }
};

activateMap();

var pinHeight = 40;
var pinWidth = 40;

var pinsContainer = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


var createPinElement = function (mock) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinX = mock.location.x;
  var pinY = mock.location.y;
  pinElement.style.left = (pinX - pinWidth / 2) + 'px';
  pinElement.style.top = (pinY - pinHeight) + 'px';

  var image = pinElement.querySelector('img');
  image.alt = mock.title;
  image.src = mock.author.avatar;

  return pinElement;
};

var drawPins = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    var pinElement = createPinElement(arr[i]);
    fragment.appendChild(pinElement);
  }
  pinsContainer.appendChild(fragment);
};
var mock = getMock();
drawPins(mock);
