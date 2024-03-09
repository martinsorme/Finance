import requests

url = "http://127.0.0.1:5001"
headers = {"Content-Type": "application/json"}


read_responses = []

############################## clearing database ##############################

x = requests.delete(url + "/clear_database", headers=headers, json={})
read_responses.append(x)
print(x.text)
############################## adding new projects ##############################
x = requests.post(
    url + "/signup",
    headers=headers,
    json={
        "email": "test@test.test",
        "name": "Regina Öster",
        "role": "User",
        "unit": "KAVA",
        "jobTitle": "Sjuksköterska",
        "password": "test",
        "phoneNumber": "0703895673",
    },
)
x = requests.post(
    url + "/signup",
    headers=headers,
    json={
        "email": "assar.larsson@gmail.com",
        "name": "Assar Larsson",
        "role": "Admin",
        "unit": "Kirurgiska kliniken",
        "jobTitle": "Undersköterska",
        "password": "hej",
        "phoneNumber": "0765881234",
    },
)
x = requests.post(
    url + "/signup",
    headers=headers,
    json={
        "email": "anna.lhopital@gmail.com",
        "name": "Anna L'Hopital",
        "role": "User",
        "unit": "Allergicentrum",
        "jobTitle": "Överläkare",
        "phoneNumber": "0765881234",
        "password": "test",
    },
)
x = requests.post(
    url + "/signup",
    headers=headers,
    json={
        "email": "arne.vard@gmail.com",
        "name": "Arne Vårdsberg",
        "role": "User",
        "unit": "Rehabenheten",
        "jobTitle": "Sjuksköterska",
        "password": "test",
        "phoneNumber": "0701121121",
    },
)


x = requests.post(
    url + "/signup",
    headers=headers,
    json={
        "email": "elsa.lindstrom@gmail.com",
        "name": "Elsa Volpini",
        "role": "User",
        "unit": "Allmänmedicin",
        "jobTitle": "Sjuksköterska",
        "password": "test",
        "phoneNumber": "0701234567",
    },
)

x = requests.post(
    url + "/signup",
    headers=headers,
    json={
        "email": "anders.eriksson@gmail.com",
        "name": "Anders Eriksson",
        "role": "User",
        "unit": "Pediatrisk vård",
        "jobTitle": "Barnläkare",
        "password": "test",
        "phoneNumber": "0765432109",
    },
)


################################# logs in ####################################
h = requests.post(
    url + "/login",
    headers=headers,
    json={"email": "test@test.test", "password": "test"},
)
response_data = h.json()
token = response_data.get("token", "")
headers = {"Content-Type": "application/json", "Authorization": "Bearer " + token}
read_responses.append(x)

options = [
    "Akutvård",
    "Anamnestagning",
    "Arbetsmiljö",
    "Barn- och ungdomshälsa",
    "Cancersjukdomar",
    "Endokrina sjukdomar",
    "Fallrisk",
    "Hemsjukvård",
    "Hjärt- och kärlsjukdomar",
    "Hud- och könssjukdomar",
    "Infektionssjukdomar",
    "Kirurgi och plastikkirurgi",
    "Kompentensutveckling",
    "Kvinnosjukdomar och förlossning",
    "Levnadsvanor",
    "Lung- och allergisjukdomar",
    "Mag- och tarmsjukdomar",
    "Medicinsk diagnostik",
    "Munhälsa",
    "Nervsystemets sjukdomar",
    "Njur- och urinvägssjukdomar",
    "Nutrition",
    "Omvårdnad",
    "Palliativ vård",
    "Patientinformation",
    "Patientmedverkan",
    "Patientsäkerhet",
    "Perioperativ vård, intensivvård och transplantation",
    "Personcentrerad vård",
    "Primärvård",
    "Psykisk hälsa",
    "Rehabilitering, habilitering och försäkringsmedicin",
    "Reumatiska sjukdomar",
    "Rutiner",
    "Rörelseorganens sjukdomar",
    "Slutenvård",
    "Specialistvård",
    "Statustagning",
    "Sällsynta sjukdomar",
    "Tandvård",
    "Utbildning",
    "Vårddokumentation",
    "Vårdhygien",
    "Ögonsjukdomar",
    "Öppenvård",
    "Övrigt",
]

for category_name in options:
    response = requests.post(
        url + "/add_new_category", headers=headers, json={"categoryName": category_name}
    )

read_responses.append(x)

x = requests.post(
    url + "/add_new_project",
    headers=headers,
    json={
        "title": "Ny rutin för nutritionsrapportering",
        "creator_id": 1,
        "status": "P",
        "categories": [22, 34],
        "importance": "Det har tidigare noterats problematik gällande registreringen av nutriotion och vad patienten har fått i sig under en dag. För att säkerställa att vi vet vad patienterna har fått i sig är det viktigt att ha en rutin för detta som är lätt att följa. Tidigare var rutinen att den som började sitt skift kl. 06:00 alltid hade ansvar att fylla i vad patienten fått för mat av kollegorna det senaste dygnet. Detta innebar problem då den som började 06-skiftet inte gett maten själv samt att beroende på patientens tillstånd kunde det vara svårt för denne att minnas detta. Denna rutin är nu ändrad till att den som ger mat/dryck till en patient är själv ansvarig för att skriva ner detta innan skiftet slutar. ",
        "difference": "Om rapporteringen blir mer korrekt så säkerställer det att varje patient får i sig precis det de behöver, när de behöver det vilket förhoppningsvis bidrar till bästa möjliga behandling med patienten i fokus",
        "requirements": "Hjälp med att informera om och sprida den nya rutinen via mail, att det tas upp på möten samt påminnande lappar. ",
        "unit": "KAVA",
        "how_often": "Test how_often",
        "startTime": "2022-02-14 12:00:00",
        "deadline": "2024-04-14 12:00:00",
    },
)
read_responses.append(x)

x = requests.post(
    url + "/add_new_project",
    headers=headers,
    json={
        "title": "Coachning till nyanställda sjuksköterskor",
        "creator_id": 2,
        "status": "D",
        "categories": [41],
        "importance": "Nya sjuksköterskor på avdelningen upplever svårigheter med att realisera sina färdigheter på avdelningen. Handledning är inte en naturlig del av yrket och skulle hjälpa till med att snabbt få in de nya anställda i de rutiner som gäller på avdelningen.",
        "difference": "Genom att öka tryggheten och stärka självkänslan hos de nyanställda så ökar vi vårdkvalitén som vi kan erbjuda på avdelningen.",
        "requirements": "Vi behöver erfarna kollegor som skulle kunna tänka sig att ställa upp på att vara handledare.",
        "unit": "Kirurgiska kliniken",
        "how_often": "Test how_often 2",
        "startTime": "2022-03-14 12:00:00",
        "deadline": "2024-06-14 12:00:00",
    },
)
read_responses.append(x)

x = requests.post(
    url + "/add_new_project",
    headers=headers,
    json={
        "title": "Inköp av nya sjukhussängar",
        "creator_id": 1,
        "status": "Utkast",
        "categories": [1, 2],
        "importance": "test imp 2",
        "difference": "test diferance 2",
        "requirements": "test Requirements 2",
        "unit": None,
        "how_often": None,
        "startTime": "inget datum",
        "deadline": "inget datum",
    },
)
read_responses.append(x)

x = requests.post(
    url + "/add_new_project",
    headers=headers,
    json={
        "title": "Sänk ljudvolymen i väntrummen",
        "creator_id": 4,
        "status": "Finished",
        "categories": [44],
        "importance": "Det har tidigare noterats problematik gällande ljudnivån i väntrummen. Detta och vad patienten har fått i sig under en dag. För att säkerställa att vi vet vad patienterna har fått i sig är det viktigt att ha en rutin för detta som är lätt att följa. Tidigare var rutinen att den som började sitt skift kl. 06:00 alltid hade ansvar att fylla i vad patienten fått för mat av kollegorna det senaste dygnet. Detta innebar problem då den som började 06-skiftet inte gett maten själv samt att beroende på patientens tillstånd kunde det vara svårt för denne att minnas detta. Denna rutin är nu ändrad till att den som ger mat/dryck till en patient är själv ansvarig för att skriva ner detta innan skiftet slutar.",
        "difference": "Det hade underlättat för patienter med hög stressnivå och hörselrelaterade problem såsom tinnitus om ljudnivån sänktes. Det har tidigare noterats problematik gällande registreringen av nutriotion och vad patienten har fått i sig under en dag. För att säkerställa att vi vet vad patienterna har fått i sig är det viktigt att ha en rutin för detta som är lätt att följa. Tidigare var rutinen att den som började sitt skift kl. 06:00 alltid hade ansvar att fylla i vad patienten fått för mat av kollegorna det senaste dygnet. Detta innebar problem då den som började 06-skiftet inte gett maten själv samt att beroende på patientens tillstånd kunde det vara svårt för denne att minnas detta. Denna rutin är nu ändrad till att den som ger mat/dryck till en patient är själv ansvarig för att skriva ner detta innan skiftet slutar.",
        "requirements": "Aukustiska isoleringspllattor och en decibelmätare.",
        "unit": "Rehabenheten",
        "how_often": None,
        "startTime": "2022-03-14 12:00:00",
        "deadline": "2023-11-30 12:00:00",
        "evaluationExplanation": "För dem som vill genomföra förbättringsarbetet Sänk ljudvolymen i väntrummen skulle jag rekommendera att börja med en grundlig utvärdering av det nuvarande ljudmiljöns tillstånd. Det är viktigt att identifiera de exakta källorna till buller och utvärdera dess påverkan på både personal och besökare. Därefter bör man involvera personal och användare i planeringsprocessen för att säkerställa en bred förståelse och stöd för förändringen",
        "evaluation": "Ja",
        "evaluationSummary": "Förbättringsarbetet Sänk ljudvolymen i väntrummen blev framgångsrikt av flera anledningar. För det första, genom att identifiera och erkänna behovet av förändring kunde teamet engagera sig i en gemensam målsättning. Tydlig kommunikation och samarbete bland teammedlemmarna möjliggjorde en smidig övergång till en lägre ljudnivå. Implementeringen av tekniska lösningar, såsom ljudisolering och volymkontroller, underlättade genomförandet och förbättrade den övergripande ljudmiljön. Kontinuerlig övervakning och feedback från användare möjliggjorde justeringar för att säkerställa långsiktig effektivitet. Slutligen, genom att skapa medvetenhet och förståelse för förändringens syfte bland både personal och besökare, stöddes framgången av en positiv och hållbar kulturell förändring.",
    },
)
read_responses.append(x)

x = requests.post(
    url + "/add_new_project",
    headers=headers,
    json={
        "title": "Halkfria mattor innanför entrédörr",
        "creator_id": 3,
        "status": "Finished",
        "categories": [27],
        "importance": "Det har tidigare noterats problematik gällande ljudnivån i väntrummen. Detta och vad patienten har fått i sig under en dag. För att säkerställa att vi vet vad patienterna har fått i sig är det viktigt att ha en rutin för detta som är lätt att följa. Tidigare var rutinen att den som började sitt skift kl. 06:00 alltid hade ansvar att fylla i vad patienten fått för mat av kollegorna det senaste dygnet. Detta innebar problem då den som började 06-skiftet inte gett maten själv samt att beroende på patientens tillstånd kunde det vara svårt för denne att minnas detta. Denna rutin är nu ändrad till att den som ger mat/dryck till en patient är själv ansvarig för att skriva ner detta innan skiftet slutar.",
        "difference": "Det hade underlättat för patienter med hög stressnivå och hörselrelaterade problem såsom tinnitus om ljudnivån sänktes. Det har tidigare noterats problematik gällande registreringen av nutriotion och vad patienten har fått i sig under en dag. För att säkerställa att vi vet vad patienterna har fått i sig är det viktigt att ha en rutin för detta som är lätt att följa. Tidigare var rutinen att den som började sitt skift kl. 06:00 alltid hade ansvar att fylla i vad patienten fått för mat av kollegorna det senaste dygnet. Detta innebar problem då den som började 06-skiftet inte gett maten själv samt att beroende på patientens tillstånd kunde det vara svårt för denne att minnas detta. Denna rutin är nu ändrad till att den som ger mat/dryck till en patient är själv ansvarig för att skriva ner detta innan skiftet slutar.",
        "requirements": "Aukustiska isoleringspllattor och en decibelmätare.",
        "unit": "Rehabenheten",
        "how_often": None,
        "startTime": "inget datum",
        "deadline": "inget datum",
        "evaluationExplanation": "Förklaring",
        "evaluation": "Ja",
        "evaluationSummary": "Summering",
    },
)
read_responses.append(x)


x = requests.post(
    url + "/add_new_project",
    headers=headers,
    json={
        "title": "Inköp av nya sjukhussängar",
        "creator_id": 2,
        "status": "Finished",
        "categories": [1, 2],
        "importance": "Detta är viktigt för att...",
        "difference": "Detta skulle göra skillnad för patienterna då det hade lett till...",
        "requirements": "Det behövs...",
        "unit": None,
        "how_often": None,
        "startTime": "inget datum",
        "deadline": "inget datum",
        "evaluationExplanation": "Identifierade behovet av nya sjukhussängar genom en undersökning av befintliga sängar, kapacitetskrav och teknologiska/medicinska förändringar.",
        "evaluation": "Genomförde en strukturerad upphandlingsprocess, inklusive begäran om offerter, utvärdering av leverantörer utifrån rykte och kvalitet, samt förhandling av priser. Tydliggjorde tekniska specifikationer och krav för att säkerställa rätt val av sängar.",
        "evaluationSummary": "Projektet avslutades framgångsrikt genom att placera en budgetanpassad beställning och säkerställa smidig leverans och installation av de nya sjukhussängarna. Organiserade effektivt utbildning för personalen, integrerade sängarna i befintliga system och utvärderade kontinuerligt projektets framsteg för att säkerställa att de nya sängarna uppfyllde förväntningarna och förbättrade patientvården samt sjukhusets effektivitet.",
    
    },
)
read_responses.append(x)

x = requests.post(
    url + "/add_new_project",
    headers=headers,
    json={
        "title": "Mer handsprit i korridorerna",
        "creator_id": 1,
        "status": "Utkast",
        "categories": [43, 3],
        "importance": "God hygien är av högsta prioritet! Men framförallt är god hygien är av högsta prioritet! Men framförallt är god hygien är av högsta prioritet! Men framförallt är god hygien är av högsta prioritet! Men framförallt är god hygien är av högsta prioritet! Men framförallt är god hygien är av högsta prioritet!",
        "difference": "Med fler handspritsmöjligheter i korridorerna behöver man inte gå in i något rum och riskera att störa någon annans arbete. Med fler handspritsmöjligheter i korridorerna behöver man inte gå in i något rum och riskera att störa någon annans arbete. Med fler handspritsmöjligheter i korridorerna behöver man inte gå in i något rum och riskera att störa någon annans arbete. Med fler handspritsmöjligheter i korridorerna behöver man inte gå in i något rum och riskera att störa någon annans arbete. Med fler handspritsmöjligheter i korridorerna behöver man inte gå in i något rum och riskera att störa någon annans arbete.",
        "requirements": "Handsprit och hållare på väggen samt 4st småskruvar per station.",
        "unit": None,
        "how_often": None,
        "startTime": "inget datum",
        "deadline": "inget datum",
    },
)
read_responses.append(x)

x = requests.post(
    url + "/add_new_project",
    headers=headers,
    json={
        "title": "Fler rullstolsanpassade platser i väntrummet",
        "creator_id": 4,
        "status": "Finished",
        "categories": [46],
        "importance": "Det har tidigare noterats problematik gällande ljudnivån i väntrummen. Detta och vad patienten har fått i sig under en dag. För att säkerställa att vi vet vad patienterna har fått i sig är det viktigt att ha en rutin för detta som är lätt att följa. Tidigare var rutinen att den som började sitt skift kl. 06:00 alltid hade ansvar att fylla i vad patienten fått för mat av kollegorna det senaste dygnet. Detta innebar problem då den som började 06-skiftet inte gett maten själv samt att beroende på patientens tillstånd kunde det vara svårt för denne att minnas detta. Denna rutin är nu ändrad till att den som ger mat/dryck till en patient är själv ansvarig för att skriva ner detta innan skiftet slutar.",
        "difference": "Det hade underlättat för patienter med hög stressnivå och hörselrelaterade problem såsom tinnitus om ljudnivån sänktes. Det har tidigare noterats problematik gällande registreringen av nutriotion och vad patienten har fått i sig under en dag. För att säkerställa att vi vet vad patienterna har fått i sig är det viktigt att ha en rutin för detta som är lätt att följa. Tidigare var rutinen att den som började sitt skift kl. 06:00 alltid hade ansvar att fylla i vad patienten fått för mat av kollegorna det senaste dygnet. Detta innebar problem då den som började 06-skiftet inte gett maten själv samt att beroende på patientens tillstånd kunde det vara svårt för denne att minnas detta. Denna rutin är nu ändrad till att den som ger mat/dryck till en patient är själv ansvarig för att skriva ner detta innan skiftet slutar.",
        "requirements": "Aukustiska isoleringspllattor och en decibelmätare.",
        "unit": "Rehabenheten",
        "how_often": None,
        "startTime": "inget datum",
        "deadline": "inget datum",
        "evaluationExplanation": "Förklaring",
        "evaluation": "Ja",
        "evaluationSummary": "Summering",
    },
)
read_responses.append(x)

x = requests.post(
    url + "/add_new_project",
    headers=headers,
    json={
        "title": "Inköp av tjockare pappershanddukar",
        "creator_id": 4,
        "status": "Finished",
        "categories": [46],
        "importance": "God hygien är av högsta prioritet! Men framförallt är god hygien är av högsta prioritet! Men framförallt är god hygien är av högsta prioritet! Men framförallt är god hygien är av högsta prioritet! Men framförallt är god hygien är av högsta prioritet. Det har tidigare noterats problematik gällande ljudnivån i väntrummen. Detta och vad patienten har fått i sig under en dag. För att säkerställa att vi vet vad patienterna har fått i sig är det viktigt att ha en rutin för detta som är lätt att följa. Tidigare var rutinen att den som började sitt skift kl. 06:00 alltid hade ansvar att fylla i vad patienten fått för mat av kollegorna det senaste dygnet. Detta innebar problem då den som började 06-skiftet inte gett maten själv samt att beroende på patientens tillstånd kunde det vara svårt för denne att minnas detta. Denna rutin är nu ändrad till att den som ger mat/dryck till en patient är själv ansvarig för att skriva ner detta innan skiftet slutar.",
        "difference": "Det hade underlättat för patienter med hög stressnivå och hörselrelaterade problem såsom tinnitus om ljudnivån sänktes. Det har tidigare noterats problematik gällande registreringen av nutriotion och vad patienten har fått i sig under en dag. För att säkerställa att vi vet vad patienterna har fått i sig är det viktigt att ha en rutin för detta som är lätt att följa. Tidigare var rutinen att den som började sitt skift kl. 06:00 alltid hade ansvar att fylla i vad patienten fått för mat av kollegorna det senaste dygnet. Detta innebar problem då den som började 06-skiftet inte gett maten själv samt att beroende på patientens tillstånd kunde det vara svårt för denne att minnas detta. Denna rutin är nu ändrad till att den som ger mat/dryck till en patient är själv ansvarig för att skriva ner detta innan skiftet slutar.",
        "requirements": "Aukustiska isoleringspllattor och en decibelmätare.",
        "unit": "Mag och Tarm",
        "how_often": None,
        "startTime": "inget datum",
        "deadline": "inget datum",
        "evaluationExplanation": "Förklaring",
        "evaluation": "Ja",
        "evaluationSummary": "Summering",
    },
)
read_responses.append(x)

x = requests.post(
    url + "/add_new_project",
    headers=headers,
    json={
        "title": "Plasthandskar i större storlek",
        "creator_id": 1,
        "status": "Utkast",
        "categories": [3, 43],
        "importance": "",
        "difference": "",
        "requirements": "test Requirements 2",
        "unit": None,
        "how_often": None,
        "startTime": "inget datum",
        "deadline": "inget datum",
    },
)
read_responses.append(x)

read_responses.append(
    requests.post(
        url + "/add_new_task/1",
        headers=headers,
        json={
            "taskName": "Gör en mall som beskriver den nya rutinen",
            "taskDescription": "Gör en mall som beskriver den nya rutinen.",
        },
    )
)

read_responses.append(
    requests.post(
        url + "/add_new_task/1",
        headers=headers,
        json={
            "taskName": "Ta kontakt med enhetschefen om att ta upp denna nya rutin på nästa möte",
            "taskDescription": "Informera om den nya rutinen",
            "status": "Ongoing",
        },
    )
)
read_responses.append(
    requests.post(
        url + "/add_new_task/1",
        headers=headers,
        json={
            "taskName": "Skriv ut mallen",
            "taskDescription": "Skriv ut på A4 papper i färg.",
            "status": "Ongoing",
        },
    )
)
read_responses.append(
    requests.post(
        url + "/add_new_task/1",
        headers=headers,
        json={
            "taskName": "Be om tillåtelse för att sätta upp mallen på alla kontor",
            "taskDescription": "",
            "status": "Ongoing",
        },
    )
)
read_responses.append(
    requests.post(
        url + "/add_new_task/1",
        headers=headers,
        json={
            "taskName": "Sammanställ anteckningar från möte med enhetschefen",
            "taskDescription": "Sammanställ anteckningar från APT gällande X",
            "status": "Ongoing",
        },
    )
)
read_responses.append(
    requests.post(
        url + "/add_new_task/1",
        headers=headers,
        json={
            "taskName": "Ring Anders",
            "taskDescription": "Intervjua Anders på mage & tarm",
            "status": "Finished",
        },
    )
)
read_responses.append(
    requests.post(
        url + "/add_new_task/1",
        headers=headers,
        json={
            "taskName": "Möte med PUM-studenter",
            "taskDescription": "Exempel uppgift Y",
            "status": "Finished",
        },
    )
)
read_responses.append(
    requests.post(
        url + "/add_new_task/2",
        headers=headers,
        json={
            "taskName": "Sätt upp mallen",
            "taskDescription": "Sammanställa intervjufrågor",
        },
    )
)
read_responses.append(
    requests.post(
        url + "/add_new_task/2",
        headers=headers,
        json={"taskName": "Köp nya bläckpatroner", "taskDescription": ""},
    )
)
read_responses.append(
    requests.post(
        url + "/add_new_task/2",
        headers=headers,
        json={"taskName": "Svara på frågor om den nya rutinen", "taskDescription": ""},
    )
)


read_responses.append(
    requests.post(
        url + "/add_user_to_project/1/1", headers=headers, json={"role": "Team-Leader"}
    )
)
read_responses.append(
    requests.post(
        url + "/add_user_to_project/1/2", headers=headers, json={"role": "Team-Member"}
    )
)
read_responses.append(
    requests.post(
        url + "/add_user_to_project/1/4", headers=headers, json={"role": "Team-Member"}
    )
)

read_responses.append(
    requests.post(
        url + "/add_user_to_project/2/2", headers=headers, json={"role": "Team-Leader"}
    )
)
read_responses.append(
    requests.post(
        url + "/add_user_to_project/2/1", headers=headers, json={"role": "Team-Member"}
    )
)
read_responses.append(
    requests.post(
        url + "/add_user_to_project/2/3", headers=headers, json={"role": "Team-Member"}
    )
)
read_responses.append(
    requests.post(
        url + "/add_user_to_project/4/3", headers=headers, json={"role": "Team-Member"}
    )
)
read_responses.append(
    requests.post(
        url + "/add_user_to_project/4/2", headers=headers, json={"role": "Team-Leader"}
    )
)
read_responses.append(
    requests.post(
        url + "/add_user_to_project/6/3", headers=headers, json={"role": "Team-Member"}
    )
)
read_responses.append(
    requests.post(
        url + "/add_user_to_project/6/2", headers=headers, json={"role": "Team-Leader"}
    )
)
read_responses.append(
    requests.post(
        url + "/add_user_to_project/5/3", headers=headers, json={"role": "Team-Member"}
    )
)
read_responses.append(
    requests.post(
        url + "/add_user_to_project/5/2", headers=headers, json={"role": "Team-Leader"}
    )
)
read_responses.append(
    requests.post(
        url + "/add_user_to_project/3/3", headers=headers, json={"role": "Team-Member"}
    )
)
read_responses.append(
    requests.post(
        url + "/add_user_to_project/3/2", headers=headers, json={"role": "Team-Leader"}
    )
)

read_responses.append(
    requests.post(url + "/add_user_to_task/11/1", headers=headers, json={})
)
read_responses.append(
    requests.post(url + "/add_user_to_task/12/1", headers=headers, json={})
)
read_responses.append(
    requests.post(url + "/add_user_to_task/13/1", headers=headers, json={})
)
read_responses.append(
    requests.post(url + "/add_user_to_task/18/1", headers=headers, json={})
)
read_responses.append(
    requests.post(url + "/add_user_to_task/19/1", headers=headers, json={})
)

############################## add below ##############################

read_responses.append(
    requests.post(
        url + "/add_new_suggestion",
        headers=headers,
        json={
            "title": "Mer handsprit i personalrummet",
            "descriptionImportance": "Importante",
            "descriptionImpact": "Impacte",
            "descriptionRequirements": "Requiremente",
            "status": "Archived",
        },
    )
)
read_responses.append(
    requests.post(
        url + "/add_new_suggestion",
        headers=headers,
        json={
            "title": "Bättre plåster till Akuten",
            "descriptionImportance": "123Importante",
            "descriptionImpact": "123Impacte",
            "descriptionRequirements": "123Requiremente",
            "status": "Draft",
        },
    )
)

read_responses.append(
    requests.put(
        url + "/suggestion/2",
        headers=headers,
        json={
            "title": "Ny rutin för gipsning av underarmar",
            "descriptionImportance": "123ImportanteAfterPut",
            "descriptionImpact": "123ImpacteAfterPut",
            "status": "Published",
            "categories": [{"categoryId": 1}],
        },
    )
)
read_responses.append(
    requests.post(
        url + "/add_new_suggestion",
        headers=headers,
        json={
            "title": "Bättre vegansk mat till patienterna",
            "descriptionImportance": "Förbättringsförslag...",
            "descriptionImpact": "Jag tycket att...",
            "descriptionRequirements": "Ett glatt humör",
            "status": "Draft",
            "categories": [{"categoryId": 1}],
        },
    )
)
read_responses.append(
    requests.post(
        url + "/add_new_suggestion",
        headers=headers,
        json={
            "title": "Förbättrad rutin för kartläggning av patienter med allergier",
            "descriptionImportance": "Vissa är faktiskt allergiska mot mjölkprotein.",
            "descriptionImpact": "",
            "descriptionRequirements": "Ingenting",
            "status": "Draft",
            "categories": [{"categoryId": 1}],
        },
    )
)

read_responses.append(
    requests.post(
        url + "/add_new_logbook",
        headers=headers,
        json={
            "logBookTitle": "Tankar under Planeringsfasen",
            "logBookDescription": "Vi vill utreda hur vi kan utföra förbättringsarbeten på ett mer effektivt vis genom att använda oss av en digital plattform. Vi har därför valt att använda oss av denna plattform för att utvärdera hur vi kan förbättra arbetet på avdelningen. Vi har valt att använda oss av en digital plattform för att utvärdera hur vi kan förbättra arbetet på avdelningen. Vi har valt att använda oss av en digital plattform för att utvärdera hur vi kan förbättra arbetet på avdelningen. Vi har valt att använda oss av en digital plattform för att utvärdera hur vi kan förbättra arbetet på avdelningen. Vi har valt att använda oss av en digital plattform för att utvärdera hur vi kan förbättra arbetet på avdelningen. Vi har valt att använda oss av en digital plattform för att utvärdera hur vi kan förbättra arbetet på avdelningen. Vi har valt att använda oss av en digital plattform för att utvärdera hur vi kan förbättra arbetet på avdelningen.",
            "logBookColor": "rgba(76, 187, 113, 0.2)",
            "project_id": 1,
            "user": 1,
        },
    )
)

read_responses.append(
    requests.post(
        url + "/add_new_logbook",
        headers=headers,
        json={
            "logBookTitle": "Tankar under Göra-fasen",
            "logBookDescription": "För att gå vidare med arbetet måste vi förbättra arbetsvilkoren på avdelningen. Jag föreslår att vi gör så här: 1. Vi gör så här 2. Vi gör så här 3. Vi gör så här 4. Vi gör så här 5. Vi gör så här 6. Vi gör så här 7. Vi gör så här 8. Vi gör så här 9. Vi gör så här 10. Vi gör så här 11. Vi gör så här 12. Vi gör så här 13. Vi gör så här 14. Vi gör så här 15. Vi gör så här 16. Vi gör så här 17. Vi gör så här 18. Vi gör så här 19. Vi gör så här 20. Vi gör så här 21. Vi gör så här 22. Vi gör så här 23. Vi gör så här 24. Vi gör så här 25. Vi gör så här 26. Vi gör så här 27. Vi gör så här 28. Vi gör så här 29. Vi gör så här 30. Vi gör så här 31. Vi gör så här 32. Vi gör så här 33. Vi gör så här 34. Vi gör så här 35. Vi gör så här 36. Vi gör så här 37. Vi gör så här 38. Vi gör så här 39. Vi gör så här 40. Vi gör så här 41. Vi gör så här 42. Vi gör så här 43. Vi gör så här 44. Vi gör så här 45. Vi gör så här 46. Vi gör så här 47. Vi gör så här 48. Vi gör så här 49. Vi gör så här 50. Vi gör så här 51. Vi gör så här 52. Vi gör så här 53. Vi gör så här 54. Vi gör så här 55. Vi gör så här 56. Vi gör så här 57. Vi gör så här 58. Vi gör så här 59. Vi gör så här 60. Vi gör så här 61. Vi gör så här 62. Vi gör så här 63. Vi gör så här 64. Vi gör så här 65. Vi gör så här 66. Vi gör så här 67. Vi gör så här 68. Vi gör så här 69. Vi gör så här 70. Vi gör så här 71. Vi gör så här 72.",
            "logBookColor": "rgba(245, 215, 38, 0.2)",
            "project_id": 2,
            "user": 2,
        },
    )
)

read_responses.append(
    requests.post(
        url + "/add_new_logbook",
        headers=headers,
        json={
            "logBookTitle": "Tankar under Studera-fasen",
            "logBookDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "logBookColor": "rgba(231, 169, 201, 0.2)",
            "project_id": 1,
            "user": 1,
        },
    )
)

read_responses.append(
    requests.post(
        url + "/add_new_logbook",
        headers=headers,
        json={
            "logBookTitle": "Tankar under Analys-fase",
            "logBookDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "logBookColor": "rgba(55, 180, 231, 0.2)",
            "project_id": 2,
            "user": 2,
        },
    )
)

read_responses.append(
    requests.put(
        url + "/specify_users_for_task/1", headers=headers, json={"users": [1, 2]}
    )
)

read_responses.append(
    requests.post(
        url + "/add_new_measurement/1",
        headers=headers,
        json={
            "name": "Antal intervjuer hållna",
            "unit": "st",
            "frequencyAmount": "1",
            "frequencyInterval": "vecka",
        },
    )
)

read_responses.append(
    requests.post(
        url + "/add_new_measurement/1",
        headers=headers,
        json={
            "name": "Antal deltagare",
            "unit": "st",
            "frequencyAmount": "2",
            "frequencyInterval": "minut",
        },
    )
)

read_responses.append(
    requests.post(
        url + "/add_new_measurement/1",
        headers=headers,
        json={
            "name": "Väntetid",
            "unit": "min",
            "frequencyAmount": "3",
            "frequencyInterval": "vecka",
        },
    )
)
read_responses.append(
    requests.post(
        url + "/add_new_measurement/2",
        headers=headers,
        json={
            "name": "Workshops",
            "unit": "antal",
            "frequencyAmount": "3",
            "frequencyInterval": "vecka",
        },
    )
)

read_responses.append(
    requests.post(
        url + "/add_new_measurement/2",
        headers=headers,
        json={
            "name": "Utbildningstillfällen",
            "unit": "antal",
            "frequencyAmount": "1",
            "frequencyInterval": "vecka",
        },
    )
)

read_responses.append(
    requests.post(
        url + "/add_new_measurement/2",
        headers=headers,
        json={
            "name": "Statusuppföljning nyanställda",
            "unit": "antal",
            "frequencyAmount": "1",
            "frequencyInterval": "vecka",
        },
    )
)

read_responses.append(
    requests.post(
        url + "/add_new_measurement_child/1",
        headers=headers,
        json={
            "value": "1",
            "date": "",
        },
    )
)

read_responses.append(
    requests.post(
        url + "/add_new_measurement_child/1",
        headers=headers,
        json={
            "value": "2",
            "date": "",
        },
    )
)

read_responses.append(
    requests.post(
        url + "/add_new_measurement_child/1",
        headers=headers,
        json={
            "value": "3",
            "date": "",
        },
    )
)

read_responses.append(
    requests.post(
        url + "/add_new_measurement_child/1",
        headers=headers,
        json={
            "value": "4",
            "date": "",
        },
    )
)

read_responses.append(
    requests.post(
        url + "/add_new_measurement_child/1",
        headers=headers,
        json={
            "value": "5",
            "date": "",
        },
    )
)

read_responses.append(
    requests.post(
        url + "/add_new_link/1",
        headers=headers,
        json={
            "title": "google.com",
            "url": "https://www.google.com/",
        },
    )
)

read_responses.append(
    requests.post(
        url + "/add_new_link/1",
        headers=headers,
        json={
            "title": "regionostergotland.se",
            "url": "https://www.regionostergotland.se/ro",
        },
    )
)

for response in read_responses:
    if response.status_code != 200:
        print(
            "request: "
            + response.url
            + " failed "
            + str(response.status_code)
            + " "
            + response.text
        )

# print succes if all responses are 200
if all(response.status_code == 200 for response in read_responses):
    print("Succesfully filled database!")
