//отрисовка элементов на странице
export class Section {
    constructor({ items, renderer }, containerSelector, api) {
        this._initialArray = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
        this._api = api;
    }

    renderItems() {
        this._initialArray.forEach(item => this._renderer(item));
    }

    addItem(element) {
        this._container.append(element);
    }
}