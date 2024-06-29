export var REG = [
  {
    'address': '$2000',
    'length': '4 bytes. Ends at $2003.',
    'beginsAt': 8192,
    'endsAt': 8195,
    'type': 'MSU-1 Register (Write)',
    'descriptio':
        'MSU_SEEK - Data Seek Port\n   aaaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa\n\n   This register is a little endian 32-bit address. Writing to $2003 triggers the\n   seek within the MSU-1 data file and sets the "data busy" bit on the status\n   port until it completes.'
  },
  {
    'address': '$2000',
    'length': '1 byte',
    'beginsAt': 8192,
    'endsAt': 8192,
    'type': 'MSU-1 Register (Read)',
    'descriptio':
        'MSU_STATUS - Status Port\n   dalp mrrr\n\n   rrr = Revision. Always 001 in the current revision of MSU-1, may be different\n         in a future revision with more features.\n   m = Track missing. Set if, after seeking to a given audio track, that track is\n       unavailable. Allows selectively falling back to SPC700 sound.\n   p = Audio playing\n   l = Audio repeat\n   a = Audio busy\n   d = Data busy'
  },
  {
    'address': '$2001',
    'length': '1 byte',
    'beginsAt': 8193,
    'endsAt': 8193,
    'type': 'MSU-1 Register (Read)',
    'descriptio':
        'MSU_READ - Data Read Port\n   dddddddd\n\n   Reading from this register returns the next byte of data from the MSU-1 data\n   file and increments the stream port\'s address automatically. Reads have no\n   effect if the "data busy" bit is set on the status port.'
  },
  {
    'address': '$2002',
    'length': '6 bytes. Ends at $2007.',
    'beginsAt': 8194,
    'endsAt': 8199,
    'type': 'MSU-1 Register (Read)',
    'descriptio':
        'MSU_ID - Identification\n   iiiiiiii iiiiiiii iiiiiiii iiiiiiii iiiiiiii iiiiiiii\n\n   Reading from this register in order returns the string "S-MSU1" in ASCII. This\n   allows the program to detect availability and as such offer compatibility\n   fallbacks.'
  },
  {
    'address': '$2004',
    'length': '2 bytes. Ends at $2005.',
    'beginsAt': 8196,
    'endsAt': 8197,
    'type': 'MSU-1 Register (Write)',
    'descriptio':
        'MSU_TRACK - Audio Track\n   tttttttt tttttttt\n\n   This register is a little endian 16-bit value. Writing to $2005 triggers a\n   track change and sets the "audio busy" bit on the status port until it\n   completes. The currently playing track is automatically stopped.'
  },
  {
    'address': '$2006',
    'length': '1 byte',
    'beginsAt': 8198,
    'endsAt': 8198,
    'type': 'MSU-1 Register (Write)',
    'descriptio':
        'MSU_VOLUME - Audio Volume\n   vvvvvvvv\n\n   Sets the audio playback volume on a linear scale. A value of 0 is 0%\n   (completely silent), 127 is 50%, and 255 is 100% (full volume).'
  },
  {
    'address': '$2007',
    'length': '1 byte',
    'beginsAt': 8199,
    'endsAt': 8199,
    'type': 'MSU-1 Register (Write)',
    'descriptio':
        'MSU_CONTROL - Audio State Control\n   0000 00rp\n\n   p = Audio playing. If clear, audio playback from the MSU-1 is effectively\n       paused.\n   r = Audio repeat\n   000000 = Unused bits. Must be set to 0 to ensure proper operation.\n\n   Writing to this register has no effect if the "audio busy" bit is set on the\n   status port.'
  },
  {
    'address': '$2100',
    'length': '1 byte',
    'beginsAt': 8448,
    'endsAt': 8448,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wb++++ INIDISP - Screen Display\n   x---bbbb\n\n   x    = Force blank on when set.\n   bbbb = Screen brightness, F=max, 0="off".\n\n   Note that force blank CAN be disabled mid-scanline. However, this can\n   result in glitched graphics on that scanline, as the internal rendering\n   buffers will not have been updated during force blank. Current theory\n   is that BGs will be glitched for a few tiles (depending on how far in\n   advance the PPU operates), and OBJ will be glitched for the entire\n   scanline.\n\n   Also, writing this register on the first line of V-Blank (225 or 240,\n   depending on overscan) when force blank is currently active causes the\n   OAM Address Reset to occur.'
  },
  {
    'address': '$2101',
    'length': '1 byte',
    'beginsAt': 8449,
    'endsAt': 8449,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wb++?- OBSEL - Object Size and Chr Address\n   sssnnbbb\n\n   sss  = Object size:\n       000 =  8x8  and 16x16 sprites\n       001 =  8x8  and 32x32 sprites\n       010 =  8x8  and 64x64 sprites\n       011 = 16x16 and 32x32 sprites\n       100 = 16x16 and 64x64 sprites\n       101 = 32x32 and 64x64 sprites\n       110 = 16x32 and 32x64 sprites (\'undocumented\')\n       111 = 16x32 and 32x32 sprites (\'undocumented\')\n\n   nn   = Name Select\n   bbb  = Name Base Select (Addr>>14)\n       See the section "SPRITES" below for details.'
  },
  {
    'address': '$2102',
    'length': '2 bytes. Ends at $2103.',
    'beginsAt': 8450,
    'endsAt': 8451,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wl++?- OAMADDL - OAM Address low byte\n wh++?- OAMADDH - OAM Address high bit and Obj Priority\n   p------b aaaaaaaa\n\n   p    = Obj Priority activation bit\n       When this bit is set, an Obj other than Sprite 0 may be given\n       priority. See the section "SPRITES" below for details.\n\n   b aaaaaaaa = OAM address\n       This can be thought of in two ways, depending on your conception of\n       OAM. If you consider OAM as a 544-byte table, baaaaaaaa is the word\n       address into that table. If you consider OAM to be a 512-byte table\n       and a 32-byte table, b is the table selector and aaaaaaaa is the\n       word address in the table. See the section "SPRITES" below for\n       details.\n   \n   The internal OAM address is invalidated when scanlines are being\n   rendered. This invalidation is deterministic, but we do not know how\n   it is determined. Thus, the last value written to these registers is\n   reloaded into the internal OAM address at the beginning of V-Blank if\n   that occurs outside of a force-blank period. This is known as \'OAM\n   reset\'. \'OAM reset\' also occurs on certain writes to $2100.\n\n   Writing to either $2102 or $2103 resets the entire internal OAM Address\n   to the values last written to this register. E.g., if you set $104 to\n   this register, write 4 bytes, then write $1 to $2103, the internal OAM\n   address will point to word 4, not word 6.'
  },
  {
    'address': '$2104',
    'length': '1 byte',
    'beginsAt': 8452,
    'endsAt': 8452,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wb++-- OAMDATA - Data for OAM write\n   dddddddd\n\n   Note that OAM writes are done in an odd manner, in particular\n   the low table of OAM is not affected until the high byte of a\n   word is written (however, the high table is affected\n   immediately). Thus, if you set the address, then alternate writes and\n   reads, OAM will never be affected until you reach the high table!\n\n   Similarly, if you set the address to 0, then write 1, 2, read, then\n   write 3, OAM will end up as "01 02 01 03", rather than "01 02 xx 03" as\n   you might expect.\n\n   Technically, this register CAN be written during H-blank (and probably\nmid-scanline as well). However, due to OAM address invalidation, the\n   actual OAM byte written will probably not be what you expect. Note that\n   writing during force-blank will only work as expected if that\n   force-blank was begun during V-Blank, or (probably) if $2102/3 have\n   been reset during that force-blank period.\n\n   See the section "SPRITES" below for details.'
  },
  {
    'address': '$2105',
    'length': '1 byte',
    'beginsAt': 8453,
    'endsAt': 8453,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wb+++- BGMODE - BG Mode and Character Size\n   DCBAemmm\n\n   A/B/C/D = BG character size for BG1/BG2/BG3/BG4\n       If the bit is set, then the BG is made of 16x16 tiles. Otherwise,\n       8x8 tiles are used. However, note that Modes 5 and 6 always use\n       16-pixel wide tiles, and Mode 7 always uses 8x8 tiles. See the\n       section "BACKGROUNDS" below for details.\n\n   mmm  = BG Mode\n   e    = Mode 1 BG3 priority bit\n       Mode     BG depth  OPT  Priorities\n                1 2 3 4        Front -> Back\n       -=-------=-=-=-=----=---============---\n        0       2 2 2 2    n    3AB2ab1CD0cd\n        1       4 4 2      n    3AB2ab1C 0c\n                   * if e set: C3AB2ab1  0c\n        2       4 4        y    3A 2B 1a 0b\n        3       8 4        n    3A 2B 1a 0b\n        4       8 2        y    3A 2B 1a 0b\n        5       4 2        n    3A 2B 1a 0b\n        6       4          y    3A 2  1a 0\n        7       8          n    3  2  1a 0\n        7+EXTBG 8 7        n    3  2B 1a 0b\n\n       "OPT" means "Offset-per-tile mode". For the priorities, numbers\n       mean sprites with that priority. Letters correspond to BGs (A=1,\n       B=2, etc), with upper/lower case indicating tile priority 1/0. See\n       the section "BACKGROUNDS" below for details.\n\n       Mode 7\'s EXTBG mode allows you to enable BG2, which uses the same\n       tilemap and character data as BG1 but interprets bit 7 of the pixel\n       data as a priority bit. BG2 also has some oddness to do with some\n       of the per-BG registers below. See the Mode 7 section under\n       BACKGROUNDS for details.'
  },
  {
    'address': '$2106',
    'length': '1 byte',
    'beginsAt': 8454,
    'endsAt': 8454,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wb+++- MOSAIC - Screen Pixelation\n   xxxxDCBA\n\n   A/B/C/D = Affect BG1/BG2/BG3/BG4\n\n   xxxx = pixel size, 0=1x1, F=16x16\n       The mosaic filter goes over the BG and covers each x-by-x square\n       with the upper-left pixel of that square, with the top of the first\n       row of squares on the \'starting scanline\'. If this register is set\n       during the frame, the \'starting scanline\' is the current scanline,\n       otherwise it is the first visible scanline of the frame. I.e. if\n       even scanlines are completely red and odd scanlines are completely\n       blue, setting the xxxx=1 mid-frame will make the rest of the screen\n       either completely red or completely blue depending on whether you\n       set xxxx on an even or an odd scanline.\n\n       XXX: It seems that writing the same value to this register does not\n       reset the \'starting scanline\', but which changes do reset it?\n\n       Note that mosaic is applied after scrolling, but before any clip\n       windows, color windows, or math. So the XxX block can be partially\n       clipped, and it can be mathed as normal with a non-mosaiced BG. But\n       scrolling can\'t make it partially one color and partially another.\n\n       Modes 5-6 should \'double\' the expansion factor to expand\n       half-pixels. This actually makes xxxx=0 have a visible effect,\n       since the even half-pixels (usually on the subscreen) hide the odd\n       half-pixels. The same thing happens vertically with interlace mode.\n\n       Mode 7, of course, is weird. BG1 mosaics about like normal, as long\n       as you remember that the Mode 7 transformations have no effect on\n       the XxX blocks. BG2 uses bit A to control \'vertical mosaic\' and bit\n       B to control \'horizontal mosaic\', so you could be expanding over\n       1xX, Xx1, or XxX blocks. This can get really interesting as BG1\n       still uses bit A as normal, so you could have the BG1 pixels\n       expanded XxX with high-priority BG2 pixels expanded 1xX on top of\n       them.\n\n   See the section "BACKGROUNDS" below for details.'
  },
  {
    'address': '$2107',
    'length': '4 bytes. Ends at $210A.',
    'beginsAt': 8455,
    'endsAt': 8458,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wb++?- BG1SC - BG1 Tilemap Address and Size\n wb++?- BG2SC - BG2 Tilemap Address and Size\n wb++?- BG3SC - BG3 Tilemap Address and Size\n wb++?- BG4SC - BG4 Tilemap Address and Size\n   aaaaaayx\n\n   aaaaaa = Tilemap address in VRAM (Addr>>10)\n   x    = Tilemap horizontal mirroring\n   y    = Tilemap veritcal mirroring\n       All tilemaps are 32x32 tiles. If x and y are both unset, there is\n       one tilemap at Addr. If x is set, a second tilemap follows the\n       first that should be considered "to the right of" the first. If y\n       is set, a second tilemap follows the first that should be\n       considered "below" the first. If both are set, then a second\n       follows "to the right", then a third "below", and a fourth "below\n       and to the right".\n\n   See the section "BACKGROUNDS" below for more details.'
  },
  {
    'address': '$210B',
    'length': '2 bytes. Ends at $210C.',
    'beginsAt': 8459,
    'endsAt': 8460,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wb++?- BG12NBA - BG1 and 2 Chr Address\n wb++?- BG34NBA - BG3 and 4 Chr Address\n   bbbbaaaa\n\n   aaaa = Base address for BG1/3 (Addr>>13)\n   bbbb = Base address for BG2/4 (Addr>>13)\n       See the section "BACKGROUNDS" below for details.'
  },
  {
    'address': '$210D',
    'length': '4 bytes. Ends at $2110.',
    'beginsAt': 8461,
    'endsAt': 8464,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' ww+++- BG1HOFS - BG1 Horizontal Scroll\n ww+++- M7HOFS  - Mode 7 BG Horizontal Scroll\n ww+++- BG1VOFS - BG1 Vertical Scroll\n ww+++- M7VOFS  - Mode 7 BG Vertical Scroll\n   ------xx xxxxxxxx\n   ---mmmmm mmmmmmmm\n\n   x = The BG offset, 10 bits.\n   m = The Mode 7 BG offset, 13 bits two\'s-complement signed.\n\n   These are actually two registers in one (or would that be "4 registers\n   in 2"?). Anyway, writing $210d will write both BG1HOFS which works\n   exactly like the rest of the BGnxOFS registers below ($210f-$2114), and\n   M7HOFS which works with the M7* registers ($211b-$2120) instead.\n\n   Modes 0-6 use BG1xOFS and ignore M7xOFS, while Mode 7 uses M7xOFS and\n   ignores BG1HOFS. See the appropriate sections below for details, and\n   note the different formulas for BG1HOFS versus M7HOFS.'
  },
  {
    'address': '$210F',
    'length': '6 bytes. Ends at $2114.',
    'beginsAt': 8463,
    'endsAt': 8468,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' ww+++- BG2HOFS - BG2 Horizontal Scroll\n ww+++- BG2VOFS - BG2 Vertical Scroll\n ww+++- BG3HOFS - BG3 Horizontal Scroll\n ww+++- BG3VOFS - BG3 Vertical Scroll\n ww+++- BG4HOFS - BG4 Horizontal Scroll\n ww+++- BG4VOFS - BG4 Vertical Scroll\n   ------xx xxxxxxxx\n\n   Note that these are "write twice" registers, first the low byte is\n   written then the high. Current theory is that writes to the register\n   work like this:\n     BGnHOFS = (Current<<8) | (Prev&~7) | ((Reg>>8)&7);\n     Prev = Current;\n       or\n     BGnVOFS = (Current<<8) | Prev;\n     Prev = Current;\n\n   Note that there is only one Prev shared by all the BGnxOFS registers.\n   This is NOT shared with the M7* registers (not even M7xOFS and\n   BG1xOFS).\n\n   x = The BG offset, at most 10 bits (some modes effectively use as few\n       as 8).\n\n   Note that all BGs wrap if you try to go past their edges. Thus, the\n   maximum offset value in BG Modes 0-6 is 1023, since you have at most 64\n   tiles (if x/y of BGnSC is set) of 16 pixels each (if the appropriate\n   bit of BGMODE is set).\n\n   Horizontal scrolling scrolls in units of full pixels no matter if we\'re\n   rendering a 256-pixel wide screen or a 512-half-pixel wide screen.\n   However, vertical scrolling will move in half-line increments if\n   interlace mode is active.\n\n   See the section "BACKGROUNDS" below for details.'
  },
  {
    'address': '$2115',
    'length': '1 byte',
    'beginsAt': 8469,
    'endsAt': 8469,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wb++?- VMAIN - Video Port Control\n   i---mmii\n\n   i    = Address increment mode:\n           0 => increment after writing $2118/reading $2139\n           1 => increment after writing $2119/reading $213a\n       Note that a word write stores low first, then high. Thus, if you\'re\n       storing a word value to $2118/9, you\'ll probably want to set 1\n       here.\n\n   ii = Address increment amount\n       00 = Normal increment by 1\n       01 = Increment by 32\n       10 = Increment by 128\n       11 = Increment by 128\n   \n   mm = Address remapping\n       00 = No remapping\n       01 = Remap addressing aaaaaaaaBBBccccc => aaaaaaaacccccBBB\n       10 = Remap addressing aaaaaaaBBBcccccc => aaaaaaaccccccBBB\n       11 = Remap addressing aaaaaaBBBccccccc => aaaaaacccccccBBB\n\n       The "remap" modes basically implement address translation. If\n       $2116/7 are set to #$0003, then word address #$0018 will be written\n       instead, and $2116/7 will be incremented to $0004.'
  },
  {
    'address': '$2116',
    'length': '2 bytes. Ends at $2117.',
    'beginsAt': 8470,
    'endsAt': 8471,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wl++?- VMADDL - VRAM Address low byte\n wh++?- VMADDH - VRAM Address high byte\n   aaaaaaaa aaaaaaaa\n\n   This sets the address for $2118/9 and $2139/a. Note that this is a word\n   address, not a byte address!\n\n   See the sections "BACKGROUNDS" and "SPRITES" below for details.'
  },
  {
    'address': '$2118',
    'length': '2 bytes. Ends at $2119.',
    'beginsAt': 8472,
    'endsAt': 8473,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wl++-- VMDATAL - VRAM Data Write low byte\n wh++-- VMDATAH - VRAM Data Write high byte\n   xxxxxxxx xxxxxxxx\n\n   This writes data to VRAM. The writes take effect immediately(?), even\n   if no increment is performed. The address is incremented when one of\n   the two bytes is written; which one depends on the setting of bit 7 of\n   register $2115. Keep in mind the address translation bits of $2115 as\n   well.\n\n   The interaction between these registers and $2139/a is unknown.\n\n   See the sections "BACKGROUNDS" and "SPRITES" below for details.'
  },
  {
    'address': '$211A',
    'length': '1 byte',
    'beginsAt': 8474,
    'endsAt': 8474,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wb++?- M7SEL - Mode 7 Settings\n   rc----yx\n\n   r    = Playing field size: When clear, the playing field is 1024x1024\n       pixels (so the tilemap completely fills it). When set, the playing\n       field is much larger, and the \'empty space\' fill is controlled by\n       bit 6.\n\n   c    = Empty space fill, when bit 7 is set:\n          0 = Transparent.\n          1 = Fill with character 0. Note that the fill is matrix\n              transformed like all other Mode 7 tiles.\n   \n   x/y  = Horizontal/Veritcal mirroring. If the bit is set, flip the\n          256x256 pixel \'screen\' in that direction.\n\n   See the section "BACKGROUNDS" below for details.'
  },
  {
    'address': '$211B',
    'length': '4 bytes. Ends at $211E.',
    'beginsAt': 8475,
    'endsAt': 8478,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' ww+++- M7A - Mode 7 Matrix A (also used with $2134/6)\n ww+++- M7B - Mode 7 Matrix B (also used with $2134/6)\n ww+++- M7C - Mode 7 Matrix C\n ww+++- M7D - Mode 7 Matrix D\n   aaaaaaaa aaaaaaaa\n\n   Note that these are "write twice" registers, first the low byte is\n   written then the high. Current theory is that writes to the register\n   work like this:\n     Reg = (Current<<8) | Prev;\n     Prev = Current;\n   \n   Note that there is only one Prev shared by all these registers. This\n   Prev is NOT shared with the BGnxOFS registers, but it IS shared with\n   the M7xOFS registers.\n\n   These set the matrix parameters for Mode 7. The values are an 8-bit\n   fixed point, i.e. the value should be divided by 256.0 when used in\n   calculations. See below for more explanation.\n\n   The product A*(B>>8) may be read from registers $2134/6. There is\n   supposedly no important delay. It may not be operative during Mode 7\n   rendering.\n\n   See the section "BACKGROUNDS" below for details.'
  },
  {
    'address': '$211F',
    'length': '2 bytes. Ends at $2120.',
    'beginsAt': 8479,
    'endsAt': 8480,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' ww+++- M7X - Mode 7 Center X\n ww+++- M7Y - Mode 7 Center Y\n   ---xxxxx xxxxxxxx\n\n   Note that these are "write twice" registers, like the other M7*\n   registers. See above for the write semantics. The value is 13 bit\n   two\'s-complement signed.\n\n   The matrix transformation formula is:\n\n   [ X ]   [ A B ]   [ SX + M7HOFS - CX ]   [ CX ]\n   [   ] = [     ] * [                  ] + [    ]\n   [ Y ]   [ C D ]   [ SY + M7VOFS - CY ]   [ CY ]\n\n   Note: SX/SY are screen coordinates. X/Y are coordinates in the playing\n   field from which the pixel is taken. If $211a bit 7 is clear, the\n   result is then restricted to 0<=X<=1023 and 0<=Y<=1023. If $211a bits 6\n   and 7 are both set and X or Y is less than 0 or greater than 1023, use\n   the low 3 bits of each to choose the pixel from character 0.\n\n   The bit-accurate formula seems to be something along the lines of:\n     #define CLIP(a) (((a)&0x2000)?((a)|~0x3ff):((a)&0x3ff))\n\n     X[0,y] = ((A*CLIP(HOFS-CX))&~63)\n            + ((B*y)&~63) + ((B*CLIP(VOFS-CY))&~63)\n            + (CX<<8)\n     Y[0,y] = ((C*CLIP(HOFS-CX))&~63)\n            + ((D*y)&~63) + ((D*CLIP(VOFS-CY))&~63)\n            + (CY<<8)\n\n     X[x,y] = X[x-1,y] + A\n     Y[x,y] = Y[x-1,y] + C\n\n   (In all cases, X[] and Y[] are fixed point with 8 bits of fraction)\n\n   See the section "BACKGROUNDS" below for details.'
  },
  {
    'address': '$2121',
    'length': '1 byte',
    'beginsAt': 8481,
    'endsAt': 8481,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wb+++- CGADD - CGRAM Address\n   cccccccc\n\n   This sets the word address (i.e. color) which will be affected by $2122\n   and $213b.'
  },
  {
    'address': '$2122',
    'length': '1 byte',
    'beginsAt': 8482,
    'endsAt': 8482,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' ww+++- CGDATA - CGRAM Data write\n   -bbbbbgg gggrrrrr\n\n   This writes to CGRAM, effectively setting the palette colors.\n   \n   Accesses to CGRAM are handled just like accesses to the low table of\n   OAM, see $2104 for details.\n\n   Note that the color values are stored in BGR order.'
  },
  {
    'address': '$2123',
    'length': '3 bytes. Ends at $2125.',
    'beginsAt': 8483,
    'endsAt': 8485,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wb+++- W12SEL - Window Mask Settings for BG1 and BG2\n wb+++- W34SEL - Window Mask Settings for BG3 and BG4\n wb+++- WOBJSEL - Window Mask Settings for OBJ and Color Window\n   ABCDabcd\n\n   c    = Enable window 1 for BG1/BG3/OBJ\n   a    = Enable window 2 for BG1/BG3/OBJ\n   C/A  = Enable window 1/2 for BG2/BG4/Color\n       When the bit is set, the corresponding window will affect the\n       corresponding background (subject to the settings of $212e/f).\n\n   d    = Window 1 Inversion for BG1/BG3/OBJ\n   b    = Window 2 Inversion for BG1/BG3/OBJ\n   D/B  = Window 1/2 Inversion for BG2/BG4/Color\n       When the bit is set, "W" should be replaced by "~W" (not-W) in the\n       window combination formulae below.\n\n   See the section "WINDOWS" below for more details.'
  },
  {
    'address': '$2126',
    'length': '4 bytes. Ends at $2129.',
    'beginsAt': 8486,
    'endsAt': 8489,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wb+++- WH0 - Window 1 Left Position\n wb+++- WH1 - Window 1 Right Position\n wb+++- WH2 - Window 2 Left Position\n wb+++- WH3 - Window 2 Right Position\n   xxxxxxxx\n\n   These set the offset of the appropriate edge of the appropriate window.\n   Note that if the left edge is greater than the right edge, the window\n   is considered to have no range at all (and thus "W" always is false).\n   See the section "WINDOWS" below for more details.'
  },
  {
    'address': '$212A',
    'length': '1 byte',
    'beginsAt': 8490,
    'endsAt': 8490,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wb+++- WBGLOG - Window mask logic for BGs\n   44332211\n wb+++- WOBJLOG - Window mask logic for OBJs and Color Window\n   ----ccoo\n\n   44/33/22/11/oo/cc = Mask logic for BG1/BG2/BG3/BG4/OBJ/Color\n       This specified the window combination method, using standard\n       boolean operators:\n         00 = OR\n         01 = AND\n         10 = XOR\n         11 = XNOR\n\n       Consider two variables, W1 and W2, which are true for pixels\n       between the appropriate left and right bounds as set in\n       $2126-$2129 and false otherwise. Then, you have the following\n       possibilities: (replace "W#" with "~W#", depending on the Inversion\n       settings of $2123-$2125)\n         Neither window enabled => nothing masked.\n         One window enabled     => Either W1 or W2, as appropriate.\n         Both windows enabled   => W1 op W2, where "op" is as above.\n       Where the function is true, the BG will be masked.\n\n   See the section "WINDOWS" below for more details.'
  },
  {
    'address': '$212C',
    'length': '2 bytes. Ends at $212D.',
    'beginsAt': 8492,
    'endsAt': 8493,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wb+++- TM - Main Screen Designation\n wb+++- TS - Subscreen Designation\n   ---o4321\n\n   1/2/3/4/o = Enable BG1/BG2/BG3/BG4/OBJ for display\n               on the main (or sub) screen.\n\n   See the section "BACKGROUNDS" below for details.'
  },
  {
    'address': '$212E',
    'length': '2 bytes. Ends at $212F.',
    'beginsAt': 8494,
    'endsAt': 8495,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wb+++- TMW - Window Mask Designation for the Main Screen\n wb+++- TSW - Window Mask Designation for the Subscreen\n   ---o4321\n\n   1/2/3/4/o = Enable window masking for BG1/BG2/BG3/BG4/OBJ on the\n               main (or sub) screen.\n\n   See the section "BACKGROUNDS" below for details.'
  },
  {
    'address': '$2130',
    'length': '1 byte',
    'beginsAt': 8496,
    'endsAt': 8496,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wb+++- CGWSEL - Color Addition Select\n   ccmm--sd\n\n   cc = Clip colors to black before math\n       00 => Never\n       01 => Outside Color Window only\n       10 => Inside Color Window only\n       11 => Always\n\n   mm = Prevent color math\n       00 => Never\n       01 => Outside Color Window only\n       10 => Inside Color Window only\n       11 => Always\n\n   s     = Add subscreen (instead of fixed color)\n\n   d     = Direct color mode for 256-color BGs\n\n   See the sections "BACKGROUNDS", "WINDOWS", and "RENDERING THE\n   SCREEN" below for details.'
  },
  {
    'address': '$2131',
    'length': '1 byte',
    'beginsAt': 8497,
    'endsAt': 8497,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wb+++- CGADSUB - Color math designation\n   shbo4321\n\n   s    = Add/subtract select\n       0 => Add the colors\n       1 => Subtract the colors\n\n   h    = Half color math. When set, the result of the color math is\n       divided by 2 (except when $2130 bit 1 is set and the fixed color is\n       used, or when color is cliped).\n\n   4/3/2/1/o/b = Enable color math on BG1/BG2/BG3/BG4/OBJ/Backdrop\n\n   See the sections "BACKGROUNDS", "WINDOWS", and "RENDERING THE\n   SCREEN" below for details.'
  },
  {
    'address': '$2132',
    'length': '1 byte',
    'beginsAt': 8498,
    'endsAt': 8498,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wb+++- COLDATA - Fixed Color Data\n   bgrccccc\n\n   b/g/r = Which color plane(s) to set the intensity for.\n   ccccc = Color intensity.\n\n   So basically, to set an orange you\'d do something along the lines of:\n       LDA #$3f\n       STA $2132\n       LDA #$4f\n       STA $2132\n       LDA #$80\n       STA $2132\n\n   See the sections "BACKGROUNDS" and "WINDOWS" below for details.'
  },
  {
    'address': '$2133',
    'length': '1 byte',
    'beginsAt': 8499,
    'endsAt': 8499,
    'type': 'SNES Register (PPU)',
    'descriptio':
        ' wb+++- SETINI - Screen Mode/Video Select\n   se--poIi\n\n   s    = "External Sync". Used for superimposing "sfx" graphics, whatever\n       that means. Usually 0. Not much is known about this bit.\n       Interestingly, the SPPU chip has a pin named "EXTSYNC" (or\n       not-EXTSYNC, since it has a bar over it) which is tied to Vcc.\n\n   e    = Mode 7 EXTBG ("Extra BG"). When this bit is set, you may enable\n       BG2 on Mode 7. BG2 uses the same tile and character data as BG1,\n       but interprets the high bit of the color data as a priority for the\n       pixel.\n\n       Various sources report additional effects for this bit, possibly\n       related to bit 7. For example, "Enable the Data Supplied From the\n       External Lsi.", whatever that means. Of course, maybe that\'s a\n       typo and it\'s supposed to apply to bit 7 instead.\n\n   p    = Enable pseudo-hires mode. This creates a 512-pixel horizontal\n       resolution by taking pixels from the subscreen for the\n       even-numbered pixels (zero based) and from the main screen for the\n       odd-numbered pixels. Color math behaves just as with Mode 5/6\n       hires. The interlace bit still has no effect. Mosaic operates as\n       normal (not like Mode 5/6). The \'subscreen\' pixel is clipped (by\n       windows) when the main-screen pixel to the LEFT is clipped, not\n       when the one to the RIGHT is clipped as you\'d expect. What happens\n       with pixel column 0 is unknown.\n\n       Enabling this bit in Modes 5 or 6 has no effect.\n\n   o    = Overscan mode. When set, 239 lines will be displayed instead of\n       the normal 224. This also means V-Blank will occur that\n       much later, and be shorter. All that happens is that extra lines\n       get added to the display, and it seems the TV will like to move\n       the display up 8 pixels. See below for more details.\n\n   I    = OBJ Interlace. When set regardless of BG mode, the OBJ will be\n       interlaced (see bit 0 below), and thus will appear half-height.\n\n       Note that this only controls whether obj are drawn as normal or\n       not; the interlace signal is only output to the TV based on bit 0\n       below.\n\n   i    = Screen interlace. When set in BG mode 5 (and probably 6), the\n       effective screen height will be 448 (or 478) pixles, rather than\n       224 (or 239). When set in any other mode, the screen will just get\n       a bit jumpy. However, toggling the tilemap each field would\n       simulate the increased screen height (much like pseudo-hires\n       simulares hires).\n\n       In hardware, setting this bit makes the SNES output a normal\n       interlace signal rather than always forcing one frame.\n\n   See the sections "BACKGROUNDS" and "SPRITES" below for details.\n\n   Overscan: The bit only matters at the very end of the frame, if you\n   change the setting on line 0xE0 before the normal NMI trigger point\n   then it\'s the same as if you had it on all frame. Note that this\n   affects both the NMI trigger point and when HDMA stops for the\n   frame.\n\n   If you turn the bit off at the very beginning of scanline X (for\n   0xE1<=X<=0xF0), NMI will occur on line X and the last HDMA transfer\n   will occur on line X-1. However, on my TV at least, the display will\n   remain in the normal no-overscan position for lines E1-EC, it will\n   move up only one pixel for line ED, and it will lose vertical sync\n   for lines EF-F4!\n\n   Turning the bit on, only line E1 gives any effect: NMI will occur on\n   line E2, although the last HDMA will still occur on line E0.\n   Anything else acts like you left the bit off the whole time. Note,\n   however, that if you wait too long after the beginning of the\n   scanline then you will get no effect.\n\n   Even if there is no visible effect, the overscan setting still\n   affects VRAM writes. In particular, executing "LDA #\'-\' / STA $2118\n   / LDA r2133 / STA $2133 / LDA #\'+\' / STA $2118" during the E1-F0\n   period will write only + or only - to VRAM, depending on whether the\n   overscan bit was set to 0 or 1.'
  },
  {
    'address': '$2134',
    'length': '3 bytes. Ends at $2136.',
    'beginsAt': 8500,
    'endsAt': 8502,
    'type': 'SNES Register (PPU)',
    'descriptio':
        'r l+++? MPYL - Multiplication Result low byte\nr m+++? MPYM - Multiplication Result middle byte\nr h+++? MPYH - Multiplication Result high byte\n   xxxxxxxx xxxxxxxx xxxxxxxx\n\n   This is the 2\'s compliment product of the 16-bit value written to $211b\n   and the 8-bit value most recently written to $211c. There is supposedly\n   no important delay. It may not be operative during Mode 7 rendering.'
  },
  {
    'address': '$2137',
    'length': '1 byte',
    'beginsAt': 8503,
    'endsAt': 8503,
    'type': 'SNES Register (PPU)',
    'descriptio':
        '  b++++ SLHV - Software Latch for H/V Counter\n   --------\n\n   When read, the H/V counter (as read from $213c and $213d) will be\n   latched to the current X and Y position if bit 7 of $4201 is set. The\n   data actually read is open bus.'
  },
  {
    'address': '$2138',
    'length': '1 byte',
    'beginsAt': 8504,
    'endsAt': 8504,
    'type': 'SNES Register (PPU)',
    'descriptio':
        'r w++?- OAMDATAREAD* - Data for OAM read\n   xxxxxxxx\n\n   OAM reads are straightforward: the current byte as set in $2102/3 and\n   incremented by reads from this register and writes to $2104 will be\n   returned. Note that writes to the lower table are not affected so\n   logically. See register $2104 and the section "SPRITES" below for\n   details.\n\n   Also, note that OAM address invalidation probably affects the address\n   read by this register as well.'
  },
  {
    'address': '$2139',
    'length': '2 bytes. Ends at $213A.',
    'beginsAt': 8505,
    'endsAt': 8506,
    'type': 'SNES Register (PPU)',
    'descriptio':
        'r l++?- VMDATALREAD* - VRAM Data Read low byte\nr h++?- VMDATAHREAD* - VRAM Data Read high byte\n   xxxxxxxx xxxxxxxx\n\n   Simply, this reads data from VRAM. The address is incremented when\n   either $2139 or $213a is read, depending on the setting of bit 7 of\n   $2115.\n\n   Actually, the reading is more complex. When either of these registers\n   is read, the appropriate byte from a word-sized buffer is returned. A\n   word from VRAM is loaded into this buffer just *before* the VRAM\n   address is incremented. The actual data read and the amount of the\n   increment depend on the low 4 bits of $2115. The effect of this is\n   that a \'dummy read\' is required after setting $2116-7 before you start\n   getting the actual data.\n\n   The interaction between these registers and $2118/9 is unknown.\n\n   See the sections "BACKGROUNDS" and "SPRITES" below for details.'
  },
  {
    'address': '$213B',
    'length': '1 byte',
    'beginsAt': 8507,
    'endsAt': 8507,
    'type': 'SNES Register (PPU)',
    'descriptio':
        'r w++?- CGDATAREAD* - CGRAM Data read\n   -bbbbbgg gggrrrrr\n\n   This reads from CGRAM.\n\n   Accesses to CGRAM are handled just like accesses to the low table of\n   OAM, see $2138 for details.\n\n   Note that the color values are stored in BGR order. The \'-\' bit is PPU2\n   Open Bus.'
  },
  {
    'address': '$213C',
    'length': '2 bytes. Ends at $213D.',
    'beginsAt': 8508,
    'endsAt': 8509,
    'type': 'SNES Register (PPU)',
    'descriptio':
        'r w++++ OPHCT - Horizontal Scanline Location\nr w++++ OPVCT - Vertical Scanline Location\n   -------x xxxxxxxx\n\n   These values are latched by reading $2137 when bit 7 of $4201 is set,\n   or by clearing-and-setting bit 7 of $4201 either by writing $4201 or by\n   pin 6 of Controller Port 2 (the latch occurs on the 1->0 transition).\n\n   Note that the value read is only 9 bits: bits 1-7 of the high byte are\n   PPU2 Open Bus. Each register keeps seperate track of whether to\n   return the low or high byte. The high/low selector is reset to \'low\'\n   when $213f is read (the selector is NOT reset when the counter is\n   latched).\n\n   H Counter values range from 0 to 339, with 22-277 being visible on the\n   screen. V Counter values range from 0 to 261 in NTSC mode (262 is\n   possible every other frame when interlace is active) and 0 to 311 in\n   PAL mode (312 in interlace?), with 1-224 (or 1-239(?) if overscan is\n   enabled) visible on the screen.'
  },
  {
    'address': '$213E',
    'length': '1 byte',
    'beginsAt': 8510,
    'endsAt': 8510,
    'type': 'SNES Register (PPU)',
    'descriptio':
        'r b++++ STAT77 - PPU Status Flag and Version\n   trm-vvvv\n\n   t    = Time Over Flag. If more than 34 sprite-tiles (e.g. a 16x16\n       sprite has 2 sprite-tiles) were encountered on a single line, this\n       flag will be set. The flag is reset at the end of V-Blank. See the\n       section "SPRITES" below for details.\n\n   r    = Range Over Flag. If more than 32 sprites were encountered on a\n       single line, this flag will be set. The flag is reset at the end of\n       V-Blank. See the section "SPRITES" below for details.\n\n       Note that the above two flags are set whether or not OBJ are\n       actually enabled at the time.\n\n   m    = "Master/slave mode select". Little is known about this bit.\n       Current theory is that it indicates the status of the "MASTER" pin\n       on the S-PPU chip, which in the normal SNES is always Gnd. We\n       always seem to read back 0 here.\n\n   vvvv = 5c77 chip version number. So far, we\'ve only encountered version\n       1.\n\n   The \'-\' bit is PPU Open Bus.'
  },
  {
    'address': '$213F',
    'length': '1 byte',
    'beginsAt': 8511,
    'endsAt': 8511,
    'type': 'SNES Register (PPU)',
    'descriptio':
        'r b++++ STAT78 - PPU Status Flag and Version\n   fl-pvvvv\n\n   f    = Interlace Field. This will toggle every V-Blank.\n\n   l    = External latch flag. When the PPU counters are latched, this\n       flag gets set. The flag is reset on read, but only when $4201 bit 7\n       is set. \n\n   p    = NTSC/Pal Mode. If this is a PAL SNES, this bit will be set,\n       otherwise it will be clear.\n\n   vvvv = 5C78 chip version number. So far, we\'ve encountered at least 2\n       and 3. Possibly 1 as well.\n\n   The \'-\' bit is PPU2 Open Bus.\n\n   Note: as a side effect of reading this register, the high/low byte\n   selector for $213c/d is reset to \'low\'.'
  },
  {
    'address': '$2140',
    'length': '4 bytes. Ends at $2143.',
    'beginsAt': 8512,
    'endsAt': 8515,
    'type': 'SNES Register (APU)',
    'descriptio':
        'rwb++++ APUIO0 - APU I/O register 0\nrwb++++ APUIO1 - APU I/O register 1\nrwb++++ APUIO2 - APU I/O register 2\nrwb++++ APUIO3 - APU I/O register 3\n   xxxxxxxx\n\n   These registers are used in communication with the SPC700. Note that\n   the value written here is not the value read back. Rather, the value\n   written shows up in the SPC700\'s registers $f4-7, and the values\n   written to those registers by the SPC700 are what you read here.\n\n   If the SPC700 writes the register during a read, the value read will\n   be the logical OR of the old and new values. The exact cycles during\n   which the \'read\' actually occurs is not known, although a good guess\n   would be some portion of the final 3 master cycles of the 6-cycle\n   memory access.\n   \n   Note that these registers are mirrored throughout the range\n   $2140-$217f.'
  },
  {
    'address': '$2180',
    'length': '1 byte',
    'beginsAt': 8576,
    'endsAt': 8576,
    'type': 'SNES Register (Hardware)',
    'descriptio':
        'rwb++++ WMDATA - WRAM Data read/write\n   xxxxxxxx\n\n   This register reads to or writes from the WRAM address set in $2181-3.\n   The address is then incremented. The effect of mixed reads and writes\n   is unknown, but it is suspected that they are handled logically.\n\n   Note that attempting a DMA from WRAM to this register will not work,\n   WRAM will not be written. Attempting a DMA from this register to\n   WRAM will similarly not work, the value written is (initially) the Open\n   Bus value. In either case, the address in $2181-3 is not incremented.'
  },
  {
    'address': '$2181',
    'length': '3 bytes. Ends at $2183.',
    'beginsAt': 8577,
    'endsAt': 8579,
    'type': 'SNES Register (Hardware)',
    'descriptio':
        ' wl++++ WMADDL - WRAM Address low byte\n wm++++ WMADDM - WRAM Address middle byte\n wh++++ WMADDH - WRAM Address high bit\n   -------x xxxxxxxx xxxxxxxx\n\n   This is the address that will be read or written by accesses to $2180.\n   Note that WRAM is also mapped in the SNES memory space from $7E:0000 to\n   $7F:FFFF, and from $0000 to $1FFF in banks $00 through $3F and $80\n   through $BF.\n\n   Verious docs indicate that these registers may be read as well as\n   written. However, they are wrong. These registers are open bus.\n\n   DMA from WRAM to these registers has no effect. Otherwise, however, DMA\n   writes them as normal. This means you could use DMA mode 4 to $2180 and\n   a table in ROM to write any sequence of RAM addresses.\n\n   The value does not wrap at page boundaries on increment.'
  },
  {
    'address': '$2200',
    'length': '1 byte',
    'beginsAt': 8704,
    'endsAt': 8704,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'CPU Control ($20, w, x)\n   IRrNmmmm\n\n   I = Enable SA-1 IRQ\n   R = SA-1 Ready\n       0 = Ready\n       1 = Wait\n   r = SA-1 Reset\n       0 = Cancel\n       1 = Reset\n   N = Enable SA-1 NMI\n   mmmm = Messages from SNES CPU'
  },
  {
    'address': '$2201',
    'length': '1 byte',
    'beginsAt': 8705,
    'endsAt': 8705,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'Super Nintendo CPU INT Enable ($00, w, x)\n   I-C----\n\n   I = Enable IRQ from SA-1\n   C = Enable Character Conversion DMA IRQ'
  },
  {
    'address': '$2202',
    'length': '1 byte',
    'beginsAt': 8706,
    'endsAt': 8706,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'Super Nintendo CPU INT Clear ($00, w, x)\n   I-C----\n\n   I = Clear IRQ from SA-1\n       0 = No Change\n       1 = Change\n   C = Clear Character Conversion DMA IRQ\n       0 = No Change\n       1 = Clear'
  },
  {
    'address': '$2203',
    'length': '2 bytes. Ends at $2204.',
    'beginsAt': 8707,
    'endsAt': 8708,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'SA-1 CPU Reset Vector ($xxxx, w, x)\n   aaaaaaaa aaaaaaaa\n\n   a = SA-1 reset vector address (in bank $00)'
  },
  {
    'address': '$2205',
    'length': '2 bytes. Ends at $2206.',
    'beginsAt': 8709,
    'endsAt': 8710,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'SA-1 CPU NMI Vector ($xxxx, w, x)\n   aaaaaaaa aaaaaaaa\n\n   a = SA-1 NMI vector address (in bank $00)'
  },
  {
    'address': '$2207',
    'length': '2 bytes. Ends at $2208.',
    'beginsAt': 8711,
    'endsAt': 8712,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'SA-1 CPU IRQ Vector ($xxxx, w, x)\n   aaaaaaaa aaaaaaaa\n\n   a = SA-1 IRQ vector address (in bank $00)'
  },
  {
    'address': '$2209',
    'length': '1 byte',
    'beginsAt': 8713,
    'endsAt': 8713,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'Super Nintendo CPU Control ($00, W, x)\n   IS-Nmmmm\n\n   I = Enable SNES IRQ\n   S = IRQ vector select\n       0 = ROM\n       1 = SNES IRQ register ($220E)\n   N = NMI vector select\n       0 = ROM\n       1 = SNES NMI register ($220C)\n   mmmm = Message from SA-1'
  },
  {
    'address': '$220A',
    'length': '1 byte',
    'beginsAt': 8714,
    'endsAt': 8714,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'SA-1 CPU INT Enable ($00, W, x)\n   ITDN----\n\n   I = Switch IRQ control from SNES to SA-1\n   T = Switch IRQ control from timer to SA-1\n   D = Switch IRQ control to SA-1 after SA-1 DMA\n   N = Switch NMI control from SNES to SA-1'
  },
  {
    'address': '$220B',
    'length': '1 byte',
    'beginsAt': 8715,
    'endsAt': 8715,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'SA-1 CPU INT Clear ($00, W, x)\n   ITDN----\n\n   I = Switch IRQ clear from SNES to SA-1\n   T = Switch IRQ clear from timer to SA-1\n   D = Switch IRQ clear to SA-1 after SA-1 DMA\n   N = Switch NMI clear from SNES to SA-1'
  },
  {
    'address': '$220C',
    'length': '2 bytes. Ends at $220D.',
    'beginsAt': 8716,
    'endsAt': 8717,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'Super Nintendo CPU NMI Vector ($xxxx, w, x)\n   aaaaaaaa aaaaaaaa\n\n   a = SNES NMI vector address (in bank $00)'
  },
  {
    'address': '$220E',
    'length': '2 bytes. Ends at $220F.',
    'beginsAt': 8718,
    'endsAt': 8719,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'Super Nintendo CPU IRQ Vector ($xxxx, w, x)\n   aaaaaaaa aaaaaaaa\n\n   a = SNES IRQ vector address (in bank $00)'
  },
  {
    'address': '$2210',
    'length': '1 byte',
    'beginsAt': 8720,
    'endsAt': 8720,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'H/V Timer Control ($00, W, x)\n   T-----VH\n\n   T = Timer type\n       0 = HV Timer\n       1 = Linear timer\n   V = Vertical count enable\n   H = Horizontal count enable'
  },
  {
    'address': '$2211',
    'length': '1 byte',
    'beginsAt': 8721,
    'endsAt': 8721,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'SA-1 CPU Timer Restart ($xx, W, x)\n   --------\n\n   Simply writing to this register restarts the timer to zero.'
  },
  {
    'address': '$2212',
    'length': '2 bytes. Ends at $2213.',
    'beginsAt': 8722,
    'endsAt': 8723,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'Set H-Count ($xxxx, W, x)\n   -------H HHHHHHHH\n\n   In HV mode values are 0 to 340.\n   In linear mode values are 0 to 511 (lower 9 bits).'
  },
  {
    'address': '$2212',
    'length': '2 bytes. Ends at $2213.',
    'beginsAt': 8722,
    'endsAt': 8723,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'Set V-Count ($xxxx, W, x)\n   -------V VVVVVVVV\n\n   In HV mode values are 0 to 261 (NTSC) or 0 to 311 (PAL).\n   In linear mode values are 0 to 511 (upper 9 bits).'
  },
  {
    'address': '$2220',
    'length': '1 byte',
    'beginsAt': 8736,
    'endsAt': 8736,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'Set Super MMC Bank C ($00, w, x)\n   B----AAA\n\n   B = Bank CX projection\n       1 = Bank data\n       0 = Game Pak ROM area\n   AAA = ROM area select\n\n   When B is set, accessing an address in $00-1F:8000-FFFF will return (AAA << 20) | (addr & 0x0F7FFF).\n   If B is not set accessing an address in $00-1F:8000-FFFF will return (addr & 0x0F7FFF).\n   $C0-$CF:0000-FFFF will always return (AAA << 20) | (addr & 0x0FFFFF).'
  },
  {
    'address': '$2221',
    'length': '1 byte',
    'beginsAt': 8737,
    'endsAt': 8737,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'Set Super MMC Bank D ($01, w, x)\n   B----AAA\n\n   B = Bank DX projection\n       1 = Bank data\n       0 = Game Pak ROM area\n   AAA = ROM area select\n\n   When B is set, accessing an address in $20-3F:8000-FFFF will return (AAA << 20) | (addr & 0x0F7FFF).\n   If B is not set accessing an address in $20-3F:8000-FFFF will return  (addr & 0x2F7FFF).\n   $D0-$DF:0000-FFFF will always return (AAA << 20) | (addr & 0x0FFFFF).'
  },
  {
    'address': '$2222',
    'length': '1 byte',
    'beginsAt': 8738,
    'endsAt': 8738,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'Set Super MMC Bank E ($02, w, x)\n   B----AAA\n\n   B = Bank EX projection\n       1 = Bank data\n       0 = Game Pak ROM area\n   AAA = ROM area select\n\n   When B is set, accessing an address in $80-9F:8000-FFFF will return (AAA << 20) | (addr & 0x0F7FFF).\n   If B is not set accessing an address in $80-9F:8000-FFFF will return  (addr & 0x4F7FFF).\n   $E0-$EF:0000-FFFF will always return (AAA << 20) | (addr & 0x0FFFFF).'
  },
  {
    'address': '$2223',
    'length': '1 byte',
    'beginsAt': 8739,
    'endsAt': 8739,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'Set Super MMC Bank F ($03, w, x)\n   B----AAA\n\n   B = Bank FX projection\n       1 = Bank data\n       0 = Game Pak ROM area\n   AAA = ROM area select\n\n   When B is set, accessing an address in $A0-BF:8000-FFFF will return (AAA << 20) | (addr & 0x0F7FFF).\n   If B is not set accessing an address in $A0-BF:8000-FFFF will return  (addr & 0x6F7FFF).\n   $F0-$FF:0000-FFFF will always return (AAA << 20) | (addr & 0x0FFFFF).'
  },
  {
    'address': '$2224',
    'length': '1 byte',
    'beginsAt': 8740,
    'endsAt': 8740,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'Super Nintendo CPU BW-RAM Address Mapping ($00, w, x)\n   ---BBBBB\n\n   BBBBB = Which portion of BW-RAM to map to $00-3F:$6000-$7FFF and $80-BF:$6000-$7FFF'
  },
  {
    'address': '$2225',
    'length': '1 byte',
    'beginsAt': 8741,
    'endsAt': 8741,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'SA-1 CPU BW-RAM Address Mapping ($00, W, x)\n   SBBBBBBB\n\n   S = BW-RAM source to be projected\n       0 = $40-43 in 32 blocks (uses B0 to B4)\n       1 = $60-6F in 128 blocks (uses B0 to B6)\n   BBBBBBB = BW-RAM mapping for the SA-1 (much like $2224)'
  },
  {
    'address': '$2226',
    'length': '1 byte',
    'beginsAt': 8742,
    'endsAt': 8742,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'Super Nintendo CPU BW-RAM Write Enable ($00, w, x)\n   P-------\n\n   P = Protect BW-RAM from writes from the SNES\n       0 = Protect\n       1 = Write enabled'
  },
  {
    'address': '$2227',
    'length': '1 byte',
    'beginsAt': 8743,
    'endsAt': 8743,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'SA-1 CPU BW-RAM Write Enable ($00, w, x)\n   P-------\n\n   P = Protect BW-RAM from writes from the SA-1\n       0 = Protect\n       1 = Write enabled'
  },
  {
    'address': '$2228',
    'length': '1 byte',
    'beginsAt': 8744,
    'endsAt': 8744,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'BW-RAM Write-Protected Area ($FF, w, x)\n   ----AAAA\n\n   AAAA = Area to protect\n\n   Size of $400000-$4000FF to protect, 1024*2^(AAAA+1)'
  },
  {
    'address': '$2229',
    'length': '1 byte',
    'beginsAt': 8745,
    'endsAt': 8745,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'SA-1 I-RAM Write Protection ($00, w, x)\n   76543210\n\n   0 = Protect $3000 to $30FF\n   1 = Protect $3100 to $31FF\n   2 = Protect $3200 to $32FF\n   3 = Protect $3300 to $33FF\n   4 = Protect $3400 to $34FF\n   5 = Protect $3500 to $35FF\n   6 = Protect $3600 to $36FF\n   7 = Protect $3700 to $37FF'
  },
  {
    'address': '$222A',
    'length': '1 byte',
    'beginsAt': 8746,
    'endsAt': 8746,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'SA-1 I-RAM Write Protection ($00, W, x)\n   76543210\n\n   0 = Protect $3000 to $30FF and $0000 to $00FF\n   1 = Protect $3100 to $31FF and $0100 to $01FF\n   2 = Protect $3200 to $32FF and $0200 to $02FF\n   3 = Protect $3300 to $33FF and $0300 to $03FF\n   4 = Protect $3400 to $34FF and $0400 to $04FF\n   5 = Protect $3500 to $35FF and $0500 to $05FF\n   6 = Protect $3600 to $36FF and $0600 to $06FF\n   7 = Protect $3700 to $37FF and $0700 to $07FF'
  },
  {
    'address': '$2230',
    'length': '1 byte',
    'beginsAt': 8752,
    'endsAt': 8752,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'DMA Control ($00, W, x)\n   CPMT-DSS\n\n   C = DMA Enable\n   P = Priority\n       0 = SA-1 CPU\n       1 = DMA\n   M = DMA Mode\n       0 = Normal DMA\n       1 = Character Conversion DMA (CC-DMA)\n   T = Character Conversion Type\n       0 = SA-1 CPU to I-RAM\n       1 = BW-RAM to I-RAM\n   D = Destination\n       0 = I-RAM\n       1 = BW-RAM\n   SS = Source\n        00 = ROM\n        01 = BW-RAM\n        10 = I-RAM'
  },
  {
    'address': '$2231',
    'length': '1 byte',
    'beginsAt': 8753,
    'endsAt': 8753,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'CC-DMA Parameters ($00, X, x)\n   E--SSSCC\n\n   E = End of conversion 1, set by SNES\n   SSS = VRAM horizontal character size 2^SSS\n   CC = Color mode\n        00 = 8 Bit/Dot\n        01 = 4 Bit/Dot\n        10 = 2 Bit/Dot'
  },
  {
    'address': '$2232',
    'length': '3 bytes. Ends at $2234.',
    'beginsAt': 8754,
    'endsAt': 8756,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'DMA Source Device Start Address ($xx, X, x)\n   AAAAAAAA AAAAAAAA AAAAAAAA\n\n   AAAAAAAAAAAAAAAAAAAAAAAA = Source start address\n\n   Write in order low, middle, then high.'
  },
  {
    'address': '$2235',
    'length': '3 bytes. Ends at $2237.',
    'beginsAt': 8757,
    'endsAt': 8759,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'DMA Destination Start Address ($xx, X, x)\n   AAAAAAAA AAAAAAAA AAAAAAAA\n\n   AAAAAAAAAAAAAAAAAAAAAAAA = Destination start address\n\n   Writing to $2236 will initalize I-RAM DMA.\n   Writing to $2237 will initalize BW-RAM DMA.\n   Write in order low, middle, then high.'
  },
  {
    'address': '$2238',
    'length': '2 bytes. Ends at $2239.',
    'beginsAt': 8760,
    'endsAt': 8761,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'DMA Terminal Counter ($xx, W, x)\n   CCCCCCCC CCCCCCCC\n\n   CCCCCCCCCCCCCCCC = Counter for number of bytes to transmit (0 to 65535)'
  },
  {
    'address': '$223F',
    'length': '1 byte',
    'beginsAt': 8767,
    'endsAt': 8767,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'BW-RAM BIT MAP Format ($00, W, x)\n   C-------\n\n   C = color mode\n       0 = 16-color mode\n       1 = 4-color mode'
  },
  {
    'address': '$2240',
    'length': '16 bytes. Ends at $224F.',
    'beginsAt': 8768,
    'endsAt': 8783,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'BIT MAP Register File ($xx, W, x)\n   $2240-$2247 = Buffer 1\n   $2248-$224F = Buffer 2'
  },
  {
    'address': '$2250',
    'length': '1 byte',
    'beginsAt': 8784,
    'endsAt': 8784,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'Arithmetic Control ($00, W, x)\n   ------OO\n\n   OO = Operation\n       00 = Multiplication\n       01 = Division\n       10 = Cumulative sum'
  },
  {
    'address': '$2251',
    'length': '2 bytes. Ends at $2252.',
    'beginsAt': 8785,
    'endsAt': 8786,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'Arithmetic Parameters: Multiplicand / Dividend ($xx, W, x)\n   NNNNNNNN NNNNNNNN\n\n   NNNNNNNNNNNNNNNN = Signed 16-bit data'
  },
  {
    'address': '$2253',
    'length': '2 bytes. Ends at $2254.',
    'beginsAt': 8787,
    'endsAt': 8788,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'Arithmetic Parameters: Multiplier / Divisor ($xx, W, x)\n   NNNNNNNN NNNNNNNN\n\n   NNNNNNNNNNNNNNNN = 16-bit data\n\n   Signed if multiplication. Unsigned if division.'
  },
  {
    'address': '$2258',
    'length': '1 byte',
    'beginsAt': 8792,
    'endsAt': 8792,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'Variable-Length BIT Processing ($xx, W, x)\n   H---VVVV\n\n   H = Read mode\n       1 = Auto increment\n       0 = Fixed\n   VVVV = Length of previously stored data\n          0000 = 16\n          0001-1111 = Literal'
  },
  {
    'address': '$2259',
    'length': '3 bytes. Ends at $225B.',
    'beginsAt': 8793,
    'endsAt': 8795,
    'type': 'SA-1 Register (Write)',
    'descriptio':
        'Variable-Length BIT Game Pack ROM Start Address ($xx, W, x)\n   AAAAAAAA AAAAAAAA AAAAAAAA\n\n   A = ROM start address\n\n   Execution begins on write to $225B.'
  },
  {
    'address': '$2300',
    'length': '1 byte',
    'beginsAt': 8960,
    'endsAt': 8960,
    'type': 'SA-1 Register (Read)',
    'descriptio':
        'Super Nintendo CPU Flag Read ($xx, x, r)\n   IVDNmmmm\n\n   I = SA-1 IRQ\n       0 = No Interrupt\n       1 = Interrupt\n   V = SNES IRQ vector setting\n       0 = ROM\n       1 = SIV register\n   D = Character Conversion DMA IRQ flag\n       0 = No Interrupt\n       1 = Interrupt\n   N = SNES NMI vector setting\n       0 = ROM\n       1 = SNV register\n   mmmm = Messages from SA-1 CPU'
  },
  {
    'address': '$2301',
    'length': '1 byte',
    'beginsAt': 8961,
    'endsAt': 8961,
    'type': 'SA-1 Register (Read)',
    'descriptio':
        'SA-1 CPU Flag Read ($xx, x, R)\n   ITDNmmmm\n\n   I = SNES IRQ flag\n       0 = No Interrupt\n       1 = Interrupt\n   T = IRQ from timer\n       0 = No Interrupt\n       1 = Interrupt\n   D = DMA IRQ flag\n       0 = No Interrupt\n       1 = Interrupt at end of DMA\n   N = SNES NMI vector setting\n       0 = No NMI\n       1 = NMI\n   mmmm = Messages from SNES CPU'
  },
  {
    'address': '$2302',
    'length': '2 bytes. Ends at $2303.',
    'beginsAt': 8962,
    'endsAt': 8963,
    'type': 'SA-1 Register (Read)',
    'descriptio':
        'H-Count Read ($xx, x, R)\n   -------H HHHHHHHH\n\n   In HV mode values are 0 to 340.\n   In linear mode values are 0 to 511 (lower 9 bits).'
  },
  {
    'address': '$2304',
    'length': '2 bytes. Ends at $2305.',
    'beginsAt': 8964,
    'endsAt': 8965,
    'type': 'SA-1 Register (Read)',
    'descriptio':
        'V-Count Read ($xx, x, R)\n   -------H HHHHHHHH\n\n   In HV mode values are 0 to 261 (NTSC) or 0 to 311 (PAL).\n   In linear mode values are 0 to 511 (upper 9 bits).'
  },
  {
    'address': '$2306',
    'length': '5 bytes. Ends at $230A.',
    'beginsAt': 8966,
    'endsAt': 8970,
    'type': 'SA-1 Register (Read)',
    'descriptio':
        'Arithmetic Result [Product / Quotient / Accumulative Sum] ($xx, x, R)\n\n   Multiplication: $2306-2309 signed\n   Division: $2306-2307 signed, remainder in $2308-2309 unsigned\n   Cumulative sum: $2306-230A signed'
  },
  {
    'address': '$230B',
    'length': '1 byte',
    'beginsAt': 8971,
    'endsAt': 8971,
    'type': 'SA-1 Register (Read)',
    'descriptio':
        'Arithmetic Overflow Flag ($xx, x, R)\n   O-------\n\n   O = Overflow flag'
  },
  {
    'address': '$230C',
    'length': '2 bytes. Ends at $230D.',
    'beginsAt': 8972,
    'endsAt': 8973,
    'type': 'SA-1 Register (Read)',
    'descriptio':
        'Variable-Length Data Read Port ($xx, x, R)\n\n   16-bit results from $2258'
  },
  {
    'address': '$230E',
    'length': '1 byte',
    'beginsAt': 8974,
    'endsAt': 8974,
    'type': 'SA-1 Register (Read)',
    'descriptio': 'Version Code Register (, x, x)\n\n   SA-1 Version'
  },
  {
    'address': '$3000',
    'length': '2 bytes. Ends at $3001.',
    'beginsAt': 12288,
    'endsAt': 12289,
    'type': 'Super FX Register',
    'descriptio': 'Default Source/Destination Register (R0)'
  },
  {
    'address': '$3002',
    'length': '2 bytes. Ends at $3003.',
    'beginsAt': 12290,
    'endsAt': 12291,
    'type': 'Super FX Register',
    'descriptio': 'X coordinate for PLOT instruction (R1)'
  },
  {
    'address': '$3004',
    'length': '2 bytes. Ends at $3005.',
    'beginsAt': 12292,
    'endsAt': 12293,
    'type': 'Super FX Register',
    'descriptio': 'Y coordinate for PLOT instruction (R2)'
  },
  {
    'address': '$3006',
    'length': '2 bytes. Ends at $3007.',
    'beginsAt': 12294,
    'endsAt': 12295,
    'type': 'Super FX Register',
    'descriptio': 'General purpose register (R3)'
  },
  {
    'address': '$3008',
    'length': '2 bytes. Ends at $3009.',
    'beginsAt': 12296,
    'endsAt': 12297,
    'type': 'Super FX Register',
    'descriptio': 'Lower 16 bits of result from LMULT instruction (R4)'
  },
  {
    'address': '$300A',
    'length': '2 bytes. Ends at $300B.',
    'beginsAt': 12298,
    'endsAt': 12299,
    'type': 'Super FX Register',
    'descriptio': 'General purpose register (R5)'
  },
  {
    'address': '$300C',
    'length': '2 bytes. Ends at $300D.',
    'beginsAt': 12300,
    'endsAt': 12301,
    'type': 'Super FX Register',
    'descriptio': 'Multiplier for FMULT and LMULT instructions (R6)'
  },
  {
    'address': '$300E',
    'length': '2 bytes. Ends at $300F.',
    'beginsAt': 12302,
    'endsAt': 12303,
    'type': 'Super FX Register',
    'descriptio':
        'Source 1 (fixed point texel X position) for MERGE instruction (R7)'
  },
  {
    'address': '$3010',
    'length': '2 bytes. Ends at $3011.',
    'beginsAt': 12304,
    'endsAt': 12305,
    'type': 'Super FX Register',
    'descriptio':
        'Source 2 (fixed point texel Y position) for MERGE instruction (R8)'
  },
  {
    'address': '$3012',
    'length': '2 bytes. Ends at $3013.',
    'beginsAt': 12306,
    'endsAt': 12307,
    'type': 'Super FX Register',
    'descriptio': 'General purpose register (R9)'
  },
  {
    'address': '$3014',
    'length': '2 bytes. Ends at $3015.',
    'beginsAt': 12308,
    'endsAt': 12309,
    'type': 'Super FX Register',
    'descriptio':
        'General purpose register, commonly used as stack pointer (R10)'
  },
  {
    'address': '$3016',
    'length': '2 bytes. Ends at $3017.',
    'beginsAt': 12310,
    'endsAt': 12311,
    'type': 'Super FX Register',
    'descriptio': 'Destination for LINK instruction (R11)'
  },
  {
    'address': '$3018',
    'length': '2 bytes. Ends at $3019.',
    'beginsAt': 12312,
    'endsAt': 12313,
    'type': 'Super FX Register',
    'descriptio': 'Counter for LOOP instruction (R12)'
  },
  {
    'address': '$301A',
    'length': '2 bytes. Ends at $301B.',
    'beginsAt': 12314,
    'endsAt': 12315,
    'type': 'Super FX Register',
    'descriptio': 'Branch for LOOP instruction (R13)'
  },
  {
    'address': '$301C',
    'length': '2 bytes. Ends at $301D.',
    'beginsAt': 12316,
    'endsAt': 12317,
    'type': 'Super FX Register',
    'descriptio': 'ROM Address Pointer for GETB, GETBH, GETBL, GETBS (R14)'
  },
  {
    'address': '$301E',
    'length': '2 bytes. Ends at $301F.',
    'beginsAt': 12318,
    'endsAt': 12319,
    'type': 'Super FX Register',
    'descriptio': 'Program Counter (R15)'
  },
  {
    'address': '$3030',
    'length': '2 bytes. Ends at $3031.',
    'beginsAt': 12336,
    'endsAt': 12337,
    'type': 'Super FX Register',
    'descriptio':
        'Status/Flag Register: Indicates the status of the Super FX.\n   I--BHL21 -RGVNCZ-\n\n   I = IRQ, set to 1 when Super FX caused an interrupt. Set to 0 when read by 65c816.\n   B = Set to 1 when the WITH instruction is executed\n   H = Immediate higher 8-bit flag\n   L = Immediate lower 8-bit flag\n   2 = ALT2 mode set-up flag for the next instruction\n   1 = ALT1 mode set-up flag for the next instruction\n   R = Set to 1 when reading ROM using R14 address\n   G = Go flag, set to 1 when the Super FX is running\n   V = Overflow flag\n   N = Negative flag\n   C = Carry flag\n   Z = Zero flag'
  },
  {
    'address': '$3032',
    'length': '1 byte',
    'beginsAt': 12338,
    'endsAt': 12338,
    'type': 'Super FX Register',
    'descriptio': 'Unused.'
  },
  {
    'address': '$3033',
    'length': '1 byte',
    'beginsAt': 12339,
    'endsAt': 12339,
    'type': 'Super FX Register',
    'descriptio':
        'Backup RAM Register: Makes sure the data at banks $78-$79 gets protected (or\nnot) for writing, write-only.'
  },
  {
    'address': '$3034',
    'length': '1 byte',
    'beginsAt': 12340,
    'endsAt': 12340,
    'type': 'Super FX Register',
    'descriptio':
        'Program Bank Register: Specifies the memory bank register to be accessed.\nUsually changed with the LJMP instruction.'
  },
  {
    'address': '$3035',
    'length': '1 byte',
    'beginsAt': 12341,
    'endsAt': 12341,
    'type': 'Super FX Register',
    'descriptio': 'Unused.'
  },
  {
    'address': '$3036',
    'length': '1 byte',
    'beginsAt': 12342,
    'endsAt': 12342,
    'type': 'Super FX Register',
    'descriptio':
        'ROM Bank Register: When using the ROM buffering system, this register specifies\nthe bank of the game pak ROM being copied into the buffer. The ROMB instruction\nis the general method used to change this register.'
  },
  {
    'address': '$3037',
    'length': '1 byte',
    'beginsAt': 12343,
    'endsAt': 12343,
    'type': 'Super FX Register',
    'descriptio':
        'Control Flags Config Register: Selects the operating speed of the multiplier\nin the Super FX and sets up a mask for the interrupt signal, write-only.\n   I-0-----\n\n   I = IRQ, normal or masked\n   0 = MS, standard or high-speed. Should be set to 0 if the Super FX is running at\n       21 MHz (see $3039).'
  },
  {
    'address': '$3038',
    'length': '1 byte',
    'beginsAt': 12344,
    'endsAt': 12344,
    'type': 'Super FX Register',
    'descriptio':
        'Screen Base Register: This register sets the starting address of the graphics\nstorage area. It is written to directly, rather than through a specific\ninstruction.'
  },
  {
    'address': '$3039',
    'length': '1 byte',
    'beginsAt': 12345,
    'endsAt': 12345,
    'type': 'Super FX Register',
    'descriptio':
        'Clock Speed Register: This register assigns the Super FX operating frequency,\nwrite-only. 10.7 MHz or 21.4 MHz depending on bit 0.'
  },
  {
    'address': '$303A',
    'length': '1 byte',
    'beginsAt': 12346,
    'endsAt': 12346,
    'type': 'Super FX Register',
    'descriptio':
        'Screen Mode Register: Specifies the color gradient and screen height during\nPLOT processing and controls ROM and RAM bus assignments, write-only.\n   --HRWhMm\n\n   Hh = Screen Height\n        00 = 128 pixels\n        01 = 160 pixels\n        10 = 192 pixels\n        11 = OBJ Mode\n   R = Game Pak ROM Access - RON\n       0 = SNES\n       1 = Super FX\n   W = Game Pak Work RAM Access - RAN\n       0 = SNES\n       1 = Super FX\n   Mm = Color Mode\n        00 = 4 colors\n        01 = 16 colors\n        10 = Not used\n        11 = 256 colors'
  },
  {
    'address': '$303B',
    'length': '1 byte',
    'beginsAt': 12347,
    'endsAt': 12347,
    'type': 'Super FX Register',
    'descriptio':
        'Version Code Register: Checks for the version of the Super FX chip, read-only.'
  },
  {
    'address': '$303C',
    'length': '1 byte',
    'beginsAt': 12348,
    'endsAt': 12348,
    'type': 'Super FX Register',
    'descriptio':
        'RAM Bank Register: When writing between the game WRAM and the Super FX\nregisters, this register specifies the bank of the Game Pak RAM being\nused. The RAMB instruction is the general method used to change this\nregister. Only one bit is used to set the RAM bank to $70 or $71.'
  },
  {
    'address': '$303D',
    'length': '1 byte',
    'beginsAt': 12349,
    'endsAt': 12349,
    'type': 'Super FX Register',
    'descriptio': 'Unused.'
  },
  {
    'address': '$303E',
    'length': '2 bytes. Ends at $303F.',
    'beginsAt': 12350,
    'endsAt': 12351,
    'type': 'Super FX Register',
    'descriptio':
        'Cache Base Register: This register specifies the address of either the\nGame Pak ROM or WRAM where data will be loaded from into the cache. Both\nthe LJMP and CACHE instructions are accepted ways to change this register.'
  },
  {
    'address': '$3100',
    'length': '512 bytes. Ends at $32FF.',
    'beginsAt': 12544,
    'endsAt': 13055,
    'type': 'Super FX Register',
    'descriptio': 'Instruction cache, about 3 times faster than ROM and RAM.'
  },
  {
    'address': '$4016',
    'length': '2 bytes. Ends at $4017.',
    'beginsAt': 16406,
    'endsAt': 16407,
    'type': 'SNES Register (Controller)',
    'descriptio':
        'rwb++++ JOYSER0 - NES-style Joypad Access Port 1\n   Rd: ------ca\n   Wr: -------l\nr?b++++ JOYSER1 - NES-style Joypad Access Port 2\n   ---111db\n\n   These registers basically have a direct connection to the controller\n   ports on the front of the SNES. \n\n   l    = Writing this bit controlls the Latch line of both controller\n       ports. When 1 is set, the Latch goes high (or is it low? At any\n       rate, whichever one makes the pads latch their state). When\n       cleared, the Latch goes the other way.\n   \n   a/b  = These bits return the state of the Data1 line.\n   c/d  = These bits return the state of the Data2 line.\n       Reading $4016 drives the Clock line of Controller Port 1 low.\n       The SNES then reads the Data1 and Data2 lines, and Clock is set\n       back to high. $4017 does the same for Port 2.\n   \n   Note the 1-bits in $4017: the CPU chip has pins for these bits, but\n   these pins are tied to Gnd and thus always 1.\n\n   Data for normal joypads is returned in the order: B, Y, Select,\n   Start, Up, Down, Left, Right, A, X, L, R, 0, 0, 0, 0, then ones\n   until latched again.\n\n   Note that Auto-Joypad Read (see register $4200) will effectively write\n   1 then 0 to bit \'l\', then read 16 times from both $4016 and $4017. The\n   \'a\' bits will end up in $4218/9, with the first bit read (e.g. the B\n   button) in bit 15 of the word. Similarly, the \'b\' bits end up in\n   $421a/b, the \'c\' bits in $42c/d, and the \'d\' bits in $421e/f. Any\n   further bits the device may return may be read from $4016/$4017 as\n   normal.\n\n   The effect of reading these during auto-joypad read is unknown.\n\n   See the section "CONTROLLERS" below for details.'
  },
  {
    'address': '$4200',
    'length': '1 byte',
    'beginsAt': 16896,
    'endsAt': 16896,
    'type': 'SNES Register (Hardware)',
    'descriptio':
        ' wb+++? NMITIMEN - Interrupt Enable Flags\n   n-yx---a\n\n   n = Enable NMI. If clear, NMI will not occur. If set, NMI will fire just\n       after the start of V-Blank.\n\n       NMI fires shortly after the V Counter reaches $E1 (or presumably $F0 if\n       overscan is enabled, see register $2133).\n   x/y = IRQ enable.\n    0/0 = No IRQ will occur\n    0/1 = An IRQ will occur sometime just after the V Counter reaches the value\n          set in $4209/$420A.\n    1/0 = An IRQ will occur sometime just after the H Counter reaches the value\n          set in $4207/$4208.\n    1/1 = An IRQ will occur sometime just after the H Counter reaches the value\n          set in $4207/$4208 when V Counter equals the value set in\n          $4209/$420A.\n   a = Auto-Joypad Read Enable. When set, the registers $4218-$421F will be\n       updated at about V Counter = $E3 (or presumably $F2).\n\n   Some games try to read this register. However, they work only because open\n   bus behavior gives them values they expect.\n\n   This register is initialized to $00 on power on or reset.'
  },
  {
    'address': '$4201',
    'length': '1 byte',
    'beginsAt': 16897,
    'endsAt': 16897,
    'type': 'SNES Register (Hardware)',
    'descriptio':
        ' wb++++ WRIO - Programmable I/O port (out-port)\n   abxxxxxx\n\n   This is basically just an 8-bit I/O Port. \'b\' is connected to pin 6 of\n   Controller Port 1. \'a\' is connected to pin 6 of Controller Port 2, and\n   to the PPU Latch line. Thus, writing a 0 then a 1 to bit \'a\' will latch\n   the H and V Counters much like reading $2137 (the latch happens on the\n   transition to 0). When bit \'a\' is 0, no latching can occur.\n\n   Any other effects of this register are unknown. See $4213 for the\n   I half of the I/O Port.\n\n   Note that the IO Port is initialized as if this register were written\n   with all 1-bits at power up, unchanged on reset(?).'
  },
  {
    'address': '$4202',
    'length': '2 bytes. Ends at $4203.',
    'beginsAt': 16898,
    'endsAt': 16899,
    'type': 'SNES Register (Hardware)',
    'descriptio':
        ' wb++++ WRMPYA - Multiplicand A\n wb++++ WRMPYB - Multiplicand B\n   mmmmmmmm\n\n   Write $4202, then $4203. 8 "machine cycles" (probably 48 master cycles)\n   after $4203 is set, the product may be read from $4216/7. $4202 will\n   not be altered by this process, thus a new value may be written to\n   $4203 to perform another multiplication without resetting $4202.\n\n   The multiplication is unsigned.\n\n   $4202 holds the value $ff on power on and is unchanged on reset.'
  },
  {
    'address': '$4204',
    'length': '3 bytes. Ends at $4206.',
    'beginsAt': 16900,
    'endsAt': 16902,
    'type': 'SNES Register (Hardware)',
    'descriptio':
        ' wl++++ WRDIVL - Dividend C low byte\n wh++++ WRDIVH - Dividend C high byte\n   dddddddd dddddddd\n wb++++ WRDIVB - Divisor B\n   bbbbbbbb\n\n   Write $4204/5, then $4206. 16 "machine cycles" (probably 96 master\n   cycles) after $4206 is set, the quotient may be read from $4214/5, and\n   the remainder from $4216/7. Presumably, $4204/5 are not altered by this\n   process, much like $4202.\n   \n   The division is unsigned. Division by 0 gives a quotient of $FFFF and a\n   remainder of C.\n\n   WRDIV holds the value $ffff on power on and is unchanged on reset.'
  },
  {
    'address': '$4207',
    'length': '2 bytes. Ends at $4208.',
    'beginsAt': 16903,
    'endsAt': 16904,
    'type': 'SNES Register (Hardware)',
    'descriptio':
        ' wl++++ HTIMEL - H Timer low byte\n wh++++ HTIMEH - H Timer high byte\n   -------h hhhhhhhh\n\n   If bit 4 of $4200 is set and bit 5 is clear, an IRQ will fire every\n   scanline when the H Counter reaches the value set here. If bits 4 and 5\n   are both set, the IRQ will fire only when the V Counter equals the\n   value set in $4209/a.\n   \n   Note that the H Counter ranges from 0 to 339, thus greater values will\n   result in no IRQ firing.\n\n   HTIME is initialized to $1ff on power on, unchanged on reset.'
  },
  {
    'address': '$4209',
    'length': '2 bytes. Ends at $420A.',
    'beginsAt': 16905,
    'endsAt': 16906,
    'type': 'SNES Register (Hardware)',
    'descriptio':
        ' wl++++ VTIMEL - V Timer low byte\n wh++++ VTIMEH - V Timer high byte\n   -------v vvvvvvvv\n\n   If bit 5 of $4200 is set and bit 4 is clear, an IRQ will fire just\n   after the V Counter reaches the value set here. If bits 4 and 5 are\n   both set, the IRQ will fire instead when the V Counter equals the value\n   set here and the H Counter reaches the value set in $4207/8.\n   \n   Note that the V Counter ranges from 0 to 261 in NTSC mode (262 is\n   possible every other frame whan interlace is active) and 0 to 311 in\n   PAL mode (312 in interlace?), thus greater values will result in no IRQ\n   firing.\n\n   VTIME is initialized to $1ff on power on, unchanged on reset.'
  },
  {
    'address': '$420B',
    'length': '1 byte',
    'beginsAt': 16907,
    'endsAt': 16907,
    'type': 'SNES Register (DMA)',
    'descriptio':
        ' wb++++ MDMAEN - DMA Enable\n   76543210\n\n   7/6/5/4/3/2/1/0 = Enable the selected DMA channels. The CPU will be\n       paused until all DMAs complete. DMAs will be executed in order from\n       0 to 7 (?).\n\n   See registers $43x0-$43xA for more details.\n\n   If HDMA (init or transfer) occurs while a DMA is in progress, the DMA\n   will be paused for the duration. If the HDMA happens to involve the\n   current DMA channel, the DMA will be immediately terminated and the\n   HDMA will progress using the then-current values of the registers.\n   Other DMA channels will be unaffected.\n\n   This register is initialized to $00 on power on or reset.\n\n   See the section "DMA AND HDMA" below for more information.'
  },
  {
    'address': '$420C',
    'length': '1 byte',
    'beginsAt': 16908,
    'endsAt': 16908,
    'type': 'SNES Register (DMA)',
    'descriptio':
        ' wb++++ HDMAEN - HDMA Enable\n   76543210\n\n   7/6/5/4/3/2/1/0 = Enable the selected HDMA channels. HDMAs will be\n       executed in order from 0 to 7 (?).\n\n   See registers $43x0-$43xA for more details.\n\n   If HDMA (init or transfer) occurs while a DMA is in progress, the DMA\n   will be paused for the duration. If the HDMA happens to involve the\n   current DMA channel, the DMA will be immediately terminated and the\n   HDMA will progress using the then-current values of the registers.\n   Other DMA channels will be unaffected.\n\n   Note that enabling a channel mid-frame will begin HDMA at the next HDMA\n   point. However, the HDMA register initialization only occurs before the\n   HDMA point on scanline 0, so those registers will have to be\n   initialized by hand before enabling HDMA. A channel that has already\n   terminated for the frame cannot be restarted in this manner.\n\n   Writing 0 to a bit will pause an ongoing HDMA; the transfer may be\n   continued by writing 1 to the bit.\n\n   This register is initialized to $00 on power on or reset.\n\n   See the section "DMA AND HDMA" below for more information.'
  },
  {
    'address': '$420D',
    'length': '1 byte',
    'beginsAt': 16909,
    'endsAt': 16909,
    'type': 'SNES Register (Hardware)',
    'descriptio':
        ' wb++++ MEMSEL - ROM Access Speed\n   -------f\n\n   f    = FastROM select. The SNES uses a master clock running at\n       about 21.477 MHz (current theory is 1.89e9/88 Hz). By default, the\n       SNES takes 8 master cycles for each ROM access. If this bit is set\n       and ROM is accessed via banks $80-$FF, only 6 master cycles will be\n       used.\n\n   This register is initialized to $00 on power on (or reset?).\n\n   See my memory map and timing doc (memmap.txt) for more details.'
  },
  {
    'address': '$4210',
    'length': '1 byte',
    'beginsAt': 16912,
    'endsAt': 16912,
    'type': 'SNES Register (Hardware)',
    'descriptio':
        'r b++++ RDNMI - NMI Flag and 5A22 Version\n   n---vvvv\n\n   n    = NMI Flag. This bit is set at the start of V-Blank (at the\n       moment, we suspect when H-Counter is somewhere between $28 and\n       $4E), and cleared on read or at the end of V-Blank. Supposedly, it\n       is required that this register be read during NMI.\n\n       Note that this bit is not affected by bit 7 of $4200.\n\n   vvvv = 5A22 chip version number. So far, we\'ve encountered at least 2,\n       maybe 1 as well.\n\n   NMI is cleared on power on or reset.\n\n   The \'-\' bits are open bus.'
  },
  {
    'address': '$4211',
    'length': '1 byte',
    'beginsAt': 16913,
    'endsAt': 16913,
    'type': 'SNES Register (Hardware)',
    'descriptio':
        'r b++++ TIMEUP - IRQ Flag\n   i-------\n\n   i    = IRQ Flag. This bit is set just after an IRQ fires (at the\n       moment, it seems to have the same delay as the NMI Flag of $4210\n       has following NMI), and is cleared on read or write. Supposedly, it\n       is required that this register be read during the IRQ handler. If\n       this really is the case, then I suspect that that read is what\n       actually clears the CPU\'s IRQ line.\n\n   This register is marked read/write in another doc, with no explanation.\n\n   IRQ is cleared on power on or reset.\n   \n   The \'-\' bits are open bus.'
  },
  {
    'address': '$4212',
    'length': '1 byte',
    'beginsAt': 16914,
    'endsAt': 16914,
    'type': 'SNES Register (Hardware)',
    'descriptio':
        'r b++++ HVBJOY - PPU Status\n   vh-----a\n\n   v    = V-Blank Flag. If we\'re currently in V-Blank, this flag is set,\n       otherwise it is clear. The setting seems to occur at H Counter\n       about $16-$17 when V Counter is $E1, and the clearing at about $1E\n       with V Counter 0.\n\n   h    = H-Blank Flag. If we\'re currently in H-Blank, this flag is set,\n       otherwise it is clear. The setting seems to occur at H Counter\n       about $121-$122, and the clearing at about $12-$18.\n\n   a    = Auto-Joypad Status. This is set while Auto-Joypad Read is in\n       progress, and cleared when complete. It typically turns on at\n       the start of V-Blank, and completes 3 scanlines later.\n\n   This register is marked read/write in another doc, with no explanation.'
  },
  {
    'address': '$4213',
    'length': '1 byte',
    'beginsAt': 16915,
    'endsAt': 16915,
    'type': 'SNES Register (Hardware)',
    'descriptio':
        'r b++++ RDIO - Programmable I/O port (in-port)\n   abxxxxxx\n\n   Reading this register reads data from the I/O Port. The way the\n   I/O Port works, any bit set to 0 in $4201 will be 0 here. Any bit\n   set to 1 in $4201 may be 1 or 0 here, depending on whether any other\n   device connected to the I/O Port has set a 0 to that bit.\n\n   Bit \'b\' is connected to pin 6 of Controller Port 1. Bit \'a\' is\n   connected to pin 6 of Controller Port 2, and to the PPU Latch line.\n\n   See register $4201 for the O side of the I/O Port.'
  },
  {
    'address': '$4214',
    'length': '2 bytes. Ends at $4215.',
    'beginsAt': 16916,
    'endsAt': 16917,
    'type': 'SNES Register (Hardware)',
    'descriptio':
        'r l++++ RDDIVL - Quotient of Divide Result low byte\nr h++++ RDDIVH - Quotient of Divide Result high byte\n   qqqqqqqq qqqqqqqq\n\n   Write $4204/5, then $4206. 16 "machine cycles" (probably 96 master\n   cycles) after $4206 is set, the quotient may be read from these\n   registers, and the remainder from $4216/7.\n   \n   The division is unsigned.'
  },
  {
    'address': '$4216',
    'length': '2 bytes. Ends at $4217.',
    'beginsAt': 16918,
    'endsAt': 16919,
    'type': 'SNES Register (Hardware)',
    'descriptio':
        'r l++++ RDMPYL - Multiplication Product or Divide Remainder low byte\nr h++++ RDMPYH - Multiplication Product or Divide Remainder high byte\n   xxxxxxxx xxxxxxxx\n\n   Write $4202, then $4203. 8 "machine cycles" (probably 48 master cycles)\n   after $4203 is set, the product may be read from these registers.\n\n   Write $4204/5, then $4206. 16 "machine cycles" (probably 96 master\n   cycles) after $4206 is set, the quotient may be read from $4214/5, and\n   the remainder from these registers.\n\n   The multiplication and division are both unsigned.'
  },
  {
    'address': '$4218',
    'length': '8 bytes. Ends at $421F.',
    'beginsAt': 16920,
    'endsAt': 16927,
    'type': 'SNES Register (Controller)',
    'descriptio':
        'r l++++ JOY1L - Controller Port 1 Data1 Register low byte\nr h++++ JOY1H - Controller Port 1 Data1 Register high byte\nr l++++ JOY2L - Controller Port 2 Data1 Register low byte\nr h++++ JOY2H - Controller Port 2 Data1 Register high byte\nr l++++ JOY3L - Controller Port 1 Data2 Register low byte\nr h++++ JOY3H - Controller Port 1 Data2 Register high byte\nr l++++ JOY4L - Controller Port 2 Data2 Register low byte\nr h++++ JOY4H - Controller Port 2 Data2 Register high byte\n   byetUDLR axlr0000\n\n   The bitmap above only applies for joypads, obviously. More\n   generically, Auto Joypad Read effectively sets 1 then 0 to $4016,\n   then reads $4016/7 16 times to get the bits for these registers.\n   \n   a/b/x/y/l/r/e/t = A/B/X/Y/L/R/Select/Start button status.\n\n   U/D/L/R = Up/Down/Left/Right control pad status. Note that only one of\n       L/R and only one of U/D may be set, due to the pad hardware.\n\n   These registers are only updated when the Auto-Joypad Read bit (bit 0)\n   of $4200 is set. They are being updated while the Auto-Joypad Status\n   bit (bit 0) of $4212 is set. Reading during this time will return\n   incorrect values.\n\n   See the section "CONTROLLERS" below for details.'
  },
  {
    'address': '$4300',
    'length': '1 byte',
    'beginsAt': 17152,
    'endsAt': 17152,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ DMAP0 - DMA Control for Channel 0\n   da-ifttt\n\n   d    = Transfer Direction. When clear, data will be read from the CPU\n       memory and written to the PPU register. When set, vice versa.\n       \n       Contrary to previous belief, this bit DOES affect HDMA! Indirect\n       mode is more useful, it will read the table as normal and write\n       from Bus B to the Bus A address specified. Direct mode will work as\n       expected though, it will read counts from the table and try to\n       write the data values into the table.\n\n   a    = HDMA Addressing Mode. When clear, the HDMA table contains the\n       data to transfer. When set, the HDMA table contains pointers to the\n       data. This bit does not affect DMA.\n\n   i    = DMA Address Increment. When clear, the DMA address will be\n       incremented for each byte. When set, the DMA address will be\n       decremented. This bit does not affect HDMA.\n\n   f    = DMA Fixed Transfer. When set, the DMA address will not be\n       adjusted. When clear, the address will be adjusted as specified by\n       bit 4. This bit does not affect HDMA.\n\n   ttt  = Transfer Mode.\n       000 => 1 register write once             (1 byte:  p               )\n       001 => 2 registers write once            (2 bytes: p, p+1          )\n       010 => 1 register write twice            (2 bytes: p, p            )\n       011 => 2 registers write twice each      (4 bytes: p, p,   p+1, p+1)\n       100 => 4 registers write once            (4 bytes: p, p+1, p+2, p+3)\n       101 => 2 registers write twice alternate (4 bytes: p, p+1, p,   p+1)\n       110 => 1 register write twice            (2 bytes: p, p            )\n       111 => 2 registers write twice each      (4 bytes: p, p,   p+1, p+1)\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. Most likely, the change takes effect for the\n   next HDMA transfer.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4301',
    'length': '1 byte',
    'beginsAt': 17153,
    'endsAt': 17153,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ BBAD0 - DMA Destination Register for Channel 0\n   pppppppp\n\n   This specifies the Bus B address to access. Considering the standard\n   CPU memory space, this specifies which address $00:2100-$00:21FF to\n   access, with two- and four-register modes wrapping $21FF->$2100, not\n   $2200.\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. Most likely, the change takes effect for the\n   next transfer.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4302',
    'length': '3 bytes. Ends at $4304.',
    'beginsAt': 17154,
    'endsAt': 17156,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ A1T0L - DMA Source Address for Channel 0 low byte\nrwh++++ A1T0H - DMA Source Address for Channel 0 high byte\nrwb++++ A1B0 - DMA Source Address for Channel 0 bank byte\n   bbbbbbbb hhhhhhhh llllllll\n\n   This specifies the starting Address Bus A address for the DMA transfer,\n   or the beginning of the HDMA table for HDMA transfers. Note that Bus A\n   does not access the Bus B registers, so pointing this address at say\n   $00:2100 results in open bus.\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. However, current theory is that only $4304 will\n   affect the transfer. The changes will take effect at the next HDMA\n   init.\n\n   During DMA, $4302/3 will be incremented or decremented as specified by\n   $4300. However $4304 will NOT be adjusted. These registers will not be\n   affected by HDMA.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4305',
    'length': '3 bytes. Ends at $4307.',
    'beginsAt': 17157,
    'endsAt': 17159,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ DAS0L - DMA Size/HDMA Indirect Address low byte\nrwh++++ DAS0H - DMA Size/HDMA Indirect Address high byte\nrwb++++ DASB0 - HDMA Indirect Address bank byte\n   bbbbbbbb hhhhhhhh llllllll\n\n   For DMA, $4305/6 indicate the number of bytes to transfer. Note that\n   this is a strict limit: if this is set to 1 then only 1 byte will be\n   written, even if the transfer mode specifies 2 or 4 registers (and if\n   this is 5, all 4 registers would be written once, then the first only\n   would be written a second time). Note, however, that writing $0000 to\n   this register actually results in a transfer of $10000 bytes, not 0.\n\n   $4305/6 are decremented during DMA, and thus typically end up set to 0\n   when DMA is complete.\n\n   For HDMA, $4307 specifies the bank for indirect addressing mode. The\n   indirect address is copied into $4305/6 and incremented appropriately.\n   For direct HDMA, these registers are not used or altered.\n\n   Writes to $4307 during indirect HDMA will take effect for the next\n   transfer. Writes to $4305/6 during indirect HDMA will also take effect\n   for the next HDMA transfer, however this is only noticable during\n   repeat mode (for normal mode, a new indirect address will be read from\n   the table before the transfer). For a direct transfer, presumably\n   nothing will happen.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4308',
    'length': '2 bytes. Ends at $4309.',
    'beginsAt': 17160,
    'endsAt': 17161,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ A2A0L - HDMA Table Address low byte\nrwh++++ A2A0H - HDMA Table Address high byte\n   aaaaaaaa aaaaaaaa\n\n   At the beginning of the frame $4302/3 are copied into this register for\n   all active HDMA channels, and then this register is updated as the\n   table is read. Thus, if a game wishes to start HDMA mid-frame (or\n   change tables mid-frame), this register must be written. Writing this\n   register mid-frame changes the table address for the next scanline.\n\n   This register is not used for DMA.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$430A',
    'length': '1 byte',
    'beginsAt': 17162,
    'endsAt': 17162,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ NLTR0 - HDMA Line Counter\n   rccccccc\n\n   r    = Repeat Select. When set, the HDMA transfer will be performed\n       every line, rather than only when this register is loaded from the\n       table. However, this byte (and the indirect HDMA address) will only\n       be reloaded from the table when the counter reaches 0.\n\n   ccccccc = Line count. This is decremented every scanline. When it\n       reaches 0, a byte is read from the HDMA table into this register\n       (and the indirect HDMA address is read into $4305/6 if applicable).\n\n   One oddity: the register is decremeted before being checked for r\n   status or c==0. Thus, setting a value of $80 is really "128 lines with\n   no repeat" rather than "0 lines with repeat". Similarly, a value of $00\n   will be "128 lines with repeat" when it doesn\'t mean "terminate the\n   channel".\n\n   This register is initialized at the end of V-Blank for every active\n   HDMA channel. Note that if a game wishes to begin HDMA during the\n   frame, it will most likely have to initalize this register. Writing\n   this mid-transfer will similarly change the count and repeat to take\n   effect next scanline. Remember though that \'repeat\' won\'t take effect\n   until after the next transfer period.\n\n   This register is set to $ff on power on, and is unchanged on reset.\n\n   See the section "DMA AND HDMA" below for more information.'
  },
  {
    'address': '$430B',
    'length': '2 bytes. Ends at $430C.',
    'beginsAt': 17163,
    'endsAt': 17164,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ ????0 - Unknown\nrwb++++ ????0 - Unknown\n   ????????\n\n   The effects of these registers (if any) are unknown. $430F and $430B\n   are really aliases for the same register.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4310',
    'length': '1 byte',
    'beginsAt': 17168,
    'endsAt': 17168,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ DMAP1 - DMA Control for Channel 1\n   da-ifttt\n\n   d    = Transfer Direction. When clear, data will be read from the CPU\n       memory and written to the PPU register. When set, vice versa.\n       \n       Contrary to previous belief, this bit DOES affect HDMA! Indirect\n       mode is more useful, it will read the table as normal and write\n       from Bus B to the Bus A address specified. Direct mode will work as\n       expected though, it will read counts from the table and try to\n       write the data values into the table.\n\n   a    = HDMA Addressing Mode. When clear, the HDMA table contains the\n       data to transfer. When set, the HDMA table contains pointers to the\n       data. This bit does not affect DMA.\n\n   i    = DMA Address Increment. When clear, the DMA address will be\n       incremented for each byte. When set, the DMA address will be\n       decremented. This bit does not affect HDMA.\n\n   f    = DMA Fixed Transfer. When set, the DMA address will not be\n       adjusted. When clear, the address will be adjusted as specified by\n       bit 4. This bit does not affect HDMA.\n\n   ttt  = Transfer Mode.\n       000 => 1 register write once             (1 byte:  p               )\n       001 => 2 registers write once            (2 bytes: p, p+1          )\n       010 => 1 register write twice            (2 bytes: p, p            )\n       011 => 2 registers write twice each      (4 bytes: p, p,   p+1, p+1)\n       100 => 4 registers write once            (4 bytes: p, p+1, p+2, p+3)\n       101 => 2 registers write twice alternate (4 bytes: p, p+1, p,   p+1)\n       110 => 1 register write twice            (2 bytes: p, p            )\n       111 => 2 registers write twice each      (4 bytes: p, p,   p+1, p+1)\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. Most likely, the change takes effect for the\n   next HDMA transfer.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4311',
    'length': '1 byte',
    'beginsAt': 17169,
    'endsAt': 17169,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ BBAD1 - DMA Destination Register for Channel 1\n   pppppppp\n\n   This specifies the Bus B address to access. Considering the standard\n   CPU memory space, this specifies which address $00:2100-$00:21FF to\n   access, with two- and four-register modes wrapping $21FF->$2100, not\n   $2200.\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. Most likely, the change takes effect for the\n   next transfer.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4312',
    'length': '3 bytes. Ends at $4314.',
    'beginsAt': 17170,
    'endsAt': 17172,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ A1T1L - DMA Source Address for Channel 1 low byte\nrwh++++ A1T1H - DMA Source Address for Channel 1 high byte\nrwb++++ A1B1 - DMA Source Address for Channel 1 bank byte\n   bbbbbbbb hhhhhhhh llllllll\n\n   This specifies the starting Address Bus A address for the DMA transfer,\n   or the beginning of the HDMA table for HDMA transfers. Note that Bus A\n   does not access the Bus B registers, so pointing this address at say\n   $00:2100 results in open bus.\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. However, current theory is that only $4314 will\n   affect the transfer. The changes will take effect at the next HDMA\n   init.\n\n   During DMA, $4312/3 will be incremented or decremented as specified by\n   $4310. However $4314 will NOT be adjusted. These registers will not be\n   affected by HDMA.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4315',
    'length': '3 bytes. Ends at $4317.',
    'beginsAt': 17173,
    'endsAt': 17175,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ DAS1L - DMA Size/HDMA Indirect Address low byte\nrwh++++ DAS1H - DMA Size/HDMA Indirect Address high byte\nrwb++++ DASB1 - HDMA Indirect Address bank byte\n   bbbbbbbb hhhhhhhh llllllll\n\n   For DMA, $4315/6 indicate the number of bytes to transfer. Note that\n   this is a strict limit: if this is set to 1 then only 1 byte will be\n   written, even if the transfer mode specifies 2 or 4 registers (and if\n   this is 5, all 4 registers would be written once, then the first only\n   would be written a second time). Note, however, that writing $0000 to\n   this register actually results in a transfer of $10000 bytes, not 0.\n\n   $4315/6 are decremented during DMA, and thus typically end up set to 0\n   when DMA is complete.\n\n   For HDMA, $4317 specifies the bank for indirect addressing mode. The\n   indirect address is copied into $4315/6 and incremented appropriately.\n   For direct HDMA, these registers are not used or altered.\n\n   Writes to $4317 during indirect HDMA will take effect for the next\n   transfer. Writes to $4315/6 during indirect HDMA will also take effect\n   for the next HDMA transfer, however this is only noticable during\n   repeat mode (for normal mode, a new indirect address will be read from\n   the table before the transfer). For a direct transfer, presumably\n   nothing will happen.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4318',
    'length': '2 bytes. Ends at $4319.',
    'beginsAt': 17176,
    'endsAt': 17177,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ A2A1L - HDMA Table Address low byte\nrwh++++ A2A1H - HDMA Table Address high byte\n   aaaaaaaa aaaaaaaa\n\n   At the beginning of the frame $4312/3 are copied into this register for\n   all active HDMA channels, and then this register is updated as the\n   table is read. Thus, if a game wishes to start HDMA mid-frame (or\n   change tables mid-frame), this register must be written. Writing this\n   register mid-frame changes the table address for the next scanline.\n\n   This register is not used for DMA.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$431A',
    'length': '1 byte',
    'beginsAt': 17178,
    'endsAt': 17178,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ NLTR1 - HDMA Line Counter\n   rccccccc\n\n   r    = Repeat Select. When set, the HDMA transfer will be performed\n       every line, rather than only when this register is loaded from the\n       table. However, this byte (and the indirect HDMA address) will only\n       be reloaded from the table when the counter reaches 0.\n\n   ccccccc = Line count. This is decremented every scanline. When it\n       reaches 0, a byte is read from the HDMA table into this register\n       (and the indirect HDMA address is read into $4315/6 if applicable).\n\n   One oddity: the register is decremeted before being checked for r\n   status or c==0. Thus, setting a value of $80 is really "128 lines with\n   no repeat" rather than "0 lines with repeat". Similarly, a value of $00\n   will be "128 lines with repeat" when it doesn\'t mean "terminate the\n   channel".\n\n   This register is initialized at the end of V-Blank for every active\n   HDMA channel. Note that if a game wishes to begin HDMA during the\n   frame, it will most likely have to initalize this register. Writing\n   this mid-transfer will similarly change the count and repeat to take\n   effect next scanline. Remember though that \'repeat\' won\'t take effect\n   until after the next transfer period.\n\n   This register is set to $ff on power on, and is unchanged on reset.\n\n   See the section "DMA AND HDMA" below for more information.'
  },
  {
    'address': '$431B',
    'length': '2 bytes. Ends at $431C.',
    'beginsAt': 17179,
    'endsAt': 17180,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ ????1 - Unknown\nrwb++++ ????1 - Unknown\n   ????????\n\n   The effects of these registers (if any) are unknown. $431F and $431B\n   are really aliases for the same register.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4320',
    'length': '1 byte',
    'beginsAt': 17184,
    'endsAt': 17184,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ DMAP2 - DMA Control for Channel 2\n   da-ifttt\n\n   d    = Transfer Direction. When clear, data will be read from the CPU\n       memory and written to the PPU register. When set, vice versa.\n       \n       Contrary to previous belief, this bit DOES affect HDMA! Indirect\n       mode is more useful, it will read the table as normal and write\n       from Bus B to the Bus A address specified. Direct mode will work as\n       expected though, it will read counts from the table and try to\n       write the data values into the table.\n\n   a    = HDMA Addressing Mode. When clear, the HDMA table contains the\n       data to transfer. When set, the HDMA table contains pointers to the\n       data. This bit does not affect DMA.\n\n   i    = DMA Address Increment. When clear, the DMA address will be\n       incremented for each byte. When set, the DMA address will be\n       decremented. This bit does not affect HDMA.\n\n   f    = DMA Fixed Transfer. When set, the DMA address will not be\n       adjusted. When clear, the address will be adjusted as specified by\n       bit 4. This bit does not affect HDMA.\n\n   ttt  = Transfer Mode.\n       000 => 1 register write once             (1 byte:  p               )\n       001 => 2 registers write once            (2 bytes: p, p+1          )\n       010 => 1 register write twice            (2 bytes: p, p            )\n       011 => 2 registers write twice each      (4 bytes: p, p,   p+1, p+1)\n       100 => 4 registers write once            (4 bytes: p, p+1, p+2, p+3)\n       101 => 2 registers write twice alternate (4 bytes: p, p+1, p,   p+1)\n       110 => 1 register write twice            (2 bytes: p, p            )\n       111 => 2 registers write twice each      (4 bytes: p, p,   p+1, p+1)\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. Most likely, the change takes effect for the\n   next HDMA transfer.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4321',
    'length': '1 byte',
    'beginsAt': 17185,
    'endsAt': 17185,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ BBAD2 - DMA Destination Register for Channel 2\n   pppppppp\n\n   This specifies the Bus B address to access. Considering the standard\n   CPU memory space, this specifies which address $00:2100-$00:21FF to\n   access, with two- and four-register modes wrapping $21FF->$2100, not\n   $2200.\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. Most likely, the change takes effect for the\n   next transfer.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4322',
    'length': '3 bytes. Ends at $4324.',
    'beginsAt': 17186,
    'endsAt': 17188,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ A1T2L - DMA Source Address for Channel 2 low byte\nrwh++++ A1T2H - DMA Source Address for Channel 2 high byte\nrwb++++ A1B2 - DMA Source Address for Channel 2 bank byte\n   bbbbbbbb hhhhhhhh llllllll\n\n   This specifies the starting Address Bus A address for the DMA transfer,\n   or the beginning of the HDMA table for HDMA transfers. Note that Bus A\n   does not access the Bus B registers, so pointing this address at say\n   $00:2100 results in open bus.\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. However, current theory is that only $4324 will\n   affect the transfer. The changes will take effect at the next HDMA\n   init.\n\n   During DMA, $4322/3 will be incremented or decremented as specified by\n   $4322/3. However $4324 will NOT be adjusted. These registers will not be\n   affected by HDMA.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4325',
    'length': '3 bytes. Ends at $4327.',
    'beginsAt': 17189,
    'endsAt': 17191,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ DAS2L - DMA Size/HDMA Indirect Address low byte\nrwh++++ DAS2H - DMA Size/HDMA Indirect Address high byte\nrwb++++ DASB2 - HDMA Indirect Address bank byte\n   bbbbbbbb hhhhhhhh llllllll\n\n   For DMA, $4325/6 indicate the number of bytes to transfer. Note that\n   this is a strict limit: if this is set to 1 then only 1 byte will be\n   written, even if the transfer mode specifies 2 or 4 registers (and if\n   this is 5, all 4 registers would be written once, then the first only\n   would be written a second time). Note, however, that writing $0000 to\n   this register actually results in a transfer of $10000 bytes, not 0.\n\n   $4325/6 are decremented during DMA, and thus typically end up set to 0\n   when DMA is complete.\n\n   For HDMA, $4327 specifies the bank for indirect addressing mode. The\n   indirect address is copied into $4325/6 and incremented appropriately.\n   For direct HDMA, these registers are not used or altered.\n\n   Writes to $4327 during indirect HDMA will take effect for the next\n   transfer. Writes to $4325/6 during indirect HDMA will also take effect\n   for the next HDMA transfer, however this is only noticable during\n   repeat mode (for normal mode, a new indirect address will be read from\n   the table before the transfer). For a direct transfer, presumably\n   nothing will happen.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4328',
    'length': '2 bytes. Ends at $4329.',
    'beginsAt': 17192,
    'endsAt': 17193,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ A2A2L - HDMA Table Address low byte\nrwh++++ A2A2H - HDMA Table Address high byte\n   aaaaaaaa aaaaaaaa\n\n   At the beginning of the frame $4322/3 are copied into this register for\n   all active HDMA channels, and then this register is updated as the\n   table is read. Thus, if a game wishes to start HDMA mid-frame (or\n   change tables mid-frame), this register must be written. Writing this\n   register mid-frame changes the table address for the next scanline.\n\n   This register is not used for DMA.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$432A',
    'length': '1 byte',
    'beginsAt': 17194,
    'endsAt': 17194,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ NLTR2 - HDMA Line Counter\n   rccccccc\n\n   r    = Repeat Select. When set, the HDMA transfer will be performed\n       every line, rather than only when this register is loaded from the\n       table. However, this byte (and the indirect HDMA address) will only\n       be reloaded from the table when the counter reaches 0.\n\n   ccccccc = Line count. This is decremented every scanline. When it\n       reaches 0, a byte is read from the HDMA table into this register\n       (and the indirect HDMA address is read into $4325/6 if applicable).\n\n   One oddity: the register is decremeted before being checked for r\n   status or c==0. Thus, setting a value of $80 is really "128 lines with\n   no repeat" rather than "0 lines with repeat". Similarly, a value of $00\n   will be "128 lines with repeat" when it doesn\'t mean "terminate the\n   channel".\n\n   This register is initialized at the end of V-Blank for every active\n   HDMA channel. Note that if a game wishes to begin HDMA during the\n   frame, it will most likely have to initalize this register. Writing\n   this mid-transfer will similarly change the count and repeat to take\n   effect next scanline. Remember though that \'repeat\' won\'t take effect\n   until after the next transfer period.\n\n   This register is set to $ff on power on, and is unchanged on reset.\n\n   See the section "DMA AND HDMA" below for more information.'
  },
  {
    'address': '$432B',
    'length': '2 bytes. Ends at $432C.',
    'beginsAt': 17195,
    'endsAt': 17196,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ ????2 - Unknown\nrwb++++ ????2 - Unknown\n   ????????\n\n   The effects of these registers (if any) are unknown. $432F and $432B\n   are really aliases for the same register.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4330',
    'length': '1 byte',
    'beginsAt': 17200,
    'endsAt': 17200,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ DMAP3 - DMA Control for Channel 3\n   da-ifttt\n\n   d    = Transfer Direction. When clear, data will be read from the CPU\n       memory and written to the PPU register. When set, vice versa.\n       \n       Contrary to previous belief, this bit DOES affect HDMA! Indirect\n       mode is more useful, it will read the table as normal and write\n       from Bus B to the Bus A address specified. Direct mode will work as\n       expected though, it will read counts from the table and try to\n       write the data values into the table.\n\n   a    = HDMA Addressing Mode. When clear, the HDMA table contains the\n       data to transfer. When set, the HDMA table contains pointers to the\n       data. This bit does not affect DMA.\n\n   i    = DMA Address Increment. When clear, the DMA address will be\n       incremented for each byte. When set, the DMA address will be\n       decremented. This bit does not affect HDMA.\n\n   f    = DMA Fixed Transfer. When set, the DMA address will not be\n       adjusted. When clear, the address will be adjusted as specified by\n       bit 4. This bit does not affect HDMA.\n\n   ttt  = Transfer Mode.\n       000 => 1 register write once             (1 byte:  p               )\n       001 => 2 registers write once            (2 bytes: p, p+1          )\n       010 => 1 register write twice            (2 bytes: p, p            )\n       011 => 2 registers write twice each      (4 bytes: p, p,   p+1, p+1)\n       100 => 4 registers write once            (4 bytes: p, p+1, p+2, p+3)\n       101 => 2 registers write twice alternate (4 bytes: p, p+1, p,   p+1)\n       110 => 1 register write twice            (2 bytes: p, p            )\n       111 => 2 registers write twice each      (4 bytes: p, p,   p+1, p+1)\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. Most likely, the change takes effect for the\n   next HDMA transfer.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4331',
    'length': '1 byte',
    'beginsAt': 17201,
    'endsAt': 17201,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ BBAD3 - DMA Destination Register for Channel 3\n   pppppppp\n\n   This specifies the Bus B address to access. Considering the standard\n   CPU memory space, this specifies which address $00:2100-$00:21FF to\n   access, with two- and four-register modes wrapping $21FF->$2100, not\n   $2200.\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. Most likely, the change takes effect for the\n   next transfer.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4332',
    'length': '3 bytes. Ends at $4334.',
    'beginsAt': 17202,
    'endsAt': 17204,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ A1T3L - DMA Source Address for Channel 3 low byte\nrwh++++ A1T3H - DMA Source Address for Channel 3 high byte\nrwb++++ A1B3 - DMA Source Address for Channel 3 bank byte\n   bbbbbbbb hhhhhhhh llllllll\n\n   This specifies the starting Address Bus A address for the DMA transfer,\n   or the beginning of the HDMA table for HDMA transfers. Note that Bus A\n   does not access the Bus B registers, so pointing this address at say\n   $00:2100 results in open bus.\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. However, current theory is that only $4334 will\n   affect the transfer. The changes will take effect at the next HDMA\n   init.\n\n   During DMA, $4332/3 will be incremented or decremented as specified by\n   $4332/3. However $4334 will NOT be adjusted. These registers will not be\n   affected by HDMA.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4335',
    'length': '3 bytes. Ends at $4337.',
    'beginsAt': 17205,
    'endsAt': 17207,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ DAS3L - DMA Size/HDMA Indirect Address low byte\nrwh++++ DAS3H - DMA Size/HDMA Indirect Address high byte\nrwb++++ DASB3 - HDMA Indirect Address bank byte\n   bbbbbbbb hhhhhhhh llllllll\n\n   For DMA, $4335/6 indicate the number of bytes to transfer. Note that\n   this is a strict limit: if this is set to 1 then only 1 byte will be\n   written, even if the transfer mode specifies 2 or 4 registers (and if\n   this is 5, all 4 registers would be written once, then the first only\n   would be written a second time). Note, however, that writing $0000 to\n   this register actually results in a transfer of $10000 bytes, not 0.\n\n   $4335/6 are decremented during DMA, and thus typically end up set to 0\n   when DMA is complete.\n\n   For HDMA, $4337 specifies the bank for indirect addressing mode. The\n   indirect address is copied into $4335/6 and incremented appropriately.\n   For direct HDMA, these registers are not used or altered.\n\n   Writes to $4337 during indirect HDMA will take effect for the next\n   transfer. Writes to $4335/6 during indirect HDMA will also take effect\n   for the next HDMA transfer, however this is only noticable during\n   repeat mode (for normal mode, a new indirect address will be read from\n   the table before the transfer). For a direct transfer, presumably\n   nothing will happen.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4338',
    'length': '2 bytes. Ends at $4339.',
    'beginsAt': 17208,
    'endsAt': 17209,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ A2A3L - HDMA Table Address low byte\nrwh++++ A2A3H - HDMA Table Address high byte\n   aaaaaaaa aaaaaaaa\n\n   At the beginning of the frame $4332/3 are copied into this register for\n   all active HDMA channels, and then this register is updated as the\n   table is read. Thus, if a game wishes to start HDMA mid-frame (or\n   change tables mid-frame), this register must be written. Writing this\n   register mid-frame changes the table address for the next scanline.\n\n   This register is not used for DMA.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$433A',
    'length': '1 byte',
    'beginsAt': 17210,
    'endsAt': 17210,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ NLTR3 - HDMA Line Counter\n   rccccccc\n\n   r    = Repeat Select. When set, the HDMA transfer will be performed\n       every line, rather than only when this register is loaded from the\n       table. However, this byte (and the indirect HDMA address) will only\n       be reloaded from the table when the counter reaches 0.\n\n   ccccccc = Line count. This is decremented every scanline. When it\n       reaches 0, a byte is read from the HDMA table into this register\n       (and the indirect HDMA address is read into $4335/6 if applicable).\n\n   One oddity: the register is decremeted before being checked for r\n   status or c==0. Thus, setting a value of $80 is really "128 lines with\n   no repeat" rather than "0 lines with repeat". Similarly, a value of $00\n   will be "128 lines with repeat" when it doesn\'t mean "terminate the\n   channel".\n\n   This register is initialized at the end of V-Blank for every active\n   HDMA channel. Note that if a game wishes to begin HDMA during the\n   frame, it will most likely have to initalize this register. Writing\n   this mid-transfer will similarly change the count and repeat to take\n   effect next scanline. Remember though that \'repeat\' won\'t take effect\n   until after the next transfer period.\n\n   This register is set to $ff on power on, and is unchanged on reset.\n\n   See the section "DMA AND HDMA" below for more information.'
  },
  {
    'address': '$433B',
    'length': '2 bytes. Ends at $433C.',
    'beginsAt': 17211,
    'endsAt': 17212,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ ????3 - Unknown\nrwb++++ ????3 - Unknown\n   ????????\n\n   The effects of these registers (if any) are unknown. $433F and $433B\n   are really aliases for the same register.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4340',
    'length': '1 byte',
    'beginsAt': 17216,
    'endsAt': 17216,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ DMAP4 - DMA Control for Channel 4\n   da-ifttt\n\n   d    = Transfer Direction. When clear, data will be read from the CPU\n       memory and written to the PPU register. When set, vice versa.\n       \n       Contrary to previous belief, this bit DOES affect HDMA! Indirect\n       mode is more useful, it will read the table as normal and write\n       from Bus B to the Bus A address specified. Direct mode will work as\n       expected though, it will read counts from the table and try to\n       write the data values into the table.\n\n   a    = HDMA Addressing Mode. When clear, the HDMA table contains the\n       data to transfer. When set, the HDMA table contains pointers to the\n       data. This bit does not affect DMA.\n\n   i    = DMA Address Increment. When clear, the DMA address will be\n       incremented for each byte. When set, the DMA address will be\n       decremented. This bit does not affect HDMA.\n\n   f    = DMA Fixed Transfer. When set, the DMA address will not be\n       adjusted. When clear, the address will be adjusted as specified by\n       bit 4. This bit does not affect HDMA.\n\n   ttt  = Transfer Mode.\n       000 => 1 register write once             (1 byte:  p               )\n       001 => 2 registers write once            (2 bytes: p, p+1          )\n       010 => 1 register write twice            (2 bytes: p, p            )\n       011 => 2 registers write twice each      (4 bytes: p, p,   p+1, p+1)\n       100 => 4 registers write once            (4 bytes: p, p+1, p+2, p+3)\n       101 => 2 registers write twice alternate (4 bytes: p, p+1, p,   p+1)\n       110 => 1 register write twice            (2 bytes: p, p            )\n       111 => 2 registers write twice each      (4 bytes: p, p,   p+1, p+1)\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. Most likely, the change takes effect for the\n   next HDMA transfer.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4341',
    'length': '1 byte',
    'beginsAt': 17217,
    'endsAt': 17217,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ BBAD4 - DMA Destination Register for Channel 4\n   pppppppp\n\n   This specifies the Bus B address to access. Considering the standard\n   CPU memory space, this specifies which address $00:2100-$00:21FF to\n   access, with two- and four-register modes wrapping $21FF->$2100, not\n   $2200.\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. Most likely, the change takes effect for the\n   next transfer.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4342',
    'length': '3 bytes. Ends at $4344.',
    'beginsAt': 17218,
    'endsAt': 17220,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ A1T4L - DMA Source Address for Channel 4 low byte\nrwh++++ A1T4H - DMA Source Address for Channel 4 high byte\nrwb++++ A1B4 - DMA Source Address for Channel 4 bank byte\n   bbbbbbbb hhhhhhhh llllllll\n\n   This specifies the starting Address Bus A address for the DMA transfer,\n   or the beginning of the HDMA table for HDMA transfers. Note that Bus A\n   does not access the Bus B registers, so pointing this address at say\n   $00:2100 results in open bus.\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. However, current theory is that only $4344 will\n   affect the transfer. The changes will take effect at the next HDMA\n   init.\n\n   During DMA, $4342/3 will be incremented or decremented as specified by\n   $4342/3. However $4344 will NOT be adjusted. These registers will not be\n   affected by HDMA.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4345',
    'length': '3 bytes. Ends at $4347.',
    'beginsAt': 17221,
    'endsAt': 17223,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ DAS4L - DMA Size/HDMA Indirect Address low byte\nrwh++++ DAS4H - DMA Size/HDMA Indirect Address high byte\nrwb++++ DASB4 - HDMA Indirect Address bank byte\n   bbbbbbbb hhhhhhhh llllllll\n\n   For DMA, $4345/6 indicate the number of bytes to transfer. Note that\n   this is a strict limit: if this is set to 1 then only 1 byte will be\n   written, even if the transfer mode specifies 2 or 4 registers (and if\n   this is 5, all 4 registers would be written once, then the first only\n   would be written a second time). Note, however, that writing $0000 to\n   this register actually results in a transfer of $10000 bytes, not 0.\n\n   $4345/6 are decremented during DMA, and thus typically end up set to 0\n   when DMA is complete.\n\n   For HDMA, $4347 specifies the bank for indirect addressing mode. The\n   indirect address is copied into $4345/6 and incremented appropriately.\n   For direct HDMA, these registers are not used or altered.\n\n   Writes to $4347 during indirect HDMA will take effect for the next\n   transfer. Writes to $4345/6 during indirect HDMA will also take effect\n   for the next HDMA transfer, however this is only noticable during\n   repeat mode (for normal mode, a new indirect address will be read from\n   the table before the transfer). For a direct transfer, presumably\n   nothing will happen.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4348',
    'length': '2 bytes. Ends at $4349.',
    'beginsAt': 17224,
    'endsAt': 17225,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ A2A4L - HDMA Table Address low byte\nrwh++++ A2A4H - HDMA Table Address high byte\n   aaaaaaaa aaaaaaaa\n\n   At the beginning of the frame $4342/3 are copied into this register for\n   all active HDMA channels, and then this register is updated as the\n   table is read. Thus, if a game wishes to start HDMA mid-frame (or\n   change tables mid-frame), this register must be written. Writing this\n   register mid-frame changes the table address for the next scanline.\n\n   This register is not used for DMA.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$434A',
    'length': '1 byte',
    'beginsAt': 17226,
    'endsAt': 17226,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ NLTR4 - HDMA Line Counter\n   rccccccc\n\n   r    = Repeat Select. When set, the HDMA transfer will be performed\n       every line, rather than only when this register is loaded from the\n       table. However, this byte (and the indirect HDMA address) will only\n       be reloaded from the table when the counter reaches 0.\n\n   ccccccc = Line count. This is decremented every scanline. When it\n       reaches 0, a byte is read from the HDMA table into this register\n       (and the indirect HDMA address is read into $4345/6 if applicable).\n\n   One oddity: the register is decremeted before being checked for r\n   status or c==0. Thus, setting a value of $80 is really "128 lines with\n   no repeat" rather than "0 lines with repeat". Similarly, a value of $00\n   will be "128 lines with repeat" when it doesn\'t mean "terminate the\n   channel".\n\n   This register is initialized at the end of V-Blank for every active\n   HDMA channel. Note that if a game wishes to begin HDMA during the\n   frame, it will most likely have to initalize this register. Writing\n   this mid-transfer will similarly change the count and repeat to take\n   effect next scanline. Remember though that \'repeat\' won\'t take effect\n   until after the next transfer period.\n\n   This register is set to $ff on power on, and is unchanged on reset.\n\n   See the section "DMA AND HDMA" below for more information.'
  },
  {
    'address': '$434B',
    'length': '2 bytes. Ends at $434C.',
    'beginsAt': 17227,
    'endsAt': 17228,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ ????4 - Unknown\nrwb++++ ????4 - Unknown\n   ????????\n\n   The effects of these registers (if any) are unknown. $434F and $434B\n   are really aliases for the same register.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4350',
    'length': '1 byte',
    'beginsAt': 17232,
    'endsAt': 17232,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ DMAP5 - DMA Control for Channel 5\n   da-ifttt\n\n   d    = Transfer Direction. When clear, data will be read from the CPU\n       memory and written to the PPU register. When set, vice versa.\n       \n       Contrary to previous belief, this bit DOES affect HDMA! Indirect\n       mode is more useful, it will read the table as normal and write\n       from Bus B to the Bus A address specified. Direct mode will work as\n       expected though, it will read counts from the table and try to\n       write the data values into the table.\n\n   a    = HDMA Addressing Mode. When clear, the HDMA table contains the\n       data to transfer. When set, the HDMA table contains pointers to the\n       data. This bit does not affect DMA.\n\n   i    = DMA Address Increment. When clear, the DMA address will be\n       incremented for each byte. When set, the DMA address will be\n       decremented. This bit does not affect HDMA.\n\n   f    = DMA Fixed Transfer. When set, the DMA address will not be\n       adjusted. When clear, the address will be adjusted as specified by\n       bit 4. This bit does not affect HDMA.\n\n   ttt  = Transfer Mode.\n       000 => 1 register write once             (1 byte:  p               )\n       001 => 2 registers write once            (2 bytes: p, p+1          )\n       010 => 1 register write twice            (2 bytes: p, p            )\n       011 => 2 registers write twice each      (4 bytes: p, p,   p+1, p+1)\n       100 => 4 registers write once            (4 bytes: p, p+1, p+2, p+3)\n       101 => 2 registers write twice alternate (4 bytes: p, p+1, p,   p+1)\n       110 => 1 register write twice            (2 bytes: p, p            )\n       111 => 2 registers write twice each      (4 bytes: p, p,   p+1, p+1)\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. Most likely, the change takes effect for the\n   next HDMA transfer.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4351',
    'length': '1 byte',
    'beginsAt': 17233,
    'endsAt': 17233,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ BBAD5 - DMA Destination Register for Channel 5\n   pppppppp\n\n   This specifies the Bus B address to access. Considering the standard\n   CPU memory space, this specifies which address $00:2100-$00:21FF to\n   access, with two- and four-register modes wrapping $21FF->$2100, not\n   $2200.\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. Most likely, the change takes effect for the\n   next transfer.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4352',
    'length': '3 bytes. Ends at $4354.',
    'beginsAt': 17234,
    'endsAt': 17236,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ A1T5L - DMA Source Address for Channel 5 low byte\nrwh++++ A1T5H - DMA Source Address for Channel 5 high byte\nrwb++++ A1B5 - DMA Source Address for Channel 5 bank byte\n   bbbbbbbb hhhhhhhh llllllll\n\n   This specifies the starting Address Bus A address for the DMA transfer,\n   or the beginning of the HDMA table for HDMA transfers. Note that Bus A\n   does not access the Bus B registers, so pointing this address at say\n   $00:2100 results in open bus.\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. However, current theory is that only $4354 will\n   affect the transfer. The changes will take effect at the next HDMA\n   init.\n\n   During DMA, $4352/3 will be incremented or decremented as specified by\n   $4352/3. However $4354 will NOT be adjusted. These registers will not be\n   affected by HDMA.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4355',
    'length': '3 bytes. Ends at $4357.',
    'beginsAt': 17237,
    'endsAt': 17239,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ DAS5L - DMA Size/HDMA Indirect Address low byte\nrwh++++ DAS5H - DMA Size/HDMA Indirect Address high byte\nrwb++++ DASB5 - HDMA Indirect Address bank byte\n   bbbbbbbb hhhhhhhh llllllll\n\n   For DMA, $4355/6 indicate the number of bytes to transfer. Note that\n   this is a strict limit: if this is set to 1 then only 1 byte will be\n   written, even if the transfer mode specifies 2 or 4 registers (and if\n   this is 5, all 4 registers would be written once, then the first only\n   would be written a second time). Note, however, that writing $0000 to\n   this register actually results in a transfer of $10000 bytes, not 0.\n\n   $4355/6 are decremented during DMA, and thus typically end up set to 0\n   when DMA is complete.\n\n   For HDMA, $4357 specifies the bank for indirect addressing mode. The\n   indirect address is copied into $4355/6 and incremented appropriately.\n   For direct HDMA, these registers are not used or altered.\n\n   Writes to $4357 during indirect HDMA will take effect for the next\n   transfer. Writes to $4355/6 during indirect HDMA will also take effect\n   for the next HDMA transfer, however this is only noticable during\n   repeat mode (for normal mode, a new indirect address will be read from\n   the table before the transfer). For a direct transfer, presumably\n   nothing will happen.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4358',
    'length': '2 bytes. Ends at $4359.',
    'beginsAt': 17240,
    'endsAt': 17241,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ A2A5L - HDMA Table Address low byte\nrwh++++ A2A5H - HDMA Table Address high byte\n   aaaaaaaa aaaaaaaa\n\n   At the beginning of the frame $4352/3 are copied into this register for\n   all active HDMA channels, and then this register is updated as the\n   table is read. Thus, if a game wishes to start HDMA mid-frame (or\n   change tables mid-frame), this register must be written. Writing this\n   register mid-frame changes the table address for the next scanline.\n\n   This register is not used for DMA.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$435A',
    'length': '1 byte',
    'beginsAt': 17242,
    'endsAt': 17242,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ NLTR5 - HDMA Line Counter\n   rccccccc\n\n   r    = Repeat Select. When set, the HDMA transfer will be performed\n       every line, rather than only when this register is loaded from the\n       table. However, this byte (and the indirect HDMA address) will only\n       be reloaded from the table when the counter reaches 0.\n\n   ccccccc = Line count. This is decremented every scanline. When it\n       reaches 0, a byte is read from the HDMA table into this register\n       (and the indirect HDMA address is read into $4355/6 if applicable).\n\n   One oddity: the register is decremeted before being checked for r\n   status or c==0. Thus, setting a value of $80 is really "128 lines with\n   no repeat" rather than "0 lines with repeat". Similarly, a value of $00\n   will be "128 lines with repeat" when it doesn\'t mean "terminate the\n   channel".\n\n   This register is initialized at the end of V-Blank for every active\n   HDMA channel. Note that if a game wishes to begin HDMA during the\n   frame, it will most likely have to initalize this register. Writing\n   this mid-transfer will similarly change the count and repeat to take\n   effect next scanline. Remember though that \'repeat\' won\'t take effect\n   until after the next transfer period.\n\n   This register is set to $ff on power on, and is unchanged on reset.\n\n   See the section "DMA AND HDMA" below for more information.'
  },
  {
    'address': '$435B',
    'length': '2 bytes. Ends at $435C.',
    'beginsAt': 17243,
    'endsAt': 17244,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ ????5 - Unknown\nrwb++++ ????5 - Unknown\n   ????????\n\n   The effects of these registers (if any) are unknown. $435F and $435B\n   are really aliases for the same register.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4360',
    'length': '1 byte',
    'beginsAt': 17248,
    'endsAt': 17248,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ DMAP6 - DMA Control for Channel 6\n   da-ifttt\n\n   d    = Transfer Direction. When clear, data will be read from the CPU\n       memory and written to the PPU register. When set, vice versa.\n       \n       Contrary to previous belief, this bit DOES affect HDMA! Indirect\n       mode is more useful, it will read the table as normal and write\n       from Bus B to the Bus A address specified. Direct mode will work as\n       expected though, it will read counts from the table and try to\n       write the data values into the table.\n\n   a    = HDMA Addressing Mode. When clear, the HDMA table contains the\n       data to transfer. When set, the HDMA table contains pointers to the\n       data. This bit does not affect DMA.\n\n   i    = DMA Address Increment. When clear, the DMA address will be\n       incremented for each byte. When set, the DMA address will be\n       decremented. This bit does not affect HDMA.\n\n   f    = DMA Fixed Transfer. When set, the DMA address will not be\n       adjusted. When clear, the address will be adjusted as specified by\n       bit 4. This bit does not affect HDMA.\n\n   ttt  = Transfer Mode.\n       000 => 1 register write once             (1 byte:  p               )\n       001 => 2 registers write once            (2 bytes: p, p+1          )\n       010 => 1 register write twice            (2 bytes: p, p            )\n       011 => 2 registers write twice each      (4 bytes: p, p,   p+1, p+1)\n       100 => 4 registers write once            (4 bytes: p, p+1, p+2, p+3)\n       101 => 2 registers write twice alternate (4 bytes: p, p+1, p,   p+1)\n       110 => 1 register write twice            (2 bytes: p, p            )\n       111 => 2 registers write twice each      (4 bytes: p, p,   p+1, p+1)\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. Most likely, the change takes effect for the\n   next HDMA transfer.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4361',
    'length': '1 byte',
    'beginsAt': 17249,
    'endsAt': 17249,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ BBAD6 - DMA Destination Register for Channel 6\n   pppppppp\n\n   This specifies the Bus B address to access. Considering the standard\n   CPU memory space, this specifies which address $00:2100-$00:21FF to\n   access, with two- and four-register modes wrapping $21FF->$2100, not\n   $2200.\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. Most likely, the change takes effect for the\n   next transfer.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4362',
    'length': '3 bytes. Ends at $4364.',
    'beginsAt': 17250,
    'endsAt': 17252,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ A1T6L - DMA Source Address for Channel 6 low byte\nrwh++++ A1T6H - DMA Source Address for Channel 6 high byte\nrwb++++ A1B6 - DMA Source Address for Channel 6 bank byte\n   bbbbbbbb hhhhhhhh llllllll\n\n   This specifies the starting Address Bus A address for the DMA transfer,\n   or the beginning of the HDMA table for HDMA transfers. Note that Bus A\n   does not access the Bus B registers, so pointing this address at say\n   $00:2100 results in open bus.\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. However, current theory is that only $4364 will\n   affect the transfer. The changes will take effect at the next HDMA\n   init.\n\n   During DMA, $4362/3 will be incremented or decremented as specified by\n   $4362/3. However $4364 will NOT be adjusted. These registers will not be\n   affected by HDMA.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4365',
    'length': '3 bytes. Ends at $4367.',
    'beginsAt': 17253,
    'endsAt': 17255,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ DAS6L - DMA Size/HDMA Indirect Address low byte\nrwh++++ DAS6H - DMA Size/HDMA Indirect Address high byte\nrwb++++ DASB6 - HDMA Indirect Address bank byte\n   bbbbbbbb hhhhhhhh llllllll\n\n   For DMA, $4365/6 indicate the number of bytes to transfer. Note that\n   this is a strict limit: if this is set to 1 then only 1 byte will be\n   written, even if the transfer mode specifies 2 or 4 registers (and if\n   this is 5, all 4 registers would be written once, then the first only\n   would be written a second time). Note, however, that writing $0000 to\n   this register actually results in a transfer of $10000 bytes, not 0.\n\n   $4365/6 are decremented during DMA, and thus typically end up set to 0\n   when DMA is complete.\n\n   For HDMA, $4367 specifies the bank for indirect addressing mode. The\n   indirect address is copied into $4365/6 and incremented appropriately.\n   For direct HDMA, these registers are not used or altered.\n\n   Writes to $4367 during indirect HDMA will take effect for the next\n   transfer. Writes to $4365/6 during indirect HDMA will also take effect\n   for the next HDMA transfer, however this is only noticable during\n   repeat mode (for normal mode, a new indirect address will be read from\n   the table before the transfer). For a direct transfer, presumably\n   nothing will happen.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4368',
    'length': '2 bytes. Ends at $4369.',
    'beginsAt': 17256,
    'endsAt': 17257,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ A2A6L - HDMA Table Address low byte\nrwh++++ A2A6H - HDMA Table Address high byte\n   aaaaaaaa aaaaaaaa\n\n   At the beginning of the frame $4362/3 are copied into this register for\n   all active HDMA channels, and then this register is updated as the\n   table is read. Thus, if a game wishes to start HDMA mid-frame (or\n   change tables mid-frame), this register must be written. Writing this\n   register mid-frame changes the table address for the next scanline.\n\n   This register is not used for DMA.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$436A',
    'length': '1 byte',
    'beginsAt': 17258,
    'endsAt': 17258,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ NLTR6 - HDMA Line Counter\n   rccccccc\n\n   r    = Repeat Select. When set, the HDMA transfer will be performed\n       every line, rather than only when this register is loaded from the\n       table. However, this byte (and the indirect HDMA address) will only\n       be reloaded from the table when the counter reaches 0.\n\n   ccccccc = Line count. This is decremented every scanline. When it\n       reaches 0, a byte is read from the HDMA table into this register\n       (and the indirect HDMA address is read into $4365/6 if applicable).\n\n   One oddity: the register is decremeted before being checked for r\n   status or c==0. Thus, setting a value of $80 is really "128 lines with\n   no repeat" rather than "0 lines with repeat". Similarly, a value of $00\n   will be "128 lines with repeat" when it doesn\'t mean "terminate the\n   channel".\n\n   This register is initialized at the end of V-Blank for every active\n   HDMA channel. Note that if a game wishes to begin HDMA during the\n   frame, it will most likely have to initalize this register. Writing\n   this mid-transfer will similarly change the count and repeat to take\n   effect next scanline. Remember though that \'repeat\' won\'t take effect\n   until after the next transfer period.\n\n   This register is set to $ff on power on, and is unchanged on reset.\n\n   See the section "DMA AND HDMA" below for more information.'
  },
  {
    'address': '$436B',
    'length': '2 bytes. Ends at $436C.',
    'beginsAt': 17259,
    'endsAt': 17260,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ ????6 - Unknown\nrwb++++ ????6 - Unknown\n   ????????\n\n   The effects of these registers (if any) are unknown. $436F and $436B\n   are really aliases for the same register.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4370',
    'length': '1 byte',
    'beginsAt': 17264,
    'endsAt': 17264,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ DMAP7 - DMA Control for Channel 7\n   da-ifttt\n\n   d    = Transfer Direction. When clear, data will be read from the CPU\n       memory and written to the PPU register. When set, vice versa.\n       \n       Contrary to previous belief, this bit DOES affect HDMA! Indirect\n       mode is more useful, it will read the table as normal and write\n       from Bus B to the Bus A address specified. Direct mode will work as\n       expected though, it will read counts from the table and try to\n       write the data values into the table.\n\n   a    = HDMA Addressing Mode. When clear, the HDMA table contains the\n       data to transfer. When set, the HDMA table contains pointers to the\n       data. This bit does not affect DMA.\n\n   i    = DMA Address Increment. When clear, the DMA address will be\n       incremented for each byte. When set, the DMA address will be\n       decremented. This bit does not affect HDMA.\n\n   f    = DMA Fixed Transfer. When set, the DMA address will not be\n       adjusted. When clear, the address will be adjusted as specified by\n       bit 4. This bit does not affect HDMA.\n\n   ttt  = Transfer Mode.\n       000 => 1 register write once             (1 byte:  p               )\n       001 => 2 registers write once            (2 bytes: p, p+1          )\n       010 => 1 register write twice            (2 bytes: p, p            )\n       011 => 2 registers write twice each      (4 bytes: p, p,   p+1, p+1)\n       100 => 4 registers write once            (4 bytes: p, p+1, p+2, p+3)\n       101 => 2 registers write twice alternate (4 bytes: p, p+1, p,   p+1)\n       110 => 1 register write twice            (2 bytes: p, p            )\n       111 => 2 registers write twice each      (4 bytes: p, p,   p+1, p+1)\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. Most likely, the change takes effect for the\n   next HDMA transfer.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4371',
    'length': '1 byte',
    'beginsAt': 17265,
    'endsAt': 17265,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ BBAD7 - DMA Destination Register for Channel 7\n   pppppppp\n\n   This specifies the Bus B address to access. Considering the standard\n   CPU memory space, this specifies which address $00:2100-$00:21FF to\n   access, with two- and four-register modes wrapping $21FF->$2100, not\n   $2200.\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. Most likely, the change takes effect for the\n   next transfer.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4372',
    'length': '3 bytes. Ends at $4374.',
    'beginsAt': 17266,
    'endsAt': 17268,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ A1T7L - DMA Source Address for Channel 7 low byte\nrwh++++ A1T7H - DMA Source Address for Channel 7 high byte\nrwb++++ A1B7 - DMA Source Address for Channel 7 bank byte\n   bbbbbbbb hhhhhhhh llllllll\n\n   This specifies the starting Address Bus A address for the DMA transfer,\n   or the beginning of the HDMA table for HDMA transfers. Note that Bus A\n   does not access the Bus B registers, so pointing this address at say\n   $00:2100 results in open bus.\n\n   The effect of writing this register during HDMA to the associated\n   channel is unknown. However, current theory is that only $4374 will\n   affect the transfer. The changes will take effect at the next HDMA\n   init.\n\n   During DMA, $4372/3 will be incremented or decremented as specified by\n   $4372/3. However $4374 will NOT be adjusted. These registers will not be\n   affected by HDMA.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4375',
    'length': '3 bytes. Ends at $4377.',
    'beginsAt': 17269,
    'endsAt': 17271,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ DAS7L - DMA Size/HDMA Indirect Address low byte\nrwh++++ DAS7H - DMA Size/HDMA Indirect Address high byte\nrwb++++ DASB7 - HDMA Indirect Address bank byte\n   bbbbbbbb hhhhhhhh llllllll\n\n   For DMA, $4375/6 indicate the number of bytes to transfer. Note that\n   this is a strict limit: if this is set to 1 then only 1 byte will be\n   written, even if the transfer mode specifies 2 or 4 registers (and if\n   this is 5, all 4 registers would be written once, then the first only\n   would be written a second time). Note, however, that writing $0000 to\n   this register actually results in a transfer of $10000 bytes, not 0.\n\n   $4375/6 are decremented during DMA, and thus typically end up set to 0\n   when DMA is complete.\n\n   For HDMA, $4377 specifies the bank for indirect addressing mode. The\n   indirect address is copied into $4375/6 and incremented appropriately.\n   For direct HDMA, these registers are not used or altered.\n\n   Writes to $4377 during indirect HDMA will take effect for the next\n   transfer. Writes to $4375/6 during indirect HDMA will also take effect\n   for the next HDMA transfer, however this is only noticable during\n   repeat mode (for normal mode, a new indirect address will be read from\n   the table before the transfer). For a direct transfer, presumably\n   nothing will happen.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$4378',
    'length': '2 bytes. Ends at $4379.',
    'beginsAt': 17272,
    'endsAt': 17273,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwl++++ A2A7L - HDMA Table Address low byte\nrwh++++ A2A7H - HDMA Table Address high byte\n   aaaaaaaa aaaaaaaa\n\n   At the beginning of the frame $4372/3 are copied into this register for\n   all active HDMA channels, and then this register is updated as the\n   table is read. Thus, if a game wishes to start HDMA mid-frame (or\n   change tables mid-frame), this register must be written. Writing this\n   register mid-frame changes the table address for the next scanline.\n\n   This register is not used for DMA.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  },
  {
    'address': '$437A',
    'length': '1 byte',
    'beginsAt': 17274,
    'endsAt': 17274,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ NLTR7 - HDMA Line Counter\n   rccccccc\n\n   r    = Repeat Select. When set, the HDMA transfer will be performed\n       every line, rather than only when this register is loaded from the\n       table. However, this byte (and the indirect HDMA address) will only\n       be reloaded from the table when the counter reaches 0.\n\n   ccccccc = Line count. This is decremented every scanline. When it\n       reaches 0, a byte is read from the HDMA table into this register\n       (and the indirect HDMA address is read into $4375/6 if applicable).\n\n   One oddity: the register is decremeted before being checked for r\n   status or c==0. Thus, setting a value of $80 is really "128 lines with\n   no repeat" rather than "0 lines with repeat". Similarly, a value of $00\n   will be "128 lines with repeat" when it doesn\'t mean "terminate the\n   channel".\n\n   This register is initialized at the end of V-Blank for every active\n   HDMA channel. Note that if a game wishes to begin HDMA during the\n   frame, it will most likely have to initalize this register. Writing\n   this mid-transfer will similarly change the count and repeat to take\n   effect next scanline. Remember though that \'repeat\' won\'t take effect\n   until after the next transfer period.\n\n   This register is set to $ff on power on, and is unchanged on reset.\n\n   See the section "DMA AND HDMA" below for more information.'
  },
  {
    'address': '$437B',
    'length': '2 bytes. Ends at $437C.',
    'beginsAt': 17275,
    'endsAt': 17276,
    'type': 'SNES Register (DMA)',
    'descriptio':
        'rwb++++ ????7 - Unknown\nrwb++++ ????7 - Unknown\n   ????????\n\n   The effects of these registers (if any) are unknown. $437F and $437B\n   are really aliases for the same register.\n\n   This register is set to $FF on power on, and is unchanged on reset.'
  }
]