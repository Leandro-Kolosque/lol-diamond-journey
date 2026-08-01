// Cores dos selos de partida, seguindo o padrão do op.gg.
// Para adicionar cor a uma nova nota ou tag, é só incluir uma entrada
// nos mapas abaixo — qualquer valor que não estiver mapeado usa o cinza padrão.

interface BadgeColor {
  bg: string;
  text: string;
}

const GRAY: BadgeColor = {
  bg: 'bg-ink-600/10 dark:bg-mist-400/10',
  text: 'text-ink-600 dark:text-mist-400',
};

const NOTA_COLORS: Record<string, BadgeColor> = {
  MVP: { bg: 'bg-[#EB9C00]/15', text: 'text-[#EB9C00]' },
  ACE: { bg: 'bg-[#A855F7]/15', text: 'text-[#A855F7]' },
};

const TAG_COLORS: Record<string, BadgeColor> = {
  imparável: { bg: 'bg-[#00AE0A]/15', text: 'text-[#00AE0A]' },
  unstoppable: { bg: 'bg-[#00AE0A]/15', text: 'text-[#00AE0A]' },
};

export function notaColor(nota: string): BadgeColor {
  return NOTA_COLORS[nota.toUpperCase()] ?? GRAY;
}

export function tagColor(tag: string): BadgeColor {
  return TAG_COLORS[tag.toLowerCase()] ?? GRAY;
}