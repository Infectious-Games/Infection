module.exports = users => {
  const users2 = Array(3).fill(users, 0);
  return users2.concat.apply([], users2).reverse();
};
