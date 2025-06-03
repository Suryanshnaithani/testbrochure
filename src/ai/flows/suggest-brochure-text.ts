// src/ai/flows/suggest-brochure-text.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting brochure text based on uploaded images.
 *
 * - suggestBrochureText - A function that takes an image data URI and returns AI-generated text suggestions for a brochure.
 * - SuggestBrochureTextInput - The input type for the suggestBrochureText function.
 * - SuggestBrochureTextOutput - The return type for the suggestBrochureText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBrochureTextInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo to generate text from, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SuggestBrochureTextInput = z.infer<typeof SuggestBrochureTextInputSchema>;

const SuggestBrochureTextOutputSchema = z.object({
  suggestedText: z
    .string()
    .describe('AI-generated text suggestions for the brochure based on the provided image.'),
});
export type SuggestBrochureTextOutput = z.infer<typeof SuggestBrochureTextOutputSchema>;

export async function suggestBrochureText(
  input: SuggestBrochureTextInput
): Promise<SuggestBrochureTextOutput> {
  return suggestBrochureTextFlow(input);
}

const suggestBrochureTextPrompt = ai.definePrompt({
  name: 'suggestBrochureTextPrompt',
  input: {schema: SuggestBrochureTextInputSchema},
  output: {schema: SuggestBrochureTextOutputSchema},
  prompt: `You are an AI assistant designed to generate brochure text suggestions based on uploaded images.

  Given the following image, suggest engaging and relevant text that could be used in a real estate brochure.
  The text should be concise and capture the essence of the image, highlighting key features and benefits.

  Image: {{media url=imageDataUri}}
  `,
});

const suggestBrochureTextFlow = ai.defineFlow(
  {
    name: 'suggestBrochureTextFlow',
    inputSchema: SuggestBrochureTextInputSchema,
    outputSchema: SuggestBrochureTextOutputSchema,
  },
  async input => {
    const {output} = await suggestBrochureTextPrompt(input);
    return output!;
  }
);
