let modalObjArray = [];
let modalObj = {};
let modalDiv = document.createElement('div');

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
    modalHTML = `<div class="employee-modal">
    <button id="btnCloseModal" class="btn-close">&#10060;</button>
        <figure class="employee-modal__figure">
            <img class="employee-modal__image" src="${employee.picture}"/>
        </figure>
        <header class="employees-modal__header">
            <h1 class="employees-modal__heading employee__name">
                <span class="employee__name-first">${employee.firstName}</span>
                <span class="employee__name-last">${employee.lastName}</span>
            </h1>
            <p class="employees-modal__paragraph employee__email">${employee.email}</p>
            <p class="employees-modal__paragraph employee__cell">${employee.cell}</p>
            <p class="employees-modal__paragraph employee__location">
                ${employee.location.street}, ${employee.location.city} ${employee.location.state} ${employee.location.postcode}
            </p>
            <p class="employees-modal__paragraph employee__dob">${employee.dob}</p>
        </header>
    </div>`;
}

// Method to show the modal
Modal.prototype.showModal = function() {
    modalDiv.setAttribute('id','modalDiv');
    document.body.appendChild(modalDiv);
    modalDiv.innerHTML = modalHTML;
    document.getElementById('btnCloseModal').addEventListener('click', function(e){
        this.parentNode.remove();
    });
};

function Employee(picture, firstName, lastName, email, cell, location, dob) {
    this.picture = picture;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.cell = cell;
    this.location = location;
    this.dob = dob;
}