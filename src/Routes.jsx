import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
const FourHundredFour = React.lazy(() => import("pages/FourHundredFour"));
const SingleBookPage = React.lazy(() => import("pages/SingleBook"));
const Search404 = React.lazy(() => import("pages/Search404"));
const Search = React.lazy(() => import("pages/Search"));
const TopPicks = React.lazy(() => import("pages/TopPicks"));
const Latest = React.lazy(() => import("pages/Latest"));
const Home1 = React.lazy(() => import("pages/Home1"));
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/home1" element={<Home1 />} />
          <Route path="/latest" element={<Latest />} />
          <Route path="/toppicks" element={<TopPicks />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search404" element={<Search404 />} />
          <Route path="/single-book/:id" element={<SingleBookPage />} />
          <Route path="/fourhundredfour" element={<FourHundredFour />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
