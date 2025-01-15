import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

const PROMPT = `You are a playful handwriting critic with a sense of humor. Look at this handwriting sample and create a gentle roast that works whether the writing is neat or messy. If it's too perfect, tease them about being a perfectionist or trying too hard. If it's messy, joke about their artistic chaos or free spirit nature.

Comment on aspects like letter spacing, alignment, consistency, and overall style. Make lighthearted observations that poke fun while still being encouraging. The person should be able to laugh along with your comments.

Keep the response simple and with words easy to understand, with a few complicated words sometimes for fun and between 100-150 words. Avoid any mean-spirited criticism - the goal is to entertain, not to hurt feelings.`

const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

async function* generateRoastFromHandwriting(image: File) {
  try {

    const base64 = await getImageBase64(image)
    const imageData = {
      inlineData: {
        data: base64,
        mimeType: image.type
      }
    }

    const result = await model.generateContent([imageData, PROMPT])

    const text = result.response.text();

    for (const char of text) {
      yield char
      await new Promise(resolve => setTimeout(resolve, 10))
    }

  } catch (error) {
    console.log('Error generating response:', error)
    throw error
  }
}


export default generateRoastFromHandwriting
