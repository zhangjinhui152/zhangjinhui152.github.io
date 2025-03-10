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
            font-size: 1.8em;
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
