
export const InputManager = {
    keys: [],
    keyVerify: (e) => {
        e = e || event;
        if (e.keyCode !== 13) {
            const codeFromKey = this.keycodeToChar(e.keyCode);
            this.keys[codeFromKey] = (e.type === 'keydown')
        } else {
            this.keys[13] = (e.type === 'keydown');
        }
    },
    keyHandle: (word) => {
        word.update(this.keys);
    },
    keycodeToChar: (code) => {
        const letter = String.fromCharCode((96 <= code && code <= 105) ? code - 48 : code);
        return letter;
    }
};

document.addEventListener("keydown", InputManager.keyVerify.bind(InputManager));

document.addEventListener("keyup", InputManager.keyVerify.bind(InputManager));
