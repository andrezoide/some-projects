const cart = document.querySelector('.cart__items');
const noResultClass = '.no-results';

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCartProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__cart__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image, price }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${price}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const sumItemsPrice = () => {
  const cartItems = document.querySelectorAll('.cart__item');
  const cartArr = [...cartItems].map((item) => item.innerText);
  const getProductPrice = cartArr.map((item) => {
    const itemArr = item.split(' | ');
    const price = itemArr[2].replace(/PRICE: \$(?=\d+)/g, '');
    return parseFloat(price);
  });
  const sum = getProductPrice.reduce((acc, curr) => acc + curr, 0);
  return Math.round(sum * 100) / 100;
};

const displayTotal = () => {
  const totalSpan = document.querySelector('.total-price');
  totalSpan.innerText = `${sumItemsPrice()}`;
};

const saveCart = () => {
  const cartItems = document.querySelector('.cart__items');
  saveCartItems(JSON.stringify(cartItems.innerHTML));
};

const cartItemClickListener = (event) => {
  if (event.target.tagName === 'DIV') {
    event.target.remove();
    saveCart();
    displayTotal();
  }
  if (event.target.tagName === 'IMG' || event.target.tagName === 'P') {
    event.target.parentElement.remove();
    saveCart();
    displayTotal();
  }
};

const createCartItemElement = ({ sku, name, salePrice, image }) => {
  const div = document.createElement('div');
  const p = document.createElement('p');
  const pPrice = document.createElement('p');
  const thumbnail = createCartProductImageElement(image);
  pPrice.innerText = `R$ ${salePrice}`;
  pPrice.className = 'item__cart__price';
  div.className = 'cart__item';
  div.appendChild(thumbnail);
  p.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  div.appendChild(p);
  div.appendChild(pPrice);
  div.addEventListener('click', cartItemClickListener);
  return div;
};

const getSavedItems = () => {
  const savedItems = getSavedCartItems();
  if (savedItems === 'undefined') {
    return;
  }
  const items = JSON.parse(savedItems);
  cart.innerHTML = items;
  const [...cartItems] = document.querySelectorAll('.cart__item');
  cartItems.forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });
};

const noResults = () => {
  const noSearchResult = document.createElement('div');
  noSearchResult.className = 'no-results';
  noSearchResult.innerText = 'Nenhum resultado encontrado';
  return noSearchResult;
};

const getProducts = async (productName) => {
  const itemsSection = document.querySelector('.items');
  const loading = document.createElement('div');
  const noResult = document.querySelector(noResultClass);
  loading.className = 'loading';
  loading.innerText = 'carregando...';
  itemsSection.appendChild(loading);
  const { results } = await fetchProducts(productName);
  if (results.length === 0) {
    document.querySelectorAll(noResultClass).forEach((item) => item.remove());
    itemsSection.appendChild(noResults());
  }
  if (noResult !== null && results.length > 0) {
    document.querySelectorAll(noResultClass).forEach((item) => item.remove());
  }
  document.querySelectorAll('.loading').forEach((item) => item.remove());
  results.forEach(({ id: sku, title: name, thumbnail: image, price }) => {
    itemsSection.appendChild(createProductItemElement({ sku, name, image, price }));
  });
};

const addItemToCart = async (item) => {
  const itemId = getSkuFromProductItem(item.target.parentElement);
  const { id: sku, title: name, price: salePrice, thumbnail: image } = await fetchItem(itemId);
  cart.appendChild(createCartItemElement({ sku, name, salePrice, image }));
  saveCart();
  displayTotal();
};

const clearCart = () => {
  const clearBtn = document.querySelector('.empty-cart');

  clearBtn.addEventListener('click', () => {
    cart.innerHTML = '';
    saveCartItems();
    displayTotal();
  });
};

const addEventListeners = async (productName = 'computador') => {
  await getProducts(productName);
  const itemBtn = document.querySelectorAll('.item__add');
  itemBtn.forEach((btn) => {
    btn.addEventListener('click', addItemToCart);
  });
};

const removeItems = () => {
  const items = document.querySelectorAll('.item');
  items.forEach((item) => {
    item.remove();
  });
};

const searchItems = async () => {
  const searchInput = document.querySelector('#search');
  if (searchInput.value.length > 1) {
    removeItems();
    await addEventListeners(searchInput.value);
  }
};

const searchInputListener = () => {
  const searchInput = document.querySelector('#search');
  const searchIcon = document.querySelector('.search-icon');
  searchIcon.addEventListener('click', searchItems);
  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      searchItems();
    }
  });
};

window.onload = async () => {
  await addEventListeners();
  getSavedItems();
  displayTotal();
  clearCart();
  searchItems();
  searchInputListener();
};