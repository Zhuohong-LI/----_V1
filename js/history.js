document.addEventListener("DOMContentLoaded", () => {
  const historyList = document.getElementById("historyList");

  function formatTime(timestamp) {
    try {
      return new Date(timestamp).toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (error) {
      console.error("格式化时间失败：", error);
      return timestamp;
    }
  }

  function createHistoryItem(entry) {
    const item = document.createElement("article");
    item.className = "history-item";

    const question = document.createElement("h2");
    question.className = "history-question";
    question.textContent = entry.question;

    const time = document.createElement("p");
    time.className = "history-time";
    time.textContent = formatTime(entry.timestamp);

    const content = document.createElement("p");
    content.className = "history-content";
    content.textContent = entry.content;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.type = "button";
    deleteBtn.textContent = "删除";
    deleteBtn.addEventListener("click", () => {
      const deleted = deleteEntry(entry.id);

      if (deleted) {
        renderHistory();
      }
    });

    item.append(question, time, content, deleteBtn);
    return item;
  }

  function renderHistory() {
    const entries = getAllEntries();
    historyList.innerHTML = "";

    if (entries.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.className = "empty-message";
      emptyMessage.textContent = "暂无写作记录";
      historyList.appendChild(emptyMessage);
      return;
    }

    entries.forEach((entry) => {
      historyList.appendChild(createHistoryItem(entry));
    });
  }

  renderHistory();
});
