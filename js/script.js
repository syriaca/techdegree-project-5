const employeeDirectory = document.getElementById("employeeDirectory");
let request = new XMLHttpRequest();

request.onreadystatechange = function(event) {
    if (this.readyState === XMLHttpRequest.DONE) {
        let employeesDirectoryHTMLHeading = this.status === 200  ? 'Awesome employee startup directory' : 'No result founded';
        let employeesDirectoryHTML = '<section class="section">';
        let employeesDirectoryModalHTML = '';
        employeesDirectoryHTML += '<header class="section-header"><h1 class="section-header__heading">'+employeesDirectoryHTMLHeading+'</h1></header>';
        if (this.status === 200) {
            let employeeData = JSON.parse(this.response);
            employeesDirectoryHTML += '<ul class="employees-list">';
            for(let i = 0; i < employeeData.results.length; i++) {
                let employeePicture = employeeData.results[i].picture.large;
                let employeeFirstName = employeeData.results[i].name.first;
                let employeeLastName = employeeData.results[i].name.last;
                let employeeEmail = employeeData.results[i].email;
                let employeeCity = employeeData.results[i].location.city;
                let employeeUsername = employeeData.results[i].login.username;
                let employeeCell = employeeData.results[i].cell;
                let employeeLocation = employeeData.results[i].location;
                let employeeDOB = employeeData.results[i].dob;

                employeesDirectoryModalHTML = `
                    <div class="employee-modal">
                        <figure class="employee-modal__figure">
                            <img class="employee-modal__image" src="${employeePicture}"/>
                        </figure>
                        <header class="employees-modal__header">
                            <h1 class="employees-modal__heading employee__name">
                                <span class="employee__name-first">${employeeFirstName}</span>
                                <span class="employee__name-last">${employeeLastName}</span>
                            </h1>
                            <p class="employees-modal__paragraph employee__username">${employeeUsername}</p>
                            <p class="employees-modal__paragraph employee__email">${employeeEmail}</p>
                            <p class="employees-modal__paragraph employee__cell">${employeeCell}</p>
                            <p class="employees-modal__paragraph employee__location"></p>
                        </header>
                    </div>`;

                employeesDirectoryHTML += 
                `<li class="employees-list__item">
                    <a href="#" class="employees-list__link">
                        <article class="employees-list__article">
                            <figure class="employees-list__figure">
                                <img class="employees-list__image" src="${employeePicture}"/>
                            </figure>
                            <header class="employees-list__header">
                                <h1 class="employees-list__heading employee__name">
                                    <span class="employee__name-first">${employeeFirstName}</span>
                                    <span class="employee__name-last">${employeeLastName}</span>
                                </h1>
                                <p class="employees-list__paragraph employee__email">${employeeEmail}</p>
                                <p class="employees-list__paragraph employee__city">${employeeCity}</p>
                            </header>
                        </article>
                    </a>
                </li>`;
                
                if(i % 4 === 0 ) {
                    employeesDirectoryHTML += '</ul><ul class="employees-list">';
                }
            }
            employeeDirectory.innerHTML = employeesDirectoryHTML;

            // get all links in list and add event listener in order to add a modal window
            let employeesModalLink = document.querySelectorAll(".employees-list__link");
            for(let i = 0; i < employeesModalLink.length; i++) {
                employeesModalLink[i].addEventListener('click', function(e) {
                    console.log(this);
                });
            }
        }
    }
}
request.open('GET', 'https://randomuser.me/api/?results=12&format=json');
request.send();
