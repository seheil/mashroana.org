/**
 * Configuration for donation methods and contact information
 */

export const PAYMENT_METHODS = {
  instapay: {
    name: 'InstaPay',
    icon: '💳',
    description: 'تحويل فوري عبر InstaPay',
    accountNumber: '01013128453',
    accountName: 'مؤسسة مشروعنا إلى الجنة',
  },
  vodafone_cash: {
    name: 'فودافون كاش',
    icon: '📱',
    description: 'تحويل عبر محفظة فودافون',
    accountNumber: '01013128453',
    accountName: 'مؤسسة مشروعنا إلى الجنة',
  },
  etisalat_cash: {
    name: 'اتصالات كاش',
    icon: '📱',
    description: 'تحويل عبر محفظة اتصالات',
    accountNumber: '01154678076',
    accountName: 'مؤسسة مشروعنا إلى الجنة',
  },
  orange_cash: {
    name: 'أورنج كاش',
    icon: '📱',
    description: 'تحويل عبر محفظة أورنج',
    accountNumber: '01125927242',
    accountName: 'مؤسسة مشروعنا إلى الجنة',
  },
  bank_transfer: {
    name: 'تحويل بنكي',
    icon: '🏦',
    description: 'تحويل عبر الحساب البنكي',
    accountNumber: 'IBAN: EG1234567890123456789012',
    bankName: 'بنك مصر',
    accountName: 'مؤسسة مشروعنا إلى الجنة',
    swiftCode: 'BMEGEGCX',
  },
  other: {
    name: 'طريقة أخرى',
    icon: '❓',
    description: 'تواصل معنا للمزيد من الخيارات',
  },
};

export const CONTACT_NUMBERS = {
  whatsapp1: '01013128453',
  whatsapp2: '01154678076',
  whatsapp3: '01125927242',
};

export const SOCIAL_LINKS = {
  telegram: 'https://t.me/mshro3nallgana',
};

export type PaymentMethodKey = keyof typeof PAYMENT_METHODS;
