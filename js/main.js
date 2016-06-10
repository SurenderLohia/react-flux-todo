window.AppDispatcher = new Flux.Dispatcher();

window.ListStore = {
  items: [
    {name: 'HTML', id: 1},
    {name: 'CSS', id: 2},
    {name: 'JavaScript', id: 3},
  ]
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
    window.AppDispatcher.dispatch({
      actionName: 'new-item',
      newItem: {name: 'jQuery', id: 4}
    })
  },

  render: function() {
    var items = ListStore.items;

    var htmlList = items.map(function(listItem) {
      return <li id="listItem.id">
          {listItem.name}
        </li>
    });

    return <div>
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







