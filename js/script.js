const employeeDirectory = document.getElementById("employeeDirectory");
let request = new XMLHttpRequest();

request.onreadystatechange = function(event) {
    if (this.readyState === XMLHttpRequest.DONE) {
        let employeesDirectoryHTMLHeading = this.status === 200  ? 'Awesome employee startup directory' : 'No result founded';
        let employeesDirectoryHTML = '<section class="section">';
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
                employeesDirectoryHTML += 
                `<li class="employees-list__item">
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
                    </article>
                </li>`;
                if(i % 4 === 0 ) {
                    employeesDirectoryHTML += '</ul><ul class="employees-list">';
                }
            }
            employeeDirectory.innerHTML = employeesDirectoryHTML;
        }
    }
}
request.open('GET', 'https://randomuser.me/api/?results=12&format=json');
request.send();