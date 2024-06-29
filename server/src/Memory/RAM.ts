/* The code that generates this mess, run on SMW Central while viewing all RAM
addresses, load the table element into global var temp1

JSON.stringify([...temp1.rows].map((d) => { return {
        address: d.cells[0].children[0].innerText,
        length: d.cells[1].innerHTML == "1 byte" ? d.cells[1].innerHTML :
d.cells[1].innerText + ". " + d.cells[1].children[0].title, beginsAt:
parseInt("0x" + d.cells[0].children[0].innerText.substr(1,6)), endsAt:
d.cells[1].innerHTML == "1 byte" ? parseInt("0x" +
d.cells[0].children[0].innerText.substr(1,6)) : parseInt("0x" +
d.cells[1].innerHTML.match(/\$[\dABCDEF]+/)[0].substr(1,6)), type:
d.cells[2].innerText, descriptio: d.cells[3].innerText,
}}))
*/
// TODO: Add data based on ALTTP RAM documentation, remove SMW examples
export var RAM =
    [
      {
        'address': '$7E0000',
        'length': '16 bytes. Ends at $7E000F.',
        'beginsAt': 8257536,
        'endsAt': 8257551,
        'type': 'Misc.',
        'descriptio':
            'Scratch RAM, is and can be used for a big number of purposes. The general purpose is temporarily preserving a value for later use in a routine.\nOf note is the following address, used in LM ASM hacks:\n$7E:0003 (16-bit) - Block number from LM Map16 editor. Also used in the custom Map16 tile change routine.'
      },
      {
        'address': '$7FC800',
        'length': '14336 bytes. Ends at $7FFFFF.',
        'beginsAt': 8374272,
        'endsAt': 8388607,
        'type': 'Blocks',
        'descriptio':
            'Map16 high byte table. Same format as $7E:C800.\n$7F:FFF8 through $7F:FFFD are also used by Lunar Magic\'s title screen recording ASM.'
      }
    ]