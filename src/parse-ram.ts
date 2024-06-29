export function parseRamMap(data) {
  const lines = data.split('\n');
  const ramData = [];
  let currentAddress = null;

  lines.forEach(line => {
    line = line.trim();

    if (line.startsWith(';') || line === '') {
      return; // Ignore comment lines and empty lines
    }

    const addressMatch = line.match(/^(\w+)\s+=\s+\$([0-9A-F]+)/);
    if (addressMatch) {
      if (currentAddress) {
        ramData.push(currentAddress);
      }
      currentAddress = {
        symbol: addressMatch[1],
        address: `$${addressMatch[2]}`,
        beginsAt: parseInt(`0x${addressMatch[2]}`, 16),
        description: ''
      };
      return;
    }

    if (currentAddress) {
      currentAddress.description += line + ' ';
    }
  });

  if (currentAddress) {
    ramData.push(currentAddress);
  }

  return JSON.stringify(ramData, null, 2);
}

const ramMapText = `
; =========================================================
; ---------------------------------------------------------
; USING THIS SYMBOLS MAP
; ---------------------------------------------------------
; Except for larger blocks of data, every address will be given at least one symbol
; Symbols are each given a unique name with focus on hierarchy by nature of usage
;
; Low bytes may be indicated with an "L" suffix
; High bytes are indicated with an "H" suffix
; High bytes that are unused may have a "U" suffix
;
; Bitfields, full or partial, will name each property with a unique letter
; If multiple bits share a letter, they are part of the same property
; and form a larger number that is only part of the address
; All unused bits are marked with a period (.) and no mention of them is made
;
; Unused addresses will be named "UNUSED_AAAAAA"
; Unused addresses will be grouped together and include a comment:
; "FREE RAM: <size>" to make finding free space easier
; Larger blocks will say "BIG FREE RAM"
;
; For documentation on hardware registers, see «registers.asm»
; For documentation on save game data, see «symbols_sram.asm»
; For documentation on APU addresses, see «symbols_apu.asm»
; =========================================================

; =========================================================
; ---------------------------------------------------------
; DIRECT PAGE
; ---------------------------------------------------------
; Reminder that direct page is always an address in bank 00.
; For ALTTP's mapping and functionality this will always be a mirror of bank 7E page 00 or page 1F.
; For the most part, ALTTP leaves the direct page register (D) at $0000.
; The polyhedral code that draws the triforce and crystals will change this register during IRQ.
; The symbols here mirror page 00 of bank 7E.
; ---------------------------------------------------------
; =========================================================

; Any use of these addresses should be considered incredibly volatile.
; LENGTH: 0x10
SCRAP00         = $7E0000
SCRAP01         = $7E0001
SCRAP02         = $7E0002
SCRAP03         = $7E0003
SCRAP04         = $7E0004
SCRAP05         = $7E0005
SCRAP06         = $7E0006
SCRAP07         = $7E0007
SCRAP08         = $7E0008
SCRAP09         = $7E0009

; ---------------------------------------------------------
; TILE ACT NOTES
; ---------------------------------------------------------
; SCRAP0A is used as a direction bitfield during tile act routines.
; ---------------------------------------------------------
; For tile act bitfields, each property is flagged with 4 bits.
; These bits indicate which tile relative Link the tile was found
;
;  a b
;   L
;  c d
;
; abcd
;   a - found to the north west
;   b - found to the north east
;   c - found to the south west
;   d - found to the south east
;
;   L - Link
; ---------------------------------------------------------
SCRAP0A         = $7E000A

SCRAP0B         = $7E000B
SCRAP0C         = $7E000C
SCRAP0D         = $7E000D
SCRAP0E         = $7E000E
SCRAP0F         = $7E000F

; Game mode and submode
; See $00:80B5
MODE            = $7E0010
SUBMODE         = $7E0011

; Before the main loop starts again, $12 is cleared with an STZ
; While 0, it sits in a loop, waiting for interrupts.
; When NMI triggers, it checks this flag to decide if the bulk updates should be performed.
; If NMI reads this flag as zero, it knows the main loop has completed and bulk updates are allowed to occur
; If NMI triggers before the main game code is finished, this flag will be still be nonzero
; such bulk updates will be skipped
; NMI will set this flag to non zero, allowing the loop to exit after NMI
LAG             = $7E0012

; Queue for INIDISP updates; handled during NMI
INIDISPQ        = $7E0013

; NMI update flags
; when non zero, these will trigger a specific graphics update during NMI
NMISTRIPES      = $7E0014
NMICGRAM        = $7E0015
NMIHUD          = $7E0016
NMIINCR         = $7E0017
NMIUP1100       = $7E0018

; Incremental upload VRAM high byte
UPINCVH         = $7E0019

; This counter is incremented every time the main loop runs.
; In other words: every frame that the game is not lagging
FRAME           = $7E001A

; Used to flag indoors/outdoors
;   0x00 - outdoors
;   0x01 - indoors
INDOORS         = $7E001B

; PPU register queues handled during NMI
TMQ             = $7E001C
TSQ             = $7E001D
TMWQ            = $7E001E
TSWQ            = $7E001F

; Link's absolute coordinates
; TODO also used during attract (up through around $34)
POSY            = $7E0020
POSYH           = $7E0021
POSX            = $7E0022
POSXH           = $7E0023

; Takes the value $FFFF when on the ground
POSZ            = $7E0024
POSZH           = $7E0025

; Direction Link is pushing
; .... udlr
;   u - up
;   d - down
;   l - left
;   r - right
PUSHDIR         = $7E0026

; Link's recoil
; By themselves, these do not do much
; They will be reset every frame Link is not in recoil state
KNBY            = $7E0027
KNBX            = $7E0028
KNBZ            = $7E0029
`;

console.log(parseRamMap(ramMapText));