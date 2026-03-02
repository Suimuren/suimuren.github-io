// 初始化变量
let modal;
let modalImage;
let authorAvatar;
let authorName;
let authorAvatarLink;
let authorNameLink;
let prevButton;
let nextButton;
let currentImageIndex = 0;
let images = []; // 存储照片的路径
let authorData = []; // 存储作者信息
let visibleImages = []; // 存储当前可见的照片路径

// 在文档加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');

    // 初始化DOM元素
    modal = document.getElementById('modal');
    modalImage = document.getElementById('modal-image');
    authorAvatar = document.getElementById('author-avatar');
    authorName = document.getElementById('author-name');
    authorAvatarLink = document.getElementById('author-avatar-link');
    authorNameLink = document.getElementById('author-name-link');
    prevButton = document.getElementById('prev-button');
    nextButton = document.getElementById('next-button');

    // 确保模态框初始状态为隐藏
    modal.style.display = 'none';

    // 为所有 .photo-item img 元素添加点击事件监听器
    const photoItems = document.querySelectorAll('.photo-item img');
    images = Array.from(photoItems).map(img => img.src);
    authorData = Array.from(document.querySelectorAll('.photo-item')).map(item => ({
        imgSrc: item.querySelector('img').src,
        avatar: item.getAttribute('data-author-avatar'),
        name: item.getAttribute('data-author-name'),
        avatarLink: item.getAttribute('data-author-avatar-link') || '#',
        nameLink: item.getAttribute('data-author-name-link') || '#'
    }));

    photoItems.forEach(img => {
        img.addEventListener('click', () => openModal(img));
    });

    // 为模态框添加点击事件监听器
    modal.addEventListener('click', event => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // 为按钮添加事件监听器
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            console.log('Button clicked:', this.id);
            document.querySelectorAll('.btn').forEach(btn => {
                btn.classList.remove('active');
                btn.style.background = ''; // 恢复为默认背景
            });
            this.classList.add('active');
            updateContent(this.getAttribute('data-target'));
        });
    });

    // 默认将第一个按钮设置为选中状态
    const defaultButton = document.getElementById('btn1');
    defaultButton.classList.add('active');
    updateContent(defaultButton.getAttribute('data-target'));

    // 为按钮添加事件监听器
    prevButton.addEventListener('click', () => changeImage(-1));
    nextButton.addEventListener('click', () => changeImage(1));
});

// 更新内容显示
function updateContent(target) {
    console.log('Updating content for target:', target);
    const secondContainer = document.querySelector('.second-container');
    const thirdContainer = document.querySelector('.third-container');

    // 隐藏所有内容容器
    secondContainer.style.display = 'none';
    thirdContainer.style.display = 'none';

    // 重置可见图片数组
    visibleImages = [];

    if (target === 'all') {
        secondContainer.style.display = 'block';
        thirdContainer.style.display = 'block';

        // 显示所有照片项
        document.querySelectorAll('.photo-item').forEach(item => {
            item.style.display = 'block';
            visibleImages.push(item.querySelector('img').src);
        });

        console.log('Showing all content');
    } else {
        thirdContainer.style.display = 'block';

        // 仅显示符合目标分类的照片项
        document.querySelectorAll('.photo-item').forEach(item => {
            const category = item.getAttribute('data-category');
            console.log(`Category for item: ${category}`);
            if (category.split(' ').includes(target)) {
                item.style.display = 'block';
                visibleImages.push(item.querySelector('img').src);
            } else {
                item.style.display = 'none';
            }
        });
    }

    console.log('Content update complete');
    console.log('Visible images:', visibleImages);
}

// 关闭模态框
function closeModal() {
    modal.style.display = 'none';
}

// 打开模态框并显示图片
function openModal(imgElement) {
    modal.style.display = 'flex';
    modalImage.src = imgElement.src;
    currentImageIndex = visibleImages.indexOf(imgElement.src);
    updateAuthorInfo();
    updateButtonVisibility();
}

// 更新作者信息
function updateAuthorInfo() {
    const currentImgSrc = visibleImages[currentImageIndex];
    const data = authorData.find(item => item.imgSrc === currentImgSrc);
    if (data) {
        authorAvatar.src = data.avatar;
        authorName.textContent = data.name;
        authorAvatarLink.href = data.avatarLink;
        authorNameLink.href = data.nameLink;
    }
}

// 更新按钮可见性
function updateButtonVisibility() {
    // 根据索引来显示或隐藏按钮
    prevButton.style.display = currentImageIndex === 0 ? 'none' : 'block';
    nextButton.style.display = currentImageIndex === images.length - 1 ? 'none' : 'block';
}

// 切换图片
function changeImage(direction) {
    currentImageIndex = (currentImageIndex + direction + visibleImages.length) % visibleImages.length;
    modalImage.src = visibleImages[currentImageIndex];
    updateAuthorInfo();
    updateButtonVisibility();
}

function scrollToNavbar() {
    const target = document.getElementById('second-navbar-section');
    const navbar = document.querySelector('.navbar'); // 假设你的导航栏有这个类名
    const offset = navbar ? navbar.offsetHeight : 0; // 动态获取导航栏高度

    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = target.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset; // 减去导航栏高度

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// 绑定hashchange事件
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.hash === "#second-navbar-section") {
        scrollToNavbar();
    }

    window.addEventListener('hashchange', function() {
        if (window.location.hash === "#second-navbar-section") {
            scrollToNavbar();
        }
    });
});

