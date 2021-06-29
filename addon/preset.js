function config(entry = []) {
  return [...entry, require.resolve('./_preview')];
}

function managerEntries(entry = []) {
  return [...entry, require.resolve('./_manager')];
}

module.exports = {
  config,
  managerEntries,
};
