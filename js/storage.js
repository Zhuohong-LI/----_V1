const STORAGE_KEY = "writingEntries";

function readEntries() {
  try {
    const entriesText = localStorage.getItem(STORAGE_KEY);
    const entries = entriesText ? JSON.parse(entriesText) : [];
    return Array.isArray(entries) ? entries : [];
  } catch (error) {
    console.error("读取写作记录失败：", error);
    return [];
  }
}

function writeEntries(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return true;
  } catch (error) {
    console.error("保存写作记录失败：", error);
    return false;
  }
}

function saveEntry(question, content) {
  try {
    const entryQuestion = String(question || "").trim();
    const entryContent = String(content || "").trim();

    if (!entryQuestion || !entryContent) {
      return null;
    }

    const entries = readEntries();
    const entry = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      question: entryQuestion,
      content: entryContent,
      timestamp: new Date().toISOString()
    };

    entries.push(entry);
    return writeEntries(entries) ? entry : null;
  } catch (error) {
    console.error("新增写作记录失败：", error);
    return null;
  }
}

function getAllEntries() {
  try {
    return readEntries().sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  } catch (error) {
    console.error("获取写作记录失败：", error);
    return [];
  }
}

function deleteEntry(id) {
  try {
    const entries = readEntries();
    const nextEntries = entries.filter((entry) => entry.id !== id);
    return writeEntries(nextEntries);
  } catch (error) {
    console.error("删除写作记录失败：", error);
    return false;
  }
}
