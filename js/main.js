window.AppDispatcher = new Flux.Dispatcher();
var $ = window.$;

window.ListStore = {
  items: []
};

MicroEvent.mixin(ListStore);

window.AppDispatcher.register(function(payload) {
  switch(payload.actionName) {
    case 'new-item':
      ListStore.items.push(payload.newItem);
      ListStore.trigger('change');
      break;
  }
});

// React Component
var Todo = React.createClass({
  componentDidMount: function() {
    ListStore.bind('change', this.listChanged);
  },

  componentDidUnmount: function() {
    ListStore.unbind('change', this.listChanged);
  },

  listChanged: function() {
    this.forceUpdate();
  },

  createNewItem: function(evt) {
    var val = this.refs.addItemInput.value;
    console.log('Val: ->: ' + val);
    window.AppDispatcher.dispatch({
      actionName: 'new-item',
      newItem: {name: val, id: Date.now()}
    })

    this.refs.addItemInput.value = '';
  },

  render: function() {
    var items = ListStore.items;

    var htmlList = items.map(function(listItem) {
      return <li id={listItem.id}>
          {listItem.name}
          <input type="checkbox" checked={listItem.completed}/>
        </li>
    });

    return <div>
        <input ref="addItemInput" className="addItemInput" type="text" placeholder="What needs to be done?" />
        <ul>
          {htmlList}
        </ul>
        <button onClick={this.createNewItem}>Add New Item</button>
      </div>
  }
});

ReactDOM.render(
  <Todo/>,
  document.getElementById('container')
)







