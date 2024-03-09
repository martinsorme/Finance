import React from 'react'
import {
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Progress,
  Box,
  Circle,
  Text,
  VStack,
  Center,
  Flex
} from '@chakra-ui/react'
import { Icon } from '@iconify/react';

const steps = [
  { date: '01-02-2023', description: 'Contact Info' },
  { date: '10-02-2023', description: 'Date & Time' },
  { date: '22-02-2023', description: 'Select Rooms' },
  { date: '30-02-2023', description: 'End'}
]

// custom icon for the steps
const StepIconCustom = () => {
  return (
     <Circle size='19px' bg='var(--darkblue)' color='var(--darkblue)' position='absolute'  zIndex={2} border={'blue'} />
  )
}


type TriangleProps = {
  size?: string
  color?: string
  letter?: string
  style?: React.CSSProperties
}

// triangle with letter for the timeline
const Triangle = ({ size = '30px', color = 'blue', letter = 'P', style  } : TriangleProps) => {
  const triangleStyles = {
    width: '0',
    height: '0',
    borderLeft: `calc(${size} / 2) solid transparent`,
    borderRight: `calc(${size} / 2) solid transparent`,
    borderBottom: `${size} solid ${color}`,
    transform: 'rotate(180deg)',
  };

  return (
     <Flex style={style} direction="column" alignItems="center">
        <Box style={triangleStyles}></Box>
        <Text fontSize={'lg'} as='b' marginTop={'-33px'} zIndex={1}>{letter} </Text>
     </Flex>

  )
};

const TimePlan = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  const activeStepText = steps[activeStep].description

  const max = steps.length - 1
  const progressPercent = (activeStep / max) * 100

  return (
    <div style={{backgroundColor:"#E6F0F8", display:"flex", flexDirection:"column", height: "150px", marginTop:"8px", justifyContent:'center'}}>
      <div style={{width:"120px", fontSize:"28px", color:"#182745", fontWeight:"bold", marginLeft:"15px"}}>Tidsplan</div>
      <Box display={'flex'} justifyContent={'center'} w='100%' position='relative'>
       

        <Box  w='90%' position='relative' minWidth={'390px'} >
          <Stepper size='sm' index={activeStep} border={'none'}  >
            {steps.map((step, index) => (
              <Step key={index} >
                <VStack>
                  <Box flexShrink='0'>
                    <StepTitle style={{marginBottom:'0'}}>{step.date}</StepTitle>
                  </Box>
                  <StepIndicator border={'none'}>
                    <StepStatus complete={<StepIconCustom />} active={<StepIconCustom />} incomplete={<StepIconCustom />} />
                  </StepIndicator>
                </VStack>           
                
              </Step>
            ))}
          </Stepper>
          {/* The line of the timeline */}
          <Center>
            <Progress
              value={100}
              position='absolute'
              height='3px'
              width='calc(100% - 80px)'
              top='36px'
              zIndex={1}
                  />
          </Center>

          {/* The triangles with the PGSA letters */}
          {/* Change left: calc(...) to position the triagnles along the timeline. This should maybe be a variable that you can easily control 
          but I have not found an easy solution that would make the triangles align nicely */}
        <Triangle style={{ position: 'absolute', left: 'calc(15% - 40px)', top: '7px' }} color='#B9D87A' letter={'P'}/>
        <Triangle style={{ position: 'absolute', left: 'calc(45% - 50px)', top: '7px' }} color='#FFCD6C' letter={'G'}/>
        <Triangle style={{ position: 'absolute', left: 'calc(60% - 40px)', top: '7px' }} color='#D5BFDB' letter={'S'}/>
        <Triangle style={{ position: 'absolute', left: 'calc(90% - 40px)', top: '7px' }} color='#A9D7FF' letter={'A'}/>
        {/* The arrow that indicated the current position of the timeline. */}
        <Icon style={{ position: 'absolute', left: 'calc(60%)', top: '18px', transform: 'rotate(90deg)', zIndex:'2' }} icon={'solar:map-arrow-up-bold'} color='#F8A093' width={'30px'} height={'40px'}></Icon>
        </Box>
      </Box>

      <div style={{width:"100%", display:'flex', justifyContent:'end'}}>
        <Text as='b' fontSize={'21px'} color={'#182745'} marginRight={'3.5%'}>Slutdatum</Text>
      </div>
    </div>
  )
}

export default TimePlan