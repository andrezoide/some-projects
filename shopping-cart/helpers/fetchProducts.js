const fetchProducts = async (productName) => {
  if (!productName) {
    throw new Error('You must provide an url');
  }

  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${productName}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
