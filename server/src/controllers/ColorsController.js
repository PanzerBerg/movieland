const { Request, Response } = require('express');
const { getPaletteFromURL } = require('color-thief-node')

class ColorsController {
    async paletteColor(Request, Response) {
        const { body } = Request.body
        let colors = new Array()

        for (let index = 0; index < body.length; index++) {
            let imgUrl
            if(body[index] == null) {
                imgUrl = 'https://rufforosa.com.br/wp-content/uploads/2016/02/placeholder-9.jpg'
            } else {
                imgUrl = `https://image.tmdb.org/t/p/original${body[index]}`
            }
            const url = body[index]

            let palette = await getPaletteFromURL(imgUrl)

            for (let i = 0; i < palette.length; i++) {
                const r = componentToHex(palette[i][0])
                const g = componentToHex(palette[i][1])
                const b = componentToHex(palette[i][2])
                
                palette[i] = `#${r}${g}${b}`
            }
            colors.push({url, palette})
        }

        return Response.json(colors)

        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length === 1 ? '0' + hex : hex
        }
    }

}

module.exports = ColorsController