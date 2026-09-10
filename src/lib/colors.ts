/**
 * Centralized utility for handling color normalization, hex mappings, and CSS swatches.
 */

// Normalize color names into consistent Title Case (e.g. "azul-marinho" -> "Azul Marinho", "rosa" -> "Rosa")
export const normalizeColorName = (rawName: string): string => {
  if (!rawName) return '';
  const trimmed = rawName.trim();
  if (trimmed.startsWith('#')) return trimmed;

  // Replace hyphens with spaces for clean normalization, e.g. "azul-marinho" -> "azul marinho"
  const cleanStr = trimmed.replace(/-/g, ' ');

  // Standardize capitalization per word
  const normalized = cleanStr
    .toLowerCase()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Fix common plural/singular or alias variations for unified filter list
  const aliasMap: Record<string, string> = {
    "Branco Riscas Azuis": "Branco Risco Azul",
    "Branco Riscas Pretas": "Branco Risco Preto",
    "Modern White": "Off White",
  };

  return aliasMap[normalized] || normalized;
};

export interface ColorStyle {
  background: string;
  isWhite: boolean;
}

// Map of color key substrings to CSS background values (hex, gradient, or pattern)
const COLOR_MAP: Record<string, { bg: string; isWhite?: boolean }> = {
  // Whites & Off-Whites
  "off white": { bg: "#faf0e6", isWhite: true },
  "modern white": { bg: "#faf0e6", isWhite: true },
  "bone": { bg: "#e3dac9", isWhite: true },
  "champagne": { bg: "#eedc9a" },
  "arena": { bg: "#d8c8ab" },
  "sand": { bg: "#d8c8ab" },
  "areia": { bg: "#d8c8ab" },
  "dark beige": { bg: "#b39e82" },
  "bege escuro": { bg: "#b39e82" },
  "bege": { bg: "#e4d5b7" },
  "nude": { bg: "#e8d5c4" },
  "cru": { bg: "#f3e5ab" },
  "maquilhage": { bg: "#e6b8a2" },
  "marfim": { bg: "#fffff0", isWhite: true },
  "ivory": { bg: "#fffff0", isWhite: true },
  "cream": { bg: "#fffdd0", isWhite: true },
  "creme": { bg: "#fffdd0", isWhite: true },
  "branco": { bg: "#ffffff", isWhite: true },

  // Striped & Animal Print Colors (Patterned)
  "branco risco azul": { bg: "repeating-linear-gradient(45deg, #ffffff, #ffffff 4px, #1a73e8 4px, #1a73e8 8px)" },
  "branco riscas azuis": { bg: "repeating-linear-gradient(45deg, #ffffff, #ffffff 4px, #1a73e8 4px, #1a73e8 8px)" },
  "branco risco preto": { bg: "repeating-linear-gradient(45deg, #ffffff, #ffffff 4px, #1c1c1c 4px, #1c1c1c 8px)" },
  "branco riscas pretas": { bg: "repeating-linear-gradient(45deg, #ffffff, #ffffff 4px, #1c1c1c 4px, #1c1c1c 8px)" },
  "branco risco laranja": { bg: "repeating-linear-gradient(45deg, #ffffff, #ffffff 4px, #f57c00 4px, #f57c00 8px)" },
  "cow": { bg: "radial-gradient(circle at 35% 35%, #1c1c1c 32%, transparent 33%), radial-gradient(circle at 75% 75%, #1c1c1c 28%, transparent 29%), #ffffff" },
  "vaca": { bg: "radial-gradient(circle at 35% 35%, #1c1c1c 32%, transparent 33%), radial-gradient(circle at 75% 75%, #1c1c1c 28%, transparent 29%), #ffffff" },

  // Blues
  "azul marinho": { bg: "#000080" },
  "marinho": { bg: "#000080" },
  "navy": { bg: "#000080" },
  "azul escuro": { bg: "#00008b" },
  "oceano": { bg: "#0077b6" },
  "azul petroleo": { bg: "#005f73" },
  "azul petróleo": { bg: "#005f73" },
  "petroleo": { bg: "#005f73" },
  "petróleo": { bg: "#005f73" },
  "turquesa": { bg: "#2ec4b6" },
  "jeans": { bg: "#4682b4" },
  "denim": { bg: "#3b5998" },
  "azul bebe": { bg: "#a0c4ff" },
  "azul bebê": { bg: "#a0c4ff" },
  "azul ceu": { bg: "#87ceeb" },
  "azul céu": { bg: "#87ceeb" },
  "azul": { bg: "#1a73e8" },

  // Greens
  "matcha": { bg: "#84a98c" },
  "verde menta": { bg: "#80ceaa" },
  "menta": { bg: "#80ceaa" },
  "sage": { bg: "#9caf88" },
  "sabio": { bg: "#9caf88" },
  "sábio": { bg: "#9caf88" },
  "dark green": { bg: "#1b4d3e" },
  "verde escuro": { bg: "#1b4d3e" },
  "verde seco": { bg: "#556b2f" },
  "verde oliva": { bg: "#6b8e23" },
  "oliva": { bg: "#6b8e23" },
  "olive": { bg: "#556b2f" },
  "verde": { bg: "#188038" },

  // Yellows, Earths & Browns
  "dijon": { bg: "#c59b27" },
  "mustard": { bg: "#d49a24" },
  "mostaza": { bg: "#d49a24" },
  "mostarda": { bg: "#d49a24" },
  "ocre": { bg: "#c87a29" },
  "amarelo": { bg: "#f9ab00" },
  "cuero": { bg: "#a0522d" },
  "cacau": { bg: "#4e3629" },
  "chocolate": { bg: "#7b3f00" },
  "chocolat": { bg: "#7b3f00" },
  "terra": { bg: "#8d5b4c" },
  "terracota": { bg: "#c86446" },
  "tijolo": { bg: "#b22222" },
  "caramelo": { bg: "#c17838" },
  "camel": { bg: "#c19a6b" },
  "camelo": { bg: "#c19a6b" },
  "cognac": { bg: "#9a463d" },
  "conhaque": { bg: "#9a463d" },
  "taupe": { bg: "#483c32" },
  "tabaco": { bg: "#6d4c41" },
  "tobacco": { bg: "#6d4c41" },
  "tan": { bg: "#d2b48c" },
  "kaky": { bg: "#8b8568" },
  "khaky": { bg: "#8b8568" },
  "kaki": { bg: "#8b8568" },
  "khaki": { bg: "#8b8568" },
  "caqui": { bg: "#8b8568" },
  "kaqui": { bg: "#8b8568" },
  "castanho": { bg: "#795548" },
  "marrom": { bg: "#795548" },

  // Oranges, Pinks & Reds
  "laranja": { bg: "#f57c00" },
  "coral": { bg: "#ff7f50" },
  "peach": { bg: "#ffcba4" },
  "pessego": { bg: "#ffcba4" },
  "pêssego": { bg: "#ffcba4" },
  "salmao": { bg: "#fa8072" },
  "salmão": { bg: "#fa8072" },
  "dark pink": { bg: "#c75270" },
  "rosa escuro": { bg: "#c75270" },
  "rosa velho": { bg: "#c87d89" },
  "rosa claro": { bg: "#ffb6c1" },
  "pink": { bg: "#f06292" },
  "rosa": { bg: "#f06292" },
  "fuchsia": { bg: "#d81b60" },
  "fúchsia": { bg: "#d81b60" },
  "vermelho": { bg: "#d93025" },
  "vinho": { bg: "#800020" },
  "burgundy": { bg: "#800020" },
  "bordeaux": { bg: "#6b1d2f" },
  "bordeus": { bg: "#6b1d2f" },
  "bordo": { bg: "#6b1d2f" },
  "bordô": { bg: "#6b1d2f" },

  // Purples
  "roxo": { bg: "#9c27b0" },
  "lilac": { bg: "#c8a2c8" },
  "lila": { bg: "#c8a2c8" },
  "lilas": { bg: "#c8a2c8" },
  "lilás": { bg: "#c8a2c8" },
  "lavanda": { bg: "#e6e6fa" },

  // Metallics & Gradients / Patterns
  "prateado": { bg: "linear-gradient(135deg, #e0e0e0 0%, #a6a6a6 100%)" },
  "prata": { bg: "linear-gradient(135deg, #e0e0e0 0%, #a6a6a6 100%)" },
  "dourado": { bg: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)" },
  "ouro": { bg: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)" },
  "bronze": { bg: "#cd7f32" },
  "cobre": { bg: "#b87333" },
  "multicor": { bg: "linear-gradient(135deg, #ff595e 0%, #ffca3a 25%, #8ac926 50%, #1982c4 75%, #6a4c93 100%)" },
  "multi": { bg: "linear-gradient(135deg, #ff595e 0%, #ffca3a 25%, #8ac926 50%, #1982c4 75%, #6a4c93 100%)" },
  "xadrez": { bg: "repeating-conic-gradient(#2c3e50 0% 25%, #ffffff 0% 50%) 0 0 / 8px 8px" },

  // Blacks & Grays
  "losfo negro": { bg: "#1c1c1c" },
  "losfo": { bg: "#1c1c1c" },
  "charcoal": { bg: "#36454f" },
  "carvao": { bg: "#36454f" },
  "carvão": { bg: "#36454f" },
  "antracite": { bg: "#293241" },
  "antracita": { bg: "#293241" },
  "grafite": { bg: "#4a4a4a" },
  "graphite": { bg: "#4a4a4a" },
  "cinzento": { bg: "#9e9e9e" },
  "cinza": { bg: "#9e9e9e" },
  "preto": { bg: "#1c1c1c" }
};

export const getColorStyle = (colorName: string): ColorStyle => {
  if (!colorName) return { background: '#ddd', isWhite: false };
  const trimmed = colorName.trim();
  if (trimmed.startsWith('#')) {
    const lower = trimmed.toLowerCase();
    const isWhite = lower === '#ffffff' || lower === '#fff' || lower === '#f9f9f9';
    return { background: trimmed, isWhite };
  }

  const lowerVal = trimmed.replace(/-/g, ' ').toLowerCase();

  // Find longest matching key first to give preference to "azul marinho" over "azul"
  const keys = Object.keys(COLOR_MAP).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    if (lowerVal === key || lowerVal.includes(key)) {
      const config = COLOR_MAP[key];
      return { background: config.bg, isWhite: Boolean(config.isWhite) };
    }
  }

  return { background: trimmed || '#ddd', isWhite: false };
};

export const getColorHex = (colorName: string): string => {
  return getColorStyle(colorName).background;
};
