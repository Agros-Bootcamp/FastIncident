import { app } from "./app.js"

const main = async () => {
    try {
        app.listen(4006)
        console.log('works')
    } catch (error) {
        
    }
}

main()