/*

[...temp1.rows].filter((d) => d.cells[1].children[0] != undefined ||
d.cells[1].innerHTML == "1 byte")

*/
// TODO: Add overrides used by ZScream/yaze, remove SMW examples
export var HIJACK = [
  {
    'address': '$008023',
    'length': '4 bytes. Ends at $008026.',
    'beginsAt': 32803,
    'endsAt': 32806,
    'type': 'Jump (JML/JSL)',
    'descriptio':
        'Modified by ZSNES incompatibility notice. Jumps to the main code.'
  },
  {
    'address': '$0FF900',
    'length': '110 bytes. Ends at $0FF96D.',
    'beginsAt': 1046784,
    'endsAt': 1046893,
    'type': 'Jump (JML/JSL)',
    'descriptio':
        'Used by Lunar Magic as a routine to decompress a 4bpp GFX file to a specified location in RAM. To use it, load the 16-bit GFX file number into A and 24-bit destination RAM address in $00.\nNote that it won\'t work on GFX32/33.'
  }
]