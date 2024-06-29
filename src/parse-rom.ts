function parseDisassembly(data) {
  const lines = data.split('\n');
  const functions = [];
  let currentFunction = null;
  let sublabels = [];
  let currentAddress = null;

  lines.forEach(line => {
    line = line.trim();

    if (line === '' || line.startsWith(';')) {
      return; // Ignore empty lines and comments
    }

    const functionMatch = line.match(/^(\w+):$/);
    if (functionMatch) {
      if (currentFunction) {
        functions.push(currentFunction);
      }
      currentFunction = {
        name: functionMatch[1],
        address: '',
        beginsAt: null,
        endsAt: null,
        type: 'Function',
        description: '',
        sublabels: []
      };
      return;
    }

    const sublabelMatch = line.match(/^\.(\w+)/);
    if (sublabelMatch) {
      sublabels.push({
        name: sublabelMatch[1],
        address: currentAddress,
        beginsAt: null,
        endsAt: null,
        type: 'Sublabel',
        description: ''
      });
      return;
    }

    const addressMatch = line.match(/^#_(\w+): (.+)$/);
    if (addressMatch) {
      currentAddress = addressMatch[1];
      if (!currentFunction.beginsAt) {
        currentFunction.beginsAt = parseInt(`0x${addressMatch[1]}`, 16);
      }
      currentFunction.description += addressMatch[2] + ' ';
      if (sublabels.length > 0) {
        sublabels[sublabels.length - 1].description += addressMatch[2] + ' ';
      }
      return;
    }

    if (line.includes('RTS') || line.includes('RTL')) {
      currentFunction.endsAt = parseInt(`0x${currentAddress}`, 16);
      if (sublabels.length > 0) {
        sublabels[sublabels.length - 1].endsAt = parseInt(`0x${currentAddress}`, 16);
      }
      currentFunction.sublabels = sublabels;
      sublabels = [];
      return;
    }
  });

  if (currentFunction) {
    functions.push(currentFunction);
  }

  return JSON.stringify(functions, null, 2);
}

const disassemblyText = `Reset:
  #_008000: SEI

  #_008001: STZ.w NMITIMEN
  #_008004: STZ.w HDMAEN
  #_008007: STZ.w MDMAEN

  #_00800A: STZ.w APUIO0
  #_00800D: STZ.w APUIO1
  #_008010: STZ.w APUIO2
  #_008013: STZ.w APUIO3

  #_008016: LDA.b #$80 ; Enable force blank
  #_008018: STA.w INIDISP

  #_00801B: CLC
  #_00801C: XCE

  #_00801D: REP #$28

  #_00801F: LDA.w #$0000
  #_008022: TCD

  #_008023: LDA.w #$01FF
  #_008026: TCS

  #_008027: SEP #$30

  #_008029: JSR LoadIntroSongBank
  #_00802C: JSR InitializeMemoryAndSRAM

  #_00802F: LDA.b #$81 ; enable NMI and auto joypad read
  #_008031: STA.w NMITIMEN

MainGameLoop:
  #_008034: LDA.b $12
  #_008036: BEQ MainGameLoop

  #_008038: CLI

  #_008039: BRA .do_frame

.frame_step
  #_00803B: LDA.b $F6
  #_00803D: AND.b #$20
  #_00803F: BEQ .L_not_pressed

  #_008041: INC.w $0FD7

.L_not_pressed
  #_008044: LDA.b $F6
  #_008046: AND.b #$10
  #_008048: BNE .do_frame

  #_00804A: LDA.w $0FD7
  #_00804D: AND.b #$01
  #_00804F: BNE .skip_frame

.do_frame
  #_008051: INC.b $1A

  #_008053: JSR ClearOAMBuffer
  #_008056: JSL Module_MainRouting

.skip_frame
  #_00805A: JSR NMI_PrepareSprites

  #_00805D: STZ.b $12

  #_00805F: BRA MainGameLoop

Module_MainRouting:
  #_0080B5: LDY.b $10

  #_0080B7: LDA.w .low,Y
  #_0080BA: STA.b $03

  #_0080BC: LDA.w .mid,Y
  #_0080BF: STA.b $04

  #_0080C1: LDA.w .bank,Y
  #_0080C4: STA.b $05

  #_0080C6: JML.w [$0003]`;

console.log(parseDisassembly(disassemblyText));