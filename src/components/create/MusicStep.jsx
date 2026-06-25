// src/components/create/MusicStep.jsx
import React, { useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Check } from 'lucide-react';
import { MUSIC_TRACKS } from '../../data/templates';
import defaultSong from '../../song/alexander-nakarada-silly-intro(chosic.com).mp3';

function MusicBar({ active }) {
  if (!active) return null;
  return (
    <div className="flex items-end gap-0.5 h-5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="music-bar"
          style={{
            height: `${Math.random() * 60 + 40}%`,
            animationDelay: `${(i - 1) * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function MusicStep({ value, onChange }) {
  const audioRef = useRef(null);

  useEffect(() => {
    // Instantiate audio object
    audioRef.current = new Audio(defaultSong);
    audioRef.current.loop = true;

    // If there is an active selection when opening, play it
    if (value && value !== 'none') {
      audioRef.current.play().catch((err) => {
        console.warn('Auto playback was blocked by browser policy:', err);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleSelect = (trackId) => {
    onChange(trackId);
    
    if (!audioRef.current) return;

    if (trackId !== 'none') {
      // Play / restart the audio clip
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.warn('Playback blocked by browser policy:', err);
      });
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <div className="px-4 pb-4 space-y-3 overflow-y-auto custom-scroll">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 p-4 rounded-2xl glass-card border border-white/5">
        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
          <Music size={18} className="text-orange-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Background Music</p>
          <p className="text-xs text-gray-500">Plays when recipient opens the card</p>
        </div>
      </div>

      {/* Track list */}
      {MUSIC_TRACKS.map((track) => {
        const isSelected = value === track.id;
        return (
          <button
            key={track.id}
            id={`music-${track.id}`}
            onClick={() => handleSelect(track.id)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 text-left ${
              isSelected
                ? 'bg-orange-500/15 border border-orange-500/40'
                : 'glass-card border border-white/5 hover:border-white/10'
            }`}
          >
            {/* Emoji */}
            <span className="text-xl flex-shrink-0 w-8 text-center">{track.icon}</span>

            {/* Name & duration */}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                {track.label}
              </p>
              {track.duration && (
                <p className="text-xs text-gray-500 mt-0.5">{track.duration}</p>
              )}
            </div>

            {/* Playing animation or check */}
            {isSelected ? (
              track.id === 'none' ? (
                <VolumeX size={18} className="text-orange-400 flex-shrink-0" />
              ) : (
                <MusicBar active />
              )
            ) : (
              <div className="w-5 h-5 rounded-full border border-white/20 flex-shrink-0" />
            )}
          </button>
        );
      })}

      <p className="text-[11px] text-gray-600 text-center pt-2">
        🎵 Music is played in the browser — no download needed
      </p>
    </div>
  );
}
