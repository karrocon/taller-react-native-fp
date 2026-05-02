import { spacing } from './spacing';
import { CARD_WIDTH } from '../utils/styles';

export const GOLD                    = '#c8a84b';
export const GOLD_DIM                = '#7a5e1e';
export const CARD_BG                 = '#0d1525';

export const GOLD_HEX_FILL           = 'rgba(200,168,75,0.38)';
export const GOLD_HEX_GRID           = 'rgba(200,168,75,0.32)';

export const INNER_BORDER_INSET      = 5;
export const CARD_IMAGE_RATIO        = 0.76;
export const HEXAGON_RATIO           = 0.86;
export const CARD_TYPE_BANNER_PADDING = spacing.sm;
export const CARD_DESC_PADDING_BOTTOM = 28;

export const STAT_PILL_WIDTH  = Math.floor(CARD_WIDTH * 0.09);
export const STAT_PILL_HEIGHT = 48;

export const STAT_COLORS = {
    ataque:          '#b8723a',
    ataqueEspecial:  '#7b5ad9',
    velocidad:       '#c0960a',
    defensa:         '#3a8a4a',
    defensaEspecial: '#3a70c0',
    hp:              '#c03838',
} as const;
