import { getData, action, brand_name, isNext } from "./connectionToServer.js";
import { pagination, next_button, prev_button, pagination_service as pag_s, clearPage, reset, save_options } from "./pagination.js";
import { onDisplayWait, onDisplayReady } from "./display.js";
import '../style/style.css';


const wrapper = document.querySelector(".wrapper");

const filter_brand = document.getElementById("brand");
const btn_find_brand = document.querySelector(".filter-brand");
const filter_price = document.getElementById("input_price");
const btn_find_price = document.querySelector(".filter-price");
const btn_find_name = document.querySelector(".filter-name");
const filter_name = document.getElementById("input_name");
const btn_filter_reset = document.querySelector(".filter-reset");

// Поиск по бренду

btn_find_brand.addEventListener("click", () => {
  if (!pag_s.isProgress){
    pag_s.isProgress = !pag_s.isProgress;
    pag_s.method = action.filter;
    pag_s.param = "brand";
    pag_s.value = filter_brand.value
    reset();
    save_options();
    clearPage(wrapper);
    renderPage(pag_s.method, pag_s.param, pag_s.value, pag_s.start, pag_s.end);
    filter_name.value = "";
    filter_price.value = "";
  };
});

// Поиск по цене

btn_find_price.addEventListener("click", () => {
  if (!pag_s.isProgress) {
    pag_s.isProgress = !pag_s.isProgress;
    pag_s.method = action.filter;
    pag_s.param = "price";
    pag_s.value = Number(filter_price.value);
    reset();
    save_options();
    clearPage(wrapper);
    renderPage(pag_s.method, pag_s.param, pag_s.value, pag_s.start, pag_s.end);
    filter_name.value = "";
    filter_brand.value = "";
  };
});

// Поиск по названию
btn_find_name.addEventListener("click", () => {
  if (!pag_s.isProgress) {
    pag_s.isProgress = !pag_s.isProgress;
    pag_s.method = action.filter;
    pag_s.param = "product";
    pag_s.value = filter_name.value;
    reset();
    save_options();
    clearPage(wrapper);
    renderPage(pag_s.method, pag_s.param, pag_s.value, pag_s.start, pag_s.end);
    filter_price.value = "";
    filter_brand.value = "";
  };
});


//Сброс фильтра

btn_filter_reset.addEventListener("click", () => {
  if (!pag_s.isProgress) {
    pag_s.isProgress = !pag_s.isProgress;
    filter_brand.value = "";
    pag_s.method = action.get_ids;
    pag_s.param = "";
    pag_s.value = "";
    reset();
    save_options();
    filter_price.value = "";
    filter_name.value = "";
    clearPage(wrapper);
    onDisplayWait(wrapper);
    renderPage(pag_s.method, pag_s.param, pag_s.value, pag_s.start, pag_s.end);
  };
});


// Следующая страница

next_button.addEventListener("click", () => {
  pagination("next", wrapper, () => {
    if(pag_s.param === "price") {
      renderPage(pag_s.method, pag_s.param, parseInt(pag_s.value), pag_s.start, pag_s.end);
    } else {
      renderPage(pag_s.method, pag_s.param, pag_s.value, pag_s.start, pag_s.end);
    };
  });
  
});

// Предыдущая страница

prev_button.addEventListener("click", () => {
  pagination("prev", wrapper, () => {
    if(pag_s.param === "price") {
      renderPage(pag_s.method, pag_s.param, parseInt(pag_s.value), pag_s.start, pag_s.end);
    } else {
      renderPage(pag_s.method, pag_s.param, pag_s.value, pag_s.start, pag_s.end);
    };
  });
});

// Первая загрузка

function renderPage(method, p1, v1, start, end) {

  onDisplayWait(wrapper);

  start <= 0 ? prev_button.classList.add("hide") : prev_button.classList.remove("hide");

  getData(method, p1, v1, start, end)
    .then(data => {
      pag_s.isProgress = false;

      if(data.length !== 0){
        wrapper.innerHTML = "";
        onDisplayReady(data, wrapper);
      } else {
        wrapper.innerHTML = "";
        const no_find = document.createElement("li");
        no_find.classList.add("not_found");
        no_find.textContent = "По вашему запросу ничего не нашлось";
        wrapper.appendChild(no_find);
      };

      isNext ? next_button.classList.remove("hide") : next_button.classList.add("hide");
      
      brand_name.forEach(brand => {
        const filter_option = document.createElement("option");
        filter_option.textContent = brand;
        filter_brand.appendChild(filter_option);

      });
    })
    .catch(e => {
      console.log(e.message);
    });
};

if (pag_s.param === "price") {
  renderPage(pag_s.method, pag_s.param, parseInt(pag_s.value), pag_s.start, pag_s.end);
} else {
  renderPage(pag_s.method, pag_s.param, pag_s.value, pag_s.start, pag_s.end);
};

pag_s.param === "price" ? filter_price.value = pag_s.value : filter_price.value = "";
pag_s.param === "product" ? filter_name.value = pag_s.value : filter_name.value = "";

