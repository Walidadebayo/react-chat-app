import { useState, useEffect } from "react";
import api from "./apis/axios";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ErrorPage from "./components/ErrorPage";
import ErrorBoundary from "./ErrorBoundary";
import Chats from "./pages/Chats";
import { LoadingProvider } from "./utils/UseLoading";
import ErrorPage from "./components/ErrorPage";
import LoginRegister from "./pages/LoginRegister";

interface Data {
  message: string;
}

function App() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    api.get("/api/data").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <Router>
      <ErrorBoundary>
        <LoadingProvider>
          <Routes>
            <Route path="/" element={<Chats />} />
            <Route path="/signin" element={<LoginRegister />} />
            <Route path="/data" element={<div>{data?.message}</div>} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </LoadingProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
