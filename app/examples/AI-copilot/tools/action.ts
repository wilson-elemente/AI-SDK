"use server";

import { openai } from "@ai-sdk/openai";
import { streamText, generateText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";

export const countryInfoAction = async (country: string) => {
  "use server";

  const { toolResults, toolCalls } = await generateText({
    model: openai("gpt-4o"),
    temperature: 0.7,
    prompt: `You are a helpful chatbot. The user wants to know about a country: ${country}.`,
    tools: {
      countryData: {
        description: "Fetch basic information about a country, such as population and capital city.",
        parameters: z.object({
          country: z.string().describe("Name of the country"),
        }),
        execute: async ({ country }) => {
          // Definimos un tipo explícito para las claves del objeto
          const data: Record<string, { capital: string; population: number }> = {
            USA: { capital: "Washington D.C.", population: 331000000 },
            Canada: { capital: "Ottawa", population: 38000000 },
            Mexico: { capital: "Mexico City", population: 126000000 },
          };

          // Verificamos si el país está en los datos
          const countryInfo = data[country] || { capital: "Unknown", population: "Unknown" };
          return countryInfo;
        },
      },
    },
  });

  if (toolResults && toolCalls) {
    const response = `The capital of ${country} is ${toolResults[0].result.capital}, and it has a population of approximately ${toolResults[0].result.population}.`;
    return createStreamableValue(response).value;
  }
};
