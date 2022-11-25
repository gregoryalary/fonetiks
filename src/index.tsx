import React from 'react';
import ReactDOM from 'react-dom/client';

// i18n
import './app/i18n/i18n';

// Routing
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

// Components
import App from './app/screens/App';
import Home from './home/screens/Home';

// Styling
import './index.css';

// Utils
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import FindPhoneme from './find-phoneme/screens/FindPhoneme';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="excercice">
        <Route path="find-phoneme" element={<FindPhoneme />} />
      </Route>
    </Route>,
  ),
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

serviceWorkerRegistration.unregister();
reportWebVitals();
