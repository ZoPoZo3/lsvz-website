module.exports = [{
  files: ['assets/js/*.js'],
  languageOptions: { ecmaVersion: 2022, sourceType: 'script', globals: Object.fromEntries(['window','document','localStorage','IntersectionObserver','ResizeObserver','requestAnimationFrame','cancelAnimationFrame','setTimeout','clearTimeout','getComputedStyle','CustomEvent','Image','Intl','console'].map(x=>[x,'readonly'])) },
  rules: { 'no-undef':'error', 'no-unreachable':'error', 'no-dupe-args':'error', 'no-dupe-keys':'error', 'no-constant-condition':'error', 'valid-typeof':'error', 'no-unexpected-multiline':'error' }
}];
