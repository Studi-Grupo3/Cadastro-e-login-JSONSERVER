const formLogin = document.querySelector('#form-login');

formLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    authenticateUser();
})

const authenticateUser = () => {
    const email = document.querySelector('#ipt_email_login').value;
    const senha = document.querySelector('#ipt_senha_login').value;

    fetch("http://localhost:8080/users")
        .then((response) => response.json())
        .then((users) => {
            const user = users.find(user => user.email === email && user.senha === senha);

            if (user) {
                console.log("Login bem-sucedido!", user);
                localStorage.setItem("user", JSON.stringify(user));
                Swal.fire({
                    icon: "success",
                    title: "Login realizado com sucesso!",
                    timer: 2000,
                    showConfirmButton: false
                })            
            } else {
                Swal.fire({
                    icon: "error",
                    title: "E-mail ou senha incorreto",
                    timer: 2000,
                    showConfirmButton: false
                })
            }
        })
        .catch((error) => {
            console.log("Erro ao fazer login", error);
        });
}
