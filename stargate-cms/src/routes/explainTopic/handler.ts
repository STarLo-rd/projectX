import { RequestHandler } from "express";
import { DefaultParams } from "../types";
import payload from "payload";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { HfInference } from "@huggingface/inference";
const genAI = new GoogleGenerativeAI("AIzaSyBWABGD2ryXU63Y7qHhKEEC1SMaaIlaBIM"); // Replace "YOUR_API_KEY" with your actual API key

// Implement your logic for task decomposition, context framing, analogy finding, and example finding
async function decomposeComplexTopic(complexTopic) {
  try {
    // Example implementation using Wikipedia API for task decomposition
    const wikipediaResponse = await axios.get(
      `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${encodeURIComponent(
        complexTopic
      )}&format=json`
    );
    const pages = wikipediaResponse.data.query.pages;
    const page = Object.values(pages)[0];

    if (page.extract) {
      const extract = page.extract;
      const sentences = extract.match(/\(?[^\.!\?]+[\.!\?]\)?/g);
      const subtopics = sentences.map((sentence) => sentence.trim());
      return subtopics;
    } else {
      return [`No subtopics found for "${complexTopic}"`];
    }
  } catch (error) {
    console.error("Error in decomposeComplexTopic:", error);
    throw error;
  }
}

async function getContextualInfo(complexTopic) {
  try {
    // Example implementation using Wikipedia API for context framing
    const wikipediaResponse = await axios.get(
      `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${encodeURIComponent(
        complexTopic
      )}&format=json`
    );
    const pages = wikipediaResponse.data.query.pages;
    const page = Object.values(pages)[0];

    if (page.extract) {
      return page.extract;
    } else {
      return `No contextual information found for "${complexTopic}"`;
    }
  } catch (error) {
    console.error("Error in getContextualInfo:", error);
    throw error;
  }
}

async function findAppropriateAnalogy(complexTopic) {
  try {
    // Example implementation using Datamuse API for finding analogies
    const datamuseResponse = await axios.get(
      `https://api.datamuse.com/words?rel_trg=${encodeURIComponent(
        complexTopic
      )}&max=1`
    );
    const analogy = datamuseResponse.data[0]?.word;

    if (analogy) {
      return `${complexTopic} is like ${analogy}`;
    } else {
      return `No appropriate analogy found for "${complexTopic}"`;
    }
  } catch (error) {
    console.error("Error in findAppropriateAnalogy:", error);
    throw error;
  }
}

async function findRelevantExample(complexTopic) {
  try {
    // Example implementation using Wikipedia API for finding relevant examples
    const wikipediaResponse = await axios.get(
      `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${encodeURIComponent(
        complexTopic
      )}&format=json`
    );
    const pages = wikipediaResponse.data.query.pages;
    const page = Object.values(pages)[0];

    if (page.extract) {
      const extract = page.extract;
      const sentences = extract.match(/\(?[^\.!\?]+[\.!\?]\)?/g);
      const exampleSentences = sentences.filter((sentence) =>
        sentence.toLowerCase().includes("example")
      );
      if (exampleSentences.length > 0) {
        return `For example, ${exampleSentences[0].trim()}`;
      }
    }

    return `No relevant example found for "${complexTopic}"`;
  } catch (error) {
    console.error("Error in findRelevantExample:", error);
    throw error;
  }
}

async function preparePrompt(complexTopic) {
  try {
    // 1. Task Decomposition
    const subtopics = await decomposeComplexTopic(complexTopic);

    // 2. Context Framing
    const contextualInfo = await getContextualInfo(complexTopic);

    // 3. Iterative Refinement
    let prompt;

    // 4. Persona Framing
    const persona = "a curious high school student";
    prompt = `Imagine you are explaining the following complex topic to ${persona}: ${complexTopic}. Please provide a simple and engaging explanation, considering the background information: ${contextualInfo}`;

    // 5. Analogy and Example Framing
    const analogy = await findAppropriateAnalogy(complexTopic);
    const example = await findRelevantExample(complexTopic);
    prompt = `${prompt} You can use the following analogy to help explain the topic: ${analogy}. Here's an example to illustrate the concept: ${example}`;

    // 6. Subtopic Framing
    prompt = `${prompt} Please break down the explanation into the following subtopics: ${subtopics.join(
      ", "
    )}`;

    return prompt;
  } catch (error) {
    console.error("Error in preparePrompt:", error);
    throw error;
  }
}

const callGeminiAIModel = async (topic) => {
  try {
    const prompt = await preparePrompt(topic);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(
      `Genearate the result form of detailed essay as markdown file and it must needs to have good formatting requires for` +
      prompt
    );
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (err) {
    console.error("Error in callGeminiAIModel:", err);
    throw err;
  }
};

const explainTopic: RequestHandler<DefaultParams, any, any> = async (
  req,
  res,
  _next
) => {
  try {
    const { interest } = req.body;
    const data = await callGeminiAIModel(interest);
    res.json({ data });
  } catch (err) {
    console.error("Error in explainTopic:", err.message);
    payload.logger.error(err.message);
    payload.logger.error(err.data);
    return res.status(500).send(err.message);
  }
};

const summarizeText: RequestHandler<DefaultParams, any, any> = async (
  req,
  res,
  _next
) => {
  try {
    const { data } = req.body;
    const hf = new HfInference("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");
    const result = await hf.summarization({
      model: "facebook/bart-large-cnn",
      inputs: data,
      parameters: {
        max_length: 100,
      },
    });

    res.send(result);
  } catch (err) {
    console.error("Error in explainTopic:", err.message);
    payload.logger.error(err.message);
    payload.logger.error(err.data);
    return res.status(500).send(err.message);
  }
};

const geneateQuestions: RequestHandler<DefaultParams, any, any> = async (
  req,
  res,
  _next
) => {
  try {
    const { data } = req.body;
    const hf = new HfInference("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");

    // Generate questions from the text
    const questionsResponse = await hf.textGeneration({
      model: "ramsrigouthamg/t5_squad_v1",
      inputs: data,
      parameters: {
        max_length: 128,
        num_beams: 4,
        early_stopping: true,
        do_sample: false,
        top_k: 50,
        top_p: 0.95,
      },
    });

    const generatedQuestions = questionsResponse.generated_text.replace(
      "question: ",
      ""
    );

    // Get the answer to the selected question
    const answer = await hf.questionAnswering({
      model: "deepset/roberta-base-squad2",
      inputs: {
        question: generatedQuestions,
        context: data,
      },
    });
    // Generate choices for the question
    // const choicesResponse = await hf.textGeneration({
    //   model: 'gpt2',
    //   inputs: `${data}`,
    //   parameters: {
    //     max_length: 50,
    //     num_return_sequences: 1,
    //     do_sample: true,
    //     top_k: 50,
    //     top_p: 0.95,
    //   },
    // });
    // console.log("choices", choicesResponse)

    // const choices = choicesResponse.generated_text.split('\n').map(choice => choice.trim());

    // console.log("Generated Choices:", choices);

    res.json({ question: generatedQuestions, answer });
  } catch (err) {
    console.error("Error in explainTopic:", err.message);
    payload.logger.error(err.message);
    payload.logger.error(err.data);
    return res.status(500).send(err.message);
  }
};

export { explainTopic, summarizeText, geneateQuestions };
