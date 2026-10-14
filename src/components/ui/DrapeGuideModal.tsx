'use client';

import { useState } from 'react';
import { X, Sparkles, Check, ChevronRight } from 'lucide-react';

interface DrapeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'velcro' | 'traditional' | 'panchakacham' | 'saree';
}

interface GuideStep {
  step: number;
  title: string;
  desc: string;
  tip?: string;
}

interface GuideSection {
  title: string;
  subtitle: string;
  steps: GuideStep[];
}

export default function DrapeGuideModal({ isOpen, onClose, initialTab = 'velcro' }: DrapeGuideModalProps) {
  const [activeTab, setActiveTab] = useState<'velcro' | 'traditional' | 'panchakacham' | 'saree'>(initialTab);

  if (!isOpen) return null;

  const guides: Record<string, GuideSection> = {
    velcro: {
      title: 'Ottiko Kattiko™ – Instant Velcro Pocket Dhoti',
      subtitle: 'The 10-Second Modern Wonder by Ramraj Cotton. Zero knots, zero slipping!',
      steps: [
        {
          step: 1,
          title: 'Position Around Waist',
          desc: 'Hold the dhoti behind your lower back at natural waist height. Ensure the concealed inner pocket sits comfortably on your right side.',
          tip: 'No inner belt or folding needed — the reinforced waistband maintains height automatically.',
        },
        {
          step: 2,
          title: 'Overlap & Fasten Micro-Velcro',
          desc: 'Wrap the left wing across your abdomen first, then overlap the right wing with the gold zari border and firmly press the Velcro pads together.',
          tip: 'The high-grip micro-velcro allows up to 4 inches of waist adjustment for meals and comfort.',
        },
        {
          step: 3,
          title: 'Smooth & Stash Your Phone',
          desc: 'Smooth down the front gold border. Your smartphone, wallet, or car keys slide neatly into the right-hand pocket, completely hidden from view!',
          tip: 'Drape the matching Angavastram over your left shoulder for the complete auspicious look.',
        },
      ],
    },
    traditional: {
      title: 'Traditional 4 Mulam & 8 Mulam Veshti Drape',
      subtitle: 'The timeless South Indian Visiri (Fan Pleat) technique passed down through generations.',
      steps: [
        {
          step: 1,
          title: 'Even Waist Alignment',
          desc: 'Hold the dhoti horizontally behind you, ensuring equal fabric length on both left and right sides. Keep the gold zari border at the bottom edge.',
        },
        {
          step: 2,
          title: 'Make Visiri (Accordion Pleats)',
          desc: 'Take the right edge and pleat it like a hand fan into 2-inch folds (about 6 to 8 pleats). Make sure the outer gold border remains visible on the frontmost pleat.',
        },
        {
          step: 3,
          title: 'Wrap & Tuck at Navel',
          desc: 'Wrap the unpleated left side around the waist first and tuck securely. Place the accordion pleats directly over your navel and tuck into the waistband.',
        },
        {
          step: 4,
          title: 'Half-Fold (Katti) for Walking',
          desc: 'For comfortable walking or cycling, lift the lower hem from the knees and tuck it into the rear or side waistband (traditional Madithu Kattu).',
        },
      ],
    },
    panchakacham: {
      title: 'Kalyan Panchakacham (5-Kacham) Wedding Drape',
      subtitle: 'The sacred Vedic drape for grooms, poojas, homams, and temple priests.',
      steps: [
        {
          step: 1,
          title: 'The Central Knot & Right Drape',
          desc: 'Wrap the dhoti around the waist, leaving 1/3rd on the left and 2/3rds on the right. Tie a firm flat knot directly over the navel.',
        },
        {
          step: 2,
          title: 'The Back Kacham (Hind Pleat)',
          desc: 'Take the lower inner edge between the legs to the back, fan pleat neatly, and tuck firmly into the spine center of the rear waistband.',
        },
        {
          step: 3,
          title: 'The Front Zari Cascades',
          desc: 'Pleat the remaining generous right side into wide 3-inch fan pleats, ensuring the rich gold zari flows gracefully down the center front.',
        },
      ],
    },
    saree: {
      title: 'Ramyyam Kerala Kasavu & Silk Saree Draping',
      subtitle: 'Achieve neat, crisp pleats and majestic pallu falls effortlessly.',
      steps: [
        {
          step: 1,
          title: 'Tuck & Full Waist Turn',
          desc: 'Start by tucking the plain end into the petticoat waistband at the navel, turning clockwise 360 degrees, maintaining an even ground clearance.',
        },
        {
          step: 2,
          title: 'Measure the Zari Pallu',
          desc: 'Before making waist pleats, take the ornate gold zari pallu end, measure it across your back over the left shoulder, letting it fall gracefully to your knees.',
        },
        {
          step: 3,
          title: '5 to 7 Crisp Waist Pleats',
          desc: 'Gather the remaining fabric in front of you into 5–7 neat, 4-inch pleats. Secure with a safety pin from inside and tuck straight below the navel.',
        },
        {
          step: 4,
          title: 'Pin Shoulder Pallu',
          desc: 'Arrange the gold zari border on your left shoulder in neat accordion folds and secure to your blouse with an invisible safety pin.',
        },
      ],
    },
  };

  const current = guides[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles size={18} className="text-amber-200" />
            </div>
            <div>
              <h3 className="font-black text-lg">Interactive Drape & Sizing Guide</h3>
              <p className="text-xs text-amber-100">Step-by-step master tutorials for South Indian traditional wear</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-stone-200 bg-stone-50 overflow-x-auto p-1.5 gap-1">
          {[
            { id: 'velcro', label: 'Ottiko Kattiko™ (Velcro)' },
            { id: 'traditional', label: 'Traditional Dhoti (8 Mulam)' },
            { id: 'panchakacham', label: 'Panchakacham (Wedding)' },
            { id: 'saree', label: 'Ramyyam Saree Drape' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Guide Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
            <h4 className="font-black text-stone-900 text-base">{current.title}</h4>
            <p className="text-xs text-stone-600 mt-1">{current.subtitle}</p>
          </div>

          <div className="space-y-4">
            {current.steps.map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-4 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 transition-colors shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-stone-900 text-sm mb-1">{item.title}</h5>
                  <p className="text-xs text-stone-600 leading-relaxed mb-2">{item.desc}</p>
                  {item.tip && (
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg w-fit">
                      <Check size={13} />
                      <span>{item.tip}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-stone-100 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-stone-800">Need video assistance?</p>
              <p className="text-[11px] text-stone-500">Watch our master weavers guide you on the official Ramraj channel</p>
            </div>
            <a
              href="https://www.youtube.com/@ramrajcotton"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              Watch Video <ChevronRight size={14} />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-all"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
