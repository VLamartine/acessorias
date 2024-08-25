const apiURL = 'api.php?page='; // URL da API PHP
const recordsPerPage = 10;
let currentPage = 1;

const fetchData = (page) => {
    fetch(apiURL + page)
        .then(response => response.json())
        .then(data => {
            const clientBody = document.getElementById('clients');
            clientBody.innerHTML = '';

            data.clients.forEach(client => {
               const row = document.createElement('tr');
               const idTh = document.createElement('th');
               idTh.innerText = `${client.id}`;
               const nameTd = document.createElement('td');
               nameTd.innerText = `${client.name}`;
               const emailTd = document.createElement('td');
               emailTd.innerText = `${client.email}`;
               const phoneTd = document.createElement('td');
               phoneTd.innerText = `${client.phone}`;

               row.append(idTh);
               row.append(nameTd);
               row.append(emailTd);
               row.append(phoneTd);

               clientBody.append(row);
            });
            renderPagination(data.numberPages, page);
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

const renderPagination = (totalPages, page) => {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';
    const pagesShown = [];
    const pagesHTML = [];


    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, page + 2);

    for (let i = startPage; i < endPage + 1; ++i) {
        if (i < 1 || i > totalPages) {
            continue;
        }

        const pageLi = document.createElement('li');
        pageLi.classList.add('page-item');
        if (i === page) {
            pageLi.classList.add('active');
            pageLi.innerHTML = `<span class="page-link" id="currentPage">${page}</span>`;
        } else {
            pageLi.innerHTML = `<a class="page-link" onclick="goToPage(${i})" href="#">${i}</a></li>`
        }
        pagesShown.push(i);
        pagesHTML.push(pageLi);
    }

    if (!pagesShown.includes(1)) {
        const firstPage = document.createElement('li');
        firstPage.classList.add('page-item');
        firstPage.innerHTML = `<a class="page-link" onclick="goToPage(1)" href="#">1</a></li>`
        paginationDiv.append(firstPage);
    }

    pagesHTML.forEach(pageHTML => {
        paginationDiv.append(pageHTML);
    });

    if (!pagesShown.includes(totalPages)) {
        const lastPage = document.createElement('li');
        lastPage.classList.add('page-item');
        lastPage.innerHTML = `<a class="page-link" onclick="goToPage(${totalPages})" href="#">${totalPages}</a></li>`
        paginationDiv.append(lastPage);
    }

}

const goToPage = (page) => {
    currentPage = page;
    fetchData(currentPage);
}
document.addEventListener('DOMContentLoaded', () => {
    fetchData(currentPage);
});