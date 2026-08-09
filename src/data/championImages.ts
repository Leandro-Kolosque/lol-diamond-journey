// Mapeie o nome do campeão (exatamente como escrito em matches.ts) para a URL
// da imagem que você quer usar no card. Pode ser um link externo ou um arquivo
// que você colocar em `public/champions/` (nesse caso use '/champions/arquivo.jpg').
//
// Campeões sem entrada aqui usam um placeholder gerado automaticamente
// (iniciais do nome sobre um gradiente), então não precisa preencher tudo de uma vez.
export const championImages: Record<string, string> = {
  // Jinx: 'https://exemplo.com/jinx.jpg',
  // Ezreal: '/champions/ezreal.jpg',
  Aphelios: '/champions/aphelios.jpg',
  Ashe: '/champions/ashe.jpg',
  Caitlyn: '/champions/caitlyn.jpg',
  Draven: '/champions/draven.jpg',
  "Kai'Sa": '/champions/kaisa.jpg',
  Karma: '/champions/karma.jpg',
  Sivir: '/champions/sivir.jpg',
  Smolder: '/champions/smolder.jpg',
  Varus: '/champions/varus.jpg',
  "Vel'Koz": '/champions/velkoz.jpg',
  Veigar: '/champions/veigar.jpg',
  Xayah: '/champions/xayah.jpg',
  Xerath: '/champions/xerath.jpg',
  Ziggs: '/champions/ziggs.jpg',
  Zilean: '/champions/zilean.jpg',
};