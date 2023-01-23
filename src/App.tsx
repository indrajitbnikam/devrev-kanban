import { Provider } from 'react-redux';
import KanbanPage from './pages/Kanban';
import store from './redux/store';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

function App() {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <KanbanPage />
      </PersistGate>
    </Provider>
  )
}

export default App;
