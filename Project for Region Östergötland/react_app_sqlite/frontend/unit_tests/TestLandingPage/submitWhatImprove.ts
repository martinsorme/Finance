
export const submitWhatImprove = (text1: string, text2: string) => {
    if (text1 === "" || text2 === "") {
        alert("Du måste fylla i båda fälten");
        return;
    } else {
        return [text1, text2];
    }
};
