export class Select {
  constructor(selector, options) {
    this.selectElem = document.querySelector(`${selector}`);
    this.selectedId = options.selected || -1;

    this.#render(options);
    this.#setup();
    this.select(this.selectedId);
  }

  #render(options) {
    this.selectElem.classList.add("select");

    this.selectElem.insertAdjacentHTML(
      `afterbegin`,
      `
    <div class="select__overlay" data-type="overlay"></div>
    <div class="select__input" data-type="input">
              <span data-type="placeholder">${
                (options && options.text) || "Выберите элемент"
              }</span><i class="fas fa-angle-down" data-type="arrow"></i>
            </div>
            <div class="select__dropdown">
              <ul class="select__list" >
                ${
                  options
                    ? options.list
                        .map(
                          (el) =>
                            `<li class="select__item" data-type="item" data-id="${el.id}">${el.title}</li>`
                        )
                        .join("")
                    : ""
                }
              </ul>
            </div>`
    );
  }

  #setup() {
    this.elements = this.selectElem.querySelectorAll(`[data-id]`);
    this.arrowElem = this.selectElem.querySelector(`[data-type="arrow"]`);
    this.inputElem = this.selectElem.querySelector(`[data-type="input"]`);
    this.spanElem = this.inputElem.querySelector(`[data-type="placeholder"]`);
    this.overlay = this.selectElem.querySelector(`[data-type="overlay"]`);

    this.clickHandler = this.clickHandler.bind(this);
    this.selectElem.addEventListener("click", this.clickHandler);
  }

  open() {
    this.selectElem.classList.add("active");
    this.arrowElem.classList.add("fa-angle-up");
    this.arrowElem.classList.remove("fa-angle-down");
  }

  close() {
    this.selectElem.classList.remove("active");
    this.arrowElem.classList.add("fa-angle-down");
    this.arrowElem.classList.remove("fa-angle-up");
  }

  clickHandler(event) {
    const { type } = event.target.dataset;

    if (type === "input" || type === "arrow" || type === "placeholder") {
      this.toggle();
    } else if (type === "item") {
      this.select(+event.target.dataset.id);
    } else if (type === "overlay") {
      this.close();
    }
  }

  get isOpen() {
    return this.selectElem.classList.contains("active");
  }

  toggle() {
    !this.isOpen ? this.open() : this.close();
  }

  select(id) {
    const currentElement = this.selectElem.querySelector(`[data-id="${id}"]`);

    if (currentElement) {
      this.selectedId = +currentElement.dataset.id;

      this.elements.forEach((el) => {
        el.classList.remove("active");
      });

      currentElement.classList.add("active");
      this.spanElem.textContent = currentElement.textContent;
      this.isOpen ? this.close() : () => {};
    }
  }

  destroy() {
    this.selectElem.removeEventListener("click", this.clickHandler);
    this.selectElem.parentNode.removeChild(this.selectElem);
  }
}
