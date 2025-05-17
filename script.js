// ฟังก์ชันสลับการมองเห็นรหัสผ่าน (ใช้ใน index.html)
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.querySelector('.eye-icon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.src = 'https://img.icons8.com/ios-filled/50/000000/invisible.png';
    } else {
        passwordInput.type = 'password';
        eyeIcon.src = 'https://img.icons8.com/ios-filled/50/000000/visible.png';
    }
}

// ฟังก์ชันสำหรับการล็อกอิน (ใช้ใน index.html)
function setupLoginForm() {
    // กำหนดข้อมูลสำหรับการล็อกอิน (hard-code)
    const branches = [
        {
            branchType: "bigformat",
            branchCode: "B001",
            password: "123456"
        },
        {
            branchType: "bigcmini",
            branchCode: "C001",
            password: "654321"
        }
    ];

    // เลือกฟอร์ม Login
    const loginForm = document.getElementById('login-form');

    if (!loginForm) {
        console.error('ไม่พบฟอร์ม login-form');
        return;
    } else {
        console.log('พบฟอร์ม login-form แล้ว');
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const branchType = document.getElementById('branch-type').value;
        const branchCode = document.getElementById('branch-code').value;
        const password = document.getElementById('password').value;

        console.log('ข้อมูลที่กรอก:', { branchType, branchCode, password });

        if (!branchType || !branchCode || !password) {
            alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
            console.log('ข้อมูลไม่ครบ');
            return;
        }

        const matchedBranch = branches.find(branch => 
            branch.branchType === branchType &&
            branch.branchCode === branchCode &&
            branch.password === password
        );

        if (!matchedBranch) {
            alert('ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบประเภทสาขา, รหัสสาขา, หรือรหัสผ่าน');
            console.log('ข้อมูลไม่ตรงกับที่กำหนด');
            return;
        }

        localStorage.setItem('branchCode', branchCode);
        console.log('เก็บ branchCode ใน localStorage:', branchCode);

        if (branchType === 'bigformat') {
            console.log('เปลี่ยนหน้าไป bigformat.html');
            window.location.href = 'bigformat.html';
        } else if (branchType === 'bigcmini') {
            console.log('เปลี่ยนหน้าไป bigcmini.html');
            window.location.href = 'bigcmini.html';
        }

        loginForm.reset();
    });
}

// ฟังก์ชันสำหรับการสลับแท็บ (ใช้ใน bigcmini.html และ bigformat.html)
function showTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// ฟังก์ชันสำหรับการออกจากระบบ (ใช้ใน bigcmini.html และ bigformat.html)
function logout() {
    localStorage.removeItem('branchCode');
    window.location.href = 'index.html';
}

// ฟังก์ชันสำหรับตรวจสอบ branchCode และแสดงในหน้า Homepage (ใช้ใน bigcmini.html และ bigformat.html)
function setupHomepage() {
    const branchCode = localStorage.getItem('branchCode');
    if (branchCode) {
        document.getElementById('branch-code').textContent = branchCode;
    } else {
        alert('ไม่พบรหัสสาขา กรุณาเข้าสู่ระบบใหม่');
        window.location.href = 'index.html';
    }
}

// เรียกใช้งานฟังก์ชันเมื่อหน้าโหลด
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('login-form')) {
        setupLoginForm();
    }
    if (document.getElementById('branch-code')) {
        setupHomepage();
    }

    // ตั้งค่า Particles.js (ถ้ามีหน้า login-page)
    if (document.body.classList.contains('login-page')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#6b21a8' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: '#6b21a8', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }
});