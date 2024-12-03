function invalidForm() {
    var form = $(this);
    form.addClass("ani-ring");
    setTimeout(function () {
        form.removeClass("ani-ring");
    }, 1000);
}

function validateForm() {
    showPageLoading();
    var def = $.ajax({
        global: false, type: "POST", url: Metro.storage.getItem('BackendServerAddress', null) + "/EasyITCenterAuthentication", dataType: 'json',
        headers: { "Authorization": "Basic " + btoa($("#usernameId").val() + ":" + $("#passwordId").val()) }
    });

    def.fail(function (data) {
        var notify = Metro.notify; notify.setup({ width: 300, timeout: Metro.storage.getItem('NotifyShowTime', null), duration: 500 });
        notify.create("Nesprávné jméno nebo heslo", "Error", { cls: "alert" }); notify.reset();
        hidePageLoading();
    });

    def.done(function (data) {
        AdminLogin(data);
        hidePageLoading();
    });
}