document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "oUmDIyrtIZBMjZoUMy2mXPmt4JlvNxTaOCIrTYfD1M8";
    const photoElement = document.getElementById("photo");
    const photographerElement = document.getElementById("photographer");
    const likeButton = document.getElementById("likeButton");
    const likeCount = document.getElementById("likeCount");
    const historyList = document.getElementById("historyList");

    let history = JSON.parse(localStorage.getItem("history")) || {};

    // Функция для получения случайного изображения из Unsplash API
    async function getRandomPhoto() {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${apiKey}`);
            const data = await response.json();
            const imageUrl = data.urls.regular;
            photoElement.src = imageUrl;
            photographerElement.textContent = `Photo by ${data.user.name}`;

            // Обновляем количество лайков для нового изображения
            if (history[imageUrl]) {
                likeCount.textContent = history[imageUrl].likes || 0;
            } else {
                likeCount.textContent = 0;
            }

            addToHistory(imageUrl, data.user.name);
        } catch (error) {
            console.error("Error fetching random photo:", error);
        }
    }


    // Функция для добавления изображения в историю просмотров
    function addToHistory(imageUrl, photographer) {
        if (!history[imageUrl]) {
            history[imageUrl] = { photographer: photographer, likes: 0 };
            renderHistory();
        }
    }

    // Функция для отображения истории просмотров
    function renderHistory() {
        historyList.innerHTML = "";
        Object.keys(history).forEach((imageUrl) => {
            const listItem = document.createElement("li");
            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = "Previous Photo";
            img.addEventListener("click", () => {
                photoElement.src = imageUrl;
                photographerElement.textContent = `Photo by ${history[imageUrl].photographer}`;
                likeCount.textContent = history[imageUrl].likes || 0;
                localStorage.setItem("currentImageUrl", imageUrl);
            });
            listItem.appendChild(img);
            historyList.appendChild(listItem);
        });
        localStorage.setItem("history", JSON.stringify(history));
    }

    // Функция для обработки нажатия на кнопку "лайк"
    function handleLike() {
        const currentImageUrl = photoElement.src;
        if (currentImageUrl && history[currentImageUrl]) {
            history[currentImageUrl].likes = (history[currentImageUrl].likes || 0) + 1;
            likeCount.textContent = history[currentImageUrl].likes;
            renderHistory();
        }
    }

    likeButton.addEventListener("click", handleLike);

    // При загрузке страницы получаем случайное изображение
    getRandomPhoto();
});
