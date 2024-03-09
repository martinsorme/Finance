import React from 'react'
import { Icon } from '@iconify/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,

  Center
} from '@chakra-ui/react'

type Props = {title: String, qtitle :String, description: String, top:any}

const HowToAnswer = ({title, qtitle, description, top}: Props) => {
  return (
    <div style={{ marginTop: top}}>
        <Popover>
            <PopoverTrigger>
                <Center w='100%'>
                    <Icon icon="ph:question-light" width="30" />
                </Center>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>{qtitle}</PopoverHeader>
                <PopoverBody>{description}</PopoverBody>
            </PopoverContent>
        </Popover>
        <div style={{alignItems:"center", display:"flex", width:"75px", fontWeight:"bold" , textAlign:"center", fontSize:"12px"}}>{title}</div>        
    </div>
  )
}

export default HowToAnswer
