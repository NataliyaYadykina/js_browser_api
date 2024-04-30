console.log(navigator.userAgent);
console.log(navigator.cookieEnabled);
console.log(navigator.doNotTrack);
console.log(navigator.geolocation);

// userAgent - информация о браузере,
// cookieEnabled - включены ли cookie,
// doNotTrack - включена ли опция запрета на отслеживание,
// geoLocation - геолокация, в данном случае не активированная.

// Напишите функцию findClosestCity(userLocation, cities), которая принимает текущее местоположение пользователя в формате [latitude, longitude] и массив городов с их координатами в формате {name: 'City', location: [latitude, longitude]}. Функция должна вернуть название ближайшего города к пользователю.

console.log(location);
location.href = './first.html'; // переход на страницу
function calculateDistance(location1, location2) {
    const [lat1, lon1] = location1; // Разбивает координаты первого местоположения на широту и долготу
    const [lat2, lon2] = location2; // Разбивает координаты второго местоположения на широту и долготу

    const toRoad = value => (value * Math.PI) / 180; // Преобразует значение в радианы
    const R = 6371; // Радиус Земли в километрах

    const dLat = toRoad(lat2 - lat1); // Вычисляет разницу широты в радианах
    const dLon = toRoad(lon2 - lon1); // Вычисляет разницу долготы в радианах

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + // Вычисляет квадрат синуса половины разницы широты
        Math.cos(toRoad(lat1)) * Math.cos(toRoad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2); // Вычисляет квадрат синуса половины разницы долготы и учитывает косинусы широт
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Вычисляет квадратный корень из суммы квадратов синусов и косинусов, т.е. вычисляет центральный угол между двумя местоположениями
    const distance = R * c; // Вычисляет расстояние между двумя местоположениями на сфере Земли
    return distance; // Возвращает расстояние между местоположениями
}

function findFatestCity(cities) {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) { // Проверяет поддержку геолокации в браузере
            navigator.geolocation.getCurrentPosition(
                position => {
                    const userLocation = [position.coords.latitude, position.coords.longitude]; // Получает текущее местоположение пользователя
                    let closestCity = null; // Переменная для хранения ближайшего города
                    let closestDistance = Infinity; // Переменная для хранения ближайшего расстояния

                    cities.forEach(city => { // Перебирает все города из массива cities
                        const distance = calculateDistance(userLocation, city.location); // Вычисляет расстояние между местоположением пользователя и текущим городом
                        if (distance < closestDistance) { // Если расстояние меньше ближайшего расстояния
                            closestDistance = distance; // Записывает новое ближайшее расстояние
                            closestCity = city.name; // Записывает новое ближайшее местоположение
                        }
                    });

                    resolve(closestCity); // Возвращает название ближайшего города
                },
                error => {
                    if (error.code === error.PERMISSION_DENIED) { // Если пользователь отказал в доступе к геолокации
                        reject(new Error('Пользователь отказал в доступе к геолокации.')); // Возвращает ошибку
                    } else {
                        reject(new Error('Не удалось определить местоположение пользователя.')); // Возвращает ошибку
                    }
                }
            );
        } else {
            reject(new Error('Ваш браузер не поддерживает геолокацию.')); // Возвращает ошибку
        }
    });
}

// Пример использования.
const cities = [
    { name: 'New York', location: [40.7128, -74.0060] },
    { name: 'London', location: [51.5074, -0.1278] },
    { name: 'Paris', location: [48.8566, 2.3522] },
    { name: 'Berlin', location: [52.5200, 13.4050] },
    { name: 'Moscow', location: [55.751244, 37.618423] },
    // ...other cities
];

findFatestCity(cities)
    .then(city => console.log(`Ближайший город: ${city}`))
    .catch(error => console.error(error.message));

