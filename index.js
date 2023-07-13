const SpeakerLinux = require('./src/platform/linux.js');
const SpeakerMacos = require('./src/platform/darwin.js');
const SpeakerWin32 = require('./src/platform/win32.js');

const MACOS = 'darwin';
const LINUX = 'linux';
const WIN32 = 'win32';

class Speaker {
    constructor(platform) {
        if (!platform) {
            platform = process.platform;
        }

        if (platform === MACOS) {
            return new SpeakerMacos();
        } else if (platform === LINUX) {
            return new SpeakerLinux();
        } else if (platform === WIN32) {
            return new SpeakerWin32();
        }

        throw new Error(`new Speaker(): unsupported platorm! ${platform}`);
    }
}

module.exports = new Speaker();
module.exports.Speaker = Speaker;
module.exports.platforms = {
    WIN32: WIN32,
    MACOS: MACOS,
    LINUX: LINUX
};
