document.addEventListener("DOMContentLoaded", () => {
  const questionDisplay = document.getElementById("questionDisplay");
  const rollBtn = document.getElementById("rollBtn");

  function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }

  function showRandomQuestion() {
    questionDisplay.textContent = getRandomQuestion();
  }

  showRandomQuestion();
  rollBtn.addEventListener("click", showRandomQuestion);
});
