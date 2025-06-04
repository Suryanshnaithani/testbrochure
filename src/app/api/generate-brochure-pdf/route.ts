import { type NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { html_content } = await req.json();

    if (!html_content) {
      return NextResponse.json({ error: 'Missing html_content in request body' }, { status: 400 });
    }

    const pythonScriptPath = path.join(process.cwd(), 'scripts', 'generate_pdf.py');

    const pythonProcess = spawn('python', [pythonScriptPath]);

    let pdfData = Buffer.from('');
    let errorData = Buffer.from('');

    // Pipe HTML content to the Python script's stdin
    pythonProcess.stdin.write(html_content);
    pythonProcess.stdin.end();

    // Capture data from Python script's stdout
    pythonProcess.stdout.on('data', (data) => {
      pdfData = Buffer.concat([pdfData, data]);
    });

    // Capture data from Python script's stderr
    pythonProcess.stderr.on('data', (data) => {
      errorData = Buffer.concat([errorData, data]);
    });

    // Wait for the Python process to finish
    await new Promise<void>((resolve, reject) => {
      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          console.error(`Python script exited with code ${code}`);
          console.error(`Error details: ${errorData.toString()}`);
          reject(new Error(`PDF generation failed. Error: ${errorData.toString()}`));
        } else {
          resolve();
        }
      });

      pythonProcess.on('error', (err) => {
        console.error('Failed to start Python process:', err);
        reject(err);
      });
    });

    // Return the PDF data as a response
    return new NextResponse(pdfData, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="brochure.pdf"',
      },
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}