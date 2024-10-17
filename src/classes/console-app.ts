import { MultiplicationApp } from "./multiplication-app"
import type { UIPrompts } from "../presentation/ui"

export class ConsoleApp {

  constructor(
    private readonly ui: UIPrompts,
    private readonly multiplicationApp: MultiplicationApp,
    private exit: boolean = false
  ) {}

  async run() {

    while(!this.exit) {
      const answer = await this.showMenu()

      switch(answer) {
        case "practice":
          await this.showMultiplicationQuestions()
          break
        case "exit":
          this.exit = true
          break
      }
    }
  }

  private async showMenu() {
    console.clear()
    console.log("Welcome to the multiplication table practice app")
    console.log("===============================================\n")

    const answer = await this.ui.askOptions(
      "Select an option",
      [
        {
          name: "1. Practice multiplication table",
          value: "practice",
          description: "Practice multiplication table"
        },
        {
          name: "2. Exit",
          value: "exit",
          description: "Exit the app"
        }
      ]
    )

    return answer
  }

  private async showMultiplicationQuestions() {
    const base = await this.ui.askNumber("Which multiplication table would you like to practice?")
    const limit = await this.ui.askNumber("What is the limit of the multiplication table?")
    const confirm = await this.ui.askConfirm("Do you want to start the practice?")

    if (!confirm) return

    let retry = true

    while(retry) {
      retry = await this.multiplicationApp.startRandomPractice(Number(base), Number(limit))

      if (!retry) {
        console.log("Goodbye!")
        break
      }
    }
  }
}
