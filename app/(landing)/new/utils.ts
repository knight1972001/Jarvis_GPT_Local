import crypto from 'crypto';

export function generateShortUniqueId() {
  const uniqueString = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  const uniqueId = crypto.createHash('sha1').update(uniqueString).digest('hex').substr(0, 6);
  return uniqueId;
}


export function getFirst10Words(inputString: string) {
  // Split the string into an array of words
  const wordsArray = inputString.split(/\s+/);

  // Take the first 10 words from the array
  const first10Words = wordsArray.slice(0, 10);

  // Join the words back into a string
  const resultString = first10Words.join(' ');

  return resultString;
}