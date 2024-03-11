import { authRequest } from "./authorization.js";

export const url = "https://api.valantis.store:41000/";
export let brand_name;
export let isNext = true;
let function_running = false;

export const action = {
  "get_ids": "get_ids",
  "get_items": "get_items",
  "get_fields": "get_fields",
  "filter": "filter"
};

export function getOptions(action, p1, v1, p2, v2, p3, v3) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": authRequest()
    }
  };
  const options_body = {
    "action": action
  };
  if (p1) {
    options_body.params = {
      [p1]: v1,
      [p2]: v2,
      [p3]: v3
    };
  };
  options.body = JSON.stringify(options_body);
  return options;
};



export async function getData(action, params_1, value_1, start, end, retries = 5) {

  if (function_running) {
    console.log(`Функция выполняется, подождите завершения`);
    return
  };

  try {
    function_running = true;
    const response_for_id = await fetch(url, getOptions(action, params_1, value_1));

    if (!response_for_id.ok) {
      throw new Error(`Ошибка: ${response_for_id.status}`);
    };

    const unsorted_id = await response_for_id.json();
    const sorted_id = [...new Set(unsorted_id.result)];

    end >= sorted_id.length ? isNext = false : isNext = true;

    const id = sorted_id.slice(start, end)

    const response_for_item = await fetch(url, getOptions("get_items", "ids", id));

    if (!response_for_item.ok) {
      throw new Error(`Ошибка: ${response_for_item.status}`);
    };
    
    const unfiltred_data = await response_for_item.json();
    const filtred_data = unfiltred_data.result.reduce((acc, obj) => {
      const found = acc.find(item => item.id === obj.id);
      if (!found) {
        acc.push(obj);
      };
      return acc;
    }, []);

    const response_for_brand = await fetch(url, getOptions("get_fields", "field", "brand"));
    if (!response_for_brand.ok) {
      throw new Error(`Ошибка: ${response_for_brand.status}`);
    };
    const unfiltred_brand = await response_for_brand.json();
    const filtred_brand = [...new Set(unfiltred_brand.result)];
    brand_name = filtred_brand.filter(item => item !== null);

    function_running = false;
    return filtred_data;
  }

  catch(e) {
    if (retries > 0) {
      console.log(`${e.message}, - повторяю запрос. Осталось попыток: ${retries}`);
      function_running = false;
      return getData(action, params_1, value_1,start, end, retries - 1);
      
    } else {
      console.log(`Превышенно время ожидания от сервера. Обратитесь в поддержку`);
      function_running = true;
    };
  };
};

