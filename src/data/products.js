const getImg = (index) => {
  return '/products/p' + index + '.png';
};

const getGallery = (id) => {
  if (id === 1) {
    return [
      '/products/p1_1.jpeg',
      '/products/p1_2.jpeg',
      '/products/p1_3.jpeg',
      '/products/p1_4.jpeg',
      '/products/p1_5.jpeg',
    ];
  }
  const main = getImg(id);
  return [main, main, main, main];
};

const categories = ['crianca', 'mulher', 'homem'];
const subcategories = ['Sapatilhas', 'Botas', 'Sandálias'];

const products = Array.from({ length: 33 }, (_, i) => {
  const id = i + 1;
  const category = categories[i % 3];
  const availableColors = ['#000000', '#FFFFFF', '#8B4513', '#1C1C1C', '#F5F5DC', '#A52A2A', '#000080'];
  const randomColors = [...availableColors].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);
  let sizes = [];
  if (category === 'crianca') {
    sizes = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  } else {
    sizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
  }
  const productSizes = sizes.filter(() => Math.random() > 0.3);
  const name = category === 'crianca' ? 'Barefoot Kids ' + id : category === 'mulher' ? 'Barefoot Woman ' + id : 'Barefoot Man ' + id;
  return {
    id,
    name,
    category,
    subcategory: subcategories[i % 3],
    price: (30 + Math.random() * 50).toFixed(2),
    image: getImg(id),
    gallery: getGallery(id),
    isNew: i > 25,
    sizes: productSizes.length > 0 ? productSizes : [sizes[0]],
    colors: randomColors,
  };
});

export default products;