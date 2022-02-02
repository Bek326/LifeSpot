/*
* Сессия теперь создается в общей области видимости.
* Будет "захватываться" тремя функциями
* 
* */
let session =  new Map();

/*
* Вывод данных сессии в консоль
* 
* */
let sessionLog = function logSession() {
    for (let result of session){
        console.log(result)
    }
}

/*
* Сохранение данных сессии сразу при заходе пользователя на страницу
* 
* */
function handleSession(){
    // Сохраним время начала сессии
    session.set("startDate", new Date().toLocaleString())
    // Сохраним UserAgent
    session.set("userAgent", window.navigator.userAgent)
}

function timeOut(){
    /*
* Всплывающее окно будет показано по таймауту
* 
* */
    setTimeout(() =>
            alert("Нравится LifeSpot? " + '\n' +  "Подпишитесь на наш Instagram @lifespot999!" ),
        30000);
}

/*
* Проверка возраста пользователя
* 
* */
function checkAge(){
    session.set("age", prompt("Пожалуйста, введите ваш возраст?"))

    if(session.get("age") >= 18){
        alert("Приветствуем на LifeSpot! " + '\n' +  "Текущее время: " + new Date().toLocaleString() );
    }
    else{
        alert("Наши трансляции не предназначены для лиц моложе 18 лет. Вы будете перенаправлены");
        window.location.href = "http://www.google.com"
    }
}

function filterContent(){
    let elements = document.getElementsByClassName('video-container');

    for (let i = 0; i <= elements.length; i++ ){
        let videoText = elements[i].querySelector(".video-title").innerText;
        if(!videoText.toLowerCase().includes(inputParseFunction() /* Захват переменной теперь происходит с помощью замыкания */  .toLowerCase())){
            elements[i].style.display = 'none';
        } else {
            elements[i].style.display = 'inline-block';
        }
    }
}

/*
* Запросим пользовательский ввод
* и сохраним отзыв в объект
*
* */
function getReview() {
    // Создадим объект
    let review = {}

    // Сохраним свойство имени
    review["userName"] = prompt("Как вас зовут ?")
    if(review["userName"] == null){
        return
    }

    // Сохраним текст отзыва
    review["comment"] = prompt("Напишите свой отзыв")
    if(review["comment"] == null){
        return
    }

    // Сохраним текущее время
    review["date"] = new Date().toLocaleString()

    // Добавим на страницу
    writeReview(review)
}

/*
* Запишем отзыв на страницу
*
* */
const writeReview = review => {
    document.getElementsByClassName('reviews')[0].innerHTML += '    <div class="review-text">\n' +
        `<p> <i> <b>${review['userName']}</b>  ${review['date']}</i></p>` +
        `<p>${review['comment']}</p>`  +
        '</div>';
}