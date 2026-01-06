document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById('loader-wrapper');
    const container = document.getElementById('cards');

    fetch('https://json-api.uz/api/project/fn44-amaliyot/cars')
        .then(res => {
            if (!res.ok) {
                throw new Error("Server javob bermadi");
            }
            return res.json();
        })
        .then(data => {
            loader.style.display = 'none';

            if (!data || !data.data) {
                throw new Error("Ma'lumot topilmadi");
            }

            showCars(data.data);
        })
        .catch(err => {
            loader.innerHTML = `
                <div style="color:white; text-align:center;">
                     Xatolik: ${err.message}
                </div>
            `;
            console.error(err);
        });

    function showCars(cars) {
        cars.forEach(car => {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <img src="${car.image}" alt="${car.name}">
                <div class="card-info">
                    <span class="badge">${car.type}</span>
                    <div class="car-name">${car.name}</div>

                    <div class="detail"><strong> Yoqilg'i:</strong> ${car.fuel}</div>
                    <div class="detail"><strong> Uzatma:</strong> ${car.gearbox || 'Avtomatik'}</div>
                    <div class="detail"><strong> Haydovchi:</strong> ${car.drive}</div>

                    <div class="price"> ${car.pricePerDay}/kun</div>
                </div>
            `;

            container.appendChild(card);
        });
    }
});
