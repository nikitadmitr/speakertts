const childProcess = require('child_process');
const SpeakerPlatformBase = require('./base.js');

const BASE_SPEED = 0; // Unsupported
const COMMAND = 'powershell';
const ENCODINGS = [
    {
        title: 'ASCII',
        code: 1252
    },
    {
        title: 'UTF-8',
        code: 65001
    }
];

class SpeakerPlatformWin32 extends SpeakerPlatformBase {
    constructor() {
        super();
        this.baseSpeed = BASE_SPEED;
    }

    buildSpeakCommand({ text, voice, speed, encoding }) {
        let args = [];
        let pipedData = '';
        let options = {};

        let selectedEncoding = ENCODINGS.find(item => item.title === encoding);

        let psCommand = `chcp ${selectedEncoding.code};`;
        psCommand += `Add-Type -AssemblyName System.speech;$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer;`;

        if (voice) {
            psCommand += `$speak.SelectVoice('${voice}');`;
        }

        if (speed) {
            let adjustedSpeed = this.convertSpeed(speed || 1);
            psCommand += `$speak.Rate = ${adjustedSpeed};`;
        }

        psCommand += `$speak.Speak([Console]::In.ReadToEnd())`;

        pipedData += text;
        args.push(psCommand);
        options.shell = true;

        return { command: COMMAND, args, pipedData, options };
    }

    buildExportCommand({ text, voice, speed, encoding, filename }) {
        let args = [];
        let pipedData = '';
        let options = {};

        let selectedEncoding = ENCODINGS.find(item => item.title === encoding);

        let psCommand = `chcp ${selectedEncoding.code}`;
        psCommand += `Add-Type -AssemblyName System.speech;$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer;`;

        if (voice) {
            psCommand += `$speak.SelectVoice('${voice}');`;
        }

        if (speed) {
            let adjustedSpeed = this.convertSpeed(speed || 1);
            psCommand += `$speak.Rate = ${adjustedSpeed};`;
        }

        if (!filename) throw new Error('Filename must be provided in export();');
        else {
            psCommand += `$speak.SetOutputToWaveFile('${filename}');`;
        }

        psCommand += `$speak.Speak([Console]::In.ReadToEnd());$speak.Dispose()`;

        pipedData += text;
        args.push(psCommand);
        options.shell = true;

        return { command: COMMAND, args, pipedData, options };
    }

    runStopCommand() {
        this.child.stdin.pause();
        childProcess.exec(`taskkill /pid ${this.child.pid} /T /F`);
    }

    convertSpeed(speed) {
        // Overriden to map playback speed (as a ratio) to Window's values (-10 to 10, zero meaning x1.0)
        return Math.max(-10, Math.min(Math.round((9.0686 * Math.log(speed)) - 0.1806), 10));
    }

    getVoices() {
        let args = [];
        let psCommand = 'Add-Type -AssemblyName System.speech;$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer;$speak.GetInstalledVoices() | % {$_.VoiceInfo.Name}';
        args.push(psCommand);
        return { command: COMMAND, args };
    }
}

module.exports = SpeakerPlatformWin32;