document.addEventListener('DOMContentLoaded', () => {
    console.log("Boss Lupit Gupit - Reservations Page Loaded");

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

    const reserveOverlay = document.getElementById('reserveOverlay');
    const serviceMenuOverlay = document.getElementById('serviceMenuOverlay');
    const cancelModalOverlay = document.getElementById('cancelModalOverlay');
    const serviceInput = document.getElementById('serviceInput');
    const resDateTimeInput = document.getElementById('resDateTime');
    let cardToCancel = null;

    if(serviceInput) {
        serviceInput.onclick = () => serviceMenuOverlay.classList.add('active');
    }

    window.handleMenuSelect = function(element) {
        const column = element.closest('.menu-column');
        const type = column.getAttribute('data-type');
        const group = column.getAttribute('data-group');
        if (type === 'single') {
            if (group === 'haircut') {
                document.querySelectorAll('.menu-column[data-group="haircut"] .selectable').forEach(item => item.classList.remove('selected'));
            }
            element.classList.add('selected');
        } else {
            element.classList.toggle('selected');
        }
    };

    window.confirmMenuSelection = function() {
        const selected = Array.from(document.querySelectorAll('.selectable.selected')).map(el => el.querySelector('h4').innerText);
        if (selected.length > 0) serviceInput.value = selected.join(' + ');
        serviceMenuOverlay.classList.remove('active');
    };

    const openReserveBtn = document.getElementById('openReserve');
    if(openReserveBtn) {
        openReserveBtn.onclick = () => {
            resDateTimeInput.min = new Date().toISOString().slice(0, 16);
            reserveOverlay.classList.add('active');
        };
    }

    const reserveNowBtn = document.getElementById('reserveNowBtn');
    if(reserveNowBtn) {
        reserveNowBtn.onclick = () => {
            const servicesString = serviceInput.value;
            const dateTimeRaw = resDateTimeInput.value;
            const seat = document.getElementById('resSeat').value;

            if (!servicesString || !dateTimeRaw || !seat) { 
                alert("Please complete all fields!"); 
                return; 
            }
            
            const serviceArray = servicesString.split(' + ');
            const mainService = serviceArray[0];
            const addOns = serviceArray.slice(1);
            const dateObj = new Date(dateTimeRaw);
            
            const now = new Date();
            const diffHrs = Math.max(0, Math.floor((dateObj - now) / (1000 * 60 * 60)));
            const formattedDate = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

            const newCard = document.createElement('div');
            newCard.className = 'reservation-card';
            let addOnHtml = addOns.length > 0 ? `<ul class="sub-services">` + addOns.map(a => `<li>${a}</li>`).join('') + `</ul>` : "";

            newCard.innerHTML = `
                <div class="bell-icon">🔔</div>
                <div class="content-wrapper">
                    <details>
                        <summary><h2 class="service-title">${mainService}</h2></summary>
                        ${addOnHtml}
                    </details>
                    <div class="meta-info">${formattedDate}<br>Seat: ${seat}</div>
                </div>
                <div class="status-area">
                    <div class="time-left">Time: ${diffHrs} hrs left</div>
                    <div class="status-val">Status: <b class="status-pending">Pending</b></div>
                    <button class="btn-cancel" onclick="openCancelModal(this)">Cancel</button>
                </div>`;
            
            document.getElementById('reservationContainer').prepend(newCard);
            reserveOverlay.classList.remove('active');
            
            serviceInput.value = ""; 
            resDateTimeInput.value = ""; 
            document.getElementById('resSeat').value = "";
            document.querySelectorAll('.selectable').forEach(el => el.classList.remove('selected'));
        };
    }

    window.openCancelModal = function(button) {
        cardToCancel = button.closest('.reservation-card');
        const mainTitle = cardToCancel.querySelector('.service-title').innerText;
        const metaInfo = cardToCancel.querySelector('.meta-info').innerHTML;
        const timeLeftText = cardToCancel.querySelector('.time-left') ? cardToCancel.querySelector('.time-left').innerText : "";

        document.getElementById('modalHeaderTitle').innerText = mainTitle;
        document.getElementById('modalMetaInfo').innerHTML = metaInfo;
        document.getElementById('modalTimeLeft').innerText = timeLeftText;
        cancelModalOverlay.classList.add('active');
    };

    window.closeCancelModal = function() {
        cancelModalOverlay.classList.remove('active');
        document.getElementById('cancelReasonInput').value = "";
    };

    const confirmCancelBtn = document.getElementById('confirmCancelBtn');
    if(confirmCancelBtn) {
        confirmCancelBtn.onclick = () => {
            const reason = document.getElementById('cancelReasonInput').value;
            if (!reason.trim()) { alert("Please provide a reason."); return; }
            
            const statusVal = cardToCancel.querySelector('.status-val b');
            statusVal.innerText = "Cancelled";
            statusVal.className = "status-cancelled";
            
            cardToCancel.querySelector('.btn-cancel').remove();
            if(cardToCancel.querySelector('.time-left')) cardToCancel.querySelector('.time-left').remove();
            
            const reasonDiv = document.createElement('div');
            reasonDiv.className = 'cancel-reason-text';
            reasonDiv.innerText = `Reason: ${reason}`;
            cardToCancel.querySelector('.status-area').appendChild(reasonDiv);
            
            document.getElementById('historyContainer').prepend(cardToCancel);
            closeCancelModal();
        };
    }

    window.onclick = (e) => { 
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active'); 
        }
    };
});