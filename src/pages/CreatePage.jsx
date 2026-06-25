// src/pages/CreatePage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import StepIndicator from '../components/create/StepIndicator';
import TemplateStep from '../components/create/TemplateStep';
import PersonalizeStep from '../components/create/PersonalizeStep';
import MusicStep from '../components/create/MusicStep';
import PreviewStep from '../components/create/PreviewStep';
import ShareStep from '../components/create/ShareStep';
import Button from '../components/ui/Button';
import { useConfetti } from '../hooks/useConfetti';
import { getTemplateById } from '../data/templates';

const STEPS = [
  { id: 'template', label: 'Template' },
  { id: 'personalize', label: 'Personalize' },
  { id: 'music', label: 'Music' },
  { id: 'preview', label: 'Preview' },
];

export default function CreatePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { launch } = useConfetti();

  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);
  const [wishId] = useState(() => Math.random().toString(36).slice(2, 10));

  const [template, setTemplate] = useState(() => {
    const tid = searchParams.get('template');
    return tid ? getTemplateById(tid) : null;
  });
  const [personalize, setPersonalize] = useState({ recipientName: '', senderName: '', message: '', photoUrl: null, date: '' });
  const [music, setMusic] = useState('happy-birthday');

  const canProceed = () => {
    if (currentStep === 0) return !!template;
    if (currentStep === 1) return !!personalize.recipientName?.trim();
    return true;
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep((s) => s + 1);
    else { launch(80); setDone(true); }
  };

  const handleBack = () => {
    if (currentStep === 0) navigate(-1);
    else setCurrentStep((s) => s - 1);
  };

  const buildShareUrl = () => {
    const params = new URLSearchParams();
    if (template) params.set('t', template.id);
    if (personalize.recipientName) params.set('r', personalize.recipientName);
    if (personalize.senderName) params.set('s', personalize.senderName);
    if (personalize.message) params.set('m', personalize.message);
    if (music) params.set('mu', music);
    if (personalize.photoUrl && personalize.photoUrl.startsWith('http')) {
      params.set('p', personalize.photoUrl);
    }
    return `${window.location.origin}/wish/${wishId}?${params.toString()}`;
  };

  if (done) {
    return (
      <main className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Left panel: share options */}
        <div className="flex-1 lg:max-w-xl overflow-y-auto pb-20 md:pb-4 custom-scroll">
          <div className="sticky top-0 z-10 px-4 lg:px-8 py-4 bg-[#0F0A1E]/90 backdrop-blur-lg border-b border-white/5">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <ArrowLeft size={16} /> Back to Home
            </button>
            <h1 className="text-xl font-bold text-white mt-2">Share Your Card 🎉</h1>
          </div>
          <div className="p-4 lg:p-8"><ShareStep wishId={wishId} shareUrl={buildShareUrl()} /></div>
        </div>
        {/* Right panel: preview (desktop) */}
        <div className="hidden lg:flex flex-1 items-center justify-center border-l border-white/5 bg-[#0d0920] p-8">
          <div className="w-full max-w-sm">
            <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider text-center mb-4">Your Card</p>
            <PreviewStep template={template} personalize={personalize} music={music} />
          </div>
        </div>
      </main>
    );
  }

  const handleTemplateSelect = (selectedTemplate) => {
    setTemplate(selectedTemplate);
    setTimeout(() => {
      setCurrentStep(1);
    }, 350);
  };

  return (
    <main className="flex-1 flex flex-col lg:flex-row min-h-0 h-[100dvh] lg:h-auto">
      {/* Left panel: form steps */}
      <div className="flex-1 lg:max-w-xl flex flex-col min-h-0 border-r border-white/5">
        {/* Header */}
        <div className="px-4 lg:px-8 pt-5 pb-2 border-b border-white/5">
          <button onClick={handleBack} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-3">
            <ArrowLeft size={16} /> {currentStep === 0 ? 'Back' : STEPS[currentStep - 1]?.label}
          </button>
          <h1 className="text-xl font-bold text-white">{STEPS[currentStep]?.label}</h1>
        </div>

        <StepIndicator steps={STEPS} current={currentStep} />

        {/* Step content */}
        <div className="flex-1 overflow-y-auto custom-scroll">
          {currentStep === 0 && <TemplateStep value={template} onChange={handleTemplateSelect} />}
          {currentStep === 1 && <PersonalizeStep value={personalize} onChange={setPersonalize} />}
          {currentStep === 2 && <MusicStep value={music} onChange={setMusic} />}
          {currentStep === 3 && (
            <>
              {/* On mobile: show full preview; on desktop: show a check summary since preview is on the right */}
              <div className="lg:hidden">
                <PreviewStep template={template} personalize={personalize} music={music} />
              </div>
              <div className="hidden lg:flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
                <div className="text-5xl">🎉</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Looking great!</h3>
                  <p className="text-sm text-gray-400">Your card preview is shown on the right.<br />Click below to generate your shareable link.</p>
                </div>
                <div className="flex flex-col gap-2 text-sm text-left w-full max-w-xs">
                  {[
                    { label: 'Template', value: template?.name, icon: '🎨' },
                    { label: 'For', value: personalize?.recipientName || '—', icon: '🎁' },
                    { label: 'From', value: personalize?.senderName || '—', icon: '💌' },
                    { label: 'Music', value: music === 'none' ? 'None' : music, icon: '🎵' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 px-4 py-2.5 rounded-xl glass-card border border-white/5">
                      <span className="text-base">{item.icon}</span>
                      <div>
                        <p className="text-[10px] text-gray-600 uppercase tracking-wider">{item.label}</p>
                        <p className="text-xs text-white font-medium truncate max-w-[200px]">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom action bar */}
        <div className="px-4 lg:px-8 py-4 border-t border-white/5 bg-[#0F0A1E]/90 backdrop-blur-lg">
          <Button size="lg" fullWidth onClick={handleNext} disabled={!canProceed()}
            iconRight={currentStep === STEPS.length - 1 ? <Check size={18} strokeWidth={2.5} /> : <ArrowRight size={18} />}
            id="create-next-btn">
            {currentStep === STEPS.length - 1 ? 'Generate & Share 🎉' : 'Continue'}
          </Button>
          {currentStep === 0 && !template && (
            <p className="text-center text-[11px] text-gray-600 mt-2">Select a template to continue</p>
          )}
          {currentStep === 1 && !personalize.recipientName?.trim() && (
            <p className="text-center text-[11px] text-gray-600 mt-2">Enter recipient's name to continue</p>
          )}
        </div>
      </div>

      {/* Right panel: live preview (desktop only) */}
      <div className="hidden lg:flex flex-1 items-start justify-center bg-[#0d0920] p-8 overflow-y-auto custom-scroll">
        <div className="w-full max-w-sm pt-4">
          <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider text-center mb-4">Live Preview</p>
          {template ? (
            <PreviewStep
              template={template}
              personalize={personalize}
              music={music}
              hideLabel={true}
            />
          ) : (
            <div className="h-80 rounded-3xl glass-card border border-white/5 flex flex-col items-center justify-center gap-3 text-center p-6">
              <span className="text-4xl">🎨</span>
              <p className="text-sm font-medium text-gray-400">Select a template to see your card preview here</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
