document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    login();
});



function login() {
    var valor= document.getElementById("username").value;
    const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
    };

    fetch("http://127.0.0.1:5000/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {

            //generar la cookie
            
            setCookie(valor)
            // Redirect to profile page if login is successful
            return response.json().then(data => {
                window.location.href = "../template/main_page.html";
            });
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}

function setCookie(valor) {

    document.cookie = "appDiscord" + "=" + valor + ";path=/";
  }