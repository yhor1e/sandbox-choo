const html = require('choo/html');
const choo = require('choo');

const app = choo();
app.use(titleStore);
app.route('/', mainView);
app.mount('body');

function mainView (state, emit) {
  return html`
    <div>
      <h1>Title: ${state.title}</h1>
      <input type="text" value="${state.title}" oninput=${update} />
    </div>
  `;

  function update (e) {
    emit('update', e.target.value);
  }
}

function titleStore (state, emitter) {
  state.title = 'Not quite set yet';
  emitter.on('DOMContentLoaded', function () {
    emitter.on('update', function (newTitle) {
      state.title = newTitle;
      emitter.emit('render');
    });
  });
}
