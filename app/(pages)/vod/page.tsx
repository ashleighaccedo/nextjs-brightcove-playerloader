'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import window from 'global/window';
import brightcovePlayerLoader from '@brightcove/player-loader';
import { useRouter } from 'next/navigation';

const BrightcovePlayer = () => {
  const router = useRouter();
  const playerContainerRef = useRef();
  const playerRef = useRef();
  const playerLoadingRef = useRef(false);
  const [videoId, setVideoId] = useState('6353816889112');

  const handleBack = () => {
    router.back();
  };

  const resetPlayer = () => {
    // This will reset all Video.js players and remove any globals related to Brightcove
    try {
      brightcovePlayerLoader.reset();
      console.log('All players reset successfully.');
    } catch (error) {
      console.error('Error resetting players:', error);
    }
  };

  const setUpPlayer = useCallback(() => {
    if (playerLoadingRef.current || playerRef.current) {
      return;
    }

    playerLoadingRef.current = true;

    brightcovePlayerLoader({
      refNode: playerContainerRef.current,
      accountId: '6415845530001',
      playerId: 'default',
      videoId: videoId
    }).then(function(success) {
      // The player has been created!
      console.log('bc player success ------>', success)
      playerRef.current = success.ref;
      playerRef.current.one('dispose', () => {
        console.log('player has been disposed');
        playerRef.current = null;
      });
    }).catch(function(error) {
      console.log('bc player error ------>', error)
    }).finally(() => {
    });
  }, [videoId]);

  useEffect(() => {
    if (!playerRef.current) {
      setUpPlayer();
    }
  
    return () => {
      if (playerRef.current) {
        try {
          // Reset all player instances when component unmounts
          resetPlayer();
        } catch (error) {
          console.error('Error disposing player:', error);
        }
      }
    };
  }, [setUpPlayer]);

  return (
    <div>
      <h1>Brightcove Player using @brightcove/player-loader</h1>

      <button onClick={handleBack}>Go back</button>

      <div ref={playerContainerRef}></div>
    </div>
  );
};

export default BrightcovePlayer;
