import { renderContent } from './components/content.js';
import { initializeEnvelope } from './components/envelope.js';
import { initializeCountdown } from './components/countdown.js';
import { initializeMotion } from './components/motion.js';

const config = window.INVITATION_CONFIG;
renderContent(config);
initializeCountdown(config);
const enterInvitation = initializeMotion(config);
initializeEnvelope(config, enterInvitation);
