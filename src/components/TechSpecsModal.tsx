// components/products/TechSpecsModal.tsx
'use client';

import { Dialog } from '@headlessui/react';

export default function TechSpecsModal({
  isOpen,
  onClose,
  specs,
}: {
  isOpen: boolean;
  onClose: () => void;
  specs: Record<string, string>;
}) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
          <Dialog.Title className="text-xl font-bold mb-4">
            Technical Specifications
          </Dialog.Title>
          
          <div className="space-y-3">
            {Object.entries(specs).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-700 capitalize">{key}:</span>
                <span className="text-gray-900">{value}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg"
          >
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}