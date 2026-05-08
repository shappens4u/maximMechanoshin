// Реальные и актуальные организации г. Находка (согласно п. 3.12 ТЗ)
const db = [
    { name: "ДФК 'Водник' (Футбол)", age: [5, 17], type: "Спорт", lat: 42.8123, lon: 132.8785, addr: "ул. Владивостокская, 45А" },
    { name: "СК 'Руслан' (Бокс/ММА)", age: [7, 18], type: "Спорт", lat: 42.8256, lon: 132.8912, addr: "ул. Спортивная, 4" },
    { name: "Дом детского творчества", age: [5, 17], type: "Творчество", lat: 42.8189, lon: 132.8854, addr: "ул. Верхне-Морская, 104А" },
    { name: "Центр 'IT-куб'", age: [7, 17], type: "Наука", lat: 42.8421, lon: 132.8812, addr: "ул. Пирогова, 13" },
    { name: "ДЮСШ 'Приморец'", age: [6, 16], type: "Спорт", lat: 42.8543, lon: 132.9123, addr: "пр-кт Находкинский, 102" },
    { name: "ДХШ №1 (Художка)", age: [10, 17], type: "Творчество", lat: 42.8211, lon: 132.8821, addr: "ул. 25-летия Октября, 13" },
    { name: "Бассейн 'Физкультура и здоровье'", age: [3, 17], type: "Спорт", lat: 42.8567, lon: 132.9211, addr: "ул. Спортивная, 3А" },
    { name: "Языковой центр 'Priority'", age: [4, 17], type: "Наука", lat: 42.8278, lon: 132.8945, addr: "ул. Школьная, 1А" },
    { name: "Танцевальный клуб 'Реверанс'", age: [5, 15], type: "Творчество", lat: 42.8155, lon: 132.8790, addr: "ул. Ленинская, 2" },
    { name: "Робототехника 'RoboCenter'", age: [6, 14], type: "Наука", lat: 42.8312, lon: 132.8756, addr: "ул. Пограничная, 24" },
    { name: "Секция Самбо (МЖК)", age: [7, 17], type: "Спорт", lat: 42.8489, lon: 132.9012, addr: "б-р Энтузиастов, 1" },
    { name: "ДМШ №1 (Музыкалка)", age: [6, 16], type: "Творчество", lat: 42.8234, lon: 132.8845, addr: "ул. Владивостокская, 14" },
    { name: "Спортивная гимнастика", age: [4, 12], type: "Спорт", lat: 42.8267, lon: 132.8890, addr: "ул. Комсомольская, 32" },
    { name: "Шахматная школа", age: [6, 17], type: "Наука", lat: 42.8198, lon: 132.8812, addr: "ул. Луначарского, 10" },
    { name: "Парусный клуб 'Алые паруса'", age: [9, 17], type: "Спорт", lat: 42.8089, lon: 132.8745, addr: "ул. Портовая, 17" },
    { name: "Студия вокала 'Орфей'", age: [7, 17], type: "Творчество", lat: 42.8412, lon: 132.8923, addr: "ул. Постышева, 29" },
    { name: "Центр экологии и туризма", age: [10, 16], type: "Наука", lat: 42.8356, lon: 132.8878, addr: "ул. Малиновского, 21" },
    { name: "Каратэ 'Киокушинкай'", age: [5, 18], type: "Спорт", lat: 42.8290, lon: 132.9045, addr: "ул. Гагарина, 12" },
    { name: "Арт-студия 'Зебра'", age: [5, 12], type: "Творчество", lat: 42.8167, lon: 132.8998, addr: "ул. Озерная, 2" },
    { name: "Программирование 'KiberOne'", age: [8, 14], type: "Наука", lat: 42.8245, lon: 132.9067, addr: "пр-кт Мира, 18" }
];

let myMap;

function init() {
    // Инициализация карты с центром в Находке
    myMap = new ymaps.Map("map", {
        center: [42.825, 132.890], 
        zoom: 12
    });
    render(db);
}

function render(data) {
    const grid = document.getElementById('circlesGrid');
    grid.innerHTML = '';
    myMap.geoObjects.removeAll();

    if (data.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center;"><h3>Путь не найден. Попробуйте другой возраст или додзё.</h3></div>';
        return;
    }

    data.forEach(item => {
        const container = document.createElement('div');
        container.className = 'leaf-container';
        container.onclick = () => container.classList.toggle('open');

        let leavesHTML = '<div class="leaf-pile-overlay">';
        for (let i = 0; i < 6; i++) {
            const top = Math.random() * 50 + 15; 
            const left = Math.random() * 50 + 15;
            const rot = Math.random() * 360;
            leavesHTML += `<div class="pile-leaf" style="top:${top}%; left:${left}%; transform:rotate(${rot}deg)"></div>`;
        }
        leavesHTML += '<div class="click-hint">ОТКРЫТЬ ПУТЬ</div></div>';

        container.innerHTML = `
            ${leavesHTML}
            <div class="hidden-card">
                <h3>${item.name}</h3>
                <p><b>Направление:</b> ${item.type}</p>
                <p><b>Возраст:</b> ${item.age[0]} - ${item.age[1]} лет</p>
                <p><b>Адрес:</b> ${item.addr}</p>
            </div>
        `;

        grid.appendChild(container);

        const mark = new ymaps.Placemark([item.lat, item.lon], {
            balloonContent: `<b>${item.name}</b><br>${item.addr}`
        }, { preset: 'islands#redCircleDotIcon' });
        myMap.geoObjects.add(mark);
    });
}

function filter() {
    const age = parseInt(document.getElementById('ageInput').value);
    const type = document.getElementById('typeSelect').value;

    // Оптимизированный алгоритм фильтрации (п. 3.5 ТЗ)
    const filtered = db.filter(item => {
        const ageMatch = isNaN(age) || (age >= item.age[0] && age <= item.age[1]);
        const typeMatch = type === 'all' || item.type === type;
        return ageMatch && typeMatch;
    });
    render(filtered);
}

document.getElementById('searchBtn').addEventListener('click', filter);
ymaps.ready(init);