import { VStack, Text, Link, HStack, Input, Button, CloseButton } from '@chakra-ui/react'
import { Icon } from '@iconify/react';
import React, { useEffect } from 'react'
import {BASE_URL} from "../../Constants";


type Props = {
    projectId: string | undefined,
    status : string; 
    edit : boolean; 
}


const bgColor: string = "#E6F0F8";
const borderRadius: string = "10px";
const inputStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid var(--darkblue)',
}

const Links = ({edit, status, projectId}: Props) => {
    const [links, setLinks] = React.useState<{ id: number, title: string, url: string }[]>([])
    const [newLink, setNewLink] = React.useState<{ id: number, title: string, url: string }>({ id: -1, title: '', url: '' })
    const [addLinkActive, setAddLinkActive] = React.useState(false) //boolean to check if user is adding a new link

    // this function fetches all links on a project
    const getLinks = async () => {
        try {
            const response = await fetch(BASE_URL + "/get_all_links_on_project/" + projectId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsonData = await response.json();
            setLinks(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // adds a new link to the database
    const addNewLink = async () => {
        try {
            const response = await fetch(BASE_URL + "/add_new_link/" + projectId, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...newLink})
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsonData = await response.json();
            setLinks([...links, jsonData]);
            setNewLink({ id: -1, title: '', url: '' })
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // deletes a link from the database
    const deleteLink = async (id: number) => {
        try {
            const response = await fetch(BASE_URL + "/link/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsonData = await response.json();
            setLinks(links.filter((link) => link.id !== id));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // fetches all links on a project when the component mounts
    useEffect(() => {
        if (projectId !== undefined) {
            getLinks();
        }
    }, []);

    return (
        <VStack bg={bgColor} borderRadius={borderRadius} h={'100%'} w={'100%'} alignItems={'baseline'} paddingX={'20px'} paddingY={'10px'}>
            <HStack>                
                <Text as={"b"} fontSize={"xl"}>Användbara länkar</Text>
                {/* text button to edit links, only rendered if project is not finished */}
                {addLinkActive ?
                    <Text as='u' fontSize={"12px"} cursor={"pointer"} marginLeft={"10px"} onClick={()=>setAddLinkActive(false)}>
                        Klar
                    </Text>
                    :
                   status !== "Finished" && edit ? (
                    <Text as='u' fontSize={"12px"} cursor={"pointer"} marginLeft={"10px"} onClick={()=>setAddLinkActive(true)}>
                        Redigera länkar
                    </Text>
                    ) : null 
                }
           </HStack>
            <VStack alignItems={'baseline'} w={'100%'}>
                {/* render all links that were fetched from backend */}
                {links.length > 0 ? links.map((link) => {
                    return (
                        <HStack key={link.title} marginLeft={'15px'}>
                            <Link href={link.url} isExternal={true} display={'flex'} alignItems={'center'}>
                                <Text marginBottom={0} marginRight={'5px'}>{link.title}</Text>
                                <Icon icon="heroicons-outline:external-link" />
                            </Link>
                            {addLinkActive && <CloseButton size={'sm'} onClick={() => deleteLink(link.id)} />}
                        </HStack>
                    )
                })
                    :
                    <Text fontSize={'md'}>Inga länkar tillagda</Text>
                }
                {/* input for when adding a new link */}
                {addLinkActive && (
                    <HStack>
                        <Icon icon="fluent:add-24-filled" width={'40px'}/>
                        <Input size={'sm'} style={inputStyle} type="text" placeholder="Titel" onChange={(e) => setNewLink({ ...newLink, title: e.target.value })} />
                        <Input size={'sm'} style={inputStyle} type="text" placeholder="URL" onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} />
                        <Button size={'sm'} variant={'darkBlueButton'} fontWeight={'semibold'} minW={'fit-content'} paddingX={'8px'} onClick={() => {
                            addNewLink();
                            setAddLinkActive(false);
                        }}>Spara</Button>
                    </HStack>
                )}
            </VStack>
        </VStack>
  )
}

export default Links