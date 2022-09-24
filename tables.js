// Json data
import doctorsArray from './data/doctors.json' assert { type: 'json' };
// console.log(doctorsArray);

// get elements
const list_element = document.getElementById('doctors_list');
const paginationElement = document.getElementById('page_numbers');

let CURRENT_PAGE = 1;
const PAGE_SIZE = 10;

// Display list
function DisplayList(items, wraper, rows, page) {
    wraper.innerHTML = '';
    page--;

    let loop_start = rows * page;
    let paginatedItems = items.slice(loop_start, loop_start + rows);

    // console.log(paginatedItems);
    for (let i = 0; i < paginatedItems.length; i++) {
        const item = paginatedItems[i];

        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${item['العنوان']}</td>
                            <td>${item['المنطقة']}</td>
                            <td>${item['رقم الهاتف']}</td>
                            <td>${item['اسم الطبيب']}</td>`;

        wraper.appendChild(tr);
    }
}
DisplayList(doctorsArray, list_element, PAGE_SIZE, CURRENT_PAGE);

document.addEventListener('click', function (e) {
    // console.log(e.target.nodeName);
    if (
        e.target.nodeName == 'A' &&
        e.target.classList.contains('clickPageNumber')
    ) {
        CURRENT_PAGE = e.target.textContent;
        DisplayList(doctorsArray, list_element, PAGE_SIZE, CURRENT_PAGE);

        // Remove from other active
        let current_btn = document.querySelector('.page-item a.active');
        current_btn.classList.remove('active');
        // console.log('ggg', current_btn);
        e.target.classList.add('active');
        // console.log(e.target);
    }
});

/*
 

// Extract value from table header.
// ('Book ID', 'Book Name', 'Category' and 'Price')
let col = [];
for (let i = 0; i < doctorsArray.length; i++) {
    for (let key in doctorsArray[i]) {
        if (col.indexOf(key) === -1) {
            col.push(key);
        }
    }
}

// Create table.
const table = document.createElement('table');
table.classList.add(
    'table',
    'table-bordered',
    'align-middle',
    'w-100',
    'text-center'
);
table.setAttribute('id', 'pagination_table');

// Create table header row using the extracted headers above.
let tr = table.insertRow(-1); // table row.

for (let i = 0; i < col.length; i++) {
    let th = document.createElement('th'); // table header.
    th.innerHTML = col[i];
    tr.appendChild(th);
}

// add json data to the table as rows.
for (let i = 0; i < doctorsArray.length; i++) {
    tr = table.insertRow(-1);

    for (let j = 0; j < col.length; j++) {
        let tabCell = tr.insertCell(-1);
        tabCell.innerHTML = doctorsArray[i][col[j]];
    }
}

// Now, add the newly created table with json data, to a container.
const divShowData = document.getElementById('showData');
divShowData.innerHTML = '';
divShowData.appendChild(table);
 */

// Pagination
const nav = document.createElement('nav');
nav.classList.add('align-self-center');
nav.setAttribute('aria-label', 'Page navigation example');

const ul = document.createElement('ul');
ul.classList.add('pagination');

const calculatePagesCount = (pageSize, totalCount) => {
    // we suppose that if we have 0 items we want 1 empty page
    return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
};

// const PAGE_SIZE = 10;
const NUMBER_OF_PAGES = calculatePagesCount(PAGE_SIZE, doctorsArray.length);

// console.log(NUMBER_OF_PAGES);
// console.log(doctorsArray.length);

ul.insertAdjacentHTML(
    'afterbegin',
    `<li class="page-item">
        <a
            class="page-link"
            role="button"
            aria-label="Previous"
            id="button_prev"
        >
            &laquo;
        </a>
    </li>`
);

for (let i = 1; i <= NUMBER_OF_PAGES; i++) {
    const activeClass = i === 1 ? ' active' : '';
    ul.insertAdjacentHTML(
        'beforeend',
        `<li class="page-item">
            <a class="page-link clickPageNumber${activeClass}" role="button">${i}</a>
        </li>`
    );
}

ul.insertAdjacentHTML(
    'beforeend',
    `<li class="page-item">
        <a class="page-link" role="button" aria-label="Next" id="button_next">
            &raquo;
        </a>
    </li>`
);

paginationElement.appendChild(ul);
