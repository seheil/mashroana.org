import { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    name: string;
    arabicName: string;
    description: string;
    icon: string;
  };
}

export default function DonationModal({ isOpen, onClose, project }: DonationModalProps) {
  const [copiedNote, setCopiedNote] = useState(false);
  const [copiedVodafone, setCopiedVodafone] = useState(false);

  if (!isOpen) return null;

  const transferNote = `تبرع لمشروع: ${project.arabicName} - مؤسسة مشروعنا إلى الجنة`;
  const vodafoneNumber = '01013128453';
  const instaPayLink = 'https://ipn.eg/S/hanan.gamal97/instapay/7EswbJ';

  const handleCopyNote = () => {
    navigator.clipboard.writeText(transferNote);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
  };

  const handleCopyVodafone = () => {
    navigator.clipboard.writeText(vodafoneNumber);
    setCopiedVodafone(true);
    setTimeout(() => setCopiedVodafone(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition"
        >
          <X size={24} className="text-gray-600" />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="text-4xl mb-3">{project.icon}</div>
          <h2 className="text-2xl font-bold text-green-700">{project.arabicName}</h2>
          <p className="text-gray-600 mt-2">{project.description}</p>
        </div>

        {/* Transfer Note Section */}
        <div className="mb-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            📋 ملاحظة التحويل (انسخها في تطبيق البنك):
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={transferNote}
              readOnly
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700"
            />
            <button
              onClick={handleCopyNote}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              {copiedNote ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            ✅ انسخ الملاحظة أعلاه والصقها في "سبب التحويل" داخل تطبيق البنك
          </p>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4 mb-6">
          {/* InstaPay */}
          <div className="border border-green-200 rounded-lg p-4 bg-green-50">
            <h3 className="font-semibold text-green-700 mb-3">💳 InstaPay</h3>
            <a
              href={instaPayLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold text-center block"
            >
              اضغط هنا للتبرع عبر InstaPay
            </a>
          </div>

          {/* Vodafone Cash */}
          <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
            <h3 className="font-semibold text-orange-700 mb-3">📱 فودافون كاش</h3>
            <div className="flex gap-2 items-center mb-3">
              <input
                type="text"
                value={vodafoneNumber}
                readOnly
                className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700"
              />
              <button
                onClick={handleCopyVodafone}
                className="p-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
              >
                {copiedVodafone ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-600">
              ✅ انسخ الرقم وأرسل التبرع عبر تطبيق فودافون كاش
            </p>
          </div>

          {/* WhatsApp */}
          <div className="border border-green-200 rounded-lg p-4 bg-green-50">
            <h3 className="font-semibold text-green-700 mb-3">💬 واتساب</h3>
            <a
              href={`https://wa.me/201013128453?text=${encodeURIComponent(transferNote)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition font-semibold text-center block"
            >
              تواصل عبر واتساب
            </a>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">📝 خطوات التبرع:</h4>
          <ol className="text-sm text-yellow-900 space-y-1 list-decimal list-inside">
            <li>اختر طريقة الدفع المناسبة</li>
            <li>انسخ ملاحظة التحويل (إن وجدت)</li>
            <li>أكمل عملية الدفع</li>
            <li>سيتم تأكيد تبرعك فوراً</li>
          </ol>
        </div>

        {/* Close Button */}
        <Button
          onClick={onClose}
          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800"
        >
          إغلاق
        </Button>
      </div>
    </div>
  );
}
