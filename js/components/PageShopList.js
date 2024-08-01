export class PageShopList {
    constructor(DOM) {
        this.DOM = DOM;

        this.render();
        this.listEvents();
    }

    minus(rowDOM, amountDOM) {
        const idToDecrease = rowDOM.id;
        const localStorageData = localStorage.getItem('itemList');
        const list = JSON.parse(localStorageData)
            .map(item => item.id === idToDecrease
                ? {
                    ...item,
                    amount: item.amount > 0 ? (item.amount - 1) : 0,
                }
                : item);

        localStorage.setItem('itemList', JSON.stringify(list));

        amountDOM.textContent = list.filter(item => item.id === idToDecrease)[0].amount;
    }

    plus(rowDOM, amountDOM) {
        const idToIncrement = rowDOM.id;
        const localStorageData = localStorage.getItem('itemList');
        const list = JSON.parse(localStorageData)
            .map(item => item.id === idToIncrement
                ? {
                    ...item,
                    amount: item.amount + 1,
                }
                : item);

        localStorage.setItem('itemList', JSON.stringify(list));

        amountDOM.textContent = list.filter(item => item.id === idToIncrement)[0].amount;
    }

    delete(rowDOM) {
        const idToRemove = rowDOM.id;
        const localStorageData = localStorage.getItem('itemList');
        const list = JSON.parse(localStorageData).filter(item => item.id !== idToRemove);
        localStorage.setItem('itemList', JSON.stringify(list));
        rowDOM.remove();
    }

    listEvents() {
        const rowsDOM = this.DOM.querySelectorAll('tbody > tr');

        for (const rowDOM of rowsDOM) {
            const buttonsDOM = rowDOM.querySelectorAll('button');
            const amountDOM = rowDOM.querySelector('span');

            buttonsDOM[0].addEventListener('click', () => this.minus(rowDOM, amountDOM));
            buttonsDOM[1].addEventListener('click', () => this.plus(rowDOM, amountDOM));
            buttonsDOM[2].addEventListener('click', () => this.delete(rowDOM));
        }
    }

    render() {
        const data = JSON.parse(localStorage.getItem('itemList'));
        let HTML = '';

        if (data) {
            for (const item of data) {
                HTML += `
                    <tr id="${item.id}">
                        <td>${item.title}</td>
                        <td>
                            <button>-</button>
                            <span>${item.amount}</span>
                            <button>+</button>
                        </td>
                        <td>
                            <button>Delete</button>
                        </td>
                    </tr>`;
            }
        }

        this.DOM.innerHTML = `
            <section class="row">
                <div class="col-12">
                    <h1>Shop list page</h1>
                    <p>Create your shopping list!</p>
                </div>
            </section>
            <section class="row">
                <table class="col-12">
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Amount</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>${HTML}</tbody>
                </table>
            </section>`;
    }
}