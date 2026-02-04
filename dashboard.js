document.addEventListener('DOMContentLoaded', () => {
    console.log("Boss Lupit Gupit - Dashboard Loaded");

    const userProfileContainer = document.getElementById('userProfileContainer');
    const userDropdown = document.getElementById('userDropdown');

    if (userProfileContainer && userDropdown) {
        userProfileContainer.addEventListener('click', (e) => {
            e.stopPropagation(); 
            userDropdown.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!userProfileContainer.contains(e.target)) {
                userDropdown.classList.remove('show');
            }
        });
    }

    // --- 2. Icon Navigation Logic ---
    const iconBoxes = document.querySelectorAll('.icon-box');
    
    iconBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const label = box.nextElementSibling.innerText.trim();

            if (label === 'The Shop') {
                window.location.href = 'the_shop.html';
            } 
            else if (label === 'The Crew') {
                window.location.href = 'crew.html';
            }
            else if (label === 'Our Services') {
                window.location.href = 'services.html';
            }
            else if (label === 'Recommended Haircuts') {
                window.location.href = 'haircuts.html';
            }
        });
    });

    // --- 3. Reservation Button Logic (THE FIX) ---
    const reserveBtn = document.querySelector('.btn-reserve');
    if (reserveBtn) {
        reserveBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Stop any other default actions
            // Redirect explicitly to reservations.html
            window.location.href = 'reservations.html'; 
        });
    }
});