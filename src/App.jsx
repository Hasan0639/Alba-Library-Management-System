import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/navbar";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import Books from "./Components/Books/Books"
import BookDetails from "./Components/Books/BookDetails";
import ManageBooks from "./Components/Books/ManageBooks";
import MyList from "./Components/MyList/MyList";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/manage-books" element={<ManageBooks />} />
        <Route path="/my-list" element={<MyList />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;