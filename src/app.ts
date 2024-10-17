import { ConsoleApp } from "./classes/console-app"
import { MultiplicationApp } from "./classes/multiplication-app"
import { UI } from "./presentation/ui"

const main = async () => {
  console.clear()

  const ui = new UI()
  const multiplicationApp = new MultiplicationApp(ui)
  const consoleApp = new ConsoleApp(ui, multiplicationApp)

  await consoleApp.run()
}

main()
  .then(() => console.log('Goodbye!'))
  .catch(console.error)
