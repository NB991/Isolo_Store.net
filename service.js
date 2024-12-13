document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("recharge");
    const confirmButton = document.querySelector(".confirm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const originalText = confirmButton.textContent;
        confirmButton.innerHTML = `<div style="
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        animation: spin 1s linear infinite;
        margin: 0 auto;
        "></div>`;
        confirmButton.disabled = true;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        fetch("#", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            if (response.ok) {
                showPopup("تم إرسال البيانات بنجاح!", "success");
                form.reset();
            } else {
                throw new Error();
            }
        })
        .catch(() => {
            showPopup("تعذر إرسال البيانات، حاول مرة أخرى لاحقًا", "error");
        })
        .finally(() => {
            confirmButton.innerHTML = originalText;
            confirmButton.disabled = false;
        });
    });

    function showPopup(message, type) {
        const popup = document.createElement("div");
        popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${type === "success" ? "#28a745": "#dc3545"};
        color: #fff;
        border-radius: 8px;
        padding: 15px 25px;
        text-align: center;
        font-size: 16px;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;
        popup.innerText = message;

        document.body.appendChild(popup);

        setTimeout(() => {
            document.body.removeChild(popup);
        }, 3000);
    }
});