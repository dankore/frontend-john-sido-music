import React, { useEffect } from 'react';
import Page from '../../components/layouts/Page';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';

function MySongs() {
  const initialState = {
    mySongs: [],
  };

  function mySongsReducer(draft, action) {
    switch (action.type) {
      case 'fetchedMySongs':
        draft.mySongs = action.value;
        return;
    }
  }

  const [state, mySongsDispatch] = useImmerReducer(mySongsReducer, initialState);

  // FETCH SONGS
  useEffect(() => {
    const request = Axios.CancelToken.source();
    (async function getMySongs() {
      try {
        const response = await Axios.get('/my-songs', { CancelToken: request.token });

        if (response.data.status == 'Success') {
          mySongsDispatch({ type: 'fetchedMySongs', value: response.data.songs });
        } else {
          // VALIDATION CHECKS FAILURE ETC
          console.log(response.data);
        }
      } catch (error) {
        // FAIL SILENTLY
        console.log(error);
      }
    })();

    return () => request.cancel();
  }, []);

  //https://soundcloud.com/octobersveryown

  return (
    <Page title="My Songs">
      <ul className="max-w-2xl mx-auto mt-12">
        {state.mySongs.map((song, index) => {
          return (
            <li className="flex w-full justify-center mb-5 border border-gray-400" key={index}>
              <figure className="w-full flex items-end h-24">
                <img className="h-24 w-24" src={song.songCoverImage} />
                <div className="pl-3 w-full">
                  <div className="flex justify-between py-2">
                    <figcaption>Listen to {song.songTitle}</figcaption>
                    <div>{song.songPostedDate}</div>
                  </div>
                  <audio className="block w-full" src={song.songUrl} controls>
                    <p>
                      Your browser doesn&apos;t support HTML5 audio. Here is a{' '}
                      <a href={song.songUrl}>link to the audio</a> instead.
                    </p>
                  </audio>
                  <div className="flex flex-wrap">
                    <p>From the album {song.songAlbumTitle}</p>
                  </div>
                </div>
              </figure>
            </li>
          );
        })}
      </ul>
    </Page>
  );
}

export default MySongs;
