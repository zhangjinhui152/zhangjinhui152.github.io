import { LitElement, html, css } from './lit-all.min.js';

export class BlogPost extends LitElement {
  static styles = css`
    .post {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }

    .post h2 {
      margin: 0 0 10px;
      font-size: 2rem;
      color: #0078d7;
    }

    .post .meta {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 10px;
    }

    .post p {
      line-height: 1.6;
    }

    .read-more {
      display: inline-block;
      margin-top: 10px;
      padding: 10px 20px;
      background-color: #0078d7;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }

    .read-more:hover {
      background-color: #005bb5;
    }
  `;

  static properties = {
    title: { type: String },
    date: { type: String },
    content: { type: String },
  };

  constructor() {
    super();
    this.title = '文章标题';
    this.date = '2023年10月1日';
    this.content =
      '这里是文章的内容。Fluent Design 2 是微软设计语言的最新版本，强调深度、动画和材质效果。亚克力效果是一种半透明的背景模糊效果，可以为网页增添现代感。';
  }

  render() {
    return html`
      
      <article class="post">
        <h2 >${this.title}</h2>
        <p class="meta">发布于 ${this.date}</p>
        <p>${this.content}</p>
        <a href="#" class="read-more">阅读更多</a>
      </article>
    `;
  }
}

customElements.define('blog-post', BlogPost);