document.addEventListener('DOMContentLoaded', () => {
    console.log("Boss Lupit Gupit - Seats Page Loaded");

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
});

function selectSeat(seatNumber) {
    const seatName = `Seat ${seatNumber}`;
    
    if (seatNumber === 1) {
        const confirmReserve = confirm(`Do you want to reserve ${seatName}?`);
        if (confirmReserve) {
            alert(`${seatName} has been reserved successfully!`);
        }
    } else {
        console.log(`Clicked on ${seatName}`);
    }
}