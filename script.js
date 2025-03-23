// 👉 너의 Firebase 설정 코드 붙여넣기!
const firebaseConfig = {
    apiKey: "AIzaSyAHuqNJBqyG7FLqfvqw7zUxdB2r51hCFm0",
    authDomain: "jueun-s-chat-app.firebaseapp.com",
    databaseURL: "https://jueun-s-chat-app-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jueun-s-chat-app",
    storageBucket: "jueun-s-chat-app.firebasestorage.app",
    messagingSenderId: "513132243750",
    appId: "1:513132243750:web:193dc2e02c16626cb32fe7",
    measurementId: "G-15MDKMSC8N"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const chatBox = document.getElementById("chat-box");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");

// 메시지 보내기
messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && messageInput.value.trim() !== "") {
        const msg = {
            name: usernameInput.value || "익명",
            text: messageInput.value,
            time: Date.now()
        };
        db.ref("chat").push(msg);
        messageInput.value = "";
    }
});

// 메시지 수신
db.ref("chat").on("child_added", function (snapshot) {
    const msg = snapshot.val();
    const msgDiv = document.createElement("div");
    msgDiv.innerHTML = `<strong>${msg.name}</strong>: ${msg.text}`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
});
