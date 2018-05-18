let modalObjArray = [];
let modalObj = {};
let modalContainer = document.createElement('div');

// Constructor for the modal
function Modal(employees){
    this.employees = [];
    this.modalHTML;
}

// Add method to push employees object to an array we'll parse to fill the HTML modal
Modal.prototype.add = function(employee) {
    this.employees.push(employee);
};

// Method using arrays of object above to construct html for the modal
Modal.prototype.constructModal = function(employee) {
    modalHTML = `<div class="modal employee-card">
    <button id="btnCloseModal" class="btn-close">&#10060;</button>
        <figure class="employee-card__figure">
            <img class="employee-card__image" src="${employee.picture}" alt="${employee.firstName} ${employee.lastName}'s portrait photography"/>
        </figure>
        <div class="employee-card__body">
            <h1 class="employee-card__heading employee__name">
                <span class="employee__name-first">${employee.firstName}</span>
                <span class="employee__name-last">${employee.lastName}</span>
            </h1>
                <p class="employee-card__paragraph employee__email">${employee.email}</p>
                <p class="employee-card__paragraph employee__location">${employee.location.city}</p>
                <hr class="hr-divider">
                <p class="employee-card__paragraph employee__cell">${employee.cell}</p>
                <p class="employee-card__paragraph employee__location">${employee.location.street}, ${employee.location.state} ${employee.location.postcode}</p>
                <p class="employee-card__paragraph employee__dob">Birthday: ${employee.dob}</p>
        </header>
    </div>`;
}

// Method to show the modal
Modal.prototype.showModal = function() {
    modalContainer.setAttribute('id','modalContainer');
    modalContainer.setAttribute('class','modal-container');
    document.body.appendChild(modalContainer);
    modalContainer.innerHTML = modalHTML;
    document.getElementById('btnCloseModal').addEventListener('click', function(e){
        document.body.classList.add("class", "modal-out");
        document.body.classList.remove("modal-in");
        setTimeout(function(){
            document.body.removeAttribute("class", "modal-out");
            e.target.parentElement.parentElement.remove();
        },500);
    });
};