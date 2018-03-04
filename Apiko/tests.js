//Problem1-----------------------------------------------------
var arr = [0, 2, 3, 3, 3, 4, 5, 6, 6];
arr.occurencesCount = function(number) {
    
    var count = 0;
    for (let i = 0; i < this.length; i++) {
        if(this[i] === number) count++;        
    }
    return count;
}

console.log(arr.occurencesCount(3));
//Problem 2----------------------------------------------------------
function getYear(capital, rate, payment, result) {
    //ініціалізуємо параметр роки
    var years = 0;
    //проводимо очислення і збільшення накопичення допоки не стане сума більша за бажану
    while(capital < result){
        capital += (capital * rate) * (1 - payment);
        years++;
    }
    return years;
}
console.log(getYear(1000, 0.05, 0.18, 1100));
console.log(getYear(1000, 0.01625, 0.18, 1200));
//Problem3----------------------------------------------------------
function sortString(str) {
    //перевіряємо чи рядок не пустий
    if(str.length == 0) return str;
    //перетворюємо рядок на масив окремич чисел
    var arr = str.split(' ');
    //ініціалізуємо масисв для нового порядку
    var newArr = [];
    for (let i = 0; i < arr.length; i++) {
        //розділяємо слово на символи
        arrWord = arr[i].split('');
        for (let j = 0; j < arrWord.length; j++) {
            //шукаємо цифру в слові і записуємо це слово на своє місце в новий масив
            if(!isNaN(arrWord[j])){
               var word = arrWord.join('');
               newArr[arrWord[j] - 1] = word;
            }
        }
    }
    //Записуємо нове відсортоване значення в рядок і повертаємо його.
    str = newArr.join(' ')
    return str;
}
console.log(sortString('g5et ski3lls on6 use1 your2 to4 7top'));
console.log(sortString('practic3 h4rder yo1u 2hould'));
//Problem4-------------------------------------------------------------
function queueTime(array, thread) {
    //ініціалізуємо масив розмір якого дорівнює кількості касс і записуємо в нього нулі
     var cashbox = [];
     cashbox.length = thread;
    for (let k = 0; k < cashbox.length; k++) {
        cashbox[k] = 0;        
    }
    //прибавляємо значення з масиву покупців по порядку на касу з найменшим значенням
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < cashbox.length; j++) {
            if(cashbox[j] == Math.min.apply(Math, cashbox)) {
                cashbox[j] += array[i];
                break;
            }
        }
    }
    //повертаємо час з каси з найбільшим значенням
    return Math.max.apply(Math, cashbox);

}

console.log(queueTime([], 1));
console.log(queueTime([ 26, 42, 13, 18, 48, 38, 39, 25, 39, 6, 35, 11, 7, 38, 19, 14 ], 1));
console.log(queueTime([ 34, 31, 40, 30, 48, 2, 19, 32, 37, 13, 30, 49, 3, 13, 12, 43, 39, 22, 47 ], 4));
console.log(queueTime([ 19, 1, 27, 35, 16, 4, 45, 49, 41, 25 ], 5));
//problem5----------------------------------------------------------------
function biggerNumber(number) {
    //відсікаємо 0 і числа які точно не зміняться
    if(number < 12) return -1;
    //пертворюємо число на рядок
    var num = String(number);
    //розділяємо рядок на масив символів
    var arr = num.split(''); 
    //порівнюємо цифри числа з кінця, і при виконанні умови міяємо їх місцями
    return compare(arr.length-2, arr.length-1, arr);
}
//функція порівняння
function compare(a, b, array) { 
    if(array[a] < array[b]) {
        return swap(a, b, array);   
    } else if(a - 1 >= 0) {
       return compare(a - 1, a, array);
    } else {
        return -1;
    }
}
//функція обміну місцями
function swap(a, b, arr) {
    var tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
    return arr.join('');
}

console.log(biggerNumber(23));
console.log(biggerNumber(624));
console.log(biggerNumber(2018));
console.log(biggerNumber(9));
console.log(biggerNumber(111));
console.log(biggerNumber(531));
