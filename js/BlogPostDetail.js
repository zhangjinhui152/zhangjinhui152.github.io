import { LitElement, html, css } from './lit-all.min.js';

export class BlogPostDetail extends LitElement {
  static styles = css`
   
.post-content {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin:20px 0;
}

.post h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color:#0078d4;
}

.post-meta {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 20px;
}

.post-body {
    font-size: 1.1rem;
    line-height: 1.8;
}

.back-button {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background: #0078d4;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background 0.2s;
}

.back-button:hover {
    background: #005bb5;
}

  `;

  static properties = {
    title: { type: String },
    author: { type: String },
    date: { type: String },
    content: { type: String },
  };

  constructor() {
    super();
    this.title = 'Blog Post Title';
    this.author = 'John Doe';
    this.date = 'October 10, 2023';
    this.content = `
      This is the full content of the blog post. It demonstrates the use of Fluent Design 2 and acrylic effects.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque leo ac justo fermentum, vel tincidunt nisi tincidunt. Vivamus euismod, nisi vel consectetur tincidunt, nisl nisi tincidunt nisi, vel tincidunt nisi nisi vel nisi.
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    `;
  }

  handleBack() {
    alert('你点击了“返回首页”按钮！');
    // 这里可以添加跳转逻辑，例如：
    // window.location.href = '../index.html';
  }

  render() {
    return html`
      <main class="post-content">
        <article class="post">
          <h2>${this.title}</h2>
          <div class="post-meta">
            <span>Author: ${this.author}</span>
            <span>Published: ${this.date}</span>
          </div>
          <div class="post-body">
            ${this.content.split('\n').map(
      (paragraph) => html`<p>${paragraph}</p>`
    )}
          </div>
        </article>
        <a href="#" class="back-button" @click=${this.handleBack}>Back to Home</a>
      </main>
    `;
  }
}

customElements.define('blog-post-detail', BlogPostDetail);