
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SnackbarProvider
      autoHideDuration={3000}
      maxSnack={1}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <App />
    </SnackbarProvider>
  </BrowserRouter>
);
