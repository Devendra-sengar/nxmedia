import React, { useState } from 'react';
import { NXLogoMark } from './NXLogo';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    website: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        setReferenceId(data.referenceId || null);
      } else {
        setErrorMessage(data.error || 'Unable to deliver message. Please try again.');
      }
    } catch {
      setErrorMessage('Network connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setReferenceId(null);
    setFormData({
      name: '',
      email: '',
      organization: '',
      website: '',
      description: '',
    });
    setErrorMessage(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={handleResetAndClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <NXLogoMark className="w-8 h-8" />
            <div>
              <h3 className="text-base font-bold text-gray-950 uppercase tracking-tight">
                Contact Us
              </h3>
              <p className="text-xs text-gray-500">
                NX Media · A NexisparkX Group Division
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-6 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">check</span>
              </div>
              <h4 className="text-base font-semibold text-gray-950">
                Inquiry Received &amp; Receipt Dispatched
              </h4>
              {referenceId && (
                <span className="px-2.5 py-1 rounded bg-gray-100 text-gray-700 font-mono text-xs font-semibold">
                  Ref #{referenceId}
                </span>
              )}
              <p className="text-xs text-gray-600 max-w-sm leading-relaxed mt-1">
                Thank you, <strong>{formData.name}</strong>. An official confirmation receipt has been emailed to <strong>{formData.email}</strong>, and our executive team has been notified.
              </p>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="mt-3 px-5 py-2 rounded-lg bg-gray-950 text-white text-xs font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. Name */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-950 focus:ring-1 focus:ring-gray-950 transition-colors"
                />
              </div>

              {/* 2. Email */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-950 focus:ring-1 focus:ring-gray-950 transition-colors"
                />
              </div>

              {/* 3. Organization */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Organization
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="Company / Brand name"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-950 focus:ring-1 focus:ring-gray-950 transition-colors"
                />
              </div>

              {/* 4. Organization Website */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Organization Website
                </label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-950 focus:ring-1 focus:ring-gray-950 transition-colors"
                />
              </div>

              {/* 5. Description */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Briefly describe what your organization wants to achieve..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-950 focus:ring-1 focus:ring-gray-950 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg bg-gray-950 text-white text-xs font-semibold hover:bg-gray-800 disabled:opacity-50 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Contact Us</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
