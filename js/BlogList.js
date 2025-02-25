import { LitElement, html } from './lit-all.min.js';
import './BlogPostCard.js'; // 导入 BlogPost 组件

export class BlogList extends LitElement {
  static properties = {
    posts: { type: Array },
  };

  constructor() {
    super();
    this.posts = [
      {
        title: '文章标题 1',
        date: '2023年10月1日',
        content: '这是第一篇文章的内容。',
      },
      {
        title: '文章标题 2',
        date: '2023年10月2日',
        content: '这是第二篇文章的内容。',
      },
      {
        title: '文章标题 3',
        date: '2023年10月3日',
        content: '这是第三篇文章的内容。',
      },
    ];
  }

  render() {
    return html`
      <div>
        ${this.posts.map(
          (post) => html`
            <blog-post
              title=${post.title}
              date=${post.date}
              content=${post.content}
            ></blog-post>
          `
        )}
      </div>
    `;
  }
}

customElements.define('blog-list', BlogList);