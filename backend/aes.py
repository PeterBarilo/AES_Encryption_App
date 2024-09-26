from flask import Flask, request, jsonify
from flask_cors import CORS
from Crypto.Cipher import AES
from secrets import token_bytes

app = Flask(__name__)
CORS(app) 

key = token_bytes(16)

def encrypt(msg):
    cipher = AES.new(key, AES.MODE_EAX)
    nonce = cipher.nonce
    ciphertext, tag = cipher.encrypt_and_digest(msg.encode('ascii'))
    return nonce, ciphertext, tag

def decrypt(nonce, ciphertext, tag):
    cipher = AES.new(key, AES.MODE_EAX, nonce=nonce)
    plaintext = cipher.decrypt(ciphertext)
    try:
        cipher.verify(tag)
        return plaintext.decode('ascii')
    except:
        return False

@app.route('/encrypt', methods=['POST'])
def encrypt_message():
    data = request.json
    msg = data['message']
    nonce, ciphertext, tag = encrypt(msg)
    return jsonify({
        'nonce': nonce.hex(),
        'ciphertext': ciphertext.hex(),
        'tag': tag.hex()
    })

@app.route('/decrypt', methods=['POST'])
def decrypt_message():
    data = request.json
    nonce = bytes.fromhex(data['nonce'])
    ciphertext = bytes.fromhex(data['ciphertext'])
    tag = bytes.fromhex(data['tag'])
    plaintext = decrypt(nonce, ciphertext, tag)
    if plaintext:
        return jsonify({'plaintext': plaintext})
    else:
        return jsonify({'error': 'Message is compromised'}), 400

if __name__ == '__main__':
    app.run(debug=True)
