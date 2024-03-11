export const next_button = document.querySelector(".btn-wrapper__button--next");
export const prev_button = document.querySelector(".btn-wrapper__button--prev");


export const pagination_service = {
  start: Number(sessionStorage.getItem("start")) || 0,
  end: Number(sessionStorage.getItem("end")) || 50,
  count: Number(sessionStorage.getItem("count")) || 1,
  method: sessionStorage.getItem("method") || "get_ids",
  param: sessionStorage.getItem("param") || "",
  value: sessionStorage.getItem("value") || "",
  isProgress: false,
};

export function save_options() {
  Object.keys(pagination_service).forEach(key => {
    sessionStorage.setItem(key, pagination_service[key]);
  });
};

export function pagination(side, parent, callback) {
  if(!pagination_service.isProgress) {

    if(side === 'prev' && pagination_service.start >= 50) {
      pagination_service.isProgress = !pagination_service.isProgress;
      pagination_service.start = Number(sessionStorage.getItem("start")) - 50;
      pagination_service.end = Number(sessionStorage.getItem("end")) - 50;
      pagination_service.count = Number(sessionStorage.getItem("count")) - 50;
      clearPage(parent);
      callback();
      
    };

    if (side === 'next') {
      pagination_service.isProgress = !pagination_service.isProgress;
      pagination_service.start = Number(sessionStorage.getItem("start")) + 50;
      pagination_service.end = Number(sessionStorage.getItem("start")) + 100;
      clearPage(parent);
      callback();
    };
    save_options();
  };
};

export function reset() {
  pagination_service.count = 1;
  pagination_service.end = 50;
  pagination_service.start = 0;
};

export function clearPage(parent) {
  parent.innerHTML = "";
};