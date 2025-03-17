import { LitElement, html, css } from './lit-all.min.js';


class FancyBlogCard extends LitElement {
  static properties = {
    layout: { type: String }, // left | right
    cover: { type: String },
    title: { type: String },
    description: { type: String },
    id: { type: Number }
  };

  static styles = css`
        :host {
            display: block;
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .card {
            width:100%;
            display: flex;
            height: 280px;
            background:  light-dark(var(--summer_background_transparent),var(--summer_background_transparent_dark));
            backdrop-filter: blur(20px);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.4);
        }

        .image-container {
            flex: 0 0 45%;
            overflow: hidden;
            position: relative;
        }

        .image-container.left {
            clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
        }

        .image-container.right {
            clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
        }


        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }

        .content {
            flex: 1;
            padding: 32px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        h3 {
            font-size: clamp(16px, 4vw, 1.8em);
            margin: 0 0 16px 0;
            color:  light-dark(var(--summer_text),var(--summer_text_dark));
            position: relative;
            display: inline-block;
        }

        h3::after {
            user-select: pointer;
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 40px;
            height: 3px;
            background: linear-gradient(90deg, #0078D4 0%, #00B4FF 100%);
        }

        p {
            user-select: pointer;
            color: light-dark(var(--summer_text),var(--summer_text_dark));;
            line-height: 1.6;
            margin: 0;
        }

        /* :host(:hover) {
            
        } */

        :host(:hover) img {
            transform: scale(1.1);
            transform: scale(1.02) rotate(1deg);
        }

        @media (max-width: 768px) {
            .card {
                flex-direction: column;
                height: auto;
            }

            .image-container {
                flex: 0 0 200px;
                clip-path: polygon(0 0, 100% 0, 100% 80%, 0% 100%) !important;
                }
        }
    `;
  handleClick = (id) => {
    console.log('点击了卡片', id);
    // 在这里可以执行其他操作，如跳转到其他页面等
    window.location.href = '/post.html?id=' + id;
  };
  render() {
    const layoutClass = this.layout === 'right' ? 'right' : 'left';

    return html`
            <div class="card acrylic" @click=${() => this.handleClick(this.id)}>
                <div class="image-container ${layoutClass}">
                    <img src=${this.cover} alt="封面">
                </div>
                
                <div class="content">
                    <h3>${this.title}</h3>
                    <p>${this.description}</p>
                </div>
            </div>
        `;
  }
}
customElements.define('fancy-blog-card', FancyBlogCard);






class ListRenderer extends LitElement {
  static properties = {
    items: { type: Array }, // 定义一个数组属性
  };
  // 添加一个方法用于更新数据
  setItems(newItems) {
    this.items = newItems;
    console.log('this.items :>> ', newItems);
  }
  constructor() {
    super();
    this.items = [
      { id: 1, title: 'Item 1', description: 'This is the first item', cover: "https://s3.bmp.ovh/imgs/2025/01/10/785a52aaed6337ec.jpg" },
      { id: 2, title: 'Item 2', description: 'This is the second item', cover: "https://s3.bmp.ovh/imgs/2024/09/25/d91b098088cce933.jpg" },
      { id: 3, title: 'Item 3', description: 'This is the third item', cover: "https://s3.bmp.ovh/imgs/2024/08/21/ea1485e32b39b09d.jpg" },
    ];
  }
  static styles = css`
      .container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
}
 

.container {
    user-select: pointer;
    .card {
        width: 60%;
        margin-top: 10px;
    }
}
    `;
  render() {
    return html`
        <div class="container">
          ${this.items.map(
      (item) => html`
            <fancy-blog-card class="card" layout="left" 
              cover=${item.cover}
              title=${item.title}
            description=${item.description}
            id=${item.id}>
        </fancy-blog-card>
            `
    )}
        </div>
      `;
  }
}


customElements.define('list-renderer', ListRenderer);





/**
 * @typedef {Object} CommentData
 * @property {number} comment_id - 评论的唯一标识符
 * @property {number} blog_id - 关联的博客ID
 * @property {string} user_name - 用户名
 * @property {string} user_email - 用户邮箱
 * @property {string} comment_text - 评论内容
 * @property {string} created_at - 评论创建时间
 * @property {string} updated_at - 评论更新时间
 * @property {boolean} is_approved - 评论是否已批准
 * @property {number|null} parent_comment_id - 父评论ID（用于嵌套评论）
 */

/**
 * 评论组件，用于显示单条评论。
 * @element comment-item
 */
class CommentItem extends LitElement {
  static styles = css`

      .comment {
        box-sizing: border-box;
        background-color: light-dark(var(--summer_card-bg), var(--summer_card-bg_dark)); 
        padding: 15px;
        margin-bottom: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 4px var(--summer_card-shadow, rgba(62, 142, 187, 0.1));
      }
  
      .comment-header {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
  
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }
  
      .username {
        font-weight: bold;
        color: light-dark(var(--summer_text), var(--summer_text_dark));
        margin-right: 10px;
      }
  
      .timestamp {
        color:  light-dark(var(--summer_secondary), var(--summer_secondary_dark));
        font-size: 0.9em;
      }
  
      .comment-body p {
        color: light-dark(var(--summer_text), var(--summer_text_dark));
        margin: 0;
      }
    `;

  /**
   * 评论数据
   * @type {CommentData}
   * @attr
   */
  static properties = {
    comment: { type: Object },
  };

  constructor() {
    super();
    this.comment = {};
  }

  render() {
    return html`
        <div class="comment">
          <div class="comment-header">
            <img src="https://s3.bmp.ovh/imgs/2024/08/05/dc7a1c812d05c934.png" alt="User Avatar" class="avatar" />
            <span class="username">${this.comment.user_name}</span>
            <span class="timestamp">${new Date(this.comment.created_at).toLocaleString()}</span>
          </div>
          <div class="comment-body">
            <p>${this.comment.comment_text}</p>
          </div>
        </div>
      `;
  }
}

customElements.define('comment-item', CommentItem);

/**
 * 评论列表组件，用于显示多条评论。
 * @element comments-list
 */
class CommentsList extends LitElement {
  static styles = css`
      .content.comments {
        box-sizing: border-box;
        width: 100%;
        padding: 4%;
        word-wrap: break-word;
        
        max-height:400px;
        overflow: scroll;
      }
      .content.comments::-webkit-scrollbar {
        display: none;
        /* Chrome Safari */
    }

    `;

  /**
   * 评论数据列表
   * @type {CommentData[]}
   * @attr
   */
  static properties = {
    comments: { type: Array },
  };

  constructor() {
    super();
    this.comments = [];
  }

  render() {
    return html`
        <div class="content comments">
          ${this.comments.map(
      (comment) => html`<comment-item .comment=${comment}></comment-item>`
    )}
        </div>
      `;
  }
}

customElements.define('comments-list', CommentsList);

/**
 * 添加评论的文本域组件。
 * @element add-comment
 */
class AddComment extends LitElement {
  static styles = css`
      .add-comment {
        width:92%;
        box-sizing: border-box;
        background-color: light-dark(var(--summer_card-bg), var(--summer_card-bg_dark)); 
        padding: 15px;
        margin:2% auto;
        border-radius: 8px;
        box-shadow: 0 2px 4px var(--summer_card-shadow, rgba(62, 142, 187, 0.1));
        padding: 4%;
      }
  
      .form-group {
        margin-bottom: 15px;
      }
  
      label {
        display: block;
        font-weight: bold;
        color: light-dark(var(--summer_text), var(--summer_text_dark));
        margin-bottom: 5px;
      }
  
      input,
      textarea {
        width: 94%;
        padding: 10px;
        border: 1px solid #cfd4d6;
        border-radius: 5px;
        font-size: 1em;
        color: light-dark(var(--summer_text), var(--summer_text_dark));
        background-color: light-dark(var(--summer_card-bg), var(--summer_card-bg_dark)); 
      }
  
      textarea {
        resize: vertical;
        min-height: 100px;
        color: light-dark(var(--summer_text), var(--summer_text_dark));
      }
  
      .submit-button {
        background-color: var(--summer_link-hover, #7cafc3);
        color: var(--summer_button-text, #ffffff);
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1em;
      }
  
      .submit-button:hover {
        background-color: var(--summer_link-hover, #77abc0);
      }
    `;

  static properties = {
    userName: { type: String },
    userEmail: { type: String },
    commentText: { type: String },
  };

  constructor() {
    super();
    this.userName = '';
    this.userEmail = '';
    this.commentText = '';
  }

  /**
   * 处理输入框变化事件。
   * @param {Event} event - 输入事件
   */
  handleInputChange(event) {
    const { name, value } = event.target;
    this[name] = value;
  }

  /**
   * 处理表单提交事件。
   * @param {Event} event - 提交事件
   */
  /**
* 处理输入框变化事件。
* @param {Event} event - 输入事件
*/
  handleInputChange(event) {
    const { name, value } = event.target;
    this[name] = value;
  }

  /**
   * 处理表单提交事件。
   * @param {Event} event - 提交事件
   */
  async handleSubmit(event) {
    event.preventDefault();
    let param = new URLSearchParams(location.search)

    // 构造 JSON 数据
    const commentData = {
      blogId: param.get('id'),
      userName: this.userName,
      userEmail: this.userEmail,
      commentText: this.commentText,
    };

    try {
      // 发送 POST 请求
      const response = await fetch(
        'https://blogapi-dae8fdg4asc6g8hk.eastasia-01.azurewebsites.net/api/httpTrigger2',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commentData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP 错误！状态码: ${response.status}`);
      }

      const result = await response.json();
      console.log('评论提交成功:', result);

      // 清空表单
      this.clearForm();
      window.location.reload()
      // // 触发自定义事件，通知父组件评论已提交
      // this.dispatchEvent(new CustomEvent('comment-submitted', { detail: result }));
    } catch (error) {
      console.error('评论提交失败:', error);
      alert('评论提交失败，请稍后重试！');
    }
  }

  /**
   * 清空表单。
   */
  clearForm() {
    this.userName = '';
    this.userEmail = '';
    this.commentText = '';
  }

  render() {
    return html`
        <div class="add-comment">
          <form @submit=${this.handleSubmit}>
            <div class="form-group">
              <label for="userName">用户名</label>
              <input
                type="text"
                id="userName"
                name="userName"
                .value=${this.userName}
                @input=${this.handleInputChange}
                required
              />
            </div>
            <div class="form-group">
              <label for="userEmail">邮箱</label>
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                .value=${this.userEmail}
                @input=${this.handleInputChange}
                required
              />
            </div>
            <div class="form-group">
              <label for="commentText">评论内容</label>
              <textarea
                id="commentText"
                name="commentText"
                .value=${this.commentText}
                @input=${this.handleInputChange}
                required
              ></textarea>
            </div>
            <button type="submit" class="submit-button">提交评论</button>
          </form>
        </div>
      `;
  }
}

customElements.define('add-comment', AddComment);




