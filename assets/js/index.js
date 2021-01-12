(function () {
    function Validator(form) {
        this.form = form;
        this.fields = this.form.querySelectorAll("[required]");
        this.errors = [];
        this.errorsList = this.form.querySelector(".alert__error ol");
        this.successMsg = this.form.querySelector(".alert__success");

        if (!this.fields.length) return;

        this.form.onsubmit = function (e) {
            e.preventDefault();

            let formValid = this.validate();

            if (formValid) {
                this.successMsg.style.display = "block";
                setTimeout(() => {
                    this.successMsg.style.display = "none";
                    this.clearSuccess();
                }, 3000);
                // this.form.submit();
            } else {
                return false;
            }
        }.bind(this);
    }

    Validator.prototype.validate = function () {
        this.clearErrors();
        for (let index = 0; index < this.fields.length; index++) {
            this.validateField(this.fields[index]);
        }

        if (!this.errors.length) {
            return true;
        } else {
            this.showErrors();
            return false;
        }
    };

    Validator.prototype.validateField = function (field) {
        var fieldValid = field.validity.valid;

        if (fieldValid) {
            this.markAsValid(field);
        } else {
            this.errors.push(field.dataset.errorMsg);
            this.markAsInvalid(field);
        }
    };

    Validator.prototype.markAsValid = function (field) {
        field.classList.remove("invalid");
        field.classList.add("valid");
    };

    Validator.prototype.markAsInvalid = function (field) {
        field.classList.remove("valid");
        field.classList.add("invalid");
    };

    Validator.prototype.showErrors = function () {
        var errorsListElement = document.createDocumentFragment();

        for (let index = 0; index < this.errors.length; index++) {
            let listItem = document.createElement("li");

            listItem.textContent = this.errors[index];
            errorsListElement.appendChild(listItem);
        }

        this.errorsList.appendChild(errorsListElement);
        this.errorsList.parentNode.style.display = "block";
    };

    Validator.prototype.clearErrors = function () {
        this.errors.length = 0;
        this.errorsList.parentNode.style.display = "none";
        this.errorsList.innerHTML = "";
    };

    Validator.prototype.clearSuccess = function () {
        for (let index = 0; index < this.fields.length; index++) {
            this.fields[index].value = null;
            this.fields[index].classList.remove("valid");
        }
    };

    const validate = new Validator(document.querySelector(".contact__form"));
})();
