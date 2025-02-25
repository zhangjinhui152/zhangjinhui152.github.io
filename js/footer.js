import { html, css, LitElement } from './lit-all.min.js';

export class CurrentFoot extends LitElement {
  static styles = css`.footer {
    text-align: center;
    margin-top: 20px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
`;

  static properties = {
    today: { type: String },
  };

  constructor() {
    super();
    this.today = new Date().getFullYear();
    // this.today = '2024';
  }

  render() {
    return html`
        <footer class="footer">
            <p>&copy; ${this.today} 我的博客. 保留所有权利.</p>
        </footer>
    `;
  }
}
customElements.define('current-foot', CurrentFoot);