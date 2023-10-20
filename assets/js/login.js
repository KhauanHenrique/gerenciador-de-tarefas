// Função para verificar o login e redirecionar
function verificarEredirecionar() {
    const nomeUsuario = document.getElementById("nomeUsuario").value;
    const senha = document.getElementById("senha").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


    const usuarioEncontrado = usuarios.find(function (usuario) {
        return usuario.nome === nomeUsuario;
    });

    if (usuarioEncontrado) {
        // Verifica se a senha está correta
        if (senha === usuarioEncontrado.senha) {
            // Simulação de um token de autenticação
            const token = Math.random().toString(36).substring(7);

            // Salva o token no LocalStorage
            localStorage.setItem("token", token);

            // Redireciona o usuário para a página principal
            window.location.href = 'website/pagina_inicial.html';
        } else {
            alert("Senha incorreta. Por favor, verifique.");
        }
    } else {
        alert("Nome de usuário não encontrado. Por favor, verifique.");
    }
}