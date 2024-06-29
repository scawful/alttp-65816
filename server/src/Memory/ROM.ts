export var ROM = [
  // TODO: Add data based on ALTTP SRAM documentation, remove SMW examples
  {
    'address': '$008000',
    'length': '39 bytes. Ends at $008026.',
    'beginsAt': 32768,
    'endsAt': 32806,
    'type': 'ASM',
    'descriptio':
        'This is the starting address of SMW. This takes care of basic initialization such as disabling IRQ, HDMA, DMA, clearing the SPC ports, enabling F-blank, disabling emulation mode, disabling decimal mode, initializing the direct page, and setting up the stack.'
  },
  {
    'address': '$0FEF90',
    'length': '4208 bytes. Ends at $0FFFFF.',
    'beginsAt': 1044368,
    'endsAt': 1048575,
    'type': 'Empty',
    'descriptio': 'Empty'
  }
]