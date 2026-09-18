const whatsapp = 'https://wa.me/5583993443315?text=';
const products = [
  { name: 'Quentinha', category: 'quentinhas', price: 'A partir de R$ 20', description: 'Duas opções de carne e acompanhamentos variados.', image: '../quentinhas/quentinha.jpg' },
  { name: 'Bolo no pote', category: 'sobremesas', price: 'R$ 7,00', description: 'Sabores: MARACUJÁ, CHOCOLATE, NINHO COM NUTELLA e 2 AMORES.', image: 'a1f293b6-7e7b-498f-a6d0-e71243b30597.jpeg' },
  { name: 'Coxinha especial', category: 'salgados', price: 'R$ 10,00', description: 'Frango com requeijão ou carne seca.', image: '3db0ee47-e377-4dd5-9fd3-8263ed0e6a7a.jpeg' },
  { name: 'Mini vulcão', category: 'sobremesas', price: 'R$ 15,00', description: 'Massas: branca, chocolate ou cenoura. Coberturas: ninho com Nutella, ninho com Oreo, ninho com morango, chocolate, 2 amores ou Ferrero Rocher.', image: '358c2c0c-e200-4845-813a-d24a7eb2e7f5.jpeg' },
  { name: 'Lasanha bolonhesa', category: 'lanches', price: 'R$ 20,00', description: 'Lasanha bolonhesa de 500g.', image: '845081ca-ec4e-4c5b-baf6-095c70dd90b0.jpeg' },
  { name: 'Batata cheddar e bacon', category: 'lanches', price: 'R$ 20,00', description: 'Batata frita com cheddar e bacon.', image: '8fdbec42-bbb6-4388-aae7-d1c344fc39df.jpeg' },
  { name: 'Combo Lasanha', category: 'combos', price: 'R$ 30,00', description: 'Lasanha, batata frita e refrigerante pequeno.', image: '../foto lasanha combo/0b77d88d-df77-4b92-a1f9-42c769bdb394.jpeg' },
  { name: 'Combo Mini Vulcão', category: 'combos', price: 'R$ 25,00', description: 'Mini vulcão, 15 salgados e refrigerante.', image: '358c2c0c-e200-4845-813a-d24a7eb2e7f5.jpeg' },
  { name: 'Combo Hambúrguer', category: 'combos', price: 'R$ 25,00', description: 'Hambúrguer artesanal, batata e refrigerante.', image: 'dd8ce431-dab2-4510-bd43-248480670b6a.jpeg' }
];
const baseImage = 'fotos/';

function orderUrl(name) {
  return `${whatsapp}${encodeURIComponent(`Olá! Quero pedir: ${name}.`)}`;
}

function isCustomOrder(product) {
  return product.name === 'Quentinha' || product.name === 'Bolo no pote' || product.name === 'Mini vulcão';
}

function productCard(product) {
  const imageSource = product.image.startsWith('http') ? product.image : `${baseImage}${product.image}`;
  const fallback = '';
  const orderAction = isCustomOrder(product)
    ? `<button class="order-link custom-order" type="button" data-product="${product.name}">${product.name === 'Quentinha' ? 'Montar quentinha ↗' : 'Escolher sabor ↗'}</button>`
    : `<a class="order-link" href="${orderUrl(product.name)}" target="_blank" rel="noopener">Pedir ↗</a>`;
  return `<article class="product-card"><img src="${imageSource}" alt="${product.name} da Elohin Lanches"${fallback}><div class="product-info"><span class="price">${product.price}</span><h3>${product.name}</h3><p>${product.description}</p>${orderAction}</div></article>`;
}

function renderProducts(category = 'todos') {
  const visible = products.filter((product) => product.category !== 'combos' && (category === 'todos' || product.category === category));
  document.querySelector('#product-grid').innerHTML = visible.map(productCard).join('');
}

function renderCombos() {
  document.querySelector('#combo-grid').innerHTML = products.filter((product) => product.category === 'combos').map((product) => {
    const imageSource = product.image.startsWith('http') ? product.image : `${baseImage}${product.image}`;
    return `<article class="combo-card"><img src="${imageSource}" alt="${product.name}"><h3>${product.name}</h3><p>${product.description}</p><span class="price">${product.price}</span><a class="order-link" href="${orderUrl(product.name)}" target="_blank" rel="noopener">Pedir ↗</a></article>`;
  }).join('');
}

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.filter.active').classList.remove('active');
    button.classList.add('active');
    renderProducts(button.dataset.category);
  });
});

document.querySelector('.menu-toggle').addEventListener('click', (event) => {
  const nav = document.querySelector('.main-nav');
  const open = nav.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => document.querySelector('.main-nav').classList.remove('open')));

const orderModal = document.querySelector('#order-modal');
const orderForm = document.querySelector('#order-form');
const flavorFields = document.querySelector('#flavor-fields');
const orderProduct = document.querySelector('#order-product');

function openOrderModal(productName) {
  orderProduct.value = productName;
  document.querySelector('#order-title').textContent = `Pedir ${productName}`;
  flavorFields.innerHTML = productName === 'Quentinha'
    ? '<div class="form-grid"><label>Escolha seu feijão<select name="beans" required><option value="">Escolha o feijão</option><option>Feijão preto</option><option>Feijão na farofa</option></select></label><label>Escolha seu arroz<select name="rice" required><option value="">Escolha o arroz</option><option>Arroz refogado</option><option>Arroz branco</option></select></label><label>Escolha seu espaguete<select name="pasta" required><option value="">Escolha o espaguete</option><option>Macarrão espaguete</option></select></label><label>Escolha seu acompanhamento<select name="side" required><option value="">Escolha o acompanhamento</option><option>Batata doce</option><option>Salada</option><option>Farofa</option></select></label><label>Escolha sua proteína 1<select name="protein" required><option value="">Escolha a proteína</option><option>Frango no forno</option><option>Cupim ao molho</option><option>Strogonoff</option><option>Bife acebolado</option><option>Linguiça acebolada</option></select></label><label>Escolha sua proteína 2<select name="protein2" required><option value="">Escolha a proteína</option><option>Frango no forno</option><option>Cupim ao molho</option><option>Strogonoff</option><option>Bife acebolado</option><option>Linguiça acebolada</option></select></label></div>'
    : productName === 'Bolo no pote'
      ? '<label>Sabor do bolo de pote<select name="flavor" required><option value="">Escolha o sabor</option><option>Maracujá</option><option>Chocolate</option><option>Ninho com Nutella</option><option>2 amores</option></select></label>'
      : '<div class="form-grid"><label>Massa<select name="mass" required><option value="">Escolha a massa</option><option>Branca</option><option>Chocolate</option><option>Cenoura</option></select></label><label>Cobertura<select name="topping" required><option value="">Escolha a cobertura</option><option>Ninho com Nutella</option><option>Ninho com Oreo</option><option>Ninho com morango</option><option>Chocolate</option><option>2 amores</option><option>Ferrero Rocher</option></select></label></div>';
  orderModal.classList.add('open');
  orderModal.setAttribute('aria-hidden', 'false');
}

function closeOrderModal() {
  orderModal.classList.remove('open');
  orderModal.setAttribute('aria-hidden', 'true');
  orderForm.reset();
}

document.addEventListener('click', (event) => {
  const orderButton = event.target.closest('.custom-order');
  if (orderButton) openOrderModal(orderButton.dataset.product);
  if (event.target.matches('.modal-close') || event.target === orderModal) closeOrderModal();
});

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(orderForm);
  const product = data.get('product');
  const choices = product === 'Quentinha'
    ? `Feijão: ${data.get('beans')}\nArroz: ${data.get('rice')}\nEspaguete: ${data.get('pasta')}\nAcompanhamento: ${data.get('side')}\nProteína 1: ${data.get('protein')}\nProteína 2: ${data.get('protein2')}`
    : product === 'Bolo no pote'
      ? `Sabor: ${data.get('flavor')}`
      : `Massa: ${data.get('mass')}\nCobertura: ${data.get('topping')}`;
  const message = `Olá! Quero pedir: ${product}.\n${choices}\n\nNome: ${data.get('name')}\nTelefone: ${data.get('phone')}\nEndereço: ${data.get('address')}\nNúmero da casa ou apto: ${data.get('number')}\nPonto de referência: ${data.get('reference')}\nComplemento: ${data.get('complement') || 'Nenhum'}`;
  window.open(`${whatsapp}${encodeURIComponent(message)}`, '_blank', 'noopener');
  closeOrderModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && orderModal.classList.contains('open')) closeOrderModal();
});

renderProducts();
renderCombos();
