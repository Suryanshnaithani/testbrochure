import sys
import io
from xhtml2pdf import pisa

def generate_pdf_from_html(html_content):
    """
    Generates a PDF from HTML content and writes it to standard output.

    Args:
        html_content: A string containing the HTML content.
    """
    try:
        # Create a file-like buffer for the PDF output
        pdf_buffer = io.BytesIO()

        # Create the PDF object
        pisa_status = pisa.CreatePDF(
            io.StringIO(html_content),  # HTML content as a file-like object
            dest=pdf_buffer,            # PDF destination
            encoding='utf-8'
        )

        # If error while creating PDF
        if pisa_status.err:
            sys.stderr.write("Error generating PDF: %s\n" % pisa_status.err)
            sys.exit(1)
        else:
            # Get the PDF content from the buffer
            pdf_content = pdf_buffer.getvalue()
            # Write the PDF content to standard output
            sys.stdout.buffer.write(pdf_content)
            sys.stdout.flush()

    except Exception as e:
        sys.stderr.write("An unexpected error occurred: %s\n" % e)
        sys.exit(1)

if __name__ == "__main__":
    # Read HTML content from standard input
    html_input = sys.stdin.read()
    generate_pdf_from_html(html_input)