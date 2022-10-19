const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

let storyText = 'It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.';
let insertX = ['Willy the Goblin', 'Big Daddy', 'Father Christmas'];
let insertY = ['the soup kitchen', 'Disneyland', 'the White House'];
let insertZ = ['spontaneously combusted', 'melted into a puddle on the sidewalk', 'turned into a slug and crawled away'];

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;
    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);
    newStory = newStory.replaceAll(':insertx:', xItem);
    newStory = newStory.replaceAll(':inserty:', yItem);
    newStory = newStory.replaceAll(':insertz:', zItem);
    if (customName.value !== '') {
        const name = customName.value;
        newStory = newStory.replaceAll('Bob', name);
    }

    if (document.getElementById("uk").checked) {
        const weights = findAndConvertP(newStory);
        const temperatures = findAndConvertF(newStory);
        for (const [pounds, stone] of Object.entries(weights)) {
            newStory = newStory.replaceAll(' ' + pounds, ' ' + stone);
        }
        for (const [fahrenheit, centigrade] of Object.entries(temperatures)) {
            newStory = newStory.replaceAll(' ' + fahrenheit, ' ' + centigrade);
        }
    }

    story.textContent = newStory;
    story.style.visibility = 'visible';
}

function findAndConvertF(str) {
    const regex = /\d{1,3}\sfahrenheit/gm;
    let fahrenheit, ans = {};
    while (fahrenheit = regex.exec(str)) {
        const fahrenheitStr = fahrenheit[0];
        if (!Object.keys(ans).includes(fahrenheitStr)) {
            const temperature = fahrenheitToCentigrade(fahrenheitStr.match(/\d+/)[0]);
            ans[fahrenheit] = Math.round(temperature) + ' centigrade';
        }
    }
    return ans;
}

function fahrenheitToCentigrade(fahrenheit) {
    return (fahrenheit - 32) * 0.5556;
}

function findAndConvertP(str) {
    const regex = /\d{1,3}\spounds/gm;
    let pounds, ans = {};
    while (pounds = regex.exec(str)) {
        const poundsStr = pounds[0];
        if (!Object.keys(ans).includes(poundsStr)) {
            const weight = poundsToStone(poundsStr.match(/\d+/)[0]);
            ans[pounds] = Math.round(weight) + ' stone';
        }
    }
    return ans;
}

function poundsToStone(pounds) {
    return pounds / 14;
}