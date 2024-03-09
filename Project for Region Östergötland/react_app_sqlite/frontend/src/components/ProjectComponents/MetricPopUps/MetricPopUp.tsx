import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Text,
    HStack,
    VStack,
    FormLabel,
    FormControl
} from '@chakra-ui/react';
import Select, { StylesConfig } from 'react-select';
import { Measurement } from '../../../Types';
import { BASE_URL } from "../../../Constants";

type Props = {
    projectId: number,
    onClose: () => void,
    isOpen: boolean,
    metricsChanged: (value: boolean) => void,
    metricsChangedValue: boolean
}

// Style for the input element
const inputStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    border: '1px solid var(--darkblue)',
    width: '100%',
    height: '40px',
}

// Available intervals for the metric
const Intervals = [
    { value: 1, label: "minut" },
    { value: 2, label: "timme" },
    { value: 3, label: "dag" },
    { value: 4, label: "vecka" },
    { value: 5, label: "månad" },
    { value: 6, label: "år" },
];


// Popup-component for adding a new metric
const MetricPopUp = ({ projectId, onClose, isOpen, metricsChanged, metricsChangedValue }: Props) => {
    const defaultMeasurement: Measurement = { name: '', unit: '', frequencyAmount: undefined, frequencyInterval: '', project_id: projectId, measurementId: -1 };
    const [newMetric, setNewMetric] = useState<Measurement>(defaultMeasurement); // default/dummy values
    const [invalidInput, setInvalidInput] = useState({ name: false, unit: false, amount: false, interval: false }); // default/dummy values
    const amountValue = newMetric.frequencyAmount === undefined ? '' : newMetric.frequencyAmount;

    const selectStyle: StylesConfig = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#FFFFFF',
            borderColor: (invalidInput.interval && newMetric.frequencyInterval === '') ? 'red' : 'var(--darkblue)',
            width: '100%',
            minWidth: '180px',
        }),
    };

    const addMetric = async () => {
        if (projectId === undefined) return;
        let isInvalid = false;
        let _invalidInputs = { name: false, unit: false, amount: false, interval: false };
        if (newMetric.name === '') {
            _invalidInputs.name = true;
            isInvalid = true;
        }
        if (newMetric.unit === '') {
            _invalidInputs.unit = true;
            isInvalid = true;
        }
        if (newMetric.frequencyAmount === undefined) {
            _invalidInputs.amount = true;
            isInvalid = true;
        }
        if (newMetric.frequencyInterval === '') {
            _invalidInputs.interval = true;
            isInvalid = true;
        }
        setInvalidInput(_invalidInputs);
        if (isInvalid) return;
        try {
            const response = await fetch(
                `${BASE_URL}/add_new_measurement/` + projectId,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...newMetric }),
                }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else if (response.ok) {
                metricsChanged(!metricsChangedValue);
                onClose();
                setNewMetric(defaultMeasurement);
                setInvalidInput({ name: false, unit: false, amount: false, interval: false });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleIntervalChange = (selectedOption: any) => {
        if (selectedOption === null || selectedOption === undefined) return;
        setNewMetric({ ...newMetric, frequencyInterval: selectedOption.label });
    };

    return (
        <Modal onClose={() => { onClose(); setNewMetric(defaultMeasurement); setInvalidInput({ name: false, unit: false, amount: false, interval: false }) }} isOpen={isOpen} isCentered>
            <ModalOverlay />

            <ModalContent border={'2px solid var(--darkblue)'} borderRadius={'10px'} paddingX={'10px'} paddingTop={'20px'} paddingBottom={'10px'}
                bg={'#E5F0F7'} maxWidth={'600px'} minWidth={'300px'} maxHeight={'50vh'} minHeight={'30vh'}
            >
                <ModalCloseButton />
                {/* Input for the name of the metric */}
                <Input isInvalid={invalidInput.name && newMetric.name === ''} value={newMetric.name} variant='flushed' placeholder='Lägg till ett utfallsmått...' w={'80%'}
                    onChange={(e) => {
                        setNewMetric({ ...newMetric, name: e.target.value });
                    }}
                />
                <ModalBody>
                    <VStack alignItems={'baseline'}>
                        <HStack>
                            <FormControl>
                                <FormLabel>Måttenhet:</FormLabel>
                                {/* Input for the unit of the metric */}
                                <Input isInvalid={invalidInput.unit && newMetric.unit === ''} value={newMetric.unit}
                                    onChange={(e) => {
                                        setNewMetric({ ...newMetric, unit: e.target.value });
                                    }}
                                    style={inputStyle} placeholder='st, min...'></Input>
                            </FormControl>
                        </HStack>
                        <HStack alignItems={'end'}>
                            <FormControl marginRight={'30px'}>
                                <FormLabel>Mätfrekvens</FormLabel>
                                <HStack>
                                    {/* Input for the frequency amount */}
                                    <Input placeholder='1, 10...' isInvalid={invalidInput.amount && newMetric.frequencyAmount === undefined} value={amountValue} style={inputStyle}
                                        onChange={(e) => {
                                            if (isNaN(parseInt(e.target.value))) {
                                                setNewMetric({ ...newMetric, frequencyAmount: undefined });
                                            } else {
                                                setNewMetric({ ...newMetric, frequencyAmount: parseInt(e.target.value) });
                                            }
                                        }}
                                    ></Input>
                                    <Text whiteSpace={'nowrap'} marginBottom={0}>gång(er) varje</Text>
                                    {/* Select for the frequency interval */}
                                    <Select styles={selectStyle} options={Intervals} isSearchable={true} isClearable={true}
                                        isMulti={false} placeholder={"dag, vecka..."}
                                        onChange={handleIntervalChange}
                                        maxMenuHeight={150}
                                        theme={theme => ({
                                            ...theme,
                                            borderRadius: 10,
                                            colors: {
                                                ...theme.colors,
                                                primary: 'var(--darkblue)',
                                                neutral50: '#76859b',  // placeholder color
                                                neutral20: '#d0d7e0', // border color
                                                neutral10: '#CEE0EE', // menu arrow color
                                                dangerLight: '#BED5E6', // menu background color
                                                danger: 'var(--darkblue)',
                                            },
                                        })}
                                    />
                                </HStack>
                            </FormControl>
                            {/* Button to save the metric */}
                            <Button
                                variant={'darkBlueButton'}
                                borderRadius={'10px'}
                                size={'md'}
                                onClick={addMetric}
                            >
                                Spara
                            </Button>
                        </HStack>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default MetricPopUp;
