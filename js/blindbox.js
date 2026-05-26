document.addEventListener("DOMContentLoaded", () => {
  const questionDisplay = document.getElementById("questionDisplay");
  const rollBtn = document.getElementById("rollBtn");
  const writingArea = document.getElementById("writingArea");
  const saveBtn = document.getElementById("saveBtn");
  const historyBtn = document.getElementById("historyBtn");
  const messageArea = document.getElementById("messageArea");

  let currentQuestion = "";

  function showMessage(message, type = "success") {
    if (!messageArea) {
      return;
    }

    messageArea.textContent = message;
    messageArea.className = type === "error" ? "message-area error" : "message-area";
  }

  function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }

  function showRandomQuestion() {
    currentQuestion = getRandomQuestion();
    questionDisplay.textContent = currentQuestion;
    showMessage("");
  }

  function handleSave() {
    const content = writingArea.value.trim();

    if (!content) {
      showMessage("请先写一些内容再保存。", "error");
      writingArea.focus();
      return;
    }

    const savedEntry = saveEntry(currentQuestion, content);

    if (!savedEntry) {
      showMessage("保存失败，请稍后再试。", "error");
      return;
    }

    writingArea.value = "";
    showMessage("已保存本文。");
  }

  showRandomQuestion();
  rollBtn.addEventListener("click", showRandomQuestion);
  saveBtn.addEventListener("click", handleSave);
  historyBtn.addEventListener("click", () => {
    window.location.href = "history.html";
  });
});
