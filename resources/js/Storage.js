class Storage {
  static saveToken (token) {
    localStorage.setItem('accessToken', token);
  }

  // static getToken (id) {
  //   const products = JSON.parse(localStorage.getItem('products'));
  //
  //   return products.find((product) => {
  //     return product.id === id;
  //   });
  // }

  static saveCart (cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  static getToken () {
    return localStorage.getItem('accessToken')
      ? localStorage.getItem('accessToken')
      : '';
  }
}
export default Storage
