// app.js

// ✅ 데모용 "계정 ID" 데이터 (비밀번호는 절대 프론트에 넣지 마세요)
// 실제 서비스라면 서버(API)에서 조회해서 내려주는 방식이 안전합니다.
const ACCOUNTS = [
  { studentId: "20250123", name: "홍길동", googleId: "20250123@school.edu" },
  { studentId: "20250124", name: "김철수", googleId: "20250124@school.edu" },
  { studentId: "20250125", name: "이영희", googleId: "20250125@school.edu" },
];

const form = document.getElementById("searchForm");
const studentIdEl = document.getElementById("studentId");
const studentNameEl = document.getElementById("studentName");

const statusMsgEl = document.getElementById("statusMsg");
const resultBoxEl = document.getElementById("resultBox");
const resultHintEl = document.getElementById("resultHint");
const resultIdEl = document.getElementById("resultId");
const resultPwEl = document.getElementById("resultPw");

// 화면 상태 헬퍼
function setStatus(message = "", type = "info") {
  // type: info | error
  statusMsgEl.textContent = message;
  statusMsgEl.style.color = type === "error" ? "#ff6b6b" : "#666";
}

function showResult({ googleId, passwordGuide }) {
  resultHintEl.hidden = true;
  resultBoxEl.hidden = false;

  resultIdEl.textContent = googleId || "-";
  // ❗ 비밀번호 자체를 보여주지 않고, 안내 문구/절차를 표시
  resultPwEl.textContent = passwordGuide || "-";
}

function hideResult() {
  resultBoxEl.hidden = true;
  resultHintEl.hidden = false;

  resultIdEl.textContent = "-";
  resultPwEl.textContent = "-";
}

// 입력 정리(공백 제거, 이름은 내부 공백도 정리)
function normalizeStudentId(v) {
  return (v || "").trim();
}
function normalizeName(v) {
  return (v || "").trim().replace(/\s+/g, "");
}

// 데모: 로컬 배열에서 찾기
function findAccount(studentId, name) {
  const sid = normalizeStudentId(studentId);
  const nm = normalizeName(name);

  return ACCOUNTS.find(
    (a) => a.studentId === sid && normalizeName(a.name) === nm
  );
}

// 폼 submit(버튼 클릭/엔터) 처리
form.addEventListener("submit", (e) => {
  e.preventDefault();
  setStatus("");
  hideResult();

  const sid = normalizeStudentId(studentIdEl.value);
  const nm = normalizeName(studentNameEl.value);

  if (!sid || !nm) {
    setStatus("학번과 이름을 모두 입력해줘!", "error");
    return;
  }

  // (선택) 학번 숫자 형식 간단 체크
  if (!/^\d{4,}$/.test(sid)) {
    setStatus("학번은 숫자로 입력해줘!", "error");
    studentIdEl.focus();
    return;
  }

  const account = findAccount(sid, nm);

  if (!account) {
    setStatus("일치하는 정보가 없어. 학번/이름을 다시 확인해줘!", "error");
    return;
  }

  setStatus("조회 완료! 🎀", "info");

  showResult({
    googleId: account.googleId,
    passwordGuide:
      "비밀번호는 보안상 표시하지 않아요. 담임/관리자에게 초기화 요청 또는 비밀번호 재설정을 진행해줘요.",
  });
});

// 첫 로딩 시 결과 숨김
hideResult();
setStatus("");
