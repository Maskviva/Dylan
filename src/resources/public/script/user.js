const user_box = document.getElementById('user-box');
const user_info = document.getElementById('user-info')
const logout = document.getElementById('logout');

const portraitDoc = document.querySelectorAll('a.user-info-box-2-child1-img.user-portrait');
const images = document.getElementsByTagName('img');// 遍历所有图片

for (const img of images) {
    if (img.alt.includes('用户头像')) {
        for (const element of portraitDoc) {
            element.style.backgroundImage = `url("${img.src}")`;
        }
    }
}

window.addEventListener('click', (e) => {
    if (user_box.contains(e.target) || user_info.contains(e.target)) {
        user_info.style.display = 'flex';
    } else {
        user_info.style.display = 'none';
    }

    if (logout.contains(e.target)) {
        fetch('/api/logout', {
            method: 'POST'
        }).then(() => {
            window.location.href = '/';
        })
    }
})