
import './App.css';

import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';



function App() {
  return (
    <div className="w-full min-h-screen font-sans bg-gradient-to-br from-amber-50 via-white to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white overflow-x-hidden">
      <nav className="fixed top-0 left-0 w-full bg-white/90 dark:bg-gray-900/90 shadow z-50 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
          <a href="#home" className="text-xl sm:text-2xl font-extrabold tracking-tight text-amber-600 dark:text-amber-400">Moin Khan</a>
          <div className="flex gap-4 sm:gap-8 text-base sm:text-lg font-medium mt-2 sm:mt-0 items-center">
            <a href="#about" className="hover:text-amber-600 transition-colors">About</a>
            <a href="#projects" className="hover:text-amber-600 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-amber-600 transition-colors">Contact</a>
            <a
              href="https://github.com/moinkhanjsx"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-3 py-1 rounded-lg bg-gray-900 text-white hover:bg-amber-600 transition-colors duration-200 font-semibold shadow hidden sm:inline-block"
              title="GitHub Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="inline w-5 h-5 mr-1 align-text-bottom"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .268.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
              <span className="align-middle">GitHub</span>
            </a>
          </div>
        </div>
      </nav>
      <main className="pt-24 space-y-16 w-full">
        <section className="px-2 sm:px-4 w-full">
          <Home />
        </section>
        <section className="px-2 sm:px-4 w-full">
          <About />
        </section>
        <section className="px-2 sm:px-4 w-full">
          <Skills />
        </section>
        <section className="px-2 sm:px-4 w-full">
          <Projects />
        </section>
        <section className="px-2 sm:px-4 pb-10 w-full">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default App;
