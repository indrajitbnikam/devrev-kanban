import { Provider } from 'react-redux';
import KanbanPage from './features/kanban/pages/Kanban';
import store from './redux/store';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import RootLayout from './shared/components/RootLayout';

function App() {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootLayout>
          <KanbanPage />
        </RootLayout>
      </PersistGate>
    </Provider>
  );
}

export default App;
