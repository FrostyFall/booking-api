module.exports = ({ page, amount }) => {
  let limit;
  let offset = 0;

  if (!isNaN(amount)) {
    limit = parseInt(amount, 10);
  }

  if (!isNaN(page) && !isNaN(limit)) {
    offset = (parseInt(page, 10) - 1) * limit;
  }

  return { limit, offset };
};
