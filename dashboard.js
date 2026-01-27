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

    const iconBoxes = document.querySelectorAll('.icon-box');
    iconBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const label = box.nextElementSibling.innerText;
            alert(`Navigating to: ${label} (Feature coming soon!)`);
        });
    });

    const reserveBtn = document.querySelector('.btn-reserve');
    if (reserveBtn) {
        reserveBtn.addEventListener('click', () => {
            console.log("Reservation modal triggered");
        });
    }
});