import hmacSHA512 from 'crypto-js/hmac-sha512';

export function verifyWebhookSignature(body, signature, secret) {
    const [rawSign, rawEnv, rawTimestamp] = signature.split(", ");

    const sign = rawSign.replace("sign=", "");
    const EnvironmentName = rawEnv.replace("env=", "");
    const Timestamp = parseInt(rawTimestamp.replace("t=", ""));

    let payload = JSON.stringify({
        Body: JSON.stringify(body),
        EnvironmentName,
        TimeStamp: Timestamp,
    });

    const hash = hmacSHA512("sha256", secret).update(payload).digest("base64");

    const isValid = sign === hash

    return isValid;
}