let selectedTeacherName = "";
let currentStudentName = "";

const authContainer = document.getElementById('authContainer');
const mainContainer = document.getElementById('mainContainer');
const authBtn = document.getElementById('authBtn');
const logoutBtn = document.getElementById('logoutBtn');
const teacherItems = document.querySelectorAll('.teacher-item');
const callBtn = document.getElementById('callBtn');

// [기능 1] 회원가입 및 로그인 처리
authBtn.addEventListener('click', () => {
    const id = document.getElementById('studentId').value.trim();
    const name = document.getElementById('studentName').value.trim();

    if (!id || !name) {
        alert('아이디와 이름을 모두 입력해주세요!');
        return;
    }

    currentStudentName = name;
    
    // 신규 가입자 정보를 2번 웹사이트(선생님창)로 전송하기 위한 시그널 생성
    const registerData = {
        id: id,
        name: name,
        time: new Date().toLocaleTimeString(),
        timestamp: Date.now()
    };
    localStorage.setItem('newStudentRegister', JSON.stringify(registerData));

    // 화면 전환
    authContainer.classList.add('hidden');
    mainContainer.classList.remove('hidden');
    document.getElementById('currentStudent').innerText = name;
});

// [기능 2] 로그아웃 버튼
logoutBtn.addEventListener('click', () => {
    currentStudentName = "";
    selectedTeacherName = "";
    document.getElementById('studentId').value = "";
    document.getElementById('studentName').value = "";
    teacherItems.forEach(i => i.classList.remove('active'));
    document.getElementById('selectedTeacher').innerText = "없음";
    callBtn.disabled = true;

    mainContainer.classList.add('hidden');
    authContainer.classList.remove('hidden');
});

// 선생님 선택 이벤트
teacherItems.forEach(item => {
    item.addEventListener('click', () => {
        teacherItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        selectedTeacherName = item.getAttribute('data-name');
        document.getElementById('selectedTeacher').innerText = selectedTeacherName + " 선생님";
        callBtn.disabled = false;
    });
});

// 호출하기 버튼
callBtn.addEventListener('click', () => {
    const message = document.getElementById('messageInput').value.trim();
    if (!message) { alert('메시지를 입력해주세요!'); return; }

    const callData = {
        sender: currentStudentName,
        teacher: selectedTeacherName,
        message: message,
        time: new Date().toLocaleTimeString(),
        id: Date.now()
    };

    localStorage.setItem('teacherCallSignal', JSON.stringify(callData));
    alert(`${selectedTeacherName} 선생님을 호출했습니다!`);
    document.getElementById('messageInput').value = "";
});