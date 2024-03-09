export const submitFeedback = (heartClicked: number, comment: string) => {
    if (heartClicked === 0) {
      alert("Klicka i antal hjärtan");
      return;
    }
    if (comment === "") {
      alert("Du måste skriva en kommentar");
      return;
    }
  };



