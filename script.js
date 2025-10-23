// === 1. Dark Mode Toggle với localStorage ===
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const newTheme = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeToggle.innerHTML = theme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
}

// === 2. Loading & Reveal ===
document.addEventListener('DOMContentLoaded', function() {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('fade-out');
        setTimeout(() => {
            loading.style.display = 'none';
            initReveal();
        }, 500);
    }, 1200);

    // Menu active
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Form submit
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Cảm ơn bạn! Mình sẽ phản hồi sớm nhất qua email hoặc SĐT bạn đã cung cấp.');
            this.reset();
        });
    }

    // === 3. Blog Data with Tags ===

const blogData = [
    {
        title: "Python for Offensive PenTest: Exploring Cyber Security",
        date: "15/09/2024",
        excerpt: "Sách miễn phí dạy cách dùng Python trong pentest và bảo mật mạng. Rất phù hợp cho người mới bắt đầu.",
        tag: "security",
        image: "python.png", // Logo Python
        url: "https://www.packtpub.com/product/python-for-offensive-pentest-third-edition/9781800563150"
    },
    {
        title: "The Web Application Hacker's Handbook",
        date: "01/06/2022",
        excerpt: "Sách kinh điển về bảo mật web. Phân tích chi tiết các lỗ hổng như XSS, CSRF, SQLi, v.v.",
        tag: "security",
        image: "hack.png", // Hacker icon
        url: "https://www.wiley.com/en-us/The+Web+Application+Hacker%27s+Handbook%2C+2nd+Edition-p-9781118026472"
    },
    {
        title: "Learn JavaScript - Free Interactive Course",
        date: "10/01/2023",
        excerpt: "Khóa học JavaScript miễn phí trên FreeCodeCamp. Học từ cơ bản đến nâng cao.",
        tag: "dev",
        image: "js.png", // JavaScript logo
        url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/"
    },
    {
        title: "OWASP Top 10: A Guide for Beginners",
        date: "20/07/2023",
        excerpt: "Tài liệu chính thức từ OWASP về 10 lỗ hổng bảo mật phổ biến nhất. Rất hay cho người mới.",
        tag: "security",
        image: "OWSAP.png", // OWASP logo
        url: "https://owasp.org/www-project-top-ten/"
    },
    {
        title: "Automated Software Testing with Python",
        date: "05/05/2023",
        excerpt: "Hướng dẫn kiểm thử tự động bằng Python, Selenium, Pytest. Phù hợp với QA/Test Engineer.",
        tag: "testing",
        image: "python.png", // Python + Test icon
        url: "https://testautomationu.applitools.com/python-tutorial/"
    },
    {
        title: "JavaScript.info - The Modern JavaScript Tutorial",
        date: "01/01/2024",
        excerpt: "Website học JavaScript miễn phí, đầy đủ, cập nhật ES6+. Rất phù hợp để học và ôn lại kiến thức.",
        tag: "dev",
        image: "js.png", // JavaScript.info favicon
        url: "https://javascript.info/"
    },
    {
        title: "Testing JavaScript by Kent C. Dodds",
        date: "12/03/2022",
        excerpt: "Khóa học chuyên sâu về testing JavaScript, React. Dạy từ unit test đến E2E.",
        tag: "testing",
        image: "js.png", // TestingJS logo
        url: "https://testingjavascript.com/"
    },
    {
        title: "Real World HTTP",
        date: "08/11/2021",
        excerpt: "Sách giúp hiểu rõ giao thức HTTP, rất cần cho tester và developer làm web.",
        tag: "tools",
        image: "https://cdn.iconscout.com/icon/free/png-256/http-protocol-3776754-3149464.png", // HTTP icon
        url: "https://www.oreilly.com/library/view/real-world-http/9781098114668/"
    },
    {
        title: "Cracking the Coding Interview",
        date: "01/06/2015",
        excerpt: "Sách kinh điển luyện phỏng vấn lập trình. Rất hữu ích cho dev và tester cần tư duy thuật toán.",
        tag: "dev",
        image: "sc1.png", // Coding icon
        url: "http://www.crackingthecodinginterview.com/"
    }
];

    renderBlog(blogData);
    setupTagFilter(blogData);

    // === 4. GitHub Repos ===
    fetchGitHubRepos();
});

// Render blog cards
function renderBlog(posts, tag = 'all') {
    const container = document.getElementById('blog-grid');
    container.innerHTML = '';

    const filtered = tag === 'all' ? posts : posts.filter(p => p.tag === tag);

    filtered.forEach((post, index) => {
        const card = document.createElement('article');
        card.className = `blog-card reveal`;
        card.style.transitionDelay = `${index * 0.05}s`;

        // Tạo thẻ a để bao toàn bộ card, khi click mở link
        const link = document.createElement('a');
        link.href = post.url;
        link.target = '_blank'; // Mở tab mới
        link.style.textDecoration = 'none';
        link.style.color = 'inherit';

        link.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="card-header">
                <h3>${post.title}</h3>
                <span class="date">${post.date}</span>
            </div>
            <p>${post.excerpt}</p>
            <span class="read-more">Đọc tiếp →</span>
        `;

        card.appendChild(link);
        container.appendChild(card);
    });
} 
   
// Tag filter
function setupTagFilter(posts) {
    const buttons = document.querySelectorAll('.tag-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const tag = btn.dataset.tag;
            renderBlog(posts, tag);
            // Re-init reveal for new cards
            setTimeout(initReveal, 100);
        });
    });
}

// Scroll reveal
function initReveal() {
    const revealElements = document.querySelectorAll('.reveal:not(.active)');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));
}

// GitHub API
async function fetchGitHubRepos() {
    const username = 'lehoangthanhphu'; // ⚠️ THAY BẰNG USERNAME THẬT CỦA BẠN
    const container = document.getElementById('repos-grid');
    
    try {
        // === ĐÃ SỬA: XÓA DẤU CÁCH THỪA ===
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (!response.ok) throw new Error('Không thể lấy dữ liệu GitHub');
        
        const repos = await response.json();
        container.innerHTML = '';

        repos.slice(0, 6).forEach(repo => {
            const card = document.createElement('div');
            card.className = 'repos-card reveal';
            const updatedAt = new Date(repo.updated_at).toLocaleDateString('vi-VN');
            card.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || 'Không có mô tả.'}</p>
                <div class="repo-meta">
                    <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                    <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                    <span><i class="fas fa-history"></i> Cập nhật: ${updatedAt}</span>
                </div>
            `;
            container.appendChild(card);
        });

        setTimeout(initReveal, 100);
    } catch (error) {
        container.innerHTML = `<p style="color: #e74c3c;">❌ Không thể tải repository. Vui lòng kiểm tra username GitHub.</p>`;
        console.error('GitHub API error:', error);
    }
}

// === HIỆU ỨNG CHUYỂN MÀU KHI CUỘN TRANG ===
function updateScrollGradient() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min(scrollTop / docHeight, 1);

    // Màu đầu: trắng (#ffffff)
    // Màu cuối: xanh biển (#1e88e5)
    const startColor = [255, 255, 255];
    const endColor = [30, 136, 229];

    const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * scrollPercent);
    const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * scrollPercent);
    const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * scrollPercent);

    // Áp dụng cho lớp nền cố định
    const bg = document.getElementById('gradient-bg');
    if (bg) {
        bg.style.background = `rgb(${r}, ${g}, ${b})`;
    }
}

// Gắn sự kiện
window.addEventListener('scroll', updateScrollGradient);

// Gọi ban đầu
document.addEventListener('DOMContentLoaded', () => {
    updateScrollGradient();
});