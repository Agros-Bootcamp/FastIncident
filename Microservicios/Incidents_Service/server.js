import { app } from "./app.js"

const main = async () => {
    try {
        app.listen(4004)
        console.log('works')
    } catch (error) {
        
    }
}

main()