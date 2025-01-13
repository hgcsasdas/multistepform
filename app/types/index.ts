export type FormData = {
  age?: number;
  gender?: 'male' | 'female' | 'other';
  course?: string;
  consultSource?: string[];
  otherConsultSource?: string;
  talkFrequency?: string;
  firstTalkAge?: number;
  friendTalkFrequency?: string;
  seenPornography?: boolean;
  firstPornAge?: number;
  parentTalkTopics?: {
    [key: string]: string;
  };
  schoolTalkTopics?: {
    [key: string]: string;
  };
  trueOrFalse?: {
    [key: string]: boolean;
  };
  knowsPrEP?: boolean;
  knownSTIs?: string;
  curableSTIs?: string[];
  knownContraceptives?: string;
  knownSTIProtection?: string;
};

export type FormStep = {
  currentStep: number;
  sessionId: string | null;
  formData: FormData;
  completed: boolean;
};

export const COURSES = [
  '4ºESO A', '4ºESO B', '4ºESO C',
  '1ºBACH A', '1ºBACH B', '1ºBACH C', '1ºBACH D', '1ºBACH E', '1ºBACH F',
  '2ºBACH A', '2ºBACH B', '2ºBACH C', '2ºBACH D', '2ºBACH E', '2ºBACH F'
];

export const FREQUENCY_OPTIONS = [
  'Nada',
  'Poco',
  'Mas o menos',
  'Bastante',
  'Mucho'
];

export const CONSULT_SOURCES = [
  { id: 'mother', label: 'Madre' },
  { id: 'father', label: 'Padre' },
  { id: 'maleTutor', label: 'Tutor legal' },
  { id: 'femaleTutor', label: 'Tutora legal' },
  { id: 'friends', label: 'Amigos' },
  { id: 'socialMedia', label: 'Redes sociales' },
  { id: 'google', label: 'Google' },
  { id: 'other', label: 'Otro' }
];