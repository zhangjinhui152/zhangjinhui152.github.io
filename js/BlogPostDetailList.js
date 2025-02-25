import { LitElement, html } from './lit-all.min.js';
import './BlogPostDetail.js'; // 导入 BlogPostDetail 组件

export class BlogPostDetailList extends LitElement {
    static properties = {
        posts: { type: Array }, // 定义 posts 属性
    };

    constructor() {
        super();
        this.posts = [
            {
                title: '默认文章标题 1',
                author: '默认作者',
                date: '2023年10月1日',
                content: '这是默认的第一篇文章内容。Fluent Design 2 是微软设计语言的最新版本，强调深度、动画和材质效果。亚克力效果是一种半透明的背景模糊效果，可以为网页增添现代感。',
            },
            {
                title: '默认文章标题 2',
                author: '默认作者',
                date: '2023年10月2日',
                content: '这是默认的第二篇文章内容。Lit 是一个轻量级的库，用于构建快速、高效的 Web 组件。',
            },
        ];

    }

    render() {
        return html`
      <div>
        ${this.posts.map(
            (post) => html`
            <blog-post-detail
              title=${post.title}
              author=${post.author}
              date=${post.date}
              content=${post.content}
            ></blog-post-detail>
          `
        )}
      </div>
    `;
    }
}

customElements.define('blog-post-detail-list', BlogPostDetailList);