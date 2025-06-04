from flask import Flask, request, send_file, jsonify
from io import BytesIO
import io
from xhtml2pdf import pisa



app = Flask(__name__)

@app.route('/generate-pdf', methods=['POST'])
def generate_pdf():
    if not request.json or 'html_content' not in request.json:
        return jsonify({"error": "Invalid request. JSON data with 'html_content' is required."}), 400

    html_content = request.json['html_content']

    # Create a BytesIO buffer to receive the PDF data
    buffer = BytesIO()

    try:
        # Use xhtml2pdf to create the PDF from HTML
        pisa_status = pisa.CreatePDF(html_content, dest=buffer)
        if pisa_status.err:
            return jsonify({"error": "Error generating PDF from HTML."}), 500
    except Exception as e:
        return jsonify({"error": f"Error generating PDF: {e}"}), 500

    buffer.seek(0)
    return send_file(buffer, download_name='brochure.pdf', as_attachment=True, mimetype='application/pdf')

if __name__ == '__main__':
    app.run(debug=True)