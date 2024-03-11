import { pagination_service as pag_s } from "./pagination.js";



export function onDisplayWait(parent) {
  for (let i = 0; i < 50; i++ ) {
    const wrapper__item = document.createElement("li");
    wrapper__item.classList.add('wrapper__item');
    wrapper__item.classList.add("wrapper__item--wait");
    parent.appendChild(wrapper__item);
  };
};

export function onDisplayReady(data, parent) {
  data.forEach(item => {
    const wrapper__item = document.createElement('li');
          wrapper__item.classList.add('wrapper__item');
    
          const id = document.createElement('p');
          id.classList.add("wrapper__item-id");
          id.textContent = `ID: ${item.id}`;
          wrapper__item.appendChild(id);
    
          const name = document.createElement('div');
          name.classList.add("wrapper__item-name");
          name.textContent = item.product;
          wrapper__item.appendChild(name);
    
          const brand = document.createElement('div');
          brand.classList.add("wrapper__item-brand");
          brand.textContent = item.brand ? `Бренд: ${item.brand}` : 'Бренд: не указан';
          wrapper__item.appendChild(brand);
    
          const price = document.createElement('div');
          price.classList.add("wrapper__item-price")
          price.textContent = `Цена: ${item.price}`;
          wrapper__item.appendChild(price);

          const num = document.createElement('div');
          num.classList.add("wrapper__item-num");
          num.textContent = pag_s.count;
          wrapper__item.appendChild(num);
    
          parent.appendChild(wrapper__item);

          pag_s.count++;
  });
};
