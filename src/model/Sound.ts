export default class Sound {
    code: string;
    audio: HTMLAudioElement;

    constructor(code: string, source: string) {
        this.code = code;
        this.audio = new Audio(source);
    }

    async play(startingTime) {
        this.audio.currentTime = startingTime;
        await this.audio.play();
    }

    async stop() {
        this.audio.pause();
        this.audio.currentTime = 0.0;
    }
}