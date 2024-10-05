function generateErrorPage(title, message) {
    return `
           <html lang="en">
                <head>
                     <title>${title}</title>
                </head>
                <body>
                     <h1 style="text-align: center">${title}</h1>
                     <hr>
                     <p style="text-align: center">${message}</p>
                </body>
           </html>
    `;
}

module.exports = generateErrorPage;