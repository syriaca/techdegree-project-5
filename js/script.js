const employeeDirectory = document.getElementById("employeeDirectory");
let requestURL = 'https://randomuser.me/api/?results=12&format=json';
// Create a modal object
let employeeModal = new Modal();

// We Prepare the ajax request
let request = new XMLHttpRequest();
// We create the callback
request.onreadystatechange = function(event) {
    // If the request is done
    if (this.readyState === XMLHttpRequest.DONE) {
        let employeesDirectoryHTMLHeading = this.status === 200  ? 'Awesome employee startup directory' : 'No result founded';
        let employeesDirectoryHTML = '<section class="section">';
        employeesDirectoryHTML += '<header class="section-header"><h1 class="section-header__heading">'+employeesDirectoryHTMLHeading+'</h1></header>';
        // If the request is successfull
        if (this.status === 200) {
            // We get the employee data response and play with it
            let employeeData = JSON.parse(this.response);
            employeesDirectoryHTML += '<ul class="employees-list">';

            // We make a loop within the employee data and prepare stuff to use on display
            for(let i = 0; i < employeeData.results.length; i++) {
                let employeePicture = employeeData.results[i].picture.large;
                let employeeFirstName = employeeData.results[i].name.first;
                let employeeLastName = employeeData.results[i].name.last;
                let employeeEmail = employeeData.results[i].email;
                let employeeCity = employeeData.results[i].location.city;
                let employeeCell = employeeData.results[i].cell;
                let employeeLocation = employeeData.results[i].location;
                let employeeDOB = employeeData.results[i].dob;

                // We create an employee object at each loop and we push it in an array, so we can use it later when we want to show more employee details
                let employee = new Employee(employeePicture, employeeFirstName,employeeLastName, employeeEmail,employeeCell,employeeLocation, employeeDOB);
                employeeModal.add(employee);

                // We create the employee HTML list to display it on page
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
                
                // Every four <li> we close the unordonned list and open a new one, so we got three columns at the ending
                if(i % 4 === 3 ) {
                    employeesDirectoryHTML += '</ul><ul class="employees-list">';
                }
            }
            // We finally add the lists to the good div
            employeeDirectory.innerHTML = employeesDirectoryHTML;

            // get all links in list and add event listener in order to add a modal window
            let employeesModalLink = document.querySelectorAll(".employees-list__link");
            for(let i = 0; i < employeesModalLink.length; i++) {
                employeesModalLink[i].addEventListener('click', function(e) {
                    e.preventDefault();
                    employeeModal.constructModal(employeeModal.employees[i]);
                    employeeModal.showModal(modalHTML);
                });
               
            }
        }
    }
}
// We open the ajax request
request.open('GET', requestURL);
// We send the ajax request
request.send();
