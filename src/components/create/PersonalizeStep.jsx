// src/components/create/PersonalizeStep.jsx
import React, { useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';

export default function PersonalizeStep({ value, onChange }) {
  const fileRef = useRef(null);

  const update = (key, val) => onChange({ ...value, [key]: val });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    update('photoUrl', url);
  };

  return (
    <div className="px-4 pt-4 space-y-5 pb-6">
      {/* Recipient Name */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Recipient's Name <span className="text-orange-400">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Priya, Amma, Bhai..."
          value={value.recipientName || ''}
          onChange={(e) => update('recipientName', e.target.value)}
          maxLength={40}
          className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-all"
        />
        <p className="text-right text-[10px] text-gray-600 mt-1">
          {(value.recipientName || '').length}/40
        </p>
      </div>

      {/* Sender Name */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          From (Your Name)
        </label>
        <input
          type="text"
          placeholder="e.g. Mita, Team Assam..."
          value={value.senderName || ''}
          onChange={(e) => update('senderName', e.target.value)}
          maxLength={40}
          className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-all"
        />
      </div>

      {/* Custom Message */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Personal Message
        </label>
        <textarea
          placeholder="Write a heartfelt message... (optional)"
          value={value.message || ''}
          onChange={(e) => update('message', e.target.value)}
          rows={4}
          maxLength={200}
          className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-all resize-none"
        />
        <p className="text-right text-[10px] text-gray-600 mt-1">
          {(value.message || '').length}/200
        </p>
      </div>

      {/* Photo Upload */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Add a Photo <span className="text-gray-500 font-normal text-xs">(optional)</span>
        </label>

        {value.photoUrl ? (
          <div className="relative w-full h-40 rounded-2xl overflow-hidden">
            <img
              src={value.photoUrl}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => update('photoUrl', null)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-red-500/80 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full h-32 rounded-2xl border-2 border-dashed border-white/10 hover:border-orange-500/40 flex flex-col items-center justify-center gap-2 transition-all hover:bg-orange-500/5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-orange-500/10 flex items-center justify-center transition-colors">
              <Upload size={18} className="text-gray-500 group-hover:text-orange-400" />
            </div>
            <span className="text-xs text-gray-500 group-hover:text-gray-400">
              Tap to upload photo
            </span>
            <span className="text-[10px] text-gray-600">JPG, PNG up to 5MB</span>
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoUpload}
        />
      </div>

      {/* Date (for birthday/anniversary) */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">
          Special Date <span className="text-gray-500 font-normal text-xs">(optional)</span>
        </label>
        <input
          type="date"
          value={value.date || ''}
          onChange={(e) => update('date', e.target.value)}
          className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500/50 transition-all [color-scheme:dark]"
        />
      </div>
    </div>
  );
}
