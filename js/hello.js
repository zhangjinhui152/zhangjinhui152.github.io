import {html, css, LitElement} from './lit-all.min.js';

export class SimpleGreeting extends LitElement {
  static styles = css`p { color: blue }`;

  static properties = {
    name: {type: String},
  };

  constructor() {
    super();
    this.name = 'Somebody';
  }

  render() {
    return html`<p>Hello, ${this.name}!</p>
    <div>${this.name}</div>
    `;
  }
}
customElements.define('simple-greeting', SimpleGreeting);