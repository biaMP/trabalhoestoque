// Inicializa os produtos no LocalStorage caso não existam
let produtos = JSON.parse(localStorage.getItem("produtos"));
const modalAdd = new bootstrap.Modal(document.getElementById('exampleModal'));

if (!produtos) {
    localStorage.setItem("produtos", JSON.stringify([]));
    produtos = [];
}

// Função para renderizar a tabela com os produtos armazenados no LocalStorage
function renderizarTabela() {
    const tabela = document.querySelector("table tbody");
    tabela.innerHTML = ''; // Limpa a tabela antes de re-renderizar
    produtos.forEach((produto) => {
        const linha = `
            <tr>
                <th scope="row">${produto.id}</th>
                <td>${produto.nome}</td>
                <td>${produto.quantidade}</td>
                <td>${produto.descricao}</td>
                <td>
                    <div class="btn btn-warning" onClick ="editarUsuario(${produto.id})">Editar</div>
                    <div class="btn btn-danger" onClick ="apagarUsuario(${produto.id})">Apagar</div>
                </td>
            </tr>
        `
        tabela.innerHTML += linha;
    });
}

function editarUsuario(id) {
    const produto = procurarprodutoById(id)
    var modal = new bootstrap.Modal(document.getElementById('modal_edicao'))
    const nomeeditar = document.getElementById("nome-editar")
    const quantidadeeditar = document.getElementById("quantidade-editar")
    const descricaoeditar = document.getElementById("descricao-editar")

    console.log(produto)
    nomeeditar.value = produto.nome
    quantidadeeditar.value = produto.quantidade
    descricaoeditar.value = produto.descricao
}

function abrirModalAdd() {
    modalAdd.show()
}

// Função de cadastro de produto
document.getElementById("cadastro").addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Obtém os dados dos inputs do formulário
    const nome = document.getElementById("nome-cadastro").value;
    const quantidade = document.getElementById("quantidade-cadastro").value;
    const descricao = document.getElementById("descricao-cadastro").value;

    // Cria o novo produto
    const novoProduto = {
        id: produtos.length ? produtos[produtos.length - 1].id + 1 : 1, // ID auto-incremental
        nome,
        quantidade,
        descricao
    };

    // Adiciona o novo produto ao array de produtos
    produtos.push(novoProduto);
    
    // Armazena os produtos no LocalStorage
    localStorage.setItem("produtos", JSON.stringify(produtos));

    // Re-renderiza a tabela
    renderizarTabela();

    // Fecha o modal após salvar
    modalAdd.hide();

    // Limpa os campos do formulário
    document.getElementById("cadastro").reset();
});

function procurarprodutoById(id) {
    const produtos = JSON.parse(localStorage.getItem("produtos"))
    const found = produtos.find((produto) => {
        return produto.id == id 
    })
    return found
}

// Inicializa a renderização da tabela ao carregar a página
renderizarTabela();
