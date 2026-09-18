const whatsapp = 'https://wa.me/5583993443315?text=';
const products = [
  { name: 'Quentinha', category: 'quentinhas', price: 'A partir de R$ 20', description: 'Duas opções de carne e acompanhamentos variados.', image: '../quentinhas/quentinha.jpg' },
  { name: 'Bolo no pote', category: 'sobremesas', price: 'R$ 5,00', description: 'Sabores: MARACUJÁ, CHOCOLATE, NINHO COM NUTELLA e 2 AMORES.', image: 'a1f293b6-7e7b-498f-a6d0-e71243b30597.jpeg' },
  { name: 'Coxinha especial', category: 'salgados', price: 'R$ 8,00', description: 'Frango com requeijão ou carne seca.', image: '3db0ee47-e377-4dd5-9fd3-8263ed0e6a7a.jpeg' },
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

function productCard(product) {
  const imageSource = product.image.startsWith('http') ? product.image : `${baseImage}${product.image}`;
  const fallback = '';
  return `<article class="product-card"><img src="${imageSource}" alt="${product.name} da Elohin Lanches"${fallback}><div class="product-info"><span class="price">${product.price}</span><h3>${product.name}</h3><p>${product.description}</p><a class="order-link" href="${orderUrl(product.name)}" target="_blank" rel="noopener">Pedir ↗</a></div></article>`;
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
renderProducts();
renderCombos();
