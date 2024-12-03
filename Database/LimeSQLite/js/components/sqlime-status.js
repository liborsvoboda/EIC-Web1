// SQL query status component
// shows the state of the SQL query execution
class SqlimeStatus extends HTMLElement {
    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }

    render() {
        const el = document.createElement("div");
        this.appendChild(el);
        this.el = el;
    }

    // loading shows the message with a spinner
    loading(message) {
        this.el.className = "";
        this.value = `<span class="sqlime-spinner"></span> ${message}...`;
    }

    // success shows the message and marks is as success
    success(message) {
        this.el.className = "sql-status--success";
        this.value = message;
    }

    // info shows the message without styling it
    info(message) {
        this.el.className = "";
        this.value = message;
    }

    // error shows the message and marks is as error
    error(message) {
        this.el.className = "sql-status--error";
        this.value = message;
    }

    // fadeOut slightly fades out the element.
    fadeOut() {
        this.style.opacity = 0.4;
    }

    // fadeIn fades the element back in.
    fadeIn() {
        setTimeout(() => {
            this.style.opacity = "";
        }, 100);
    }

    get value() {
        return this.el.innerText;
    }
    set value(newValue) {
        this.el.innerHTML = newValue;
    }
}

if (!window.customElements.get("sqlime-status")) {
    window.SqlimeStatus = SqlimeStatus;
    customElements.define("sqlime-status", SqlimeStatus);
}
