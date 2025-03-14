
const buttonSubmit = document.querySelector('#btn-submit');
const buttonLogin = document.querySelector('#btn-login');


function validarCampos() {
    var nome = ipt_nome.value.trim();
    var email = ipt_email.value.trim();
    var celular = ipt_celular.value.trim();
    var cpf = ipt_cpf.value.trim();
    var senha = ipt_senha.value.trim();
    var confirmacaoSenha = ipt_confirmacao_senha.value.trim();

    if (!nome || !email || !celular || !cpf || !senha || !confirmacaoSenha) {
        alert("Todos os campos são obrigatórios!");
        return false;
    }
    return true;
}

function validarSenhas(senha, confirmacaoSenha) {
    return senha === confirmacaoSenha;
}

const inputConfirmacaoSenha = document.getElementById('ipt_confirmacao_senha');

if (inputConfirmacaoSenha) {
    inputConfirmacaoSenha.addEventListener('blur', function () {
        var senha = document.getElementById('ipt_senha')?.value || "";
        var confirmacaoSenha = this.value;

        if (!validarSenhas(senha, confirmacaoSenha)) {
            alert("As senhas não coincidem!");
        }
    });
}



function validarNome(nome) {
    return nome.trim().length >= 2;
}

const inputNome = document.getElementById('ipt_nome');

if (inputNome) {
    inputNome.addEventListener('blur', function () {
        if (!validarNome(this.value)) {
            alert("O nome deve ter pelo menos 2 letras.");
        }
    });
}


function validarEmail(email) {
    return email.includes("@");
}

document.getElementById('ipt_email').addEventListener('blur', function () {
    if (!validarEmail(this.value)) {
        alert("O e-mail deve conter '@'.");
    }
});

function validarSenha(senha) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(senha);
}
document.getElementById('ipt_senha').addEventListener('blur', function () {
    if (!validarSenha(this.value)) {
        alert("A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.");
    }
});


function mascararCPF(cpf) {
    return cpf
        .replace(/\D/g, '')
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
        .slice(0, 14);
}

const inputCpf = document.getElementById('ipt_cpf');

if (inputCpf) {
    inputCpf.addEventListener('input', function () {
        this.value = mascararCPF(this.value);
    });
}


function mascararTelefone(telefone) {
    return telefone
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15);
}

const inputCelular = document.getElementById('ipt_celular');

// Verifica se estamos na tela de cadastro antes de adicionar o evento
if (inputCelular) {
    inputCelular.addEventListener('input', function () {
        this.value = mascararTelefone(this.value);
    });
}



if (buttonSubmit) {
    buttonSubmit.addEventListener("click", (event) => {
        event.preventDefault();

        if (validarCampos()){
            createUser()
        }
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
            return res.json();
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