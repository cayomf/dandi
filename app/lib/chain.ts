import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

// Definir o schema de saída usando Zod
const outputSchema = z.object({
  summary: z.string().describe("Um resumo conciso do repositório GitHub"),
  cool_facts: z.array(z.string()).describe("Lista de fatos interessantes encontrados no repositório")
});

// Criar o template do prompt
const promptTemplate = PromptTemplate.fromTemplate(
  `Analise o conteúdo deste arquivo README de um repositório GitHub e forneça um resumo e fatos interessantes.
  
  README Content: {readmeContent}
  
  Forneça um resumo conciso e uma lista de fatos interessantes encontrados no repositório.`
);

// Criar o modelo LLM com saída estruturada
const model = new ChatOpenAI({
  temperature: 0,
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY
}).withStructuredOutput(outputSchema);

// Criar e exportar a chain
export const chain = RunnableSequence.from([
    promptTemplate,
    (promptValue) => model.invoke(promptValue)
]);

// Exportar o schema para uso em outros lugares se necessário
export type OutputSchema = z.infer<typeof outputSchema>; 