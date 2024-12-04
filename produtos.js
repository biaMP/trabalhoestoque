const form = document.getElementById('productForm');
const productList = document.getElementById('productList');

// Carregar produtos salvos no localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];

// Função para salvar os produtos no localStorage
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Função para renderizar a lista de produtos
function renderProducts() {
    productList.innerHTML = ''; // Limpar a tabela antes de renderizar
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.description}</td>
      <td>${product.price.toFixed(2)}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Excluir</button>
      </td>
    `;
        productList.appendChild(row);
    });
}

// Função para adicionar ou atualizar um produto
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar recarregar a página

    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = parseFloat(document.getElementById('productPrice').value);

    const editingIndex = form.dataset.editingIndex;

    if (editingIndex !== undefined) {
        // Atualizar produto existente
        products[editingIndex] = { name, description, price };
        delete form.dataset.editingIndex;
        form.querySelector('button[type="submit"]').textContent = 'Cadastrar';
    } else {
        // Adicionar novo produto
        products.push({ name, description, price });
    }

    saveProducts(); // Salvar no localStorage
    form.reset(); // Limpar o formulário
    renderProducts(); // Atualizar a tabela
});

// Função para editar um produto
function editProduct(index) {
    const product = products[index];
    document.getElementById('productName').value = product.name;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productPrice').value = product.price;

    form.dataset.editingIndex = index;
    form.querySelector('button[type="submit"]').textContent = 'Atualizar';
}

// Função para excluir um produto
function deleteProduct(index) {

    Swal.fire({
        title: "Você tem certeza que deseja excluir?",
        text: "Não vai ser possível reverter essa ação!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, deletar!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deletado!",
                text: "Seu produto foi excluído.",
                icon: "success"
            });
            products.splice(index, 1); // Remover o produto
            saveProducts(); // Salvar no localStorage
            renderProducts(); // Atualizar a tabela
        }
    });
}



// Inicializar a página carregando os produtos salvos
renderProducts();
