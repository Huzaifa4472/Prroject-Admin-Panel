import EditMoviePopupHeader from './EditMoviePopupHeader';
import EditMovieDetails from './EditMovieDetails';
import MovieTitleInputs from './MovieTitleInputs';
import { useContext, useEffect, useState } from 'react';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { DarkModeContext } from '../../../context/darkModeContext';
import { toast } from 'react-toastify';

const EditMovie = ({ setShowEditPopup, showToEdit }) => {
  const [shows, setShows] = useState([]);
  const db = getDatabase();
  const starCountRef = ref(db, 'movies/' + showToEdit);
  const { setOpen, setToastMessage } = useContext(DarkModeContext);

  useEffect(() => {
    const fetchData = () => {
      try {
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            if (data.links) {
              data.links = data.links.map((link) => {
                if (!link.id) {
                  link.id = uuidv4();
                }
                return link;
              });
            }
            if (!data.id) {
              data.id = uuidv4();
            }
            data['TMDB ID'] = showToEdit;
            setShows([data]);
          } else {
            setShows([]);
            console.log('No data available');
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [db, showToEdit]);

  const addLink = (showIndex) => {
    const newShows = [...shows];
    newShows[showIndex].links.push({
      host: '',
      quality: '',
      size: '',
      url: '',
      id: uuidv4(),
    });
    setShows(newShows);
  };

  const handleInputChange = (event, rowIndex, linkId, field) => {
    const { value } = event.target;
    const newShows = [...shows];
    const linkIndex = newShows[rowIndex].links.findIndex(
      (link) => link.id === linkId
    );
    if (linkIndex !== -1) {
      newShows[rowIndex].links[linkIndex][field] = value;
    }
    setShows(newShows);
  };

  const handleUniqueInputChange = (i, event) => {
    const { name, value } = event.target;
    const newShows = [...shows];
    newShows[i] = { ...newShows[i], [name]: value };
    setShows(newShows);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const db = getDatabase();
    const updates = {};
    updates['movies/' + showToEdit] = null;
    updates['movies/' + shows[0]['TMDB ID']] = shows[0];

    const options = { timeZone: 'Asia/Dubai' };
    updates['lastUpdated/time'] = new Date().toLocaleString('en-US', options);
    update(ref(db), updates)
      .then(() => {
        setShowEditPopup(false);
        toast.success(`TMDB ID (${shows[0]['TMDB ID']}) Updated Successfully`);
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  const handleDeleteLink = (showIndex, specialId) => {
    const updatedShows = [...shows];
    const updatedLinks = updatedShows[showIndex].links.filter(
      (link) => link.id !== specialId
    );
    updatedShows[showIndex].links = updatedLinks;
    setShows(updatedShows);
  };

  return (
    <div className="fixed bg-[#D9D9D9B2] dark:bg-[#33343886] z-30 px-4 w-[100%] left-0 top-0 h-full flex items-center justify-center">
      <div className="bg-white dark:bg-[#0F0F0F] rounded-xl w-full md:w-4/5 lg:w-1/2">
        <EditMoviePopupHeader setShowEditPopup={setShowEditPopup} />
        <form onSubmit={handleSubmit}>
          {shows.map((show, i) => (
            <div key={show.id} className="p-4 max-h-[90svh] overflow-auto">
              <MovieTitleInputs
                show={show}
                i={i}
                handleUniqueInputChange={handleUniqueInputChange}
              />
              <EditMovieDetails
                show={show}
                handleDeleteLink={handleDeleteLink}
                i={i}
                addLink={addLink}
                handleInputChange={handleInputChange}
              />
            </div>
          ))}
          <div className="p-4">
            <button
              type="submit"
              className="dark:text-[#FDFDFD] dark:bg-[#333438] bg-black text-white py-2 px-4 rounded-xl"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovie;
