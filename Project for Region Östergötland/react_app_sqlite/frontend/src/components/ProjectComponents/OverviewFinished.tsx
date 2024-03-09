import React, { useEffect } from "react";
import {
  VStack,
  Text,
  HStack,
  Textarea,
  Button,
  Center,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Category } from "../../Types";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../Constants";
import { ProjectRole } from "../../Types";

type Props = {
  categories: Category[];
  handleCategories: (value: Category[]) => void;
  startDate: string;
};


const OverviewFinished = ({ categories, handleCategories, startDate }: Props) => {
  const { projectId } = useParams();
  let [text1, setText1] = React.useState("");
  let [text2, setText2] = React.useState("");
  let [text3, setText3] = React.useState("");
  let [projectRole, setProjectRole] = React.useState<ProjectRole>();

  const [deadline, setDeadline] = React.useState("");
  const [unit, setUnit] = React.useState("");
  let [formattedStartDate, setformattedStartDate] = React.useState("");
 

  const handleTextChange1 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText1(event.target.value);
  };
  const handleTextChange2 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText2(event.target.value);
  };
  const handleTextChange3 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText3(event.target.value);
  };



  //Put request to the data base of all the inputs from the Evaluations + plus some error handling
  const submitProjectEvaluation = async () => {
    if (text1 === "" || text2 === "" || text3 === "") {
      alert("Du måste fylla i alla fälten");
      return;
    } else {
      try {
        const response = await fetch(
          `${BASE_URL}/project/${projectId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer " +
                JSON.parse(sessionStorage.getItem("auth") + "").token,
            },
            body: JSON.stringify({
              evaluationSummary: text1,
              evaluation: text2,
              evaluationExplanation: text3,
            }),
          }
        );
        alert("Skickat");
      } catch (error) {
        console.error("Error:", error);
        alert("Något gick fel, försök igen senare");
        return;
      }
    }
  };


  const fetchText = async () => {
    try {
      const response = await fetch(`${BASE_URL}/project/${projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("auth") + "").token,
        },
      });
      const data = await response.json();
      setText1(data.evaluationSummary);
      setText2(data.evaluation);
      setText3(data.evaluationExplanation);

      for (let user of data.users) {
        if (user.userId === JSON.parse(sessionStorage.getItem("auth") + "").userId) {
          setProjectRole(user.projectRole);
        }
      }
      // Parse the date string
      const startingDate = new Date(startDate);

      // Format the date in YYYY-MM-DD format
      setformattedStartDate(startingDate.toISOString().split("T")[0]);

    } catch (error) {
      console.error("Error:", error);
      alert("Något gick fel, försök igen senare");
      return;
    }
  };

  const getDeadlineUnit = async () => {
    const response = await fetch(`${BASE_URL}/project/${projectId}`);
    const data = await response.json();
    // Parse the date string
    const parsedDate = new Date(data.deadline);

    // Format the date in YYYY-MM-DD format
    const formattedDate = parsedDate.toISOString().split("T")[0];


    setDeadline(formattedDate);
    setUnit(data.unit);
  };

  useEffect(() => {
    getDeadlineUnit();
    fetchText();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#E6F0F8",
        borderRadius: "10px",
        marginLeft: "10px",
        height: "625px",
        width: "1200px",
        /* justifyContent: "left", */
      }}
    >
      <HStack>
        <Icon icon="el:check" width="30" height="30" style={{ marginTop: "10px", marginLeft: "20px" }} />
        <Text as="b" fontSize={"2xl"} justifySelf={"left"} marginLeft="5px" marginTop="10px">
          Avslutat förbättringsarbete
        </Text>
        {projectRole === ProjectRole.team_Leader && (
          <Button
            colorScheme="blue"
            size="sm"
            marginLeft="330px"
            marginTop="20px"
            variant="darkBlueButton"
            onClick={() => {
              submitProjectEvaluation();
            }}
          >
            Spara
          </Button>
        )}
      </HStack>
      <VStack alignItems={"left"}>
        <Text as="b" fontSize={"md"} justifySelf={"left"} marginLeft={5}>
          Sammanfatta förbättringsarbetet:
        </Text>
        <Textarea marginLeft="20px" marginBottom="10px" h="140px" w="95%" minHeight={0} variant="filled" bg="white" resize={"none"} value={text1} onChange={handleTextChange1}></Textarea>

        <Text as="b" fontSize={"md"} justifySelf={"left"} marginLeft={5}>
          Skulle du rekommendera andra att genomföra förbättringsarbetet?
        </Text>
        <Textarea marginLeft="20px" marginBottom="10px" h="40px" w="10%" minHeight={0} variant="filled" bg="white" resize={"none"} value={text2} onChange={handleTextChange2}></Textarea>

        <Text as="b" fontSize={"md"} justifySelf={"left"} marginLeft={5}>
          Vad skulle du vilja skicka med till dem som vill genomföra detta förbättringsarbete?
        </Text>
        <Textarea marginLeft="20px" marginBottom="5px" h="100px" w="95%" minHeight={0} variant="filled" bg="white" resize={"none"} value={text3} onChange={handleTextChange3}></Textarea>
      </VStack>
      <HStack>
        <VStack height={180}>
          <div>
            <Text as="b" fontSize={"sm"} justifySelf={"left"} marginLeft={5}>
              Kategori
            </Text>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                marginLeft: "20px",
                height: "90px",
                width: "390px",
                overflow: "scroll",
                /* justifyContent: "left", */
              }}
            >
              <UnorderedList>
                {categories.map((category) => (
                  <HStack key={"category" + category.categoryId}>
                    <ListItem marginTop={"10px"}>{category.categoryName}</ListItem>
                  </HStack>
                ))}
              </UnorderedList>
            </div>
          </div>
        </VStack>

        <VStack height={180}>
          <div>
            <Text as="b" fontSize={"sm"} justifySelf={"left"}>
              Påbörjat:
            </Text>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                marginLeft: "0px",
                height: "30px",
                width: "370px",
              }}
            >
              <div
                style={{
                  marginLeft: "10px",
                }}
              >
                {formattedStartDate}
              </div>
            </div>
          </div>

          <div>
            <Text as="b" fontSize={"sm"} justifySelf={"left"}>
              Avslutat:
            </Text>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                marginLeft: "0px",
                height: "30px",
                width: "370px",
              }}
            >
              <div
                style={{
                  marginLeft: "10px",
                }}
              >
                {deadline}
              </div>
            </div>
          </div>
        </VStack>
      </HStack>
    </div>
  );
};

export default OverviewFinished;
