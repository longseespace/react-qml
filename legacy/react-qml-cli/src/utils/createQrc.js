function createQrc(compilation) {
  const assets = compilation.assets;
  const files = Object.keys(assets);
  const fileDefinitons = files
    .map(name => `    <file>${name}</file>`)
    .join('\n');
  return `<RCC>
  <qresource prefix="/">
${fileDefinitons}
  </qresource>
</RCC>
`;
}

module.exports = createQrc;
