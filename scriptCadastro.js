const formSubmit = document.querySelector('#form-cadastro');
const inputCelular = document.querySelector('#ipt_celular');
const inputCpf = document.querySelector('#ipt_cpf');

inputCelular.addEventListener('keyup', () => {
    inputCelular.value = mascararCelular(inputCelular.value);
})

inputCpf.addEventListener('keyup', () => {
    inputCpf.value = mascararCpf(inputCpf.value);
})

function validarCampos(nome, email, celular, cpf, senha, confirmacaoSenha) {
    return nome && email && celular && cpf && senha && confirmacaoSenha;
}

function validarNome(nome) {
    return nome.trim().length >= 2;
}

function validarEmail(email) {
    return email.includes("@");
}


function validarSenha(senha) {
    return senha.length >= 6 && /[A-Z]/.test(senha) && /[a-z]/.test(senha) && /\d/.test(senha);
}

function validarConfirmacaoSenha(senha, confirmacaoSenha) {
    return senha === confirmacaoSenha;
}

function mascararCpf(cpf) {
    return cpf
        .replace(/\D/g, '')
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
        .slice(0, 14);
}

function mascararCelular(telefone) {
    return telefone
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15);
}

const createUser = () => {
    const nome = document.querySelector('#ipt_nome').value.trim();
    const email = document.querySelector('#ipt_email').value.trim();
    const senha = document.querySelector('#ipt_senha').value.trim();
    const confirmacaoSenha = document.querySelector('#ipt_confirmacao_senha').value.trim();
    const cpf = inputCpf.value.trim();
    const celular = inputCelular.value.trim();

    if (!validarCampos(nome, email, cpf, celular, senha, confirmacaoSenha)) {
        Swal.fire({
            icon: "error",
            title: "Todos os campos devem ser preenchidos.",
            timer: 2000,
            showConfirmButton: false
        })
        return;
    }

    if (!validarNome(nome)) {
        Swal.fire({
            icon: "error",
            title: "O nome deve conter pelo menos duas letras.",
            timer: 2000,
            showConfirmButton: false
        })
        return;
    }

    if (!validarEmail(email)) {
        Swal.fire({
            icon: "error",
            title: "O e-mail deve conter arroba (@).",
            timer: 2000,
            showConfirmButton: false
        })
        return;
    }

    if (!validarSenha(senha)) {
        Swal.fire({
            icon: "error",
            title: "A senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, uma minúscula e um número.",
            timer: 2000,
            showConfirmButton: false
        })
        return;
    }

    if (!validarConfirmacaoSenha(senha, confirmacaoSenha)) {
        Swal.fire({
            icon: "error",
            title: "As senhas não coincidem.",
            timer: 2000,
            showConfirmButton: false
        })
        return;
    }
    
    const newUser = { nome, email, celular, cpf, senha }
    
    const formattedUser = JSON.stringify(newUser);

    fetch("http://localhost:8080/users", {
        body: formattedUser,
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
    .then((res) => res.json()) 
    .then((data) => {
        console.log("data", data);  
        Swal.fire({
            icon: "success",
            title: "Cadastro realizado com sucesso!",
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            window.location = "login.html";
        });
    })
    .catch((error) => {
        console.log("error", error);
    });
}

formSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    createUser();
})
