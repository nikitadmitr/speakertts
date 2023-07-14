SpeakerTTS is a text-to-speech (TTS) module that converts written text into speech using built-in functions on your computer. It provides an easy and convenient way to generate high-quality speech from text input. The module is made similar to say.js, but with small improvements and more convenient documentation.

## Installation

You can install speakertts using npm with the following command:
```shell
npm install speakertts
```

## Usage

To use speakertts, you can require the package like this:
```javascript
const speaker = require('speakertts');
```

Alternatively, if you want to use a specific platform, you can create a new instance of the `speaker` class with the desired platform as a parameter:
```javascript
const Speaker = require('speakertts').Speaker;
const speaker = new Speaker('darwin' || 'win32' || 'linux');
```

### Functions

**1. speak()**

To speak text, use the speak method:
```javascript
speaker.speak(text(String), voice(String), speed(Number), encoding(String), callback(Function))
```

- `text` - Text you want to hear
- `voice` *(optional)* - Voice that will read read the `text`
- `speed` *(optional)* - Reading speed. 1 = 100%, 0.5 = 50%, 2 = 200%, etc. Default value is 1
- `encoding` *(optional)* - Just encoding
- `callback` *(optional)* - Callback to handle error and add final event

*Full example*
```javascript
const speaker = require('speakertts');

speaker.speak('Hello, world', 'Microsoft David Desktop', 1, 'ASCII', (error) => {
  if (error) {
    return console.error('Error speaking!', error)
  }

  console.log('text to speech complete')
})
```

**2. stop()**

To stop speech, use the stop method:
```javascript
speaker.stop(callback(Function))
```

- `callback` *(optional)* - Callback to handle error and add final event

*Full example*
```javascript
const speaker = require('speakertts');

speaker.speak('Long and uninteresting speech', 'Microsoft David Desktop', 1, 'ASCII', (error) => {
  if (error) {
    return console.error('Error speaking!', error)
  }

  console.log('text to speech complete')
})

setTimeout(() => {
    speaker.stop((error) => {
    if (error) {
        console.error('Stop playback error:', error);
    } else {
        console.log('Playback stopped');
    }
    });
}, 5000);
```

**3. export()**

To stop text, use the stop method:
```javascript
speaker.export(text(String), voice(String), speed(Number), encoding(String), filename(String), callback(Function))
```

- `text` - Text you want to hear
- `voice` *(optional)* - Voice that will read read the `text`
- `speed` *(optional)* - Reading speed. 1 = 100%, 0.5 = 50%, 2 = 200%, etc. Default value is 1
- `encoding` *(optional)* - Just encoding
- `filename` - Path on your device to which the file will be exported
- `callback` *(optional)* - Callback to handle error and add final event

*Full example*
```javascript
const speaker = require('speakertts')
const path = require('path')

speaker.export("Hello, world", 'Microsoft David Desktop', 0.75, path.join(__dirname, 'say-hello.wav'), (err) => {
  if (err) {
    return console.error(err)
  }

  console.log('Text has been saved to say-hello.wav.')
})
```

**4. getInstalledVoices()**

To get list of installed voices, use the getInstalledVoices method:
```javascript
speaker.getInstalledVoices(callback(Function))
```

- `callback` *(optional)* - Callback to handle error and add final event

*Full example*
```javascript
const speaker = require('speakertts')
const path = require('path')

speaker.getInstalledVoices((error, voices) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Installed voices:', voices);
    }
});
```

## Encodings

Currently only the following encodings are available:
- ASCII
- UTF-8

## Feature Matrix

Unfortunately, not every feature is supported on every platform. Pull requests are welcome!

Platform | Speak | Export | Stop | Speed | Voice | Encoding | List
---------|-------|--------|------|-------|-------|-----|------|
macOS    | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :no_entry_sign: | :no_entry_sign:
Linux    | :white_check_mark: | :no_entry_sign:    | :white_check_mark: | :white_check_mark: | :white_check_mark: | :no_entry_sign: | :no_entry_sign:
Windows  | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark:


## macOS Notes

Voices in macOS are associated with different localities. To a list of voices and their localities run the following command:

```sh
say -v "?"
```

As an example, the default voice is `Alex` and the voice used by Siri is `Samantha`.


## Windows Notes

To install voice use SAPI format

## Linux Notes

Linux support requires [Festival](http://www.cstr.ed.ac.uk/projects/festival/). As far as I can tell there is no sane way to get a list of available voices. The only voice that seems to work is `voice_kal_diphone`, which seems to be the default anyway.

The `.export()` method is not available.

Try the following command to install Festival with a default voice:

```shell
sudo apt-get install festival festvox-kallpc16k
```


## Requirements

* Mac OS X (comes with `say`)
* Linux with Festival installed
* Windows (comes with SAPI.SpVoice)
