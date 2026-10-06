import React, { useState, useEffect } from 'react';
import { X, Sparkles, MessageSquare, CheckCircle2, IndianRupee, Edit3 } from 'lucide-react';

interface StartProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StartProjectModal: React.FC<StartProjectModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // Service selection state
  const [serviceType, setServiceType] = useState('Web Development');
  const [customService, setCustomService] = useState('');

  // Budget selection state: ₹3,000 | ₹5,000 | ₹8,000 | ₹10,000 | ₹15,000 | Custom
  const [budgetOption, setBudgetOption] = useState('₹5,000');
  const [customBudget, setCustomBudget] = useState('');

  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const budgetList = [
    { label: '₹3,000', value: '₹3,000' },
    { label: '₹5,000', value: '₹5,000' },
    { label: '₹8,000', value: '₹8,000' },
    { label: '₹10,000', value: '₹10,000' },
    { label: '₹15,000', value: '₹15,000' },
    { label: 'Custom', value: 'Custom' },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const finalServiceText = serviceType === 'Custom' ? `Custom: ${customService || 'Not specified'}` : serviceType;
  const finalBudgetText = budgetOption === 'Custom' ? `Custom: ₹ ${customBudget || '0'}` : budgetOption;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Format WhatsApp message string
    const whatsappText = `Hi Vigneshwara! I would like to start a project with PondyPixel.%0A%0A*Name:* ${encodeURIComponent(
      name
    )}%0A*Email:* ${encodeURIComponent(email)}%0A*Service:* ${encodeURIComponent(
      finalServiceText
    )}%0A*Estimated Budget:* ${encodeURIComponent(
      finalBudgetText
    )}%0A*Details:* ${encodeURIComponent(details)}`;

    // Open WhatsApp directly after brief delay
    setTimeout(() => {
      window.open(`https://wa.me/916381357739?text=${whatsappText}`, '_blank');
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Light Overlay Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-2xl rounded-3xl overflow-hidden border border-slate-200 shadow-2xl my-auto animate-scaleUp bg-white">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#7C3CFF]/40" />
            <span className="w-3 h-3 rounded-full bg-[#9B5CFF]/60" />
            <span className="w-3 h-3 rounded-full bg-[#35A7FF]/80" />
            <span className="text-xs font-mono text-[#7C3CFF] font-semibold ml-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#7C3CFF]" /> Start a New Project
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors border border-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center text-[#7C3CFF]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] font-outfit">Project Brief Ready!</h3>
              <p className="text-sm text-slate-600 max-w-sm">
                Redirecting to WhatsApp to chat directly with Vigneshwara...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-[#0F172A] font-outfit">Tell Us About Your Project</h3>
                <p className="text-xs text-slate-500 mt-1">Fill out the brief to connect directly via WhatsApp or Email.</p>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#7C3CFF] focus:bg-white text-[#0F172A] placeholder-slate-400 text-xs sm:text-sm rounded-xl px-4 py-3 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#7C3CFF] focus:bg-white text-[#0F172A] placeholder-slate-400 text-xs sm:text-sm rounded-xl px-4 py-3 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Service Selector & Dynamic Custom Service Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Service Needed</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#7C3CFF] focus:bg-white text-[#0F172A] text-xs sm:text-sm rounded-xl px-4 py-3 outline-none transition-all cursor-pointer"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="Modern Website Design">Modern Website Design</option>
                  <option value="Responsive Website Development">Responsive Website Development</option>
                  <option value="Custom Websites for Clients">Custom Websites for Clients</option>
                  <option value="Business Website Development">Business Website Development</option>
                  <option value="Custom">Custom</option>
                </select>

                {/* Custom Service Input smooth reveal */}
                {serviceType === 'Custom' && (
                  <div className="mt-3 animate-fadeIn">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#7C3CFF] mb-1 flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5" /> Custom Service
                    </label>
                    <input
                      type="text"
                      required
                      value={customService}
                      onChange={(e) => setCustomService(e.target.value)}
                      placeholder="Tell us what you need..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#7C3CFF] focus:bg-white text-[#0F172A] placeholder-slate-400 text-xs sm:text-sm rounded-xl px-4 py-3 outline-none transition-all"
                    />
                  </div>
                )}
              </div>

              {/* Estimated Budget Chips & Dynamic Custom Budget Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-[#7C3CFF]" /> Estimated Budget
                </label>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {budgetList.map((item) => {
                    const isSelected = budgetOption === item.value;
                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setBudgetOption(item.value)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold text-center transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#7C3CFF] to-[#35A7FF] text-white shadow-md shadow-purple-500/20 scale-105 border border-transparent'
                            : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#0F172A] hover:border-slate-300'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Budget Input smooth reveal */}
                {budgetOption === 'Custom' && (
                  <div className="mt-3 animate-fadeIn">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#7C3CFF] mb-1 flex items-center gap-1">
                      <IndianRupee className="w-3.5 h-3.5" /> Custom Budget
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-[#7C3CFF] font-bold text-sm">₹</span>
                      <input
                        type="text"
                        required
                        value={customBudget}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9,]/g, '');
                          setCustomBudget(val);
                        }}
                        placeholder="Enter your budget"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#7C3CFF] focus:bg-white text-[#0F172A] placeholder-slate-400 text-xs sm:text-sm rounded-xl pl-9 pr-4 py-3 outline-none transition-all font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Project Overview</label>
                <textarea
                  rows={3}
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Describe your website goals, features, or deadlines..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#7C3CFF] focus:bg-white text-[#0F172A] placeholder-slate-400 text-xs sm:text-sm rounded-xl px-4 py-3 outline-none transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn-shimmer w-full py-4 rounded-xl bg-gradient-to-r from-[#7C3CFF] to-[#35A7FF] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Send Brief via WhatsApp</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

