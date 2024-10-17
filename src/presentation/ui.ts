import { input, confirm, select } from "@inquirer/prompts";

interface Choice {
  name: string
  value: string
  description?: string
}

export interface UIPrompts {
  // ask(message: string): Promise<string>
  askNumber(message: string, limit?: number): Promise<number>
  askConfirm(message: string): Promise<boolean>
  askOptions(message: string, options: Choice[]): Promise<string>
}

export class UI implements UIPrompts {

  async askNumber(message: string, limit: number = 100): Promise<number> {
    const answer = await input({
      message,
      validate(value) {
        if (value === '') {
          return 'Please enter a number'
        }

        const number = Number(value)

        if( isNaN(number) ) {
          return 'Please enter a number'
        }

        if (number < 1 || number > limit) {
          return `Please enter a number between 1 and ${limit}`
        }

        return true
    }})

    return Number(answer)
  }

  async askConfirm(message: string): Promise<boolean> {
    const answer = await confirm({ message });

    return answer
  }

  async askOptions(message: string, options: Choice[]): Promise<string> {
    const answer = await select({
      message,
      choices: options,
    })

    return answer
  }
}
