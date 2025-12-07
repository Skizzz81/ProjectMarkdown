import BlockLibrary from '../components/BlockLibrary/BlockLibrary';
import NavBar from '../components/NavBar/NavBar';
import './BlockLibraryPage.css';

const BlockLibraryPage = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className="block-library-page">
        <BlockLibrary />
      </div>
    </>
  );
};

export default BlockLibraryPage;
