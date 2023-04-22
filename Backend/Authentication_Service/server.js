import { app } from "./app.js"

const main = async () => {
    try {
        app.listen(4002)
        console.log('works')
    } catch (error) {
        
    }
}

main()