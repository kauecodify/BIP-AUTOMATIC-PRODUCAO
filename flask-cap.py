from flask import Flask, render_template, request
import requests

app = Flask(__name__)

# renderizar a página HTML
@app.route('/')
def index():
    return render_template('index.html')

# submissão do formulário
@app.route('/atualizar_tiny', methods=['POST'])
def atualizar_tiny():
    if request.method == 'POST':
        # dados do formulário
        qr_data = request.form['qr_data']
        proximo_setor = request.form['setor']

        # chamada para a API do Tiny ERP para atualizar o setor do produto
        url = 'https://api.tiny.com.br/api2/produto.atualizar.php'
        payload = {
            'token': 'your_token',
            'codigo': qr_data,
            'campo': 'status',  #campo atualizado
            'valor': proximo_setor
        }
        response = requests.post(url, data=payload)

        # verificar requisição bem-sucedida
        if response.status_code == 200:
            return 'Produto com código {} atualizado para o setor {}'.format(qr_data, proximo_setor)
        else:
            return 'Erro ao atualizar o produto'

if __name__ == '__main__':
    app.run(debug=True)
