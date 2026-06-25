// src/components/create/StepIndicator.jsx
import React from 'react';
import { Check } from 'lucide-react';

export default function StepIndicator({ steps, current }) {
  return (
    <div className="flex items-center justify-center gap-2 px-4 py-4">
      {steps.map((step, index) => {
        const isCompleted = index < current;
        const isActive = index === current;

        return (
          <React.Fragment key={step.id}>
            {/* Step circle */}
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isActive
                    ? 'btn-shimmer text-white'
                    : 'bg-white/10 text-gray-500'
                }`}
              >
                {isCompleted ? <Check size={14} strokeWidth={3} /> : index + 1}
              </div>
              <span
                className={`text-[9px] font-medium whitespace-nowrap transition-colors ${
                  isActive ? 'text-orange-400' : isCompleted ? 'text-green-400' : 'text-gray-600'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className="flex-1 h-px mt-[-10px] max-w-[40px] transition-all duration-500"
                style={{
                  background: isCompleted
                    ? 'linear-gradient(90deg, #22c55e, #22c55e)'
                    : 'rgba(255,255,255,0.1)',
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
