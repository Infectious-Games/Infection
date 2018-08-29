module.exports = (users) => {
  let users2 = Array(3).fill(users, 0);
  let merged = users2.concat.apply([], users2).reverse();
  return merged;
};
