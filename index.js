"use strict";
(function(){
const text = 'hemidemisemiquaver';
const s1 = 'emi';
const s2 = 'm.se';
let spans = [];

let result = transformString(text, s2, "bold");
result = transformString(text, s1, "italic");

for (let i = 0; i < result.length; i++) {
    document.getElementsByClassName('result')[0].appendChild(result[i]);
}

function transformString (text, str, className) {
    const re = new RegExp(str);
    const letters = text.split('');
    const indexes = matchString(text,re).indexes;
    const lengths = matchString(text,re).lengths;
    
    if (spans.length === 0) {
        spans = createSpans(letters);
    }   

    //s - счетчик для спанов
    //i - счетчик для индексов
    //l - счетчик для длины искомого элемента
    for (let s = 0; s < spans.length; s++) {
        for (let i = 0; i < indexes.length; i++) {
            if (s === indexes[i]) {
                for (let l = 0; l < lengths[i]; l++) {
                    spans[s+l].classList.add(className);
                }
            }
        }
    }
    return spans;
}

// Вспомогательные функции
// Создание спанов для каждой буквы
function createSpans (arr) {
    const arrOfSpans = [];
    
    for (let i = 0; i < arr.length; i++) {        
        let span = document.createElement('span');
        span.innerHTML = arr[i];
        arrOfSpans.push(span);
    }
    return arrOfSpans;
}

// Функция поиска по массиву совпадений: string - строка, где ищем, target - что ищем
// возвращает объект с индексами и длинами найденных строк
function matchString (string, target) {
    const arrOfIndexes = [];
    const arrOfLengths = [];
    const regExp = new RegExp(target,'i');
    let newString = string;
    let length = 0;
    while(true) {        
        const foundPos = string.search(regExp); //ищем по строке номер совпадения с регуляркой
        const newFoundPos = newString.search(regExp); //дублируем номер для счетчика
        
        if (newFoundPos === -1) break; //прерывание цикла, когда совпадений больше нет        
        arrOfIndexes.push(Number(newFoundPos) + Number(length)); //добавим в массив arrOfOndexes номер найденной позиции + длина совпадения
        newString = newString.replace(target, replaceSmart);

        // Функция заменяет искомую строку (str) из регулярки на пустую строку и запоминает ее длину        
        function replaceSmart(str, offset, s) { // str - искомая строка, offset - номер позиции, s - строка, в которой ищем
            arrOfLengths.push(str.length);
            length = length + str.length;
            return '';
        }
    }
    return {
        indexes: arrOfIndexes,
        lengths: arrOfLengths
    }
}
})()