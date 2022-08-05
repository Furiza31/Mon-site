class AutoGrow extends HTMLTextAreaElement {
    constructor() {
        super();
        this.onFocus = this.onFocus.bind(this);
        this.autoGrow = this.autoGrow.bind(this);
        this.onResize = debounce(this.onResize.bind(this), 300);
    }

    connectedCallback() {
        this.addEventListener("focus", this.onFocus)
        this.addEventListener("input", this.autoGrow);
    }

    onResize () {
        this.autoGrow();
    }

    onFocus() {
        this.autoGrow();
        window.addEventListener("resize", this.onResize);
        this.removeEventListener("focus", this.onFocus);
    }

    autoGrow () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
        window.scrollTo(0, document.body.scrollHeight);
    }

}

customElements.define('textarea-autogrow', AutoGrow, { extends: 'textarea' });
