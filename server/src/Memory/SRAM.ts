export var SRAM = [
  // TODO: Add data based on ALTTP SRAM documentation, remove SMW examples
  {
    'address': '$700000',
    'length': '96 bytes. Ends at $70005F.',
    'beginsAt': 7340032,
    'endsAt': 7340127,
    'type': 'Mario A',
    'descriptio': 'Overworld level setting flags. Mirrored at $7E1EA2.'
  },
  {
    'address': '$7002CB',
    'length': '143 bytes. Ends at $700359.',
    'beginsAt': 7340747,
    'endsAt': 7340889,
    'type': 'Backup',
    'descriptio':
        'Contains a copy of "Mario C" file, after saving.\nLast two represent the checksum complement. Mirrored at $70011E.'
  }
]