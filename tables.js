// Json data
async function createTable() {
  const response = await fetch("./data/doctors.json");
  const doctorsArray = await response.json();
  console.log(doctorsArray);

  // get elements
  const list_element = document.getElementById("doctors_list");
  const paginationElement = document.getElementById("page_numbers");

  let CURRENT_PAGE = 1;
  const PAGE_SIZE = 12;

  // Display list
  function DisplayList(items, wraper, rows, page) {
    wraper.innerHTML = "";
    page--;

    let loop_start = rows * page;
    let paginatedItems = items.slice(loop_start, loop_start + rows);

    // console.log(paginatedItems);
    for (let i = 0; i < paginatedItems.length; i++) {
      const item = paginatedItems[i];

      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${item["العنوان"]}</td>
                            <td>${item["المنطقة"]}</td>
                            <td class="d-flex flex-column justify-content-between">${item["رقم الهاتف"]}</td>
                            <td>${item["اسم الطبيب"]}</td>`;

      wraper.appendChild(tr);
    }
  }
  DisplayList(doctorsArray, list_element, PAGE_SIZE, CURRENT_PAGE);

  document.addEventListener("click", function (e) {
    // console.log(e.target.nodeName);
    // console.log(e.target.id);
    if (
      e.target.nodeName == "A" &&
      e.target.classList.contains("clickPageNumber")
    ) {
      CURRENT_PAGE = e.target.textContent;
      DisplayList(doctorsArray, list_element, PAGE_SIZE, CURRENT_PAGE);

      // Remove from other active
      let current_btn = document.querySelector(".page-item a.active");
      current_btn.classList.remove("active");
      // console.log('ggg', current_btn);
      e.target.classList.add("active");
      // console.log(e.target);
    }
    if (e.target.nodeName == "A" && e.target.id === "button_prev") {
      // console.log('prev clicked');
      if (CURRENT_PAGE !== 1) {
        CURRENT_PAGE--;
        DisplayList(doctorsArray, list_element, PAGE_SIZE, CURRENT_PAGE);
        // Remove from other active
        let current_btn = document.querySelector(".page-item a.active");
        current_btn.classList.remove("active");
        // Add to current page
        document.querySelectorAll(".clickPageNumber").forEach((item) => {
          if (item.innerHTML == CURRENT_PAGE) {
            item.classList.add("active");
          }
        });
      }
    }
    if (e.target.nodeName == "A" && e.target.id === "button_next") {
      if (CURRENT_PAGE !== NUMBER_OF_PAGES) {
        CURRENT_PAGE++;
        DisplayList(doctorsArray, list_element, PAGE_SIZE, CURRENT_PAGE);
        // Remove from other active
        let current_btn = document.querySelector(".page-item a.active");
        current_btn.classList.remove("active");
        // Add to current page
        document.querySelectorAll(".clickPageNumber").forEach((item) => {
          if (item.innerHTML == CURRENT_PAGE) {
            item.classList.add("active");
          }
        });
      }
    }
  });

  // Pagination
  const nav = document.createElement("nav");
  nav.classList.add("align-self-center");
  nav.setAttribute("aria-label", "Page navigation example");

  const ul = document.createElement("ul");
  ul.classList.add("pagination");

  const calculatePagesCount = (pageSize, totalCount) => {
    // we suppose that if we have 0 items we want 1 empty page
    return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
  };

  // const PAGE_SIZE = 10;
  const NUMBER_OF_PAGES = calculatePagesCount(PAGE_SIZE, doctorsArray.length);

  // console.log(NUMBER_OF_PAGES);
  // console.log(doctorsArray.length);

  ul.insertAdjacentHTML(
    "afterbegin",
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
    const activeClass = i === 1 ? " active" : "";
    ul.insertAdjacentHTML(
      "beforeend",
      `<li class="page-item">
            <a class="page-link clickPageNumber${activeClass}" role="button">${i}</a>
        </li>`
    );
  }

  ul.insertAdjacentHTML(
    "beforeend",
    `<li class="page-item">
        <a class="page-link" role="button" aria-label="Next" id="button_next">
            &raquo;
        </a>
    </li>`
  );

  paginationElement.appendChild(ul);
}
createTable();
