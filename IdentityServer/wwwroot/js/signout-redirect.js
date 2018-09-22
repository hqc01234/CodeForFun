window.addEventListener("load", function () {
    setTimeout(() => {
        const a = document.querySelector("a.PostLogoutRedirectUri");
        if (a) {
            window.location = a.href;
        }
    }, 2000);
});
