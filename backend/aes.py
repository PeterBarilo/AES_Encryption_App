from Crypto.Cipher import AES
from secrets import token_bytes

key = token_bytes(16)

def encrypt(msg):
    cipher = AES.new(key, AES.MODE_EAX)
    nonce = cipher.nonce
    ciphertext, tag = cipher.encrypt_and_digest(msg.encode('ascii'))
    return nonce, ciphertext, tag

def decrypt(nonce, ciphertext, tag):
    cipher = AES.new(key, AES.MODE_EAX, nonce=nonce)
    plaintext = cipher.decrypt(ciphertext)
    # Verify tag
    try:
        cipher.verify(tag)
        return plaintext.decode('ascii')
    except:
        return False

nonce, ciphertext, tag = encrypt(input('Enter Message to Encrypt: '))
plaintext = decrypt(nonce, ciphertext, tag)

print(f'Cipher text: {ciphertext}')
if not plaintext:
    print('Message is Compromised')
else:
    print(f'Plain text: {plaintext}')
