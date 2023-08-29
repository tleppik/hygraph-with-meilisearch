import { createHmac } from "crypto";

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

    const hash = createHmac("sha256", secret).update(payload).digest("base64");

    const isValid = sign === hash

    return isValid;
}