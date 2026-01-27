document.addEventListener('DOMContentLoaded', () => {
    console.log("Boss Lupit Gupit - History Page Loaded");

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

    const historyData = [
        { price: "₱300", details: "Based on the chosen service of the client when it was reserved.", date: "January 17, 2026<br>4:00 P.M." },
        { price: "₱250", details: "Beard Shave and Precision Edge.", date: "January 20, 2026<br>1:30 P.M." },
        { price: "₱450", details: "Haircut, Massage, and Scalp Treatment.", date: "January 22, 2026<br>3:00 P.M." },
        { price: "₱150", details: "Quick Trim and Line-up.", date: "January 24, 2026<br>10:00 A.M." },
        { price: "₱300", details: "Standard Haircut with Shampoo.", date: "January 25, 2026<br>2:00 P.M." },
        { price: "₱500", details: "Premium Grooming Package.", date: "February 01, 2026<br>11:00 A.M." },
        { price: "₱200", details: "Kids Haircut.", date: "February 03, 2026<br>4:30 P.M." },
        { price: "₱350", details: "Haircut and Beard Styling.", date: "February 05, 2026<br>5:00 P.M." }
    ];

    let currentPage = 1;
    const rowsPerPage = 4;
    const totalPages = Math.ceil(historyData.length / rowsPerPage);

    function displayTable(page) {
        const tbody = document.getElementById('history-body');
        if(!tbody) return;

        tbody.innerHTML = "";
        page--; 

        let start = rowsPerPage * page;
        let end = start + rowsPerPage;
        let paginatedItems = historyData.slice(start, end);

        paginatedItems.forEach(item => {
            let row = `<tr>
                <td class="col-price">${item.price}</td>
                <td class="col-details">${item.details}</td>
                <td class="col-date">${item.date}</td>
            </tr>`;
            tbody.innerHTML += row;
        });

        const pageDisplay = document.getElementById('page-display');
        if(pageDisplay) pageDisplay.innerText = `Page ${currentPage} / ${totalPages}`;
        
        document.getElementById('btn-prev').disabled = currentPage === 1;
        document.getElementById('btn-first').disabled = currentPage === 1;
        document.getElementById('btn-next').disabled = currentPage === totalPages;
        document.getElementById('btn-last').disabled = currentPage === totalPages;
    }

    const btnNext = document.getElementById('btn-next');
    if(btnNext) {
        btnNext.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayTable(currentPage);
            }
        });
    }

    const btnPrev = document.getElementById('btn-prev');
    if(btnPrev) {
        btnPrev.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayTable(currentPage);
            }
        });
    }

    const btnFirst = document.getElementById('btn-first');
    if(btnFirst) {
        btnFirst.addEventListener('click', () => {
            currentPage = 1;
            displayTable(currentPage);
        });
    }

    const btnLast = document.getElementById('btn-last');
    if(btnLast) {
        btnLast.addEventListener('click', () => {
            currentPage = totalPages;
            displayTable(currentPage);
        });
    }

    displayTable(currentPage);
});