// Capybara controller

const capybaras = require('./CapybaraItems').CapybaraFiles

function HandleCapybara(message) {

    return new Promise((resolve) => {
        if (message.content.toLowerCase() === "capybara help" ||
            message.content.toLowerCase() === "cpbr help") {
            // Capybara help
            let result = "Capybara here to help!\n\n"
            result+="- type 'capybara list' to get a list of all capybaras\n"
            result+="- type 'capybara -n <number from list>' to get that capybara\n"
            result+="- type 'capybara' to get a random capybara\n\n"
            result+="Enjoy capybaras!\n"
            resolve([result, ""])
        
        } else if (message.content.toLowerCase() === "capybara list" ||
            message.content.toLowerCase() === "cpbr list") {
            // Print list of capybaras
            let result = ""
            for (let i = 0; i < capybaras.size; i++) {
                const capybara = capybaras.get(i)
                result+=`${i}. ${capybara.name.split(".")[0]}\n`
            }
            resolve([`Full list of capybaras: \n${result}`, ""])

        } else if (message.content.toLowerCase().includes("capybara -n") ||
            message.content.toLowerCase().includes("cpbr -n")) {
            // Generate specific capybara
            const index = Number(message.content.toLowerCase().split(" ")[2])
            let myCapybara = capybaras.get(index)
            let result1, result2;
            if (myCapybara) {
                result1 = "Azi esti o " + myCapybara.name.split(".")[0] + "\n"
                result2 = ({
                    files: [{
                    attachment: myCapybara.url,
                    name: myCapybara.name
                }]});
                resolve([result1, result2])
            } else if (!message.content.includes("Capybara here to help")) {
                console.log("This is message: \n\n", message.content)
                resolve(["Nu exista capybara ta :/\n", ""])
            }

        } else if (message.content.toLowerCase() === "capybara" || 
            message.content.toLowerCase() === "cpbr") {
            // Generate random capybara
            let luckyNumber = between(0, capybaras.size)
            let myCapybara = capybaras.get(luckyNumber)
            let result1 = "Azi esti o " + myCapybara.name.split(".")[0] + "\n"
            let result2 = ({
                files: [{
                attachment: myCapybara.url,
                name: myCapybara.name
            }]});
            resolve([result1, result2])
        }
    }
)}
  
function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
}

module.exports = { HandleCapybara }