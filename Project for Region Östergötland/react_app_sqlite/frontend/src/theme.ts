import React from 'react'
import { extendTheme } from '@chakra-ui/react'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        color: '#182745', // text color
      },
      // styles for the `a`
      // a: {
      //   color: 'teal.500',
      //   _hover: {
      //     textDecoration: 'underline',
      //   },
      // },
    },
  },
  components: {
    Button: {
      
      // sizes decide the size of the button 
      sizes: {
        large: {
          h: '50px',
          w: '180px',
          fontSize: 'lg',
          px: '12px',
        },
        medium: {
          h: '40px',
          w: '180px',
          fontSize: 'lg',
          px: '12px',
         
        },
        small: {
          h: '30px',
          w: '180px',
          fontSize: 'lg',
          px: '12px',
         
        },

      },
      // depending on if you want a green, blue or dark blue button these are the names of the different variants. 
      variants: {
        
        darkBlueButton: {
          bg:'var(--darkblue)',
          // fontSize: 'md',
          fontWeight: 'semibold',
          color: '#FFFFFF',
          _hover: {
            bg: '#304979',
          },
          _active: {
            bg: '#131f37',
          },
          _disabled: {
            bg: '#304979 !important',
          },
          rounded: '5px',
        },
        blueButton: {
          bg:'var(--blue)',
          fontSize: 'md',
          fontWeight: 'bold',
          color: '#FFFFFF' 
          
        },
        greenButton: {
          bg:'var(--green)',
          fontWeight: 'semibold',
          color: 'var(--darkblue)',
          _hover: {
            bg: '#a7c26e',
          },
          _active: {
            bg: '#94ad62',
          },
          _disabled: {
            bg: '#a7c26e !important',
          },
        },
        midBlueButton: {
          bg:'#A0C7E3',
          _hover: {
            bg: '#90BDDE',
          },
          _active: {
            bg: '#78a4c4',
          },
          rounded: '20px',
        },
        redButton: {
          bg: '#d83636',
          fontSize: 'md',
          fontWeight: 'semibold',
          color: '#FFFFFF', 
          _hover: {
            bg: '#ad2b2b',
          },
          _active: {
            bg: '#972626',
          },
        },

      },
     
    },
    Progress: {
      baseStyle: {
        track: {
          bg: 'var(--darkblue)',
        },
        filledTrack: {
          bg: 'var(--darkblue)',
        },
      },
    },
    

  },
})

export default theme

