const emailVerification = new Map<string, string>();
const emailVerificationTimeout: string[] = [];

function clearEmailVerification(email: string): void {
    setTimeout((): void => {
        emailVerification.delete(email);
    }, 5 * 60 * 1000);
}

function clearEmailVerificationTimeout(email: string): void {
    setTimeout((): void => {
        emailVerificationTimeout.splice(emailVerificationTimeout.indexOf(email), 1);
    }, 30000);
}

function index(email: string, message: string): void {
    emailVerification.set(email, message);
    emailVerificationTimeout.push(email);
    clearEmailVerification(email);
    clearEmailVerificationTimeout(email);
}

function generateSixDigitCode(): string {
    const min: number = 100000;
    const max: number = 999999;
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

export {emailVerificationTimeout,emailVerification, index, generateSixDigitCode}