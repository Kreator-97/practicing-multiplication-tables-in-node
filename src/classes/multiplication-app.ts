import { UIPrompts } from "../presentation/ui";

export class MultiplicationApp {

  constructor(
    private readonly ui: UIPrompts,
  ) {}

  async startRandomPractice(base: number, limit: number): Promise<boolean> {
    console.log(`You selected the ${base} multiplication table up to ${limit}`)

    const numbers = Array.from({ length: limit }, (_, i) => i + 1)
    const shuffledNumbers = numbers.sort(() => Math.random() - 0.5)

    let correct = 0
    const start = Date.now()

    for( const number of shuffledNumbers ) {
      const result = base * number
      const answer = await this.ui.askNumber(`What is ${base} x ${number}?`, base * limit)

      if (Number(answer) === result) {
        console.log("Correct!")
        correct++
      } else {
        console.log(`Incorrect. The correct answer is ${result}`)
      }
    }

    console.log("Practice completed!")
    console.log(`You answered ${correct} out of ${limit} questions correctly`)
    const end = Date.now()

    const totalTime = (end - start) / 1000
    console.log(`Total time: ${totalTime} seconds`)

    return await this.ui.askConfirm("Would you like to practice again?")
  }
}