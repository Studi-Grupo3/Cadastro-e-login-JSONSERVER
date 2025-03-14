
const buttonSubmit = document.querySelector('#btn-submit');
const buttonLogin = document.querySelector('#btn-login');

if (buttonSubmit) {
    buttonSubmit.addEventListener("click", (event) => {
        event.preventDefault();
        createUser();
    });
}

if (buttonLogin) {
    buttonLogin.addEventListener("click", (event) => {
        event.preventDefault();
        authenticateUser();
    });
}

const createUser = () => {
    const nome = ipt_nome.value;
    const email = ipt_email.value;
    const celular = ipt_celular.value;
    const cpf = ipt_cpf.value;
    const senha = ipt_senha.value;
    const confirmacaoSenha = ipt_confirmacao_senha.value;
    
    const newUser = { nome, email, celular, cpf, senha }
    
    const formattedUser = JSON.stringify(newUser);

    fetch(
        "http://localhost:8080/users", 
        {
            body: formattedUser,
            method: "POST",
        }
    )
    .then((res) => {
        console.log("res", res);
        Swal.fire({
            icon: "success",
            title: "Cadastro realizado com sucesso!",
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            window.location = "login.html";
            return res.json;
        })    
    })
    .catch((error) => {
        console.log("error", error);
    })
}

const authenticateUser = () => {
    const email = ipt_email.value;
    const senha = ipt_senha.value;

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
                })            }
        })
        .catch((error) => {
            console.log("Erro ao fazer login", error);
        });
}