/**
 * Toast.js
 * https://github.com/kachurun/toast.js
*/

let wrapper = null;
let instances = [];

let options = {
    type: 'log',
    content: '',
    delay: 3000,
    closeButton: true,
    closeOnIteract: true,
    newerOnTop: false,
    position: 'bottom-right',
    escapeHtml: false,
    preventDuplicates: false,
    preventCloseOnHover: true,
    actionButton: '',

    onCreate: () => {},
    onClick: () => {},
    onAction: () => {},
    onShow: () => {},
    onHide: () => {},
};

const WRAPPER_CLASS   = 'toast-wrapper';
const ITEM_CLASS      = 'toast-item';
const CONTAINER_CLASS = 'toast-container';

class Toast {
    /**
     *Creates an instance of Toast.
        * @param {object} opts
        */
    constructor(opts = {}) {
        // Set opts
        this.opts = Object.assign({}, options, opts);

        // Prevent doublicates
        if (this.opts.preventDuplicates) {
            const doubleInstance = instances.find(instance => instance.opts.content == this.opts.content);

            if (doubleInstance && doubleInstance.isShow) {
                doubleInstance._startHide();
                return doubleInstance;
            }
        }

        // Create toast
        this._create();
        this._bindEvents();
        this.show();

        return this;
    }


    /**
     * @description Create toast element
     * @returns this
     */
    _create() {
        const opts  = this.opts;
        const toast = document.createElement('article');

        toast.className = `${ ITEM_CLASS } ${ ITEM_CLASS }-${ opts.type }`;

        toast.innerHTML = [
            `<div class="${ CONTAINER_CLASS }">`,
            `<div class="${ CONTAINER_CLASS }--content"></div>`,
            opts.actionButton ? `<div class="${ CONTAINER_CLASS }--action"><span>${ opts.actionButton }</span></div>`: '',
            opts.closeButton ? `<div class="${ CONTAINER_CLASS }--close"></div>` : '',
            '</div>'
        ].join('');

        const content      = toast.querySelector(`.${ CONTAINER_CLASS }--content`);
        const actionButton = toast.querySelector(`.${ CONTAINER_CLASS }--action`);
        const closeButton  = toast.querySelector(`.${ CONTAINER_CLASS }--close`);

        // Insert content in toast
        if (opts.content instanceof Node) {
            content.appendChild(opts.content);
        }
        else if (opts.escapeHtml) {
            content.innerText = opts.content;
        }
        else {
            content.innerHTML = opts.content;
        }

        // Define Toast element
        this.toast = toast;

        this.content      = content;
        this.actionButton = actionButton;
        this.closeButton  = closeButton;

        if (typeof opts.onCreate === 'function') {
            opts.onCreate(this);
        }

        return this;
    }


    /**
     * @description Add listeners on toast actions
     */
    _bindEvents() {
        const opts  = this.opts;
        const toast = this.toast;

        // Close on click
        toast.addEventListener('click', (e) => {
            let result;

            if (typeof opts.onClick === 'function') {
                result = opts.onClick(this, e);
            }

            if (result !== false && opts.closeOnIteract) {
                this.hide();
            }
        }, false);

        // Prevent from hide when hovered
        if (opts.preventCloseOnHover) {
            toast.addEventListener('mouseenter', this._stopHide.bind(this), false);
            toast.addEventListener('mouseleave', this._startHide.bind(this), false);
        }

        // Close on close btn
        if (this.closeButton) {
            this.closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                this.hide();
            }, false);
        }

        // Action button
        if (this.actionButton) {
            this.actionButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (typeof opts.onAction === 'function') {
                    opts.onAction(this, e);
                }

                return false;
            }, false);
        }
    }


    /**
     * @description Run timer after that toast will be hidden
     */
    _startHide() {
        const opts = this.opts;

        this._stopHide();

        // Autohide after delay
        if (typeof opts.delay === 'number' && opts.delay > 0) {
            this._hideTimeout = setTimeout(() => {
                this.hide();
            }, opts.delay);
        }
    }


    /**
     * @description Stop timer after that toast will be hidden
     */
    _stopHide() {
        clearTimeout(this._hideTimeout);
    }


    /**
     * @description Show toast
     */
    show() {
        const opts  = this.opts;
        const toast = this.toast;

        this.isShow = true;

        // First show, create empty wrapper
        if (!wrapper || !document.body.contains(wrapper)) {
            wrapper = document.createElement('section');
            wrapper.className = `${ WRAPPER_CLASS } editor-ui`;

            document.body.appendChild(wrapper);
        }

        // Insert in DOM
        if (!wrapper.contains(toast)) {
            wrapper.setAttribute('position', opts.position);

            if (opts.newerOnTop) {
                wrapper.insertBefore(toast, wrapper.firstChild);
            }
            else {
                wrapper.appendChild(toast);
            }
        }

        // Store in instances
        if (instances.indexOf(this) === -1) {
            instances.push(this);
        }

        // Show
        toast.classList.remove(`${ ITEM_CLASS }--hide`);
        toast.classList.add(`${ ITEM_CLASS }--display`);
        toast.offsetWidth; // repaint
        toast.classList.add(`${ ITEM_CLASS }--show`);

        if (typeof opts.onShow === 'function') {
            opts.onShow(this);
        }

        // Hide after timeout
        this._startHide();
    }


    /**
     * @description Hide toast
     */
    hide(force = false) {
        const opts  = this.opts;
        const toast = this.toast;

        const removeToast = () => {
            const index = instances.indexOf(this);

            if (index !== -1) {
                instances.splice(index, 1);
            }

            if (typeof opts.onHide === 'function') {
                opts.onHide(this);
            }

            toast.classList.remove(`${ ITEM_CLASS }--display`);

            if (wrapper.contains(toast)) {
                wrapper.removeChild(toast);
            }
        };

        this.isShow = false;

        // Force remove
        if (force) {
            removeToast();
        }
        // Animate
        else {
            // Remove after animation done
            toast.addEventListener('transitionend', removeToast, false);

            // Fallback (if hasnt transitions on toast)
            setTimeout(() => {
                removeToast();
            }, 1000);

            // Hide
            toast.style.height = `${ toast.offsetHeight }px`;

            requestAnimationFrame(() => {
                toast.classList.remove(`${ ITEM_CLASS }--show`);
                toast.classList.add(`${ ITEM_CLASS }--hide`);
                toast.style.height = '';
            });
        }
    }
}

const notify = (type = 'log', ...args) => {
    let opts;

    if (typeof args[0] === 'object' && !(args[0] instanceof Node)) {
        opts = args[0];
    }
    else {
        opts = Object.assign({
            content: args[0]
        }, args[1]);
    }

    opts.type = type;

    return new Toast(opts);
};

const log = (...args) => {
    return notify('log', ...args);
};

const error = (...args) => {
    return notify('error', ...args);
};

const success = (...args) => {
    return notify('success', ...args);
};

const clear = (force) => {
    instances.forEach(instance => instance.hide(force));
};

// Export
export default {
    get wrapper() {
        return wrapper;
    },

    get instances() {
        return instances;
    },

    get options() {
        return options;
    },

    set options(opts) {
        options = Object.assign(options, opts);
    },

    log,
    error,
    success,
    clear
};
