 // API dan ma'lumot olish
        fetch('https://json-api.uz/api/project/fn44-amaliyot/cars')
            .then(res => res.json())
            .then(data => {
                document.getElementById('loader-wrapper').style.display = 'none';
                showCars(data.data);
            })
            .catch(err => {
                document.getElementById('loader-wrapper').innerHTML = '<div style="color:white; text-align:center;">❌ Xatolik: ' + err.message + '</div>';
            });

        // Kartalarni ko'rsatish
        function showCars(cars) {
            const container = document.getElementById('cards');
            
            cars.forEach(car => {
                const card = document.createElement('div');
                card.className = 'card';
                
                card.innerHTML = `
                    <img src="${car.image}" alt="${car.name}">
                    
                    <div class="card-info">
                        <span class="badge">${car.type}</span>
                        <div class="car-name">${car.name}</div>
                        
                        <div class="detail">
                            <strong>⛽ Yoqilg'i:</strong> ${car.fuel}
                        </div>
                        
                        <div class="detail">
                            <strong>⚙️ Uzatma:</strong> ${car.gearbox || 'Avtomatik'}
                        </div>
                        
                        <div class="detail">
                            <strong>🚘 Haydovchi:</strong> ${car.drive}
                        </div>
                        
                        <div class="price">💵 ${car.pricePerDay}/kun</div>
                    </div>
                `;
                
                container.appendChild(card);
            });
        }