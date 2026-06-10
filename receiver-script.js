const currentTeacherName = "홍길동"; // 테스트용 로그인 선생님 이름

const loginSection = document.getElementById('loginSection');
const mainSection = document.getElementById('mainSection');
const loginBtn = document.getElementById('loginBtn');
const alertBox = document.getElementById('alertBox');
const noNotification = document.getElementById('noNotification');
const studentRegisterList = document.getElementById('studentRegisterList');

loginBtn.addEventListener('click', () => {
    const id = document.getElementById('username').value;
    const pw = document.getElementById('password').value;

    if(id === "teacher" && pw === "1234") {
        loginSection.classList.add('hidden');
        mainSection.classList.remove('hidden');
        document.getElementById('loginStatus').innerText = `안녕하세요, ${currentTeacherName} 선생님!`;
        startListening(); 
    } else {
        alert('아이디 또는 비밀번호가 틀렸습니다.');
    }
});

function startListening() {
    window.addEventListener('storage', (event) => {
        // [이벤트 1] 호출 신호 감지
        if (event.key === 'teacherCallSignal' && event.newValue) {
            const data = JSON.parse(event.newValue);
            if (data.teacher === currentTeacherName) {
                showAlarm(data);
            }
        }
        
        // [이벤트 2] 신규 가입자 신호 감지
        if (event.key === 'newStudentRegister' && event.newValue) {
            const studentData = JSON.parse(event.newValue);
            addStudentToList(studentData);
        }
    });
}

function showAlarm(data) {
    noNotification.classList.add('hidden');
    alertBox.classList.remove('hidden');
    document.getElementById('alertSender').innerText = data.sender;
    document.getElementById('alertContent').innerText = data.message;
    document.getElementById('alertTime').innerText = `호출 시간: ${data.time}`;
    alert(`🚨 [알림] ${data.sender} 학생이 호출했습니다!`);
}

// 명단에 가입 학생 추가하는 함수
function addStudentToList(student) {
    const li = document.createElement('li');
    li.className = 'student-li';
    li.innerHTML = `
        <span><strong>${student.name}</strong> (${student.id}) 학생 가입</span>
        <span class="reg-time">${student.time}</span>
    `;
    studentRegisterList.appendChild(li);
}

document.getElementById('closeAlertBtn').addEventListener('click', () => {
    alertBox.classList.add('hidden');
    noNotification.classList.remove('hidden');
});