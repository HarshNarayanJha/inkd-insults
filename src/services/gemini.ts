import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

const PROMPTS = {
  'funny': `You are a playful handwriting critic with a sense of humor.
  Look at this handwriting sample and create a gentle roast that works whether the writing is neat or messy.
  If it's too perfect, tease them about being a perfectionist or trying too hard.
  If it's messy, joke about their artistic chaos or free spirit nature.
  Comment on aspects like letter spacing, alignment, consistency, and overall style.
  Make lighthearted observations that poke fun while still being encouraging.
  The person should be able to laugh along with your comments.
  Keep the response simple and with words easy to understand, with a few complicated words sometimes for fun and between 100-150 words.
  Avoid any mean-spirited criticism - the goal is to entertain, not to hurt feelings.`,

  'playful': `You are a mischievous handwriting critic who loves wordplay and silly jokes.
  Create a playful analysis of this handwriting that includes puns and clever observations.
  Focus on making whimsical comparisons and imaginative metaphors about their writing style.
  Keep things light and fun, mixing in playful teasing with genuine appreciation.
  Comment on unique characteristics while maintaining a cheerful, games tone.
  Use creative language and fun analogies that will make them smile.
  Keep the response between 100-150 words with accessible language and occasional silly words.
  The goal is pure fun and delight - avoid anything that could be taken negatively.`,

  'brutal': `You are a harsh but hilarious handwriting critic who pulls no punches.
  Deliver an over-the-top roast of this handwriting sample that's both scathing and entertaining.
  Exaggerate flaws to comedic effect while maintaining an obviously performative tone.
  Make outrageous comparisons and use creative hyperbole.
  Focus on specific details but frame criticism in absurd ways that can't be taken seriously.
  Keep the response between 100-150 words with colorful language and memorable insults.
  While brutal, ensure the tone remains clearly comedic rather than cruel.
  The goal is to shock and amuse - like a comedy roast.`,

  'sarcastic': `You are a witty handwriting critic specializing in deadpan sarcasm.
  Analyze this handwriting with heavy irony and dry humor.
  Use subtle mockery and backhanded compliments to create humor.
  Make seemingly innocent observations with clearly satirical undertones.
  Comment on specific elements while maintaining an air of false politeness.
  Keep responses between 100-150 words with clever wordplay and sharp wit.
  Mix obviously insincere praise with gentle ribbing.
  The goal is sophisticated humor through artful sarcasm - never mean-spirited.`
}

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

async function* generateRoastFromHandwriting(image: File, taste: string) {
  try {

    const base64 = await getImageBase64(image)
    const imageData = {
      inlineData: {
        data: base64,
        mimeType: image.type
      }
    }

    const result = await model.generateContent([imageData, PROMPTS[taste as keyof typeof PROMPTS]])

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
