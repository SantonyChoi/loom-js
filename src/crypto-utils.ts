import nacl from 'tweetnacl'
import ripemd160 from 'ripemd160'

// https://gist.github.com/tauzen/3d18825ae41ff3fc8981
export function bytesToHex(uint8arr: Uint8Array): string {
  if (!uint8arr) {
    return ''
  }

  var hexStr = ''
  for (var i = 0; i < uint8arr.length; i++) {
    var hex = (uint8arr[i] & 0xff).toString(16)
    hex = hex.length === 1 ? '0' + hex : hex
    hexStr += hex
  }

  return hexStr.toUpperCase()
}

export function bytesToHexAddr(bytes: Uint8Array): string {
  return '0x' + bytesToHexAddr(bytes)
}

export function bytesToBase64String(bytes: Uint8Array): string {
  return ''
}

export const signatureLength = nacl.sign.signatureLength
export const privateKeyLength = nacl.sign.secretKeyLength
export const publicKeyLength = nacl.sign.publicKeyLength

export function generatePrivateKey(): Uint8Array {
  const pair = nacl.sign.keyPair()
  return pair.secretKey
}

export function publicKeyFromPrivateKey(privateKey: Uint8Array): Uint8Array {
  const pair = nacl.sign.keyPair.fromSecretKey(privateKey)
  return pair.publicKey
}

export function sign(msg: Uint8Array, privateKey: Uint8Array) {
  const sigMsg = nacl.sign(msg, privateKey)
  return sigMsg.slice(0, signatureLength)
}

/**
 * Converts a public key to a local address (which is used as unique identifier within a DAppChain).
 * @param publicKey 32-byte public key.
 * @returns Array of bytes representing a local address.
 */
export function localAddressFromPublicKey(publicKey: Uint8Array): Uint8Array {
  const hasher = new ripemd160()
  hasher.update(publicKey.getBuffer())
  return new Uint8Array(hasher.digest())
}

export function JsonToUint8Array(json: string) {
  const str = JSON.parse(json)
  const ret = new Uint8Array(str.length)
  for (var i = 0; i < str.length; i++) {
    ret[i] = str.charCodeAt(i)
  }
  return ret
}

export function Uint8ArrayToB64(bytes: Uint8Array) {
  return btoa(String.fromCharCode.apply(null, bytes))
}

export function B64ToUint8Array(s: string): Uint8Array {
  return new Uint8Array(
    atob(s)
      .split('')
      .map(c => c.charCodeAt(0))
  )
}