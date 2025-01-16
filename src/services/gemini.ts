import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

// const OUTPUT_PROMPT = `

// Now, the format for your response must be in JSON, NOT MAKRDOWN, ONLY plain text. You can use emojis, but only 2 or 3 atmost.
// The JSON Schema is
// {
//   "message": <Your view on the handwriting as asked above>,
//   "legibility_score": <legibility between 0.0 and 1.0>,
//   "design_score": <design rating between 0.0 and 1.0>,
//   "neatness_score": <neatness score between 0.0 and 1.0>,
//   "personality_traits": [<array of 2-3 personality traits inferred from handwriting>],
//   "improvement_tips": [<array of 1-2 specific tips to improve the handwriting>],
//   "unique_characteristics": [<array of 1-2 unique/distinctive features of the handwriting>],
//   "text": <transcript of the text in the image>
// }
// `

const schema = {
  description: "Handwriting Info",
  type: SchemaType.OBJECT,
  properties: {
    message: {
      type: SchemaType.STRING,
      description: "Your view on the handwriting in the image as asked above, between 100-150 words.",
      nullable: false,
    },
    legibility_score: {
      type: SchemaType.NUMBER,
      description: "Legibility score between 0.0 and 1.0",
      nullable: false
    },
    design_score: {
      type: SchemaType.NUMBER,
      description: "Design score between 0.0 and 1.0",
      nullable: false
    },
    neatness_score: {
      type: SchemaType.NUMBER,
      description: "Neatness score between 0.0 and 1.0",
      nullable: false
    },
    personality_traits: {
      type: SchemaType.ARRAY,
      description: "Array of 2-3 personality traits inferred from handwriting",
      items: {
        type: SchemaType.STRING
      },
      nullable: false
    },
    improvement_tips: {
      type: SchemaType.ARRAY,
      description: "Array of 1-2 specific tips to improve the handwriting",
      items: {
        type: SchemaType.STRING
      },
      nullable: false
    },
    unique_characteristics: {
      type: SchemaType.ARRAY,
      description: "Array of 1-2 unique/distinctive features of the handwriting",
      items: {
        type: SchemaType.STRING
      },
      nullable: false
    },
    text: {
      type: SchemaType.STRING,
      description: "Transcript of the text in the image",
      nullable: false
    }
  },
  required: ["message", "legibility_score", "design_score", "neatness_score", "personality_traits", "improvement_tips", "unique_characteristics", "text"]
}

const PROMPTS = {
  'funny': `You are a handwritings expert, as you have seen numerous handwritings in your life.
  You are provided with the image of someone's handwriting, and you have to write something funny about it,
  the style of handwriting, it's quirks and features etc. Try to make a joke on each aspect, and keep it funny.
  Be light-hearted, such that the reader enjoys the reading. Keep it somewhere around 100-150 words.
  The language must be simple and easy to understand, and the jokes must be common. Try not to hurt anyone's feelings.`,

  'playful': `You are a handwritings expert, as you have seen numerous handwritings in your life.
  You are provided with the image of someone's handwriting, and you have to write something playful about it,
  the style of handwriting, it's quirks and features etc. Try to make a joke on each aspect, and keep it playful.
  Be light-hearted, such that the reader enjoys the reading and admire their handwriting. Keep it somewhere around 100-150 words.
  The language must be simple and easy to understand, and the jokes must be common. Try not to hurt anyone's feelings.`,

  'brutal': `You are a handwritings expert, as you have seen numerous handwritings in your life.
  You are provided with the image of someone's handwriting, and you have to write something brutal and sharp about it,
  the style of handwriting, it's quirks and features etc. Try to make a joke on each aspect, and make it comedic and critisize the handwriting.
  Be brutal but comedic, such that the reader enjoys the reading and feels bad too at the same time. Keep it somewhere around 100-150 words.
  The language must be simple and easy to understand, and the jokes must be common. Try not to hurt anyone's feelings too much.`,

  'sarcastic': `You are a handwritings expert, as you have seen numerous handwritings in your life.
  You are provided with the image of someone's handwriting, and you have to write something sarcastic and heavy about it,
  the style of handwriting, it's quirks and features etc. Try to make a joke on every good or bad aspect,
  and make it sarcastically comedic and heavily critisize the handwriting.
  Be brutal but comedic, such that the reader enjoys the reading and feels bad too at the same time. Keep it somewhere around 100-150 words.
  The language must be simple and easy to understand, and the jokes must be common. Try not to hurt anyone's feelings too much.`
}

const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  }
});

async function getImageBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const base64 = reader.result.split(',')[1]
        resolve(base64)
      }
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

async function generateRoastFromHandwriting(image: File, taste: string) {
  try {

    const base64 = await getImageBase64(image)
    const imageData = {
      inlineData: {
        data: base64,
        mimeType: image.type
      }
    }

    const result = await model.generateContent([imageData, PROMPTS[taste as keyof typeof PROMPTS]])
    const data = JSON.parse(result.response.text());
    return data

  } catch (error) {
    console.log('Error generating response:', error)
    throw error
  }
}


export default generateRoastFromHandwriting
