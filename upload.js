const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const publishBtn = document.getElementById('publishBtn');
const imagePreview = document.getElementById('imagePreview');
const titleInput = document.getElementById('title');
const descriptionTextarea = document.getElementById('description');

// 触发文件选择
uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

// 处理文件选择
fileInput.addEventListener('change', (event) => {
    handleFiles(event);
});

function handleFiles(event) {
    const files = event.target.files;
    imagePreview.innerHTML = ''; // 清空之前的预览
    for (let file of files) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'preview-image';
                imagePreview.appendChild(img);
            };
            reader.readAsDataURL(file);
        } else {
            console.log('Not an image file:', file);
        }
    }
}

// 发布按钮点击事件
publishBtn.addEventListener('click', () => {
    // 清空图片预览、文件输入框、标题和描述字段
    imagePreview.innerHTML = '';
    fileInput.value = '';
    titleInput.value = '';
    descriptionTextarea.value = '';
});
