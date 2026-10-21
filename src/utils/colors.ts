export const colorMap: Record<string, string> = {
  // Base & Whites / Neutrals
  "preto": "#1c1c1c",
  "black": "#1c1c1c",
  "branco": "#f9f9f9",
  "white": "#f9f9f9",
  "off-white": "#faf0e6",
  "off white": "#faf0e6",
  "offwhite": "#faf0e6",
  "marfim": "#fffff0",
  "ivory": "#fffff0",
  "cru": "#f5f2eb",
  "natural": "#f5f2eb",
  "nude": "#e3bc9a",
  "areia": "#d7c4a7",
  "sand": "#d7c4a7",
  "bege": "#f5f5dc",
  "beige": "#f5f5dc",

  // Blues / Azuis
  "azul escuro": "#00008b",
  "dark blue": "#00008b",
  "marinho": "#000080",
  "navy": "#000080",
  "azul": "#1a73e8",
  "blue": "#1a73e8",
  "azul claro": "#87ceeb",
  "light blue": "#87ceeb",
  "celeste": "#87ceeb",
  "sky blue": "#87ceeb",
  "azul petróleo": "#1d4e5f",
  "azul petroleo": "#1d4e5f",
  "petróleo": "#1d4e5f",
  "petroleo": "#1d4e5f",
  "turquesa": "#40e0d0",
  "turquoise": "#40e0d0",
  "jeans": "#4682b4",
  "denim": "#1560bd",

  // Greens / Verdes
  "verde seco": "#556b2f",
  "verde oliva": "#556b2f",
  "oliva": "#556b2f",
  "olive": "#556b2f",
  "verde": "#188038",
  "green": "#188038",
  "verde claro": "#90ee90",
  "light green": "#90ee90",
  "verde água": "#a2e8dd",
  "verde agua": "#a2e8dd",
  "menta": "#a2e8dd",
  "mint": "#a2e8dd",
  "esmeralda": "#50c878",
  "emerald": "#50c878",
  "militar": "#4b5320",
  "khaki green": "#556b2f",
  "floresta": "#228b22",
  "forest": "#228b22",

  // Reds, Browns & Earth Tones / Vermelhos, Castanhos e Terrosos
  "vermelho": "#d93025",
  "red": "#d93025",
  "bordeaux": "#800020",
  "bordô": "#800020",
  "bordo": "#800020",
  "vinho": "#6b1d2f",
  "wine": "#6b1d2f",
  "burgundy": "#800020",
  "terracota": "#cc4e32",
  "terracotta": "#cc4e32",
  "tijolo": "#b65239",
  "castanho escuro": "#4a2c11",
  "dark brown": "#4a2c11",
  "castanho claro": "#a52a2a",
  "light brown": "#a52a2a",
  "castanho": "#795548",
  "marrom": "#795548",
  "brown": "#795548",
  "camel": "#c19a6b",
  "câmel": "#c19a6b",
  "caramelo": "#b86b32",
  "caramel": "#b86b32",
  "cognac": "#9a463d",
  "conhaque": "#9a463d",
  "taupe": "#483c32",
  "topo": "#483c32",
  "caqui": "#c3b091",
  "khaki": "#c3b091",
  "kaki": "#c3b091",
  "chocolate": "#3d2314",
  "canela": "#7b3f00",

  // Yellows & Oranges / Amarelos e Laranjas
  "amarelo torrado": "#d49a20",
  "mostarda": "#e1ad01",
  "mustard": "#e1ad01",
  "amarelo": "#f9ab00",
  "yellow": "#f9ab00",
  "amarelo claro": "#ffecb3",
  "laranja": "#f57c00",
  "orange": "#f57c00",
  "coral": "#ff7f50",
  "salmão": "#fa8072",
  "salmon": "#fa8072",
  "pêssego": "#ffdab9",
  "peach": "#ffdab9",

  // Pinks & Purples / Rosas e Roxos
  "rosa seco": "#d4a5a5",
  "rose": "#e8c5c8",
  "rosé": "#e8c5c8",
  "rose gold": "#b76e79",
  "rosa claro": "#ffc0cb",
  "light pink": "#ffc0cb",
  "rosa": "#f06292",
  "pink": "#f06292",
  "fúchsia": "#ff00ff",
  "fuchsia": "#ff00ff",
  "magenta": "#ff00ff",
  "lilás": "#c8a2c8",
  "lilas": "#c8a2c8",
  "lilac": "#c8a2c8",
  "lavanda": "#e6e6fa",
  "lavender": "#e6e6fa",
  "roxo": "#9c27b0",
  "purple": "#9c27b0",
  "violeta": "#ee82ee",
  "violet": "#ee82ee",
  "ameixa": "#dda0dd",
  "plum": "#dda0dd",
  "amora": "#673ab7",

  // Grays & Metallics / Cinzas e Metálicos
  "cinza escuro": "#4a4a4a",
  "dark gray": "#4a4a4a",
  "antracite": "#36454f",
  "anthracite": "#36454f",
  "grafite": "#383838",
  "graphite": "#383838",
  "charcoal": "#36454f",
  "cinzento": "#9e9e9e",
  "cinza": "#9e9e9e",
  "grey": "#9e9e9e",
  "gray": "#9e9e9e",
  "cinza claro": "#d3d3d3",
  "light gray": "#d3d3d3",
  "prateado": "#c0c0c0",
  "silver": "#c0c0c0",
  "dourado": "#ffd700",
  "gold": "#ffd700",
  "bronze": "#cd7f32",
  "cobre": "#b87333",
  "copper": "#b87333",

  // Prints & Special / Padronizados e Especiais
  "leopardo": "#c28b38",
  "leopard": "#c28b38",
  "onça": "#c28b38",
  "animal print": "#c28b38",
  "zebra": "#e0e0e0",
  "multicolor": "#ff9f1c",
  "multicor": "#ff9f1c",
  "variadas": "#ff9f1c",
  "variados": "#ff9f1c"
};

/**
 * Returns a hex color code corresponding to a color name string.
 * Handles hex codes directly, exact matches, and substring/keyword matches.
 */
export const getColorHex = (colorName: string | null | undefined): string => {
  if (!colorName) return '#ddd';
  const trimmed = colorName.trim();
  if (trimmed.startsWith('#')) return trimmed;
  if (trimmed.startsWith('rgb')) return trimmed;

  const lowerVal = trimmed.toLowerCase();

  // 1. Direct exact match
  if (colorMap[lowerVal]) {
    return colorMap[lowerVal];
  }

  // 2. Keyword / Substring match
  for (const [key, color] of Object.entries(colorMap)) {
    if (lowerVal.includes(key)) {
      return color;
    }
  }

  return colorName;
};
