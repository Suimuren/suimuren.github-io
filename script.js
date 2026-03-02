const carousel = document.querySelector(".carousel");
const arrowIcons = document.querySelectorAll(".next-previous-button");
let currentIndex = 0;

const getGroupInfo = () => {
    const items = carousel.querySelectorAll('.item');
    const itemWidth = items[0].offsetWidth;
    const itemMarginRight = parseInt(window.getComputedStyle(items[0]).marginRight); // 获取 margin-right
    const totalItems = items.length;
    const itemsPerView = window.innerWidth <= 768 ? 1 : 3;
    return { itemWidth: itemWidth + itemMarginRight, totalItems, itemsPerView }; // 加入 margin-right 计算总宽度
};


const updateArrowButtons = () => {
    const { totalItems, itemsPerView } = getGroupInfo();
    arrowIcons[0].classList.toggle('hidden', currentIndex <= 0);
    arrowIcons[1].classList.toggle('hidden', currentIndex >= totalItems - itemsPerView);
};

const scrollToIndex = (index) => {
    const { itemWidth, totalItems, itemsPerView } = getGroupInfo();
    const maxIndex = totalItems - itemsPerView;

    // 确保当前索引在合法范围内
    currentIndex = Math.max(0, Math.min(index, maxIndex));

    // 计算滚动距离
    const scrollOffset = currentIndex * itemWidth;

    // 使用 transform 移动
    carousel.style.transform = `translateX(-${scrollOffset}px)`;

    // 更新按钮状态
    updateArrowButtons();
};

// 添加点击事件处理器
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        const { itemsPerView } = getGroupInfo();
        const direction = icon.id === "left" ? -1 : 1;

        // 进行滚动
        scrollToIndex(currentIndex + direction);
    });
});

// 处理窗口调整大小
window.addEventListener('resize', () => {
    clearTimeout(carousel.resizeTimer);
    carousel.resizeTimer = setTimeout(() => {
        scrollToIndex(currentIndex);
        updateArrowButtons();
    }, 100);
});

// 初始化更新箭头按钮
updateArrowButtons();

