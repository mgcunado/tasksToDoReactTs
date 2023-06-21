import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { Home } from '../components/pages/Home';
import { Categories } from '../components/pages/Categories';
import { Header } from '../components/layout/Header';
import { Nav } from '../components/layout/Nav';
import { Error404 } from '../components/pages/Error404';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { Subcategories } from '../components/pages/Subcategories';
import { CreateTask } from '../components/pages/CreateTask';
import { Tasks } from '../components/pages/Tasks';
import { Task } from '../components/pages/Task';
import { EditTask } from '../components/pages/EditTask';
import { Search } from '../components/pages/Search';
import { useEffect, useState } from 'react';
import { Global } from '../helpers/Globals';
import { RequestAjax } from '../helpers/RequestAjax';

type Translations = {
  categories: {
    [key: string]: string;
  };
  navigation: {
    [key: string]: string;
  };
};

export const MyRoutes = () => {
  const [language, setLanguage] = useState("es");
  const [translations, setTranslations] = useState<Translations | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTranslations = async () => {
      const url = `${Global.url}translations/${language}`;
      const { data, charging } = await RequestAjax(url, 'GET');
      if (data.status === 'success') {
        setTranslations(data.translations);
        setLoading(charging);
      }
    };
    fetchTranslations();
  }, [language]);

  return (
    <BrowserRouter>

      {/* header and navigation */}
      <Header
        translations={translations}
        loading={loading}
      />

      <Nav
        language={language}
        setLanguage={setLanguage}
        translations={translations}
        loading={loading}
      />

      {/* Central content */}
      <section id="content" className="content">
        <Routes>
          <Route path="/" element={ <Navigate to="/home" /> } />
          <Route 
            path="/home" 
            element={ 
              <Home 
                translations={translations}
              /> 
            } 
          />
          <Route 
            path="/categories" 
            element={ 
              <Categories 
                translations={translations}
              /> 
            } />
          <Route 
            path="/categories/:categoryId/subcategories" 
            element={ 
              <Subcategories 
                translations={translations}
              /> 
            } />
          <Route 
            path="/categories/:categoryId/subcategories/:subcategoryId/create-task" 
            element={ 
              <CreateTask 
                language={language}
                translations={translations}
              /> 
            } 
          />
          <Route 
            path="/categories/:categoryId/subcategories/:subcategoryId/edit-task/:id" 
            element={ 
              <EditTask 
                language={language}
                translations={translations}
              /> 
            } 
          />
          <Route 
            path="/tasks/:todo?" 
            element={ 
              <Tasks 
                language={language}
                translations={translations}
              /> 
            } 
          />
          <Route 
            path="/categories/:categoryId/subcategories/:subcategoryId/tasks/:id" 
            element={ 
              <Task 
                language={language}
                translations={translations}
              /> 
            } 
          />
          <Route 
            path="/search/:todo/:search" 
            element={ 
              <Search 
                language={language}
                translations={translations}
              /> 
            } 
          />
          <Route path="*" element={ <Error404 /> } />
        </Routes>
      </section>

      {/* sidebar */}
      <Sidebar
        translations={translations}
        loading={loading}
      />

      {/* footer */}
      <Footer />

    </BrowserRouter>
  )
}

